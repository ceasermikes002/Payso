# ArcPay Frontend - Blockchain Integration

This frontend application connects to the ArcPay smart contracts deployed on Arc Testnet, enabling:

## 🚀 Features

### For Employers
- **Schedule Payments**: Create time-locked payments with USDC/EURC
- **Work Verification**: Optional signature-based work completion verification
- **Multi-Currency Support**: Pay in one currency, employee receives in preferred currency
- **Automatic FX Conversion**: Built-in USDC ↔ EURC conversion via FXRouter

### For Employees  
- **View Payments**: See all scheduled payments and their status
- **Claim Payments**: Claim eligible payments with automatic currency conversion
- **Payment Status**: Real-time status tracking (pending, claimable, claimed, work_required)

## 🔗 Contract Addresses (Arc Testnet)

- **PayrollEscrow**: `0xE0390bB3c6fF668fC48767d4f0D334897770CB51`
- **FXRouter**: `0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4`
- **USDC**: `0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e`
- **EURC**: `0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5`

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Web3**: Wagmi, Viem, RainbowKit
- **Styling**: Tailwind CSS, ShadCN/UI
- **Network**: Arc Testnet (Chain ID: 5042002)

## 📋 Usage

### For Employers
1. Connect your wallet (must be the contract employer)
2. Navigate to Dashboard
3. Fill out the payment form:
   - Recipient address
   - Payment amount
   - Release date/time
   - Payment currency (USDC/EURC)
   - Payout currency (USDC/EURC)
   - Work verification requirement (optional)
4. Approve token spending and schedule payment

### For Employees
1. Connect your wallet
2. Navigate to Dashboard
3. View your scheduled payments
4. Claim eligible payments (automatic FX conversion if needed)

## 🔐 Security Features

- **Non-custodial**: Employer cannot withdraw scheduled funds
- **Immutable payments**: Once scheduled, payments cannot be modified
- **Reentrancy protection**: Secure contract interactions
- **Signature verification**: Work completion verified via ECDSA signatures

## 💱 FX Rates

- **USDC → EURC**: 0.94 (1 USDC = 0.94 EURC)
- **EURC → USDC**: 1.06 (1 EURC = 1.06 USDC)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔗 RPC Configuration

The application connects to Arc Testnet via:
- **RPC URL**: `https://rpc.testnet.arc.network`
- **Explorer**: `https://testnet.arcscan.app`

## 📊 Contract Integration

The frontend integrates with smart contracts through:
- **PayrollEscrow**: Core payment scheduling and claiming
- **FXRouter**: Currency conversion between USDC and EURC
- **ERC20 Tokens**: USDC and EURC stablecoin interactions

## 🎯 Demo Flow

1. **Employer**: Schedule 2000 USDC payment for Dec 1st
2. **Employee**: Set EURC as preferred payout currency  
3. **Employee**: Claim payment on Dec 1st
4. **System**: Automatically converts USDC → EURC via FXRouter
5. **Employee**: Receives EURC instantly

This demonstrates the power of programmable money and automated FX conversion!