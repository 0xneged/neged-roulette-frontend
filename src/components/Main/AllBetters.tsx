import SingleBetter from 'components/Main/SingleBetter'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import useRound from 'helpers/hooks/useRound'

export default function () {
  const { data, status } = useRound()

  const deposits = data?.currentRound?.deposits || []
  const totalDeposits = getTotalDeposits(deposits)

  if (status === 'pending' || !deposits?.length || !totalDeposits)
    return <span className="text-center">No bets yet, you can be first 😏</span>

  const component = deposits.map((deposit) => (
    <SingleBetter {...deposit} totalDeposits={totalDeposits} />
  ))

  return <>{component}</>
}
