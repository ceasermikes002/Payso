// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title FXRouter
 * @notice Mock foreign exchange router for stablecoin conversion
 * @dev Simulates USDC ↔ EURC conversion with configurable rates
 * @dev No slippage, no liquidity pools - deterministic behavior for testing
 */
contract FXRouter {
    // ============ ERRORS ============

    error InvalidRate();
    error InvalidTokenPair();
    error InsufficientBalance();
    error TransferFailed();
    error ZeroAmount();

    // ============ EVENTS ============

    /**
     * @notice Emitted when an FX swap is executed
     * @param tokenIn Input token address
     * @param tokenOut Output token address
     * @param amountIn Amount of input tokens
     * @param amountOut Amount of output tokens
     * @param recipient Address receiving the output tokens
     */
    event FXExecuted(
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        address indexed recipient
    );

    /**
     * @notice Emitted when an exchange rate is updated
     * @param tokenIn Input token address
     * @param tokenOut Output token address
     * @param rate New exchange rate (scaled to 1e18)
     */
    event RateUpdated(address indexed tokenIn, address indexed tokenOut, uint256 rate);

    // ============ STATE VARIABLES ============

    /// @notice Owner of the contract (can set rates)
    address public owner;

    /// @notice Exchange rates: rate[tokenIn][tokenOut] = multiplier (scaled to 1e18)
    /// @dev Example: USDC → EURC = 0.94e18 means 1 USDC = 0.94 EURC
    mapping(address => mapping(address => uint256)) public rate;

    // ============ MODIFIERS ============

    modifier onlyOwner() {
        require(msg.sender == owner, "FXRouter: caller is not the owner");
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor() {
        owner = msg.sender;
    }

    // ============ ADMIN FUNCTIONS ============

    /**
     * @notice Set exchange rate for a token pair
     * @param tokenIn Input token address
     * @param tokenOut Output token address
     * @param rate_ Exchange rate scaled to 1e18
     * @dev Only callable by owner
     */
    function setRate(address tokenIn, address tokenOut, uint256 rate_) external onlyOwner {
        if (rate_ == 0) revert InvalidRate();
        if (tokenIn == address(0) || tokenOut == address(0)) revert InvalidTokenPair();
        if (tokenIn == tokenOut) revert InvalidTokenPair();

        rate[tokenIn][tokenOut] = rate_;
        emit RateUpdated(tokenIn, tokenOut, rate_);
    }

    /**
     * @notice Transfer ownership to a new address
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "FXRouter: new owner is the zero address");
        owner = newOwner;
    }

    // ============ SWAP FUNCTIONS ============

    /**
     * @notice Swap tokens using the configured exchange rate
     * @param tokenIn Input token address
     * @param tokenOut Output token address
     * @param amountIn Amount of input tokens
     * @param recipient Address to receive output tokens
     * @return amountOut Amount of output tokens sent
     * @dev Caller must have approved this contract to spend tokenIn
     */
    function swap(address tokenIn, address tokenOut, uint256 amountIn, address recipient)
        external
        returns (uint256 amountOut)
    {
        if (amountIn == 0) revert ZeroAmount();
        if (tokenIn == address(0) || tokenOut == address(0)) revert InvalidTokenPair();
        if (tokenIn == tokenOut) revert InvalidTokenPair();

        uint256 exchangeRate = rate[tokenIn][tokenOut];
        if (exchangeRate == 0) revert InvalidRate();

        // Calculate output amount: amountOut = amountIn * rate / 1e18
        amountOut = (amountIn * exchangeRate) / 1e18;
        if (amountOut == 0) revert ZeroAmount();

        // Transfer tokenIn from caller to this contract
        bool success = IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        if (!success) revert TransferFailed();

        // Check balance and transfer tokenOut to recipient
        uint256 balance = IERC20(tokenOut).balanceOf(address(this));
        if (balance < amountOut) revert InsufficientBalance();

        success = IERC20(tokenOut).transfer(recipient, amountOut);
        if (!success) revert TransferFailed();

        emit FXExecuted(tokenIn, tokenOut, amountIn, amountOut, recipient);

        return amountOut;
    }

    /**
     * @notice Get the exchange rate for a token pair
     * @param tokenIn Input token address
     * @param tokenOut Output token address
     * @return Exchange rate scaled to 1e18
     */
    function getRate(address tokenIn, address tokenOut) external view returns (uint256) {
        return rate[tokenIn][tokenOut];
    }
}

