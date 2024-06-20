import HatInCircle from 'components/icons/HatInCircle'
import ReverseArrow from 'components/icons/ReverseArrow'

export default function () {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <HatInCircle darkBg />
        <div className="flex flex-col">
          <span className="opacity-60">From</span>
          <span>negeD</span>
        </div>
      </div>
      <ReverseArrow onClick={() => console.log('implement reverse')} />
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col">
          <span className="opacity-60">To</span>
          <span>Hats</span>
        </div>
        <HatInCircle />
      </div>
    </>
  )
}
