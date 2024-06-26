import { Dispatch, StateUpdater } from 'preact/hooks'
import Button from '../Button'
import HatIcon from '../icons/HatIcon'
import { roundNumber } from 'helpers/roundNumber'

export default function ({
  totalDeposits,
  setShowAllBetters,
}: {
  totalDeposits: number
  setShowAllBetters: Dispatch<StateUpdater<boolean>>
}) {
  return (
    <Button onClick={() => setShowAllBetters((prev) => !prev)} styles="!bg-hat">
      <span className="font-bold text-2xl pr-1">
        {roundNumber(totalDeposits)}
      </span>
      <span className="flex flex-row gap-x-1 items-center">
        <HatIcon />
        Hats
      </span>
    </Button>
  )
}
