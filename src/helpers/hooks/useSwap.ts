import { formatUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { useWallets } from '@privy-io/react-auth'
import EthAddress from 'types/EthAddress'
import availableTokens from 'helpers/swap/availableTokens'
import queryClient from 'helpers/queryClient'
import useOnBlockUpdated from 'helpers/hooks/useOnBlockUpdated'
import useTokenQuotes from 'helpers/hooks/useHatSwap'

export default function (tokenIndex: number) {
  const currentTokenIn = availableTokens[tokenIndex]
  const { wallets } = useWallets()
  const userAddress = wallets?.[0].address as EthAddress

  const { data: tokenOutData, status: tokenOutStatus } =
    useTokenQuotes(currentTokenIn)

  const { data: tokenInBalance, status: tokenInStatus } = useReadContract({
    address: currentTokenIn.address,
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'balanceOf',
    args: [userAddress],
  })

  useOnBlockUpdated(() =>
    queryClient.invalidateQueries({
      queryKey: ['hatSwap'],
    })
  )

  return {
    tokenInBalance: tokenInBalance
      ? formatUnits(tokenInBalance, currentTokenIn.decimals)
      : undefined,
    tokenInStatus,
    tokenOutStatus,
    tokenOutData,
  }
}
