import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import { emojiAvatarForAddress } from 'helpers/emojiAvatarForAddress'
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
  const { color } = emojiAvatarForAddress(address)

  return (
    <div
      className="rounded-lg flex flex-col p-3 w-34 gap-y-2"
      style={{ backgroundColor: `${color}30` }}
    >
      <a
        href={getAccountLink(address, fcUsername)}
        target="_blank"
        className="flex flex-row gap-x-2 items-center justify-between"
      >
        <div className="w-16">
          <Username address={address} fcUsername={fcUsername} />
        </div>
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
