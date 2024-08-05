import { PrivyProvider } from '@privy-io/react-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { Route, Router, Switch } from 'wouter-preact'
import { ToastContainer } from 'react-toastify'
import { WagmiProvider } from '@privy-io/wagmi'
import { base } from 'viem/chains'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import FloatingChatButton from 'components/FloatingChatButton'
import FloatingGmButton from 'components/FloatingGmButton'
import Header from 'components/Header'
import Lazy from 'components/Lazy'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'

const HatGame = () => <Lazy path="../pages/HatGame" />
const TowerGame = () => <Lazy path="../pages/TowerGame" />
const Admin = () => <Lazy path="../pages/Admin" />

export default function () {
  return (
    <PrivyProvider
      config={{
        appearance: {
          logo: '/logo.webp',
          accentColor: '#B66DFF',
          landingHeader: "Let's a roll 🎲",
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
                <Route path="/" component={Main} />
                <Route path="/hatGame" component={HatGame} />
                <Route path="/towerGame" component={TowerGame} />
                <Route path="/admin" component={Admin} />
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
          />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
