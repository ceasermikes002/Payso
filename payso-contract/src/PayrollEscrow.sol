// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {FXRouter} from "./FXRouter.sol";

/**
 * @title PayrollEscrow
 * @notice Programmable multi-currency payroll escrow system
 * @dev Enables time-locked and work-verified payments with automatic FX conversion
 */
contract PayrollEscrow is ReentrancyGuard {
    // ============ ERRORS ============

    error OnlyEmployer();
    error OnlyAuthorizedEmployer();
    error InvalidAmount();
    error InvalidReleaseTime();
    error InvalidAddress();
    error PaymentNotFound();
    error PaymentAlreadyClaimed();
    error PaymentNotYetClaimable();
    error WorkNotVerified();
    error InvalidSignature();
    error TransferFailed();
    error InvalidStablecoin();

    // ============ EVENTS ============

    /**
     * @notice Emitted when a new payment is scheduled
     */
    event PaymentScheduled(
        uint256 indexed id,
        address indexed recipient,
        uint256 amount,
        uint256 releaseAt,
        address stablecoin,
        address preferredPayout,
        bool requiresWorkEvent
    );

    /**
     * @notice Emitted when work is verified for a payment
     */
    event WorkVerified(uint256 indexed id, address indexed verifier);

    /**
     * @notice Emitted when a payment is claimed
     */
    event PaymentClaimed(uint256 indexed id, address indexed recipient, uint256 amount, address payoutToken);

    /**
     * @notice Emitted when configuration is updated
     */
    event ConfigurationUpdated(string indexed configType, address indexed newAddress);

    // ============ STRUCTS ============

    /**
     * @notice Payment structure containing all payment details
     */
    struct Payment {
        uint256 id;
        address recipient;
        uint256 amount;
        uint256 releaseAt;
        bool claimed;
        bool requiresWorkEvent;
        address stablecoin;
        address preferredPayout;
    }

    // ============ STATE VARIABLES ============

    /// @notice Employer address (contract owner)
    address public employer;
    
    /// @notice Mapping of authorized employer addresses
    mapping(address => bool) public authorizedEmployers;

    /// @notice Payment counter for unique IDs
    uint256 public paymentCounter;

    /// @notice USDC token address
    address public USDC;

    /// @notice EURC token address
    address public EURC;

    /// @notice FXRouter contract address
    address public fxRouter;

    /// @notice Mapping of payment ID to Payment struct
    mapping(uint256 => Payment) public payments;

    /// @notice Mapping of payment ID to work verification status
    mapping(uint256 => bool) public workVerified;

    // ============ MODIFIERS ============

    modifier onlyEmployer() {
        if (msg.sender != employer && !authorizedEmployers[msg.sender]) revert OnlyEmployer();
        _;
    }
    
    modifier onlyMainEmployer() {
        if (msg.sender != employer) revert OnlyEmployer();
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor(address _usdc, address _eurc, address _fxRouter) {
        if (_usdc == address(0) || _eurc == address(0)) revert InvalidAddress();

        employer = msg.sender;
        authorizedEmployers[msg.sender] = true;
        USDC = _usdc;
        EURC = _eurc;
        fxRouter = _fxRouter;
    }

    // ============ ADMIN FUNCTIONS ============

    /**
     * @notice Add an authorized employer address
     * @param newEmployer Address to authorize
     */
    function addAuthorizedEmployer(address newEmployer) external onlyMainEmployer {
        if (newEmployer == address(0)) revert InvalidAddress();
        authorizedEmployers[newEmployer] = true;
        emit ConfigurationUpdated("authorizedEmployer", newEmployer);
    }
    
    /**
     * @notice Remove an authorized employer address
     * @param employerToRemove Address to remove authorization
     */
    function removeAuthorizedEmployer(address employerToRemove) external onlyMainEmployer {
        if (employerToRemove == address(0)) revert InvalidAddress();
        authorizedEmployers[employerToRemove] = false;
        emit ConfigurationUpdated("removedEmployer", employerToRemove);
    }

    /**
     * @notice Set the FXRouter contract address
     * @param _fxRouter New FXRouter address
     */
    function setFXRouter(address _fxRouter) external onlyMainEmployer {
        if (_fxRouter == address(0)) revert InvalidAddress();
        fxRouter = _fxRouter;
        emit ConfigurationUpdated("fxRouter", _fxRouter);
    }

    /**
     * @notice Set stablecoin addresses
     * @param _usdc USDC token address
     * @param _eurc EURC token address
     */
    function setStablecoinAddresses(address _usdc, address _eurc) external onlyMainEmployer {
        if (_usdc == address(0) || _eurc == address(0)) revert InvalidAddress();
        USDC = _usdc;
        EURC = _eurc;
        emit ConfigurationUpdated("USDC", _usdc);
        emit ConfigurationUpdated("EURC", _eurc);
    }

    /**
     * @notice Transfer employer role to a new address
     * @param newEmployer New employer address
     */
    function transferEmployer(address newEmployer) external onlyMainEmployer {
        if (newEmployer == address(0)) revert InvalidAddress();
        employer = newEmployer;
        authorizedEmployers[newEmployer] = true;
        emit ConfigurationUpdated("employer", newEmployer);
    }

    // ============ CORE PAYMENT FUNCTIONS ============

    /**
     * @notice Deposit stablecoins and schedule a payment
     * @param recipient Address of the payment recipient
     * @param amount Amount of stablecoins to lock
     * @param releaseAt Unix timestamp when payment becomes claimable
     * @param requiresWorkEvent Whether payment requires work verification
     * @param stablecoin Address of the stablecoin to deposit (USDC or EURC)
     * @param preferredPayout Address of the preferred payout token (USDC or EURC)
     * @return paymentId Unique ID of the created payment
     */
    function depositAndSchedule(
        address recipient,
        uint256 amount,
        uint256 releaseAt,
        bool requiresWorkEvent,
        address stablecoin,
        address preferredPayout
    ) external onlyEmployer returns (uint256 paymentId) {
        // Validation
        if (recipient == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        if (releaseAt <= block.timestamp) revert InvalidReleaseTime();
        if (stablecoin != USDC && stablecoin != EURC) revert InvalidStablecoin();
        if (preferredPayout != USDC && preferredPayout != EURC) revert InvalidStablecoin();

        // Transfer stablecoin from employer to escrow
        bool success = IERC20(stablecoin).transferFrom(msg.sender, address(this), amount);
        if (!success) revert TransferFailed();

        // Create payment
        paymentId = paymentCounter++;
        payments[paymentId] = Payment({
            id: paymentId,
            recipient: recipient,
            amount: amount,
            releaseAt: releaseAt,
            claimed: false,
            requiresWorkEvent: requiresWorkEvent,
            stablecoin: stablecoin,
            preferredPayout: preferredPayout
        });

        emit PaymentScheduled(paymentId, recipient, amount, releaseAt, stablecoin, preferredPayout, requiresWorkEvent);

        return paymentId;
    }

    /**
     * @notice Claim a payment if conditions are met
     * @param paymentId ID of the payment to claim
     * @dev Automatically handles FX conversion if needed
     */
    function claimPayment(uint256 paymentId) external nonReentrant {
        Payment storage payment = payments[paymentId];

        // Validation
        if (payment.recipient == address(0)) revert PaymentNotFound();
        if (msg.sender != payment.recipient) revert OnlyEmployer(); // Reusing error for "not recipient"
        if (payment.claimed) revert PaymentAlreadyClaimed();
        if (block.timestamp < payment.releaseAt) revert PaymentNotYetClaimable();
        if (payment.requiresWorkEvent && !workVerified[paymentId]) revert WorkNotVerified();

        // Mark as claimed
        payment.claimed = true;

        // Determine payout token and amount
        address payoutToken = payment.preferredPayout;
        uint256 payoutAmount = payment.amount;

        // Handle FX conversion if needed
        if (payment.stablecoin != payment.preferredPayout && fxRouter != address(0)) {
            // Approve FXRouter to spend stablecoin
            IERC20(payment.stablecoin).approve(fxRouter, payment.amount);

            // Execute swap
            payoutAmount = FXRouter(fxRouter).swap(
                payment.stablecoin,
                payment.preferredPayout,
                payment.amount,
                payment.recipient
            );
        } else {
            // Direct transfer without conversion
            bool success = IERC20(payment.stablecoin).transfer(payment.recipient, payment.amount);
            if (!success) revert TransferFailed();
        }

        emit PaymentClaimed(paymentId, payment.recipient, payoutAmount, payoutToken);
    }

    /**
     * @notice Verify work completion for a payment using ECDSA signature
     * @param paymentId ID of the payment
     * @param signature Employer's signature approving work completion
     * @dev Signature must be from employer signing hash(recipient, paymentId, employer)
     */
    function verifyWork(uint256 paymentId, bytes memory signature) external {
        Payment storage payment = payments[paymentId];

        if (payment.recipient == address(0)) revert PaymentNotFound();
        if (!payment.requiresWorkEvent) return; // No verification needed

        // Create message hash using the main employer address
        bytes32 messageHash = keccak256(abi.encodePacked(payment.recipient, paymentId, employer));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        // Recover signer
        address signer = recoverSigner(ethSignedMessageHash, signature);

        // Verify signer is an authorized employer (main employer or authorized)
        if (signer != employer && !authorizedEmployers[signer]) revert InvalidSignature();

        // Mark work as verified
        workVerified[paymentId] = true;

        emit WorkVerified(paymentId, msg.sender);
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get payment details
     * @param paymentId ID of the payment
     * @return Payment struct
     */
    function getPayment(uint256 paymentId) external view returns (Payment memory) {
        return payments[paymentId];
    }

    /**
     * @notice Check if a payment is claimable
     * @param paymentId ID of the payment
     * @return True if payment can be claimed
     */
    function isClaimable(uint256 paymentId) external view returns (bool) {
        Payment storage payment = payments[paymentId];

        if (payment.recipient == address(0)) return false;
        if (payment.claimed) return false;
        if (block.timestamp < payment.releaseAt) return false;
        if (payment.requiresWorkEvent && !workVerified[paymentId]) return false;

        return true;
    }

    /**
     * @notice Check if an address is an authorized employer
     * @param account Address to check
     * @return True if the address is an authorized employer
     */
    function isAuthorizedEmployer(address account) external view returns (bool) {
        return account == employer || authorizedEmployers[account];
    }

    /**
     * @notice Get all payment IDs for a recipient
     * @param recipient Address of the recipient
     * @return Array of payment IDs
     */
    function getPaymentsByRecipient(address recipient) external view returns (uint256[] memory) {
        uint256 count = 0;

        // Count payments for recipient
        for (uint256 i = 0; i < paymentCounter; i++) {
            if (payments[i].recipient == recipient) {
                count++;
            }
        }

        // Create array and populate
        uint256[] memory paymentIds = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < paymentCounter; i++) {
            if (payments[i].recipient == recipient) {
                paymentIds[index] = i;
                index++;
            }
        }

        return paymentIds;
    }

    // ============ INTERNAL HELPER FUNCTIONS ============

    /**
     * @notice Get Ethereum signed message hash
     * @param messageHash Original message hash
     * @return Ethereum signed message hash
     */
    function getEthSignedMessageHash(bytes32 messageHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
    }

    /**
     * @notice Recover signer from signature
     * @param ethSignedMessageHash Ethereum signed message hash
     * @param signature Signature bytes
     * @return Recovered signer address
     */
    function recoverSigner(bytes32 ethSignedMessageHash, bytes memory signature) internal pure returns (address) {
        require(signature.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        return ecrecover(ethSignedMessageHash, v, r, s);
    }
}
