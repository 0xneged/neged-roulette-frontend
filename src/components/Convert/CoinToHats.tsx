import HatInCircle from 'components/icons/HatInCircle'
import ReverseArrow from 'components/icons/ReverseArrow'

export default function ({
  isReversed,
  onReverse,
}: {
  isReversed: boolean
  onReverse: () => void
}) {
  return (
    <>
      <div className="flex items-center gap-x-2 w-24">
        <HatInCircle darkBg={!isReversed} />
        <div className="flex flex-col">
          <span className="opacity-60">From</span>
          <span>{isReversed ? 'Hats' : 'negeD'}</span>
        </div>
      </div>

      <ReverseArrow onClick={onReverse} />

      <div className="flex items-center gap-x-2 w-24">
        <div className="flex flex-col">
          <span className="opacity-60">To</span>
          <span>{isReversed ? 'negeD' : 'Hats'}</span>
        </div>
        <HatInCircle darkBg={isReversed} />
      </div>
    </>
  )
}
