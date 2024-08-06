import { useWallets } from '@privy-io/react-auth'
import useTokenQuotes from 'helpers/hooks/swap/useHatSwap'
import useOnBlockUpdated from 'helpers/hooks/swap/useOnBlockUpdated'
import queryClient from 'helpers/queryClient'
import availableTokens from 'helpers/swap/availableTokens'
import walletConfig from 'helpers/walletConfig'
import EthAddress from 'types/EthAddress'
import { erc20Abi, formatUnits } from 'viem'
import { base } from 'viem/chains'
import { useBalance, useReadContract } from 'wagmi'

export default function (tokenIndex: number) {
  const currentTokenIn = availableTokens[tokenIndex]
  const { wallets } = useWallets()
  const userAddress = wallets?.[0]?.address as EthAddress | undefined

  const { data: tokenOutData, status: tokenOutStatus } =
    useTokenQuotes(currentTokenIn)
  const { data: tokenInNativeBalance, data: nativeTokenStatus } = useBalance({
    address: userAddress,
    chainId: base.id,
  })
  const { data: tokenInBalance, status: tokenInStatus } = useReadContract({
    account: userAddress,
    address: currentTokenIn.address,
    chainId: base.id,
    config: walletConfig,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress as EthAddress], // query is disabled when there's no address, but types are wrong
  })

  useOnBlockUpdated(() =>
    queryClient.invalidateQueries({
      queryKey: ['hatSwap'],
    })
  )

  const balanceToFormat = currentTokenIn.isNative
    ? tokenInNativeBalance?.value
    : tokenInBalance
  const formattedBalance = balanceToFormat
    ? formatUnits(balanceToFormat, currentTokenIn.decimals)
    : undefined

  return {
    tokenInBalance: formattedBalance,
    tokenInStatus: currentTokenIn.isNative ? nativeTokenStatus : tokenInStatus,
    tokenOutData,
    tokenOutStatus,
  }
}
