import { base } from 'viem/chains'
import { convertTokensHats } from 'helpers/api/token'
import { readContract, writeContract } from '@wagmi/core'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { waitForTransactionReceipt } from '@wagmi/core'
import BigButton from 'components/BigButton'
import CoinToHats from 'components/Convert/CoinToHats'
import EthAddress from 'types/EthAddress'
import ExchangerBlock from 'components/Convert/ExchangerBlock'
import HatsQuantity from 'components/Convert/HatsQuantity'
import Input from 'components/Input'
import bep20abi from 'helpers/bep20abi'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import walletConfig from 'helpers/walletConfig'

const decimals = 18

export default function () {
  const { login, authenticated, ready, connectWallet, user } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  const [amount, setAmount] = useState(1000)
  const [loading, setLoading] = useState(false)
  const [isReversed, setIsReversed] = useState(false)

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

    const convertedAmount = amount * 10 ** decimals

    try {
      setLoading(true)

      await wallets[0].switchChain(base.id)

      if (!isReversed) {
        const res = await readContract(walletConfig, {
          address: env.VITE_TOKEN_ADDRESS as EthAddress,
          abi: bep20abi,
          functionName: 'allowance',
          args: [address, env.VITE_TOKEN_RECEIVER_CONTRACT as EthAddress],
          chainId: base.id,
        })

        if (Number(res) < convertedAmount) {
          const hash = await writeContract(walletConfig, {
            address: env.VITE_TOKEN_ADDRESS as EthAddress,
            abi: bep20abi,
            functionName: 'increaseAllowance',
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

      const res = await convertTokensHats(amount, isReversed)
      if (typeof res !== 'number') return

      await queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
      toast.success('Converted 🎉')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong when converting. Please try again 🥺')
    } finally {
      setLoading(false)
    }
  }, [
    connectWallet,
    ready,
    authenticated,
    amount,
    loading,
    login,
    isReversed,
    user?.wallet?.address,
    wallets,
    walletsReady,
  ])

  return (
    <div className="flex flex-col items-center gap-y-7">
      <span>You Convert</span>
      <div className="text-4xl text-primary font-bold">
        <Input
          value={amount}
          onChange={({ currentTarget }) => {
            if (currentTarget.valueAsNumber <= 10000)
              setAmount(currentTarget.valueAsNumber)
          }}
          type="number"
          max={10000}
          min={0}
        />
        <span>{isReversed ? 'Hats' : 'negeD'}</span>
      </div>
      <ExchangerBlock label="You Receive">
        <HatsQuantity quantity={amount} isReversed={isReversed} />
      </ExchangerBlock>
      <ExchangerBlock label="Exchange">
        <CoinToHats isReversed={isReversed} setIsReversed={setIsReversed} />
      </ExchangerBlock>
      <BigButton
        onClick={processExchange}
        disabled={!amount}
        loading={loading || !ready || !walletsReady}
      >
        CONVERT
      </BigButton>
    </div>
  )
}
