import { usePrivy } from '@privy-io/react-auth'
import HatIcon from 'components/icons/HatIcon'
import SingleBetter from 'components/Main/SingleBetter'
import { usePlayerHistory } from 'helpers/hooks/hatGame/useRoundHistory'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import { RoundWithTime } from 'types/Round'

function PlayerHistoryEntry({
  round,
  userAddress,
}: {
  round: RoundWithTime
  userAddress?: string | undefined
}) {
  const hasWon =
    round.winner.address.toLowerCase() === userAddress?.toLowerCase()
  const yourBet = hasWon
    ? round.winner
    : round.deposits.find(
        ({ address }) => address.toLowerCase() === userAddress?.toLowerCase()
      )

  if (!yourBet) return null

  const bgColor = hasWon ? 'bg-green-500' : 'bg-red-500'
  const endTime = new Date(round.endTime)

  return (
    <SingleBetter
      {...yourBet}
      totalDeposits={getTotalDeposits(round.deposits)}
      leftComponent={
        <div className="flex flex-col text-sm">
          <span>
            {endTime.getDate()}/{endTime.getMonth() + 1}
          </span>
          <span>{endTime.getFullYear()}</span>
        </div>
      }
      children={
        <div className={'p-2 bg-opacity-70 rounded-xl h-full ' + bgColor}>
          <span>{hasWon ? 'Won' : 'Lost'}</span>
        </div>
      }
    />
  )
}

export default function () {
  const { user } = usePrivy()
  const address = user?.wallet?.address
  const { data, status } = usePlayerHistory(address)

  if (status === 'pending') return <HatIcon rotateAnimation centered />

  const component = data?.length ? (
    data.map((round) => (
      <PlayerHistoryEntry round={round} userAddress={address} />
    ))
  ) : (
    <span className="text-center">No games yet, let's roll 🍧</span>
  )

  return <>{component}</>
}
