import EmojiAvatar from 'components/EmojiAvatar'
import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { ClassName, ClassNameProp } from 'types/Props'

const defaultFallback = (
  address?: string | undefined,
  className?: ClassName
) => <EmojiAvatar address={address} className={className} />

export default function ({
  address,
  imgUrl,
  fallback = defaultFallback,
  className = 'rounded-3xl',
  size = 10,
}: {
  address?: string
  imgUrl?: string | undefined
  fallback?: (
    address?: string | undefined,
    className?: ClassName
  ) => JSX.Element
  size?: number
} & ClassNameProp) {
  const [imgLoadError, setImgLoadError] = useState(false)

  const imageStyles = `w-${size} h-${size} ${className}`

  if (!imgUrl || imgLoadError)
    return <div className={imageStyles}>{fallback(address, className)}</div>

  return (
    <div className={`relative ${imageStyles} `}>
      <img
        src={imgUrl}
        className={`absolute z-10 my-0 ${imageStyles}`}
        onError={() => {
          setImgLoadError(true)
        }}
        loading="lazy"
      />
      <div className={`absolute z-0 ${imageStyles}`}>
        {fallback(address, className)}
      </div>
    </div>
  )
}
