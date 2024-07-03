import { Deposit } from 'types/Round'
import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import emojiAvatarForAddress from 'helpers/emojiAvatarForAddress'
import getAccountLink from 'helpers/getAccountLink'
import roundNumber from 'helpers/numbers/roundNumber'

export default function ({
  address,
  amount,
  winChance,
  fcPfpLink,
  fcUsername,
  width = 136,
}: {
  winChance: number
  width?: number
} & Deposit) {
  const { color } = emojiAvatarForAddress(address)

  return (
    <div
      className="rounded-lg flex flex-col p-3 gap-y-2"
      style={{ backgroundColor: `${color}30`, width }}
    >
      <a
        href={getAccountLink(address, fcUsername)}
        target="_blank"
        className="flex flex-row gap-x-2 items-center justify-between"
      >
        <Username address={address} fcUsername={fcUsername} limitWidth />
        <FcPfp address={address} pfpUrl={fcPfpLink} />
      </a>
      <div className="flex flex-row justify-between items-center text-white">
        <span className="font-bold text-sm">{roundNumber(amount)}</span>
        <span className="font-medium text-xs">{winChance}%</span>
      </div>
    </div>
  )
}
