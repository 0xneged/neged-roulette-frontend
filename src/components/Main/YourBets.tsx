import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import { usePrivy } from '@privy-io/react-auth'
import BetModal from 'components/Modals/BetModal'
import BetsProps from 'types/BetsProps'
import BigButton from 'components/BigButton'
import DashedCard from 'components/Main/DashedCard'
import HatInCircle from 'components/icons/HatInCircle'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import useHatsCounter from 'helpers/hooks/useHatsCounter'

export default function ({ deposits, totalDeposits }: BetsProps) {
  const [, navigate] = useLocation()
  const { authenticated, login, ready, user } = usePrivy()
  const address = user?.wallet?.address.toLowerCase()
  const hats = useHatsCounter(address)

  const [userDeposit, setUserDeposit] = useState({ amount: 0, chance: 0 })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const amount =
      deposits.find((deposit) => deposit.address === address)?.amount || 0
    const chance = getPercentFromTotal(amount, totalDeposits)

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
  }, [ready, authenticated, hats, login, navigate])

  const isUserDeposited = userDeposit.amount > 0

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {isUserDeposited ? (
          <div className="flex flex-row items-center justify-center gap-x-2">
            <DashedCard subtitle="your bets">
              <div className="flex gap-x-2">
                {userDeposit.amount}
                <HatInCircle />
              </div>
            </DashedCard>
            <DashedCard address={address} subtitle="your chance">
              {userDeposit.chance}%
            </DashedCard>
          </div>
        ) : null}
        <BigButton onClick={onClick} loading={!ready || modalOpen}>
          {isUserDeposited ? 'ADD MORE' : 'TRY YOUR LUCK'}
        </BigButton>
      </div>
      <BetModal
        address={address}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        userHats={hats}
      />
    </>
  )
}
