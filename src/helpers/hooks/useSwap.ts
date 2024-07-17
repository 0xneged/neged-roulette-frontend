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
import { toast } from 'react-toastify'
import availableTokens from 'helpers/swap/availableTokens'

export default function (tokenIndex: number) {
  const currentTokenIn = availableTokens[tokenIndex]

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
      await getCurrencyBalance(provider, address, currentTokenIn)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])
  useOnBlockUpdated(refreshBalances)

  useEffect(() => {
    void generateRoute(currentTokenIn, )
  }, [tokenIndex])

  const executeSwap = useCallback(async (route: SwapRoute | null) => {
    if (!route) {
      toast.error('Route not selected')
      return
    }

    setTxState(TransactionState.Sending)
    setTxState(await executeRoute(route))
  }, [])

  return {
    tokenInBalance,
    tokenOutBalance,
    txState,
    route,
    executeSwap,
  }
}
