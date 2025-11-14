// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PayrollEscrow} from "../src/PayrollEscrow.sol";
import {FXRouter} from "../src/FXRouter.sol";
import {MockStablecoin} from "../src/MockStablecoin.sol";

/**
 * @title Deploy
 * @notice Deployment script for ArcPay Escrow system
 * @dev Deploys MockStablecoins, FXRouter, and PayrollEscrow contracts
 * 
 * Usage:
 * forge script script/Deploy.s.sol:Deploy --rpc-url <RPC_URL> --broadcast --verify
 * 
 * For local testing:
 * forge script script/Deploy.s.sol:Deploy --fork-url http://localhost:8545 --broadcast
 */
contract Deploy is Script {
    // Deployment addresses (will be set during deployment)
    MockStablecoin public usdc;
    MockStablecoin public eurc;
    FXRouter public fxRouter;
    PayrollEscrow public payrollEscrow;

    // Configuration
    uint256 constant USDC_TO_EURC_RATE = 0.94e18; // 1 USDC = 0.94 EURC
    uint256 constant EURC_TO_USDC_RATE = 1.06e18; // 1 EURC = 1.06 USDC
    
    // Initial liquidity for FXRouter (10M tokens each)
    uint256 constant INITIAL_LIQUIDITY = 10_000_000e6;

    function run() external {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy Mock Stablecoins
        console.log("\n=== Deploying Mock Stablecoins ===");
        usdc = new MockStablecoin("USD Coin", "USDC", 6);
        console.log("USDC deployed at:", address(usdc));

        eurc = new MockStablecoin("Euro Coin", "EURC", 6);
        console.log("EURC deployed at:", address(eurc));

        // 2. Deploy FXRouter
        console.log("\n=== Deploying FXRouter ===");
        fxRouter = new FXRouter();
        console.log("FXRouter deployed at:", address(fxRouter));

        // 3. Configure FX rates
        console.log("\n=== Configuring FX Rates ===");
        fxRouter.setRate(address(usdc), address(eurc), USDC_TO_EURC_RATE);
        console.log("Set USDC -> EURC rate:", USDC_TO_EURC_RATE);

        fxRouter.setRate(address(eurc), address(usdc), EURC_TO_USDC_RATE);
        console.log("Set EURC -> USDC rate:", EURC_TO_USDC_RATE);

        // 4. Mint initial liquidity to FXRouter
        console.log("\n=== Minting Initial Liquidity ===");
        usdc.mint(address(fxRouter), INITIAL_LIQUIDITY);
        console.log("Minted USDC to FXRouter:", INITIAL_LIQUIDITY);

        eurc.mint(address(fxRouter), INITIAL_LIQUIDITY);
        console.log("Minted EURC to FXRouter:", INITIAL_LIQUIDITY);

        // 5. Deploy PayrollEscrow
        console.log("\n=== Deploying PayrollEscrow ===");
        payrollEscrow = new PayrollEscrow(
            address(usdc),
            address(eurc),
            address(fxRouter)
        );
        console.log("PayrollEscrow deployed at:", address(payrollEscrow));
        console.log("Employer (owner):", payrollEscrow.employer());

        // 6. Mint some tokens to deployer for testing
        console.log("\n=== Minting Test Tokens to Deployer ===");
        uint256 testAmount = 100_000e6; // 100k tokens
        usdc.mint(deployer, testAmount);
        eurc.mint(deployer, testAmount);
        console.log("Minted test tokens to deployer:", testAmount);

        vm.stopBroadcast();

        // Print deployment summary
        printDeploymentSummary();
    }

    function printDeploymentSummary() internal view {
        console.log("\n");
        console.log("========================================");
        console.log("       DEPLOYMENT SUMMARY");
        console.log("========================================");
        console.log("USDC Address:           ", address(usdc));
        console.log("EURC Address:           ", address(eurc));
        console.log("FXRouter Address:       ", address(fxRouter));
        console.log("PayrollEscrow Address:  ", address(payrollEscrow));
        console.log("========================================");
        console.log("\nFX Rates:");
        console.log("USDC -> EURC:", USDC_TO_EURC_RATE);
        console.log("EURC -> USDC:", EURC_TO_USDC_RATE);
        console.log("========================================");
        console.log("\nFXRouter Liquidity:");
        console.log("USDC Balance:", usdc.balanceOf(address(fxRouter)));
        console.log("EURC Balance:", eurc.balanceOf(address(fxRouter)));
        console.log("========================================");
        console.log("\nNext Steps:");
        console.log("1. Approve USDC/EURC to PayrollEscrow");
        console.log("2. Call depositAndSchedule() to create payments");
        console.log("3. Employees can claim payments after releaseAt time");
        console.log("========================================\n");
    }
}

