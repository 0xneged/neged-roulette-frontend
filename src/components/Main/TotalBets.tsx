import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import useRound from 'helpers/hooks/hatGame/useRound'
import roundNumber from 'helpers/numbers/roundNumber'

export default function () {
  const { totalDeposits } = useRound()

  return (
    <Button bgHat styles="!rounded-b-lg !rounded-t-none w-full">
      <span>Total</span>
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
