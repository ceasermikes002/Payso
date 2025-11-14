# ArcPay Escrow - Deployment Guide

## 🌐 Arc Testnet Network Details

```
Network Name: Arc Testnet
RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Currency Symbol: USDC (native token)
Block Explorer: https://testnet.arcscan.app
```

## 📋 Prerequisites

### 1. Get Testnet USDC (for gas fees)

Arc uses USDC as the native token for gas fees. Get free testnet USDC from:

**Circle Testnet Faucet**: https://faucet.circle.com

Steps:
1. Visit the faucet
2. Connect your wallet or enter your address
3. Request testnet USDC
4. Wait for confirmation

### 2. Setup Your Wallet

**Option A: Using MetaMask**
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter Arc Testnet details:
   - Network Name: `Arc Testnet`
   - RPC URL: `https://rpc.testnet.arc.network`
   - Chain ID: `5042002`
   - Currency Symbol: `USDC`
   - Block Explorer: `https://testnet.arcscan.app`

**Option B: Using Private Key (for deployment script)**
1. Export your private key from MetaMask (Settings → Security & Privacy → Reveal Private Key)
2. **⚠️ NEVER share or commit this key!**

### 3. Configure Environment

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your private key:
```bash
PRIVATE_KEY=your_private_key_without_0x_prefix
RPC_URL=https://rpc.testnet.arc.network
CHAIN_ID=5042002
EXPLORER_URL=https://testnet.arcscan.app
```

**⚠️ Security Warning**: Never commit `.env` to git! It's already in `.gitignore`.

## 🚀 Deployment Steps

### Step 1: Verify Setup

Check your account balance:
```bash
cast balance YOUR_ADDRESS --rpc-url https://rpc.testnet.arc.network
```

### Step 2: Run Deployment Script

Deploy all contracts:
```bash
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --broadcast --legacy
```

**Note**: Use `--legacy` flag if you encounter EIP-1559 issues.

### Step 3: Verify Deployment

The script will output:
- ✅ USDC Mock Token address
- ✅ EURC Mock Token address
- ✅ FXRouter address
- ✅ PayrollEscrow address

Check contracts on explorer:
```
https://testnet.arcscan.app/address/YOUR_CONTRACT_ADDRESS
```

## 📝 Post-Deployment

### Save Contract Addresses

Create a file to track your deployments:
```bash
echo "USDC=0x..." >> deployed-addresses.txt
echo "EURC=0x..." >> deployed-addresses.txt
echo "FXRouter=0x..." >> deployed-addresses.txt
echo "PayrollEscrow=0x..." >> deployed-addresses.txt
```

### Test the Deployment

Run a test transaction:
```bash
# 1. Approve USDC to PayrollEscrow
cast send USDC_ADDRESS "approve(address,uint256)" PAYROLL_ESCROW_ADDRESS 1000000000 --rpc-url $RPC_URL --private-key $PRIVATE_KEY

# 2. Schedule a payment (releaseAt = current timestamp + 1 hour)
cast send PAYROLL_ESCROW_ADDRESS "depositAndSchedule(address,uint256,uint256,bool,address,address)" \
  EMPLOYEE_ADDRESS \
  1000000 \
  $(($(date +%s) + 3600)) \
  false \
  USDC_ADDRESS \
  USDC_ADDRESS \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## 🔍 Troubleshooting

### Issue: "Insufficient funds for gas"
**Solution**: Get more testnet USDC from the faucet

### Issue: "Nonce too low"
**Solution**: Reset your account nonce or wait a few blocks

### Issue: "Transaction reverted"
**Solution**: Check the revert reason in the explorer

### Issue: "RPC connection failed"
**Solution**: Verify RPC URL is correct: `https://rpc.testnet.arc.network`

## 📊 Deployment Costs (Estimated)

- MockStablecoin (USDC): ~0.5 USDC
- MockStablecoin (EURC): ~0.5 USDC
- FXRouter: ~1.0 USDC
- PayrollEscrow: ~2.0 USDC
- Configuration: ~0.5 USDC

**Total**: ~4.5 USDC (testnet)

## 🎯 Next Steps After Deployment

1. ✅ Save all contract addresses
2. ✅ Verify contracts on block explorer
3. ✅ Test a complete payment flow
4. ✅ Update README with deployed addresses
5. ✅ Create demo video/screenshots for hackathon submission

## 📚 Useful Commands

```bash
# Check contract code
cast code CONTRACT_ADDRESS --rpc-url $RPC_URL

# Call view function
cast call CONTRACT_ADDRESS "employer()(address)" --rpc-url $RPC_URL

# Get transaction receipt
cast receipt TX_HASH --rpc-url $RPC_URL

# Get current block number
cast block-number --rpc-url $RPC_URL
```

## 🔗 Resources

- Arc Docs: https://docs.arc.network
- Arc Explorer: https://testnet.arcscan.app
- Circle Faucet: https://faucet.circle.com
- Foundry Book: https://book.getfoundry.sh

