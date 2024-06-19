import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'

export default function () {
  const { data, address } = useFcAccount()

  const pfpUrl = data ? data.pfp_url : ''

  return (
    <div className="flex w-11 h-11 rounded-3xl">
      {pfpUrl ? <img src={pfpUrl} /> : <EmojiAvatar address={address} />}
    </div>
  )
}
