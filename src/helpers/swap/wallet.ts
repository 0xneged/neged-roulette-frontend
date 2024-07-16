import { Currency } from '@uniswap/sdk-core'
import { BigNumber, utils, Contract } from 'ethers'
import { providers } from 'ethers'
import {
  ERC20_ABI,
  WETH_ABI,
  WETH_CONTRACT_ADDRESS,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
} from './constants'
import { toReadableAmount } from './conversion'
import JSBI from 'jsbi'
import { getProvider, getWalletAddress, sendTransaction } from './providers'

export async function getCurrencyBalance(
  provider: providers.Provider,
  address: string,
  currency: Currency
): Promise<string> {
  // Handle ETH directly
  if (currency.isNative) {
    return utils.formatEther(await provider.getBalance(address))
  }

  // Get currency otherwise
  const walletContract = new Contract(currency.address, ERC20_ABI, provider)
  const balance: number = await walletContract['balanceOf'](address)
  const decimals: number = await walletContract['decimals']()

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals).toString()
}

const encodeEthValue = (eth: number) =>
  BigNumber.from(Math.ceil(eth))
    .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
    .toString()

// wraps ETH (rounding up to the nearest ETH for decimal places)
export async function wrapETH(eth: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot wrap ETH without a provider and wallet address')
  }

  const wethContract = new Contract(WETH_CONTRACT_ADDRESS, WETH_ABI, provider)

  const transaction = {
    data: wethContract.interface.encodeFunctionData('deposit'),
    value: encodeEthValue(eth),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }

  await sendTransaction(transaction)
}

// unwraps ETH (rounding up to the nearest ETH for decimal places)
export async function unwrapETH(eth: number) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    throw new Error('Cannot unwrap ETH without a provider and wallet address')
  }

  const wethContract = new Contract(WETH_CONTRACT_ADDRESS, WETH_ABI, provider)

  const transaction = {
    data: wethContract.interface.encodeFunctionData('withdraw', [
      encodeEthValue(eth),
    ]),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }

  await sendTransaction(transaction)
}
