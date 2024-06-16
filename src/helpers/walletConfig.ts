import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { _chains } from '@rainbow-me/rainbowkit/dist/config/getDefaultConfig'
import { http } from 'wagmi'
import { base, baseSepolia, mainnet } from 'wagmi/chains'

export const chains = [base, baseSepolia] as _chains

export default getDefaultConfig({
  appName: 'negeD roulette',
  projectId: 'YOUR_PROJECT_ID',
  chains,
  transports: {
    // [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/...'),
    // [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
  },
})
