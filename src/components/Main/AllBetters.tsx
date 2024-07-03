import BetsProps from 'types/BetsProps'
import FcPfp from 'components/FcPfp'
import HatInCircle from 'components/icons/HatInCircle'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'

export default function ({ deposits, totalDeposits }: BetsProps) {
  if (!deposits?.length || !totalDeposits) return null

  return (
    <div className="flex flex-col py-6 px-3 bg-primary-bg rounded-3xl my-8 gap-y-2">
      <p className="text-lg text-center font-bold">Player bets</p>
      {deposits.map(({ address, amount, fcPfpLink, fcUsername }) => (
        <div
          className="bg-roulette-box flex flex-row justify-between items-center rounded-2xl p-3 gap-x-1"
          key={address + amount}
        >
          <a
            href={getAccountLink(address, fcUsername)}
            className="flex flex-row items-center gap-x-2"
            target="_blank"
          >
            <FcPfp address={address} pfpUrl={fcPfpLink} />
            <Username address={address} fcUsername={fcUsername} truncate />
          </a>

          <div className="flex flex-row items-center gap-x-1">
            <div className="flex flex-row bg-hat-alt h-full p-2 font-bold font-sm rounded-xl gap-x-1 items-center">
              <span>{amount}</span> <HatInCircle small />
            </div>
            <div className="p-2 bg-pale-purple rounded-xl h-full">
              <span>{getPercentFromTotal(amount, totalDeposits)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
