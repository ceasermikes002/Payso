// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {FXRouter} from "../src/FXRouter.sol";
import {MockStablecoin} from "../src/MockStablecoin.sol";

contract FXRouterTest is Test {
    FXRouter public fxRouter;
    MockStablecoin public usdc;
    MockStablecoin public eurc;

    address public owner;
    address public user;

    uint256 constant INITIAL_BALANCE = 1000000e6; // 1M tokens

    function setUp() public {
        owner = address(this);
        user = makeAddr("user");

        // Deploy contracts
        fxRouter = new FXRouter();
        usdc = new MockStablecoin("USD Coin", "USDC", 6);
        eurc = new MockStablecoin("Euro Coin", "EURC", 6);

        // Mint tokens to router for liquidity
        usdc.mint(address(fxRouter), INITIAL_BALANCE);
        eurc.mint(address(fxRouter), INITIAL_BALANCE);

        // Mint tokens to user
        usdc.mint(user, INITIAL_BALANCE);
        eurc.mint(user, INITIAL_BALANCE);

        // Set exchange rates (1 USDC = 0.94 EURC, 1 EURC = 1.06 USDC)
        fxRouter.setRate(address(usdc), address(eurc), 0.94e18);
        fxRouter.setRate(address(eurc), address(usdc), 1.06e18);
    }

    function test_SetRate() public {
        uint256 rate = fxRouter.getRate(address(usdc), address(eurc));
        assertEq(rate, 0.94e18);
    }

    function test_SetRate_RevertsIfNotOwner() public {
        vm.prank(user);
        vm.expectRevert("FXRouter: caller is not the owner");
        fxRouter.setRate(address(usdc), address(eurc), 1e18);
    }

    function test_SetRate_RevertsIfZeroRate() public {
        vm.expectRevert(FXRouter.InvalidRate.selector);
        fxRouter.setRate(address(usdc), address(eurc), 0);
    }

    function test_SetRate_RevertsIfSameToken() public {
        vm.expectRevert(FXRouter.InvalidTokenPair.selector);
        fxRouter.setRate(address(usdc), address(usdc), 1e18);
    }

    function test_Swap_USDCToEURC() public {
        uint256 amountIn = 1000e6; // 1000 USDC
        uint256 expectedOut = (amountIn * 0.94e18) / 1e18; // 940 EURC

        vm.startPrank(user);
        usdc.approve(address(fxRouter), amountIn);
        
        uint256 amountOut = fxRouter.swap(address(usdc), address(eurc), amountIn, user);
        vm.stopPrank();

        assertEq(amountOut, expectedOut);
        assertEq(eurc.balanceOf(user), INITIAL_BALANCE + expectedOut);
    }

    function test_Swap_EURCToUSDC() public {
        uint256 amountIn = 1000e6; // 1000 EURC
        uint256 expectedOut = (amountIn * 1.06e18) / 1e18; // 1060 USDC

        vm.startPrank(user);
        eurc.approve(address(fxRouter), amountIn);
        
        uint256 amountOut = fxRouter.swap(address(eurc), address(usdc), amountIn, user);
        vm.stopPrank();

        assertEq(amountOut, expectedOut);
        assertEq(usdc.balanceOf(user), INITIAL_BALANCE + expectedOut);
    }

    function test_Swap_RevertsIfZeroAmount() public {
        vm.prank(user);
        vm.expectRevert(FXRouter.ZeroAmount.selector);
        fxRouter.swap(address(usdc), address(eurc), 0, user);
    }

    function test_Swap_RevertsIfNoRate() public {
        MockStablecoin newToken = new MockStablecoin("New Token", "NEW", 6);
        
        vm.prank(user);
        vm.expectRevert(FXRouter.InvalidRate.selector);
        fxRouter.swap(address(usdc), address(newToken), 1000e6, user);
    }

    function test_Swap_RevertsIfInsufficientBalance() public {
        // Drain router's EURC balance
        uint256 routerBalance = eurc.balanceOf(address(fxRouter));
        vm.prank(address(fxRouter));
        eurc.transfer(owner, routerBalance);

        vm.startPrank(user);
        usdc.approve(address(fxRouter), 1000e6);
        
        vm.expectRevert(FXRouter.InsufficientBalance.selector);
        fxRouter.swap(address(usdc), address(eurc), 1000e6, user);
        vm.stopPrank();
    }

    function test_TransferOwnership() public {
        address newOwner = makeAddr("newOwner");
        fxRouter.transferOwnership(newOwner);
        assertEq(fxRouter.owner(), newOwner);
    }

    function test_TransferOwnership_RevertsIfNotOwner() public {
        vm.prank(user);
        vm.expectRevert("FXRouter: caller is not the owner");
        fxRouter.transferOwnership(user);
    }

    function testFuzz_Swap(uint256 amountIn) public {
        amountIn = bound(amountIn, 1e6, INITIAL_BALANCE / 2);
        
        vm.startPrank(user);
        usdc.approve(address(fxRouter), amountIn);
        
        uint256 amountOut = fxRouter.swap(address(usdc), address(eurc), amountIn, user);
        vm.stopPrank();

        uint256 expectedOut = (amountIn * 0.94e18) / 1e18;
        assertEq(amountOut, expectedOut);
    }
}

