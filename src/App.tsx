import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/Header'
import Roulette from 'components/Roulette'
import RoundStats from 'components/RoundStats'
import TotalBets from 'components/TotalBets'
import YourBets from 'components/YourBets'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import { WagmiProvider } from 'wagmi'

export default function () {
  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="container mx-auto max-w-prose p-1 prose">
            <Header />
            <Roulette />
            <TotalBets />
            <RoundStats />
            <YourBets />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
