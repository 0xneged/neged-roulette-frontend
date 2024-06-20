import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/Header'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import Convert from 'pages/Convert'
import Main from 'pages/Main'
import { WagmiProvider } from 'wagmi'
import { Link, Route, Switch } from 'wouter-preact'

export default function () {
  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Header />
          <div className="container mx-auto max-w-prose p-4 prose min-h-screen text-white">
            <Switch>
              <Route path="/convert" component={Convert} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
