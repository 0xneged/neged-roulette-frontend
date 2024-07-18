import { Currency } from '@uniswap/sdk-core'
import { BigNumber, Contract } from 'ethers'
import { ERC20_ABI } from './constants'
import { toReadableAmount } from './conversion'
import { Web3Provider, TransactionRequest } from '@ethersproject/providers'
import { formatEther } from 'viem'
import TxState from 'types/TxState'

export async function getCurrencyBalance(
  provider: Web3Provider,
  address: string,
  currency: Currency
): Promise<string> {
  if (currency.isNative)
    return formatEther(BigInt(Number(await provider.getBalance(address))))

  const walletContract = new Contract(currency.address, ERC20_ABI, provider)
  const balance: BigNumber = await walletContract['balanceOf'](address)
  const decimals: number = await walletContract['decimals']()

  return toReadableAmount(Number(balance), decimals).toString()
}

export async function sendTransaction(
  provider: Web3Provider,
  transaction: TransactionRequest
) {
  try {
    const receipt = await provider.send('eth_sendTransaction', [transaction])
    if (receipt) {
      return TxState.Sent
    } else {
      return TxState.Failed
    }
  } catch (e) {
    console.error(e)
    return TxState.Rejected
  }
}
