import { Winner } from 'types/Round'
import { getPreviousWinner } from 'helpers/api/token'
import { useQuery } from '@tanstack/react-query'
import HatIcon from 'components/icons/HatIcon'
import ParticipantData from 'components/Main/ParticipantData'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import roundNumber from 'helpers/numbers/roundNumber'

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
  const { data } = useQuery({
    queryKey: ['prevWinner'],
    queryFn: getPreviousWinner,
  })

  if (
    !data ||
    !data.deposits.length ||
    !data.winner ||
    !data.winner.winnerAmount
  )
    return null

  const total = getTotalDeposits(data.deposits)

  return <PreviousRoundComponent {...data} topText="Winner" total={total} />
}
