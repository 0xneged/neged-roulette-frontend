import { RoundStatus } from 'types/Round'
import { RoundWithTotal } from 'types/BetsProps'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import { usePrivy } from '@privy-io/react-auth'
import BetModal from 'components/Modals/BetModal'
import BigButton from 'components/BigButton'
import DashedCard from 'components/Main/DashedCard'
import HatInCircle from 'components/icons/HatInCircle'
import env from 'helpers/env'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import useHatsCounter from 'helpers/hooks/useHatsCounter'

export default function ({ round, totalDeposits }: RoundWithTotal) {
  const [, navigate] = useLocation()
  const { authenticated, login, ready, user } = usePrivy()
  const address = user?.wallet?.address.toLowerCase()
  const hats = useHatsCounter(address)

  const [userDeposit, setUserDeposit] = useState({ amount: 0, chance: '0' })
  const [modalOpen, setModalOpen] = useState(false)

  const noSeats = round ? round.deposits.length >= env.VITE_MAX_PLAYERS : false
  const roundEnded = round?.roundStatus === RoundStatus.ended

  useEffect(() => {
    const deposits = round?.deposits || []
    const amount =
      deposits.find((deposit) => deposit.address === address)?.amount || 0
    const chance = getPercentFromTotal(amount, totalDeposits)

    setUserDeposit({ amount, chance })
  }, [totalDeposits, round, address])

  const onClick = useCallback(() => {
    if (noSeats || roundEnded) return
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
  }, [ready, authenticated, hats, login, navigate, noSeats, roundEnded])

  const isUserDeposited = userDeposit.amount > 0

  return (
    <>
      <div className="flex flex-col gap-y-3">
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

        <BigButton
          onClick={onClick}
          disabled={roundEnded || noSeats}
          loading={!ready || modalOpen}
        >
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
