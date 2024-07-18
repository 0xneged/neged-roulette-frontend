import { ERC20_ABI } from 'helpers/swap/constants'
import { TokenWithLogo } from 'helpers/swap/availableTokens'
import { base } from 'viem/chains'
import { formatUnits } from 'viem'
import { readContract } from '@wagmi/core'
import walletConfig from 'helpers/walletConfig'

export default async function (currency: TokenWithLogo, address?: string) {
  console.log(address)
  if (!address) return null

  const balance = await readContract(walletConfig, {
    address: currency.address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: base.id,
  })

  console.log(balance)
  return formatUnits(balance as bigint, currency.decimals)
}
