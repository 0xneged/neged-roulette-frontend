import DarkCard from 'components/DarkCard'
import RouletteRoller from 'components/Main/RouletteRoller'
import useRound from 'helpers/hooks/hatGame/useRound'

export default function () {
  const { data, totalDeposits } = useRound()

  const round = data?.currentRound
  const hasDeposits = !!round?.deposits.length

  if (hasDeposits)
    return <RouletteRoller round={round} totalDeposits={totalDeposits} />

  return (
    <DarkCard>
      <div className="flex-1 my-3 h-full w-full flex items-center justify-center">
        <span className="text-xl md:text-3xl font-medium text-center">
          Round will start with first deposit
        </span>
      </div>
    </DarkCard>
  )
}
