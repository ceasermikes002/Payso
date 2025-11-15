import { createConfig, http } from 'wagmi'
import { arcTestnet } from './config'

export const config = createConfig({
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(),
  },
})