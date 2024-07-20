import { convertTokensHats } from 'helpers/api/token'
import bep20abi from 'helpers/contracts/bep20abi'
import queryClient, { invalidateManyQueries } from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'
import { toast } from 'react-toastify'
import EthAddress from 'types/EthAddress'
import { erc20Abi } from 'viem'
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { base } from 'viem/chains'
import availableTokens from './availableTokens'
import minimumWithdrawal from './minimumWithdrawal'
import env from 'helpers/env'
import { ConnectedWallet } from '@privy-io/react-auth'
import getBalance from './getBalance'
import wrapEth from 'helpers/contracts/wrapEth'

interface SwapProps {
  amount: number
  tokenIndex: number
  isWithdraw: boolean
  wallet: ConnectedWallet
  setLoading: (val: boolean) => void
  hats?: number | undefined | null
}

export default async function ({
  amount,
  tokenIndex,
  isWithdraw,
  wallet,
  setLoading,
  hats,
}: SwapProps) {
  const address = wallet.address
  const currentToken = availableTokens[tokenIndex]
  const convertedAmount = BigInt(amount * 10 ** currentToken.decimals)

  try {
    setLoading(true)

    await wallet.switchChain(base.id)

    if (isWithdraw && (hats || amount) < minimumWithdrawal) {
      toast.error('Amount is lower than ' + minimumWithdrawal + ' HATs')
      return
    }

    if (!isWithdraw) {
      const allowance = await readContract(walletConfig, {
        address: currentToken.address as EthAddress,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [
          address as EthAddress,
          env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress,
        ],
        chainId: base.id,
      })

      // Wrap ETH into WETH if needed
      if (currentToken.isNative) {
        const { raw: wethBalance } = await getBalance(currentToken, address)
        if (wethBalance < convertedAmount) await wrapEth(convertedAmount)
      }

      if (allowance < convertedAmount) {
        const hash = await writeContract(walletConfig, {
          address: currentToken.address as EthAddress,
          abi: bep20abi,
          functionName: tokenIndex ? 'approve' : 'increaseAllowance', // negeD contract uses 'increaseAllowance'
          args: [
            env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress,
            convertedAmount,
          ],
          chainId: base.id,
        })
        await waitForTransactionReceipt(walletConfig, {
          hash,
          confirmations: 2,
        })
      }
    }

    const res = await convertTokensHats(tokenIndex, amount, isWithdraw)
    if (typeof res !== 'number') return

    toast.success(`Converted 🎉 Your balance is ${res.toFixed(2)}`)
  } catch (e) {
    console.error(e)
    toast.error('Something went wrong when converting 🧟 Please try again 🥺')
  } finally {
    await invalidateManyQueries(['hatsCounter', 'hatSwap'])
    setLoading(false)
  }
}
