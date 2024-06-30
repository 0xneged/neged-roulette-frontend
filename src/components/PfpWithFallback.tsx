import { useState } from 'preact/hooks'
import EmojiAvatar from './EmojiAvatar'

const imageStyles = 'w-10 h-10 rounded-3xl'

export default function ({
  address,
  pfpUrl,
}: {
  address: string
  pfpUrl?: string | undefined
}) {
  const [imgLoadError, setImgLoadError] = useState(false)

  if (!pfpUrl || imgLoadError)
    return (
      <div className={imageStyles}>
        <EmojiAvatar address={address} />
      </div>
    )

  return (
    <img
      src={pfpUrl}
      className={`my-0 ${imageStyles}`}
      onError={() => {
        setImgLoadError(true)
      }}
    />
  )
}
