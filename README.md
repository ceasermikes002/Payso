# Payso - Blockchain Payroll Escrow Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jabed-hossains-projects-536e8e8a/payso)

## 🏦 Overview

Payso is a revolutionary blockchain-powered payroll escrow service that automates employee payments, eliminates disputes, and ensures on-time salary distribution using smart contracts on the Arc Testnet. Built with Next.js, TypeScript, and Web3 technologies, Payso provides a secure, transparent, and efficient solution for modern payroll management.

## 🚀 Key Features

### 💼 Smart Contract Escrow
- **Automated Payments**: Schedule and automate salary payments using time-locked smart contracts
- **Multi-Currency Support**: Support for USDC and EURC stablecoins for flexible payroll options
- **Work Verification**: Optional work verification system to ensure deliverables before payment release
- **Dispute Prevention**: Immutable smart contracts eliminate payment disputes

### 🔑 Multi-Employer Authorization System (NEW!)
- **Revolutionary Testing Feature**: Main employers can authorize multiple addresses for testing and operational purposes
- **Judge & Auditor Support**: Perfect for hackathons, audits, and team collaboration
- **Secure Authorization**: Blockchain-based authorization with granular permissions
- **Easy Management**: Simple add/remove interface in settings page
- **Full Testing Capability**: Authorized employers can schedule payments and verify work independently

### 👥 Dual Dashboard System
- **Employer Dashboard**: Schedule payments, manage employees, and track payment history
- **Employee Dashboard**: View scheduled payments, claim available funds, and track payment status
- **Real-time Updates**: Live payment status tracking and notifications

### 🔐 Security & Transparency
- **Blockchain Integration**: All transactions recorded on Arc Testnet for transparency
- **Wallet Authentication**: Secure Web3 wallet connection via RainbowKit
- **Smart Contract Auditing**: Open-source contracts for community verification

### 💰 Financial Features
- **Time-locked Payments**: Schedule payments for specific dates and times
- **Flexible Payout Options**: Choose between different stablecoin currencies
- **Payment History**: Complete transaction history with blockchain verification
- **Balance Tracking**: Real-time wallet balance monitoring

## 🏗️ Project Structure

```
Payso/
├── Payso-frontend/          # Next.js frontend application
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # React components (UI, dashboard, etc.)
│   ├── lib/                  # Utilities, hooks, and configurations
│   └── public/               # Static assets and images
├── payso-contract/           # Smart contract development
│   ├── src/                  # Solidity smart contracts
│   ├── lib/                  # External dependencies (OpenZeppelin, etc.)
│   └── scripts/              # Deployment and utility scripts
└── lib/                      # Foundry development dependencies
```

## 🛠 Technology Stack

### Frontend (Payso-frontend/)
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions
- **RainbowKit**: Web3 wallet connection interface

### Blockchain & Smart Contracts (payso-contract/)
- **Arc Testnet**: High-performance blockchain network
- **Solidity**: Smart contract development
- **Foundry**: Ethereum development framework
- **OpenZeppelin**: Secure contract libraries
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum client

### Infrastructure
- **Vercel**: Deployment and hosting platform
- **Vercel Analytics**: Performance monitoring

## 🎯 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm package manager
- Web3 wallet (MetaMask, WalletConnect, etc.)
- Arc Testnet network configuration
- Foundry (for smart contract development)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Payso-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_PAYROLL_ESCROW_ADDRESS=your_contract_address
   NEXT_PUBLIC_USDC_ADDRESS=your_usdc_address
   NEXT_PUBLIC_EURC_ADDRESS=your_eurc_address
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Smart Contract Setup

1. **Navigate to contract directory**
   ```bash
   cd payso-contract
   ```

2. **Install Foundry**
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

3. **Install dependencies**
   ```bash
   forge install
   ```

4. **Environment Setup**
   Create a `.env` file:
   ```env
   PRIVATE_KEY=your_private_key
   ARC_RPC_URL=https://arc-testnet.rpc.url
   ```

5. **Deploy Contracts**
   ```bash
   forge script script/Deploy.s.sol:Deploy --rpc-url $ARC_RPC_URL --private-key $PRIVATE_KEY --broadcast
   ```

## 📖 Usage Guide

### For Employers

1. **Connect Wallet**: Connect your Web3 wallet to the platform
2. **Switch to Employer Mode**: Navigate to the employer dashboard
3. **Authorize Testing Addresses** (Optional): 
   - Go to Settings → Employer Authorization
   - Add judge/auditor addresses for testing
   - Verify authorization status
4. **Schedule Payment**: 
   - Enter employee wallet address
   - Set payment amount and currency
   - Choose release date and time
   - Optionally enable work verification
5. **Approve Tokens**: Approve the smart contract to spend your tokens
6. **Confirm Payment**: Review and confirm the payment schedule

### For Employees

1. **Connect Wallet**: Connect your Web3 wallet to the platform
2. **View Payments**: See all scheduled payments in your dashboard
3. **Track Status**: Monitor payment status (Pending, Claimable, Claimed)
4. **Claim Payments**: Withdraw funds when payments become claimable
5. **Complete Work**: If work verification is required, complete assigned tasks

## 🔗 Smart Contract Architecture

### PayrollEscrow Contract
The core smart contract handles:
- **Payment Scheduling**: Time-locked payment creation
- **Work Verification**: Optional verification requirements with cryptographic signatures
- **Payment Claims**: Employee fund withdrawal with automatic currency conversion
- **Multi-Employer Authorization**: Revolutionary system allowing main employers to authorize multiple addresses for testing and operations
- **Emergency Controls**: Admin functions for contract management

### Supported Tokens
- **USDC**: USD Coin stablecoin
- **EURC**: Euro Coin stablecoin

## 🛡 Security Considerations

- **Private Key Management**: Never expose private keys in frontend code
- **Contract Auditing**: Review smart contract code before mainnet deployment
- **Network Security**: Use only trusted RPC endpoints
- **Token Approvals**: Be cautious with unlimited token approvals

## 🤝 Contributing

We welcome contributions to Payso! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact our development team
- Join our community discussions

## 🗺 Roadmap

### ✅ Completed Features
- **Multi-Employer Authorization System**: Revolutionary testing feature allowing multiple judges/auditors to test the system independently
- **Smart Contract Escrow**: Automated payment scheduling with work verification
- **Multi-Currency Support**: USDC and EURC stablecoin integration
- **Dual Dashboard System**: Separate interfaces for employers and employees

### 🚀 Upcoming Features
- **Multi-chain Support**: Expand to additional blockchain networks
- **Mobile App**: Native mobile applications
- **Advanced Analytics**: Enhanced reporting and analytics features
- **Integration APIs**: Third-party payroll system integrations
- **Governance**: Decentralized governance for protocol upgrades

---

**Built with ❤️ for the future of payroll management**

## 📊 Project Status

- ✅ Frontend: Complete with dashboard, wallet integration, and payment scheduling
- ✅ Smart Contracts: Deployed and functional on Arc Testnet
- ✅ UI/UX: Modern, responsive design with dark theme
- ✅ Security: Web3 authentication and secure payment processing
- 🔄 Active Development: Continuous improvements and feature additions