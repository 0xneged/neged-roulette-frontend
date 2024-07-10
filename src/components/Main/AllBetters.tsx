import { useAtomValue } from 'jotai'
import SingleBetter from 'components/Main/SingleBetter'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import roundAtom from 'helpers/atoms/roundAtom'

export default function () {
  const currentRound = useAtomValue(roundAtom)
  const deposits = currentRound?.deposits || []
  const totalDeposits = getTotalDeposits(deposits)

  if (!deposits?.length || !totalDeposits)
    return <span className="text-center">No bets yet, you can be first 😏</span>

  const component = deposits.map((deposit) => (
    <SingleBetter {...deposit} totalDeposits={totalDeposits} />
  ))

  return <>{component}</>
}
