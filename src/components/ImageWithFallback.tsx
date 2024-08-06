import EmojiAvatar from 'components/EmojiAvatar'
import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

const defaultFallback = (address?: string | undefined) => (
  <EmojiAvatar address={address} />
)

export default function ({
  address,
  imgUrl,
  fallback = defaultFallback,
  size = 10,
}: {
  address?: string
  imgUrl?: string | undefined
  fallback?: (address?: string | undefined) => JSX.Element
  size?: number
}) {
  const [imgLoadError, setImgLoadError] = useState(false)

  const imageStyles = `w-${size} h-${size} rounded-3xl`

  if (!imgUrl || imgLoadError)
    return <div className={imageStyles}>{fallback(address)}</div>

  return (
    <div className={`relative ${imageStyles}`}>
      <img
        src={imgUrl}
        className={`absolute z-10 my-0 ${imageStyles}`}
        onError={() => {
          setImgLoadError(true)
        }}
        loading="lazy"
      />
      <div className={`absolute z-0 ${imageStyles}`}>{fallback(address)}</div>
    </div>
  )
}
