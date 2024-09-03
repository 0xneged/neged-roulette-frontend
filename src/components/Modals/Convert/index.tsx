import { usePrivy, useWallets } from '@privy-io/react-auth'
import Body from 'components/Modals/Convert/Body'
import Footer from 'components/Modals/Convert/Footer'
import DefaultModal from 'components/Modals/DefaultModal'
import getUserAddress from 'helpers/getUserAddress'
import useSwap from 'helpers/hooks/swap/useSwap'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import minimumWithdrawal from 'helpers/swap/minimumWithdrawal'
import processSwap from 'helpers/swap/processSwap'
import { useCallback, useState } from 'preact/hooks'
import ModalProps from 'types/ModalProps'

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  const { login, authenticated, ready, connectWallet, user } = usePrivy()
  const address = getUserAddress(user)
  const { data: hats } = useHatsCounter(address)
  const { wallets, ready: walletsReady } = useWallets()

  const [tokenIndex, setTokenIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [amount, setAmount] = useState(1000)

  const { tokenInBalance, tokenInStatus, tokenOutStatus, tokenOutData } =
    useSwap(tokenIndex)

  const quotesLoading =
    tokenInStatus === 'pending' || tokenOutStatus === 'pending'

  const disabledWhenBalanceLow = isWithdraw
    ? (hats || 0) < minimumWithdrawal || amount < minimumWithdrawal
    : amount > (Number(tokenInBalance) || 0)

  const processExchange = useCallback(() => {
    if (!ready || !walletsReady) return
    if (!authenticated) {
      login()
      return
    }
    const wallet = wallets[0]
    const address = wallet?.address
    if (!address) {
      connectWallet({ suggestedAddress: address })
      return
    }
    const numAmount = Number(amount)
    if (!address || numAmount <= 0 || loading) return

    void processSwap({
      amount: numAmount,
      hats,
      isWithdraw,
      setLoading,
      tokenIndex,
      wallet,
    })
  }, [
    amount,
    authenticated,
    connectWallet,
    hats,
    isWithdraw,
    loading,
    login,
    ready,
    tokenIndex,
    wallets,
    walletsReady,
  ])

  const footerProps = {
    processExchange,
    disabled: !amount || disabledWhenBalanceLow,
    loading: loading || !ready || !walletsReady || quotesLoading,
  }

  const bodyProps = {
    amount,
    hats,
    setIsWithdraw,
    isWithdraw,
    setAmount,
    tokenIndex,
    setTokenIndex,
    tokenInBalance,
    tokenOutData,
    loading,
  }

  return (
    <DefaultModal
      header="Convert"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      bodyContent={<Body {...bodyProps} />}
      footerContent={<Footer {...footerProps} />}
    />
  )
}
