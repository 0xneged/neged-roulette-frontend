import { readContract } from '@wagmi/core'
import { TokenWithLogo } from 'helpers/swap/availableTokens'
import walletConfig from 'helpers/walletConfig'
import EthAddress from 'types/EthAddress'
import { erc20Abi, formatUnits } from 'viem'
import { base } from 'viem/chains'

export default async function <
  A extends string | null,
  R = A extends string ? { format: string; raw: bigint } : null,
>(currency: TokenWithLogo, address?: A): Promise<R> {
  if (!address) return null as R

  const balance = await readContract(walletConfig, {
    address: currency.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as EthAddress],
    chainId: base.id,
  })

  return {
    format: formatUnits(balance as bigint, currency.decimals),
    raw: balance,
  } as R
}
