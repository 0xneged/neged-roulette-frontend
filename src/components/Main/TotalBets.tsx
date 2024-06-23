import Button from '../Button'
import HatIcon from '../icons/HatIcon'
import { roundNumber } from 'helpers/roundNumber'

export default function ({ totalDeposits }: { totalDeposits: number }) {
  return (
    <Button
      onClick={() => console.log('expand player bets')}
      styles="bg-primary"
    >
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
