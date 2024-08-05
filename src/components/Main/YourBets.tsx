import { RoundStatus } from 'types/Round'
import { placeBet } from 'helpers/api/round'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import BetModal from 'components/Modals/BetModal'
import BigButton from 'components/BigButton'
import DashedCard from 'components/Main/DashedCard'
import HatIcon from 'components/icons/HatIcon'
import HatInCircle from 'components/icons/HatInCircle'
import env from 'helpers/env'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import roundNumber from 'helpers/numbers/roundNumber'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import useRound from 'helpers/hooks/useRound'

export default function () {
  const { data, totalDeposits } = useRound()
  const { authenticated, login, ready, user } = usePrivy()
  const address = user?.wallet?.address.toLowerCase()
  const { data: hats, status: hatsLoaderStatus } = useHatsCounter(address)
  const fetchingHats = hatsLoaderStatus === 'pending'

  const [userDeposit, setUserDeposit] = useState({ amount: 0, chance: '0' })
  const [modalOpen, setModalOpen] = useState(false)

  const round = data?.currentRound
  const minBet = data?.roundParams.minBet
  const maxBet = data?.roundParams.maxBet

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
    if (fetchingHats) {
      toast.warn("We're fetching your balance, please wait 🕰️")
      return
    }
    if (!hats || hats < 1) {
      toast.warn('Please top up your balance 🪙')
      return
    }

    setModalOpen(true)
  }, [noSeats, roundEnded, ready, authenticated, fetchingHats, hats, login])

  const didUserDeposit = userDeposit.amount > 0
  const isMax = userDeposit.amount >= (maxBet || 0)

  return (
    <>
      <div className="flex flex-col gap-y-3">
        {didUserDeposit ? (
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
          disabled={roundEnded || noSeats || isMax}
          loading={!ready || modalOpen || fetchingHats}
        >
          {didUserDeposit
            ? isMax
              ? 'MAXED OUT'
              : 'ADD MORE'
            : 'TRY YOUR LUCK'}
        </BigButton>
        <div className="flex flex-row gap-x-1 w-full items-center justify-center">
          <span>
            Bet limits are {minBet} - {roundNumber(maxBet)}
          </span>
          <HatIcon />
        </div>
      </div>
      {typeof minBet === 'number' && typeof maxBet === 'number' ? (
        <BetModal
          userAddress={address}
          onBet={placeBet}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          userHats={hats}
          userDeposit={userDeposit.amount}
          minBet={minBet}
          maxBet={maxBet}
        />
      ) : null}
    </>
  )
}
