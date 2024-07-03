import { PrivyProvider } from '@privy-io/react-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { Route, Switch } from 'wouter-preact'
import { ToastContainer } from 'react-toastify'
import { WagmiProvider } from '@privy-io/wagmi'
import { base } from 'viem/chains'
import Convert from 'pages/Convert'
import Header from 'components/Header'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'

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
        supportedChains: [base as never],
        defaultChain: base as never,
        loginMethods: ['wallet'],
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
