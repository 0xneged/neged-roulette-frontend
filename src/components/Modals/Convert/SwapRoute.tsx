import { useCallback, useEffect, useState } from 'react'
import { Environment, CurrentConfig } from 'helpers/swap/config'
import { getCurrencyBalance, wrapETH } from 'helpers/swap/wallet'
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from 'helpers/swap/providers'
import { executeRoute, generateRoute } from 'helpers/swap/routing'
import { SwapRoute } from '@uniswap/smart-order-router'
import useOnBlockUpdated from 'helpers/hooks/useOnBlockUpdated'

export default function () {
  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)
  const [route, setRoute] = useState<SwapRoute | null>(null)

  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])
  const blockNumber = useOnBlockUpdated(refreshBalances)

  // Event Handlers
  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateRoute = useCallback(async () => {
    setRoute(await generateRoute())
  }, [])

  const executeSwap = useCallback(async (route: SwapRoute | null) => {
    if (!route) {
      return
    }
    setTxState(TransactionState.Sending)
    setTxState(await executeRoute(route))
  }, [])

  return (
    <div className="text-white">
      <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>
      {CurrentConfig.env === Environment.WALLET_EXTENSION &&
        !getWalletAddress() && (
          <button onClick={onConnectWallet}>Connect Wallet</button>
        )}
      <h3>{`Transaction State: ${txState}`}</h3>
      <h3>{`Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`}</h3>
      <h3>{`Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`}</h3>
      <button
        onClick={onCreateRoute}
        disabled={
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === ''
        }
      >
        <p>Create Route</p>
      </button>
      <h3>
        {route &&
          `Route: ${CurrentConfig.tokens.amountIn} ${
            CurrentConfig.tokens.in.symbol
          } to ${route.quote.toExact()} ${
            route.quote.currency.symbol
          } using $${route.estimatedGasUsedUSD.toExact()} worth of gas`}
      </h3>
      <h3>
        {route &&
          route.route
            .map((r) => r.tokenPath.map((t) => t.symbol).join(' -> '))
            .join(', ')}
      </h3>
      <button
        onClick={() => wrapETH(100)}
        disabled={getProvider() === null || CurrentConfig.rpc.mainnet === ''}
      >
        <p>Wrap ETH</p>
      </button>
      <button
        onClick={() => executeSwap(route)}
        disabled={
          txState === TransactionState.Sending ||
          getProvider() === null ||
          CurrentConfig.rpc.mainnet === '' ||
          route === null
        }
      >
        <p>Swap Using Route</p>
      </button>
    </div>
  )
}
