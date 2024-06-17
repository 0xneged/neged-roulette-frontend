import RouletteParticipant from './RouletteParticipant'
import Triangle from './Triangle'

export default function () {
  return (
    <div className="relative flex flex-row rounded-lg bg-roulette-box py-3 overflow-hidden w-full gap-x-2">
      <Triangle />
      <RouletteParticipant />
      <RouletteParticipant />
      <RouletteParticipant />
      <RouletteParticipant />
    </div>
  )
}
