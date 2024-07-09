import { useState } from 'preact/hooks'
import EmojiAvatar from 'components/EmojiAvatar'

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
    <div className={`relative ${imageStyles}`}>
      <img
        src={pfpUrl}
        className={`absolute z-10 my-0 ${imageStyles}`}
        onError={() => {
          setImgLoadError(true)
        }}
      />
      <div className={`absolute z-0 ${imageStyles}`}>
        <EmojiAvatar address={address} />
      </div>
    </div>
  )
}
