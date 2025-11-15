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
  USDC: '0xC7B1F6c93931c710aAf8fa54a6F3d3D477cd396e',
  EURC: '0xd2A490ac2e2eDAEb41a0DB39De526342B1a93Ac5',
  FXRouter: '0xEDC33756ecb474CFb717E9c709Cfb5121984e3A4',
  PayrollEscrow: '0xE0390bB3c6fF668fC48767d4f0D334897770CB51',
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