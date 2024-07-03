import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import roundNumber from 'helpers/roundNumber'

export default function ({ totalDeposits }: { totalDeposits: number }) {
  return (
    <Button styles="!bg-hat !rounded-b-lg !rounded-t-none w-full">
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
