import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'
import { useState } from 'preact/hooks'

const imageStyles = 'w-10 h-10 rounded-3xl'

export default function ({
  address,
  pfpUrl,
}: {
  address?: string
  pfpUrl?: string | undefined
}) {
  const [imgLoadError, setImgLoadError] = useState(false)
  const { data } = useFcAccount(address, pfpUrl)

  if (!address && !pfpUrl) return null

  const pfp = data ? data.pfp_url : ''

  if (!pfp || imgLoadError)
    return (
      <div className={`absolute ${imageStyles}`}>
        <EmojiAvatar address={address} />
      </div>
    )

  return (
    <img
      src={pfp}
      className={`my-0 ${imageStyles}`}
      onError={() => {
        setImgLoadError(true)
      }}
    />
  )
}
