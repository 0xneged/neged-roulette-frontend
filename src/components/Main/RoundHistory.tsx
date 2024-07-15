import { useRoundHistory } from 'helpers/hooks/useRoundHistory'
import HatIcon from 'components/icons/HatIcon'
import SingleBetter from 'components/Main/SingleBetter'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'

export default function () {
  const { data, status } = useRoundHistory()

  if (status === 'pending') return <HatIcon rotateAnimation fullWidth />

  if (!data?.length)
    return (
      <span className="text-center">No plays yet, let's make some 🍆🍑</span>
    )

  const component = data.map((round) => (
    <SingleBetter
      {...round.winner}
      totalDeposits={getTotalDeposits(round.deposits)}
    />
  ))

  return <>{component}</>
}
