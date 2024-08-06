import HatIcon from 'components/icons/HatIcon'
import ParticipantData from 'components/Main/ParticipantData'
import { useRoundHistory } from 'helpers/hooks/hatGame/useRoundHistory'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import roundNumber from 'helpers/numbers/roundNumber'
import { Winner } from 'types/Round'

export function PreviousRoundComponent({
  total,
  winner,
  topText,
}: {
  topText?: string
  winner: Winner
  total: number
}) {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <span className="font-bold text-3xl sm:text-6xl">{topText}</span>
      <ParticipantData limitWidth {...winner} />
      <div className="flex flex-row gap-x-2 opacity-70 text-xs">
        <span>
          Chance:{' '}
          <span className="font-bold">
            {getPercentFromTotal(winner.amount, total)}%
          </span>
        </span>
        <span className="flex flex-row gap-x-1 items-center">
          Amount:
          <span className="font-bold flex flex-row gap-x-1 items-center">
            {roundNumber(winner.winnerAmount)} <HatIcon small />
          </span>
        </span>
      </div>
    </div>
  )
}

export default function () {
  const { data } = useRoundHistory()

  const latest = data?.[0]

  if (!latest || !latest.winner || !latest.winner.winnerAmount)
    return <span>This is the first round in history!</span>

  const total = getTotalDeposits(latest.deposits)

  return <PreviousRoundComponent {...latest} topText="Winner" total={total} />
}
