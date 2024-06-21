import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'

export default function ({ address }: { address?: string }) {
  const { data } = useFcAccount(address)

  const pfpUrl = data ? data.pfp_url : ''

  if (!address) return null

  return (
    <div className="flex w-11 h-11 rounded-3xl">
      {pfpUrl ? <img src={pfpUrl} /> : <EmojiAvatar address={address} />}
    </div>
  )
}
