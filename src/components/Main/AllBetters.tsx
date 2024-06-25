import FcPfp from 'components/FcPfp'
import HatInCircle from 'components/icons/HatInCircle'
import getPercentFromTotal from 'helpers/getPercentFromTotal'
import BetsProps from 'types/BetsProps'

export default function ({ deposits, totalDeposits }: BetsProps) {
  if (!deposits?.length || !totalDeposits) return null

  return (
    <div className="flex flex-col py-6 px-3 bg-primary-bg rounded-3xl my-8">
      <p className="text-lg text-center font-bold">Player bets</p>
      {deposits.map(({ address, amount, fcPfpLink, fcUsername }) => (
        <div
          className="bg-roulette-box flex flex-row justify-between items-center rounded-2xl p-3"
          key={address + amount}
        >
          <div className="flex flex-col gap-y-1 items-center">
            <FcPfp address={address} pfpUrl={fcPfpLink} />
            <span className="truncate opacity-80">{fcUsername || address}</span>
          </div>

          <div className="flex flex-row items-center gap-x-1">
            <div className="flex flex-row bg-primary p-2 font-bold font-sm rounded-xl gap-x-1 items-center">
              <span>{amount}</span> <HatInCircle />
            </div>
            <div className="p-3 bg-pale-purple rounded-xl h-full">
              <span>{getPercentFromTotal(amount, totalDeposits)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
