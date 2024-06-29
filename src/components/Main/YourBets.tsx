import BigButton from 'components/BigButton'
import { useCallback, useEffect, useState } from 'preact/hooks'
import DashedCard from './DashedCard'
import HatInCircle from '../icons/HatInCircle'
import BetsProps from 'types/BetsProps'
import BetModal from './BetModal'
import { usePrivy } from '@privy-io/react-auth'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import { toast } from 'react-toastify'
import { useLocation } from 'wouter-preact'

export default function ({ deposits, totalDeposits }: BetsProps) {
  const [, navigate] = useLocation()
  const { user, authenticated, login, ready } = usePrivy()
  const address = user?.farcaster?.ownerAddress || user?.wallet?.address
  const hats = useHatsCounter(address)

  const [userDeposit, setUserDeposit] = useState({ amount: 0, chance: '0' })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const amount =
      deposits.find((deposit) => deposit.address === address)?.amount || 0
    const chance = Number((amount / totalDeposits) * 100).toFixed(2)

    setUserDeposit({ amount, chance })
  }, [totalDeposits, deposits, address])

  const onClick = useCallback(() => {
    if (!ready) return
    if (!authenticated) {
      login()
      return
    }
    if (!hats || hats < 1) {
      toast.warn('Please top up your balance 🪙', {
        onClick: () => navigate('/convert'),
      })
      navigate('/convert')
      return
    }

    setModalOpen(true)
  }, [hats, authenticated, ready, login, address])

  if (userDeposit.amount > 0)
    return (
      <div className="flex flex-row items-center justify-center gap-x-2">
        <DashedCard subtitle="your bets">
          <div className="flex gap-x-2">
            {userDeposit.amount}
            <HatInCircle />
          </div>
        </DashedCard>
        <DashedCard orange subtitle="your chance">
          {userDeposit.chance}%
        </DashedCard>
      </div>
    )

  return (
    <>
      <BigButton onClick={onClick} loading={!ready}>
        TRY YOUR LUCK
      </BigButton>
      <BetModal
        address={address}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}
