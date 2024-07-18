import { base } from 'viem/chains'
import { convertTokensHats } from 'helpers/api/token'
import { readContract, writeContract } from '@wagmi/core'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { waitForTransactionReceipt } from '@wagmi/core'
import BigButton from 'components/BigButton'
import Body from 'components/Modals/Convert/Body'
import DefaultModal from 'components/Modals/DefaultModal'
import EthAddress from 'types/EthAddress'
import ModalProps from 'types/ModalProps'
import availableTokens from 'helpers/swap/availableTokens'
import bep20abi from 'helpers/bep20abi'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import walletConfig from 'helpers/walletConfig'

const minimumWithdrawal = 2000

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  const [tokenIndex, setTokenIndex] = useState(0)
  const { login, authenticated, ready, connectWallet, user } = usePrivy()
  const hats = useHatsCounter()
  const { wallets, ready: walletsReady } = useWallets()
  const [loading, setLoading] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [amount, setAmount] = useState(1000)

  const disabledWhenTooLow = isWithdraw
    ? (hats || amount) < minimumWithdrawal
    : false

  const processExchange = useCallback(async () => {
    if (!ready || !walletsReady) return
    if (!authenticated) {
      login()
      return
    }
    const address = user?.wallet?.address
    if (!wallets[0]?.address) {
      connectWallet({ suggestedAddress: address })
    }

    if (!address || amount <= 0 || loading) return

    const currentToken = availableTokens[tokenIndex]
    const convertedAmount = amount * 10 ** currentToken.decimals

    try {
      setLoading(true)

      await wallets[0].switchChain(base.id)

      if (isWithdraw && (hats || amount) < minimumWithdrawal) {
        toast.error('Amount is lower than ' + minimumWithdrawal + ' HATs')
        return
      }

      if (!isWithdraw) {
        const res = await readContract(walletConfig, {
          address: currentToken.address as EthAddress,
          abi: bep20abi,
          functionName: 'allowance',
          args: [address, env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress],
          chainId: base.id,
        })

        if (Number(res) < convertedAmount) {
          const hash = await writeContract(walletConfig, {
            address: currentToken.address as EthAddress,
            abi: bep20abi,
            functionName: 'increaseAllowance', // TODO: this may not work, check ERC20 for this fn
            args: [
              env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress,
              BigInt(convertedAmount),
            ],
            chainId: base.id,
          })
          await waitForTransactionReceipt(walletConfig, {
            hash,
            confirmations: 2,
          })
        }
      }

      const res = await convertTokensHats(amount, isWithdraw)
      if (typeof res !== 'number') return

      toast.success("Converted 🎉 You'll receive your assets soon ⌚")
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong when converting 🧟 Please try again 🥺')
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
      setLoading(false)
    }
  }, [
    ready,
    walletsReady,
    authenticated,
    user?.wallet?.address,
    wallets,
    amount,
    loading,
    tokenIndex,
    login,
    connectWallet,
    isWithdraw,
    hats,
  ])

  const Footer = (
    <BigButton
      onClick={processExchange}
      disabled={!amount || disabledWhenTooLow}
      loading={loading || !ready || !walletsReady}
      exClassName="w-full"
    >
      CONVERT
    </BigButton>
  )

  const bodyProps = {
    amount,
    hats,
    setIsWithdraw,
    isWithdraw,
    setAmount,
    minimumWithdrawal,
    tokenIndex,
    setTokenIndex,
  }

  return (
    <DefaultModal
      header="Convert"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      bodyContent={<Body {...bodyProps} />}
      footerContent={Footer}
    />
  )
}
