import { defineChain } from 'viem'

export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ARC',
    symbol: 'ARC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.arc.network'],
      webSocket: ['wss://rpc.testnet.arc.network/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arc Testnet Explorer',
      url: 'https://testnet.arcscan.app',
      apiUrl: 'https://testnet.arcscan.app/api',
    },
  },
  testnet: true,
})

export const CONTRACT_ADDRESSES = {
  USDC: '0x0577bd762831AdBD91218A72d916b616e016b7Bc',
  EURC: '0x335898cE488C715677480D3DE450BaB2084354ea',
  FXRouter: '0x93ead8DDf28Bda6cdDCc1f743cCAA8Efcb13678E',
  PayrollEscrow: '0xC3ee5063e9224ff9b41745Fb56a3B906B10a6439',
} as const

export const FX_RATES = {
  USDC_TO_EURC: 0.94,
  EURC_TO_USDC: 1.06,
} as const

export const TOKEN_DECIMALS = 6

export const STABLECOIN_ADDRESSES = {
  USDC: CONTRACT_ADDRESSES.USDC,
  EURC: CONTRACT_ADDRESSES.EURC,
} as const

export const STABLECOIN_SYMBOLS = {
  [CONTRACT_ADDRESSES.USDC]: 'USDC',
  [CONTRACT_ADDRESSES.EURC]: 'EURC',
} as const