import { base } from 'viem/chains'
import { createConfig } from '@privy-io/wagmi'
import { http } from 'wagmi'

export default createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
