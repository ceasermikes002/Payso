// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {PayrollEscrow} from "../src/PayrollEscrow.sol";
import {FXRouter} from "../src/FXRouter.sol";
import {MockStablecoin} from "../src/MockStablecoin.sol";

contract PayrollEscrowTest is Test {
    PayrollEscrow public escrow;
    FXRouter public fxRouter;
    MockStablecoin public usdc;
    MockStablecoin public eurc;

    address public employer;
    address public employee;
    uint256 public employerPrivateKey;

    uint256 constant INITIAL_BALANCE = 1000000e6; // 1M tokens
    uint256 constant PAYMENT_AMOUNT = 2000e6; // 2000 tokens

    function setUp() public {
        // Setup accounts
        employerPrivateKey = 0xA11CE;
        employer = vm.addr(employerPrivateKey);
        employee = makeAddr("employee");

        // Deploy tokens
        usdc = new MockStablecoin("USD Coin", "USDC", 6);
        eurc = new MockStablecoin("Euro Coin", "EURC", 6);

        // Deploy FXRouter
        fxRouter = new FXRouter();
        
        // Deploy PayrollEscrow as employer
        vm.prank(employer);
        escrow = new PayrollEscrow(address(usdc), address(eurc), address(fxRouter));

        // Setup FX rates
        fxRouter.setRate(address(usdc), address(eurc), 0.94e18);
        fxRouter.setRate(address(eurc), address(usdc), 1.06e18);

        // Mint tokens
        usdc.mint(employer, INITIAL_BALANCE);
        eurc.mint(employer, INITIAL_BALANCE);
        usdc.mint(address(fxRouter), INITIAL_BALANCE);
        eurc.mint(address(fxRouter), INITIAL_BALANCE);

        // Transfer FXRouter ownership to employer
        fxRouter.transferOwnership(employer);
    }

    function test_Constructor() public view {
        assertEq(escrow.employer(), employer);
        assertEq(escrow.USDC(), address(usdc));
        assertEq(escrow.EURC(), address(eurc));
        assertEq(escrow.fxRouter(), address(fxRouter));
    }

    function test_DepositAndSchedule() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        assertEq(paymentId, 0);
        
        PayrollEscrow.Payment memory payment = escrow.getPayment(paymentId);
        assertEq(payment.recipient, employee);
        assertEq(payment.amount, PAYMENT_AMOUNT);
        assertEq(payment.releaseAt, releaseAt);
        assertEq(payment.claimed, false);
        assertEq(payment.requiresWorkEvent, false);
        assertEq(payment.stablecoin, address(usdc));
        assertEq(payment.preferredPayout, address(usdc));
    }

    function test_DepositAndSchedule_RevertsIfNotEmployer() public {
        vm.prank(employee);
        vm.expectRevert(PayrollEscrow.OnlyEmployer.selector);
        escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            block.timestamp + 30 days,
            false,
            address(usdc),
            address(usdc)
        );
    }

    function test_DepositAndSchedule_RevertsIfInvalidAmount() public {
        vm.prank(employer);
        vm.expectRevert(PayrollEscrow.InvalidAmount.selector);
        escrow.depositAndSchedule(
            employee,
            0,
            block.timestamp + 30 days,
            false,
            address(usdc),
            address(usdc)
        );
    }

    function test_DepositAndSchedule_RevertsIfPastReleaseTime() public {
        vm.prank(employer);
        vm.expectRevert(PayrollEscrow.InvalidReleaseTime.selector);
        escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            block.timestamp - 1,
            false,
            address(usdc),
            address(usdc)
        );
    }

    function test_ClaimPayment_DirectTransfer() public {
        uint256 releaseAt = block.timestamp + 30 days;

        // Schedule payment
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Fast forward time
        vm.warp(releaseAt);

        // Claim payment
        vm.prank(employee);
        escrow.claimPayment(paymentId);

        // Verify
        assertEq(usdc.balanceOf(employee), PAYMENT_AMOUNT);
        PayrollEscrow.Payment memory payment = escrow.getPayment(paymentId);
        assertTrue(payment.claimed);
    }

    function test_ClaimPayment_WithFXConversion() public {
        uint256 releaseAt = block.timestamp + 30 days;

        // Schedule payment in USDC, employee wants EURC
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(eurc)
        );
        vm.stopPrank();

        // Fast forward time
        vm.warp(releaseAt);

        // Claim payment
        vm.prank(employee);
        escrow.claimPayment(paymentId);

        // Verify - should receive EURC (converted at 0.94 rate)
        uint256 expectedEURC = (PAYMENT_AMOUNT * 0.94e18) / 1e18;
        assertEq(eurc.balanceOf(employee), expectedEURC);

        PayrollEscrow.Payment memory payment = escrow.getPayment(paymentId);
        assertTrue(payment.claimed);
    }

    function test_ClaimPayment_RevertsIfNotRecipient() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        vm.warp(releaseAt);

        address stranger = makeAddr("stranger");
        vm.prank(stranger);
        vm.expectRevert(PayrollEscrow.OnlyEmployer.selector);
        escrow.claimPayment(paymentId);
    }

    function test_ClaimPayment_RevertsIfNotYetClaimable() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Don't fast forward time
        vm.prank(employee);
        vm.expectRevert(PayrollEscrow.PaymentNotYetClaimable.selector);
        escrow.claimPayment(paymentId);
    }

    function test_ClaimPayment_RevertsIfAlreadyClaimed() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        vm.warp(releaseAt);

        // Claim once
        vm.prank(employee);
        escrow.claimPayment(paymentId);

        // Try to claim again
        vm.prank(employee);
        vm.expectRevert(PayrollEscrow.PaymentAlreadyClaimed.selector);
        escrow.claimPayment(paymentId);
    }

    function test_VerifyWork() public {
        uint256 releaseAt = block.timestamp + 30 days;

        // Schedule payment with work verification required
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            true, // requires work verification
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Create signature
        bytes32 messageHash = keccak256(abi.encodePacked(employee, paymentId, employer));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(employerPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Verify work
        escrow.verifyWork(paymentId, signature);

        // Check verification status
        assertTrue(escrow.workVerified(paymentId));
    }

    function test_ClaimPayment_WithWorkVerification() public {
        uint256 releaseAt = block.timestamp + 30 days;

        // Schedule payment with work verification
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            true,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Create and submit signature
        bytes32 messageHash = keccak256(abi.encodePacked(employee, paymentId, employer));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(employerPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        escrow.verifyWork(paymentId, signature);

        // Fast forward and claim
        vm.warp(releaseAt);
        vm.prank(employee);
        escrow.claimPayment(paymentId);

        assertEq(usdc.balanceOf(employee), PAYMENT_AMOUNT);
    }

    function test_ClaimPayment_RevertsIfWorkNotVerified() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            true, // requires work verification
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        vm.warp(releaseAt);

        // Try to claim without verification
        vm.prank(employee);
        vm.expectRevert(PayrollEscrow.WorkNotVerified.selector);
        escrow.claimPayment(paymentId);
    }

    function test_VerifyWork_RevertsIfInvalidSignature() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            true,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Create signature with wrong private key
        uint256 wrongPrivateKey = 0xBAD;
        bytes32 messageHash = keccak256(abi.encodePacked(employee, paymentId, employer));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(wrongPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.expectRevert(PayrollEscrow.InvalidSignature.selector);
        escrow.verifyWork(paymentId, signature);
    }

    function test_IsClaimable() public {
        uint256 releaseAt = block.timestamp + 30 days;

        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT);
        uint256 paymentId = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt,
            false,
            address(usdc),
            address(usdc)
        );
        vm.stopPrank();

        // Not claimable yet
        assertFalse(escrow.isClaimable(paymentId));

        // Fast forward
        vm.warp(releaseAt);
        assertTrue(escrow.isClaimable(paymentId));

        // Claim
        vm.prank(employee);
        escrow.claimPayment(paymentId);

        // Not claimable after claimed
        assertFalse(escrow.isClaimable(paymentId));
    }

    function test_GetPaymentsByRecipient() public {
        uint256 releaseAt = block.timestamp + 30 days;

        // Create multiple payments
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT * 3);

        escrow.depositAndSchedule(employee, PAYMENT_AMOUNT, releaseAt, false, address(usdc), address(usdc));
        escrow.depositAndSchedule(employee, PAYMENT_AMOUNT, releaseAt, false, address(usdc), address(usdc));

        address otherEmployee = makeAddr("otherEmployee");
        escrow.depositAndSchedule(otherEmployee, PAYMENT_AMOUNT, releaseAt, false, address(usdc), address(usdc));
        vm.stopPrank();

        uint256[] memory payments = escrow.getPaymentsByRecipient(employee);
        assertEq(payments.length, 2);
        assertEq(payments[0], 0);
        assertEq(payments[1], 1);

        uint256[] memory otherPayments = escrow.getPaymentsByRecipient(otherEmployee);
        assertEq(otherPayments.length, 1);
        assertEq(otherPayments[0], 2);
    }

    function test_SetFXRouter() public {
        address newRouter = makeAddr("newRouter");

        vm.prank(employer);
        escrow.setFXRouter(newRouter);

        assertEq(escrow.fxRouter(), newRouter);
    }

    function test_SetFXRouter_RevertsIfNotEmployer() public {
        vm.prank(employee);
        vm.expectRevert(PayrollEscrow.OnlyEmployer.selector);
        escrow.setFXRouter(makeAddr("newRouter"));
    }

    function test_SetStablecoinAddresses() public {
        address newUSDC = makeAddr("newUSDC");
        address newEURC = makeAddr("newEURC");

        vm.prank(employer);
        escrow.setStablecoinAddresses(newUSDC, newEURC);

        assertEq(escrow.USDC(), newUSDC);
        assertEq(escrow.EURC(), newEURC);
    }

    function test_TransferEmployer() public {
        address newEmployer = makeAddr("newEmployer");

        vm.prank(employer);
        escrow.transferEmployer(newEmployer);

        assertEq(escrow.employer(), newEmployer);
    }

    function test_MultiplePayments_Integration() public {
        uint256 releaseAt1 = block.timestamp + 30 days;
        uint256 releaseAt2 = block.timestamp + 60 days;

        // Create two payments
        vm.startPrank(employer);
        usdc.approve(address(escrow), PAYMENT_AMOUNT * 2);

        uint256 paymentId1 = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt1,
            false,
            address(usdc),
            address(usdc)
        );

        uint256 paymentId2 = escrow.depositAndSchedule(
            employee,
            PAYMENT_AMOUNT,
            releaseAt2,
            false,
            address(usdc),
            address(eurc)
        );
        vm.stopPrank();

        // Claim first payment
        vm.warp(releaseAt1);
        vm.prank(employee);
        escrow.claimPayment(paymentId1);
        assertEq(usdc.balanceOf(employee), PAYMENT_AMOUNT);

        // Claim second payment
        vm.warp(releaseAt2);
        vm.prank(employee);
        escrow.claimPayment(paymentId2);

        uint256 expectedEURC = (PAYMENT_AMOUNT * 0.94e18) / 1e18;
        assertEq(eurc.balanceOf(employee), expectedEURC);
    }
}

