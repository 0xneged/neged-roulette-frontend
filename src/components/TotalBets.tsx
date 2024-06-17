import Button from './Button'
import HatIcon from './icons/HatIcon'

export default function () {
  return (
    <Button
      onClick={() => console.log('expand player bets')}
      styles="bg-primary"
    >
      <span className="font-bold text-2xl pr-1">100K</span>
      <span className="flex flex-row gap-x-1 items-center">
        <HatIcon />
        Hats
      </span>
    </Button>
  )
}
