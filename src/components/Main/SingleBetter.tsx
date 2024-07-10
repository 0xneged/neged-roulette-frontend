import { Deposit } from 'types/Round'
import { JSX, PropsWithChildren } from 'preact/compat'
import FcPfp from 'components/FcPfp'
import HatInCircle from 'components/icons/HatInCircle'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'
import getPercentFromTotal from 'helpers/numbers/getPercentFromTotal'
import roundNumber from 'helpers/numbers/roundNumber'

interface BetterProps extends Deposit, PropsWithChildren {
  totalDeposits: number
  winnerAmount?: number
  leftComponent?: JSX.Element
}

export default function ({
  address,
  amount,
  fcPfpLink,
  fcUsername,
  totalDeposits,
  children,
  winnerAmount,
  leftComponent,
}: BetterProps) {
  return (
    <div className="bg-primary-bg flex flex-row justify-between items-center rounded-2xl p-3 gap-x-1 gap-y-2 w-full">
      {leftComponent || (
        <a
          href={getAccountLink(address, fcUsername)}
          className="flex flex-row items-center gap-x-1 se:gap-x-2"
          target="_blank"
        >
          <FcPfp address={address} pfpUrl={fcPfpLink} />
          <Username address={address} fcUsername={fcUsername} truncate />
        </a>
      )}

      <div className="flex flex-row items-center gap-x-1">
        <div className="flex flex-row bg-hat-alt h-full p-2 font-bold font-sm rounded-xl gap-x-1 items-center">
          <span>{roundNumber(winnerAmount || amount)}</span>{' '}
          <HatInCircle small />
        </div>
        <div className="p-2 bg-pale-purple rounded-xl h-full">
          <span>{getPercentFromTotal(amount, totalDeposits)}%</span>
        </div>
        {children}
      </div>
    </div>
  )
}
