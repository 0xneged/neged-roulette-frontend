import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'

const imageStyles = 'w-11 h-11 rounded-3xl'

export default function ({
  address,
  pfpUrl,
}: {
  address?: string
  pfpUrl?: string | undefined
}) {
  const { data } = useFcAccount(address, pfpUrl)

  if (!address && !pfpUrl) return null

  const pfp = data ? data.pfp_url : ''

  return (
    <div className={`relative flex ${imageStyles}`}>
      <div className={`absolute ${imageStyles}`}>
        <EmojiAvatar address={address} />
      </div>
      <img src={pfp} className={`absolute mt-0 mb-0 ${imageStyles}`} />
    </div>
  )
}
