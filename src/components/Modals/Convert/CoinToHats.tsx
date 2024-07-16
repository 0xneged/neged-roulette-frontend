import BodyDropdown, {
  BodyDropDownProps,
} from 'components/Modals/Convert/BodyDropdown'
import HatInCircle from 'components/icons/HatInCircle'
import ReverseArrow from 'components/icons/ReverseArrow'
import SwapRoute from 'components/Modals/Convert/SwapRoute'

export default function ({
  isReversed,
  onReverse,
  tokenIndex,
  setTokenIndex,
}: {
  isReversed: boolean
  onReverse: () => void
} & BodyDropDownProps) {
  return (
    <>
      <BodyDropdown tokenIndex={tokenIndex} setTokenIndex={setTokenIndex} />

      <ReverseArrow onClick={onReverse} />

      <div className="flex items-center gap-x-2 w-24">
        <div className="flex flex-col">
          <span className="opacity-60">To</span>
          <span>{isReversed ? 'negeD' : 'Hats'}</span>
        </div>
        <HatInCircle darkBg={isReversed} />
      </div>

      <SwapRoute />
    </>
  )
}
