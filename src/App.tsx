import { QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/Header'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import Convert from 'pages/Convert'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import { Route, Switch } from 'wouter-preact'
import { PrivyProvider, SUPPORTED_CHAINS } from '@privy-io/react-auth'
import env from 'helpers/env'
import { WagmiProvider } from '@privy-io/wagmi'
import { ToastContainer } from 'react-toastify'
import { base } from 'viem/chains'

export default function () {
  return (
    <PrivyProvider
      config={{
        appearance: {
          logo: '/logo.jpeg',
          accentColor: '#B66DFF',
          landingHeader: "Let's a roll",
          theme: 'dark',
        },
        supportedChains: [base as any],
        defaultChain: base as any,
        loginMethods: ['farcaster', 'wallet'],
      }}
      appId={env.VITE_PRIVY_APP_ID}
      clientId={env.DEV ? env.VITE_DEV_CLIENT_ID : env.VITE_PROD_CLIENT_ID}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={walletConfig}>
          <Header />
          <div className="container mx-auto max-w-prose p-4 prose min-h-screen text-white">
            <Switch>
              <Route path="/convert" component={Convert} />
              <Route path="/" component={Main} />
              <Route component={NotFound} />
            </Switch>
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
