import useRoundHistory from 'helpers/hooks/useRoundHistory'

export default function () {
  const rounds = useRoundHistory()

  const component = rounds?.map(({ winner }) => (
    <div className="bg-roulette-box flex flex-row justify-between items-center rounded-2xl p-3 gap-x-1">
      <p>Winner: {winner.fcUsername || winner.address}</p>
      <p>Winner amount: {winner.winnerAmount}</p>
      <p>Winner bet: {winner.amount}</p>
    </div>
  ))

  return <>{component}</>
}
