import { SwapRoute } from '@uniswap/smart-order-router'
import { executeRoute, generateRoute } from 'helpers/swap/routing'
import { getCurrencyBalance } from 'helpers/swap/wallet'
import { useCallback, useEffect, useState } from 'react'
import TxState from 'types/TxState'
import availableTokens from 'helpers/swap/availableTokens'
import useOnBlockUpdated from 'helpers/hooks/useOnBlockUpdated'
import useProvider from 'helpers/swap/usePrivyProvider'

export default function (tokenIndex: number) {
  const currentTokenIn = availableTokens[tokenIndex]
  const negedAsTokenOut = availableTokens[0]

  const { provider, address } = useProvider()

  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [txState, setTxState] = useState<TxState>(TxState.New)
  const [route, setRoute] = useState<SwapRoute | null>(null)
  const [routeLoading, setRouteLoading] = useState(false)

  const refreshBalances = useCallback(async () => {
    if (!provider || !address) return

    setTokenInBalance(
      await getCurrencyBalance(provider, address, currentTokenIn)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, negedAsTokenOut)
    )
  }, [address, currentTokenIn, negedAsTokenOut, provider])

  useEffect(() => {
    setTokenInBalance(undefined)
    void refreshBalances()
  }, [refreshBalances, tokenIndex])
  useOnBlockUpdated(refreshBalances)

  useEffect(() => {
    async function generate() {
      if (!provider || !address || !tokenInBalance || !tokenOutBalance) return
      try {
        const routeResult = await generateRoute({
          provider,
          tokenIn: { data: currentTokenIn, amount: Number(tokenInBalance) },
          tokenOut: { data: negedAsTokenOut },
          address,
        })

        setRoute(routeResult)
      } catch (e) {
        console.error(e)
      } finally {
        setRouteLoading(false)
      }
    }

    void generate()
  }, [
    address,
    currentTokenIn,
    negedAsTokenOut,
    provider,
    tokenInBalance,
    tokenIndex,
    tokenOutBalance,
  ])

  const executeSwap = useCallback(
    async (route: SwapRoute | null) => {
      if (!provider || !address || !route) return

      setTxState(TxState.Sending)
      setTxState(
        await executeRoute({ route, address, provider, token: currentTokenIn })
      )
    },
    [address, currentTokenIn, provider]
  )

  return {
    tokenInBalance,
    tokenOutBalance,
    txState,
    route,
    executeSwap,
    routeLoading,
  }
}
