import { QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/Header'
import queryClient from 'helpers/queryClient'
import useSocket from 'helpers/useSocket'
import walletConfig from 'helpers/walletConfig'
import Convert from 'pages/Convert'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import { WagmiProvider } from 'wagmi'
import { Route, Switch } from 'wouter-preact'
import { PrivyProvider } from '@privy-io/react-auth'
import env from 'helpers/env'

export default function () {
  useSocket()

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          config={{
            appearance: {
              accentColor: '#B66DFF',
              landingHeader: "Let's a roll",
              theme: 'dark',
            },
          }}
          appId={env.VITE_PRIVY_APP_ID}
        >
          <Header />
          <div className="container mx-auto max-w-prose p-4 prose min-h-screen text-white">
            <Switch>
              <Route path="/convert" component={Convert} />
              <Route path="/" component={Main} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
