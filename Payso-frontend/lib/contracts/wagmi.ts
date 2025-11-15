import { http } from 'wagmi'
import { arcTestnet } from './config'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Ensure project ID is available
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Using demo project ID.')
}

export const config = getDefaultConfig({
  appName: 'Payso - Blockchain Payroll Escrow',
  projectId,
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'),
  },
  // Add ssr: true to prevent hydration issues
  ssr: true,
})