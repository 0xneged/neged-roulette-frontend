import { base } from 'viem/chains'
import { erc20Abi, formatUnits } from 'viem'
import { useBalance, useReadContract } from 'wagmi'
import { useWallets } from '@privy-io/react-auth'
import EthAddress from 'types/EthAddress'
import availableTokens from 'helpers/swap/availableTokens'
import queryClient from 'helpers/queryClient'
import useOnBlockUpdated from 'helpers/hooks/useOnBlockUpdated'
import useTokenQuotes from 'helpers/hooks/useHatSwap'
import walletConfig from 'helpers/walletConfig'

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
