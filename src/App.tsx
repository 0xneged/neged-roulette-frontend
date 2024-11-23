import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import FloatingChatButton from 'components/FloatingChatButton'
import FloatingGmButton from 'components/FloatingGmButton'
import Header from 'components/Header'
import Lazy from 'components/Lazy'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import NotFound from 'pages/NotFound'
import { lazy } from 'preact/compat'
import { ToastContainer } from 'react-toastify'
import { base } from 'viem/chains'
import { Route, Router, Switch } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'

const CoinFlipGame = lazy(() => import('./pages/CoinFlipGame'))

export default function () {
  return (
    <PrivyProvider
      config={{
        appearance: {
          logo: 'logo.webp',
          accentColor: '#B66DFF',
          landingHeader: "Let's a roll 🪙",
          theme: 'dark',
        },
        supportedChains: [base as never],
        defaultChain: base as never,
        loginMethods: ['wallet'],
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'all',
          },
        },
      }}
      appId={env.VITE_PRIVY_APP_ID}
      clientId={env.DEV ? env.VITE_DEV_CLIENT_ID : env.VITE_PROD_CLIENT_ID}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={walletConfig}>
          <Header />
          <div className="container mx-auto max-w-prose p-4 min-h-[88dvh] text-white">
            <Router hook={useHashLocation}>
              <Switch>
                <Route
                  path="/:roomId?"
                  component={(params) => (
                    <Lazy>
                      <CoinFlipGame {...params} />
                    </Lazy>
                  )}
                />
                <Route
                  path="/coin-flip/:roomId?"
                  component={(params) => (
                    <Lazy>
                      <CoinFlipGame {...params} />
                    </Lazy>
                  )}
                />
                <Route component={NotFound} />
              </Switch>
            </Router>
            <FloatingGmButton />
            <FloatingChatButton />
          </div>
          <ToastContainer
            draggable
            position="bottom-right"
            pauseOnHover
            stacked
            theme="dark"
            closeOnClick
            limit={3}
          />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
