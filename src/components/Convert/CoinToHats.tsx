import HatInCircle from 'components/icons/HatInCircle'
import ReverseArrow from 'components/icons/ReverseArrow'
import { Dispatch, StateUpdater } from 'preact/hooks'

export default function ({
  isReversed,
  setIsReversed,
}: {
  isReversed: boolean
  setIsReversed: Dispatch<StateUpdater<boolean>>
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

      <ReverseArrow onClick={() => setIsReversed((prev) => !prev)} />

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
