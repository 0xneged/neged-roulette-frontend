import RouletteParticipant from './RouletteParticipant'
import Triangle from '../Triangle'
import { Deposit } from 'types/Round'
import HatsBg from 'components/icons/HatsBg'
import DarkCard from 'components/DarkCard'
import BetsProps from 'types/BetsProps'

export default function ({ deposits, totalDeposits }: BetsProps) {
  const hasDeposits = !!deposits.length

  return (
    <DarkCard hasDeposits={hasDeposits}>
      {hasDeposits ? (
        <>
          <Triangle />
          {deposits.map(({ address, amount }) => (
            <RouletteParticipant
              address={address}
              amount={amount}
              totalDeposits={totalDeposits}
            />
          ))}
        </>
      ) : (
        <div className="flex-1 my-3 h-full w-full flex items-center justify-center">
          <span className="text-xl md:text-3xl font-medium">
            Round will start with first deposit
          </span>
        </div>
      )}
    </DarkCard>
  )
}
