import DarkCard from 'components/DarkCard'
import RouletteRoller from 'components/Main/RouletteRoller'
import Round from 'types/Round'

type RouletteProps = {
  round: Round | null
  totalDeposits: number
}

export default function ({ round, totalDeposits }: RouletteProps) {
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
