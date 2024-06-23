import RouletteParticipant from './RouletteParticipant'
import Triangle from '../Triangle'
import { Deposit } from 'types/Round'
import HatsBg from 'components/icons/HatsBg'

export default function ({
  deposits,
  totalDeposits,
}: {
  deposits: Deposit[]
  totalDeposits: number
}) {
  const hasDeposits = !!deposits.length

  return (
    <div
      className={`relative flex flex-1 flex-row rounded-lg bg-roulette-box py-3 overflow-hidden w-full gap-x-2 ${hasDeposits ? '' : 'hats-bg'}`}
    >
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
    </div>
  )
}
