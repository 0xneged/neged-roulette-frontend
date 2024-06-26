import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'
import getPercentFromTotal from 'helpers/getPercentFromTotal'
import { roundNumber } from 'helpers/roundNumber'
import { Deposit } from 'types/Round'

export default function ({
  address,
  amount,
  totalDeposits,
  fcPfpLink,
  fcUsername,
}: {
  totalDeposits: number
} & Deposit) {
  return (
    <div className="bg-participant2 rounded-lg flex flex-col p-3 w-32 gap-y-2">
      <a
        href={getAccountLink(address, fcUsername)}
        target="_blank"
        className="flex flex-row gap-x-2 items-center"
      >
        <Username address={address} fcUsername={fcUsername} />
        <FcPfp address={address} pfpUrl={fcPfpLink} />
      </a>
      <div className="flex flex-row justify-between items-center text-white">
        <span className="font-bold text-sm">{roundNumber(amount)}</span>
        <span className="font-medium text-xs">
          {getPercentFromTotal(amount, totalDeposits)}%
        </span>
      </div>
    </div>
  )
}
