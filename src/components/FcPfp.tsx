import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'
import { useState } from 'preact/hooks'
import { Suspense } from 'preact/compat'

const imageStyles = 'w-10 h-10 rounded-3xl'

type FcPfpProps = {
  address?: string | undefined
  pfpUrl?: string | null | undefined
}

function SuspendedFcPfp({ address, pfpUrl }: FcPfpProps) {
  const [imgLoadError, setImgLoadError] = useState(false)
  const { data } = useFcAccount(address, pfpUrl)

  if (!address && !pfpUrl) return null

  const pfp = data ? data.fcPfpLink : ''

  if (!pfp || imgLoadError)
    return (
      <div className={imageStyles}>
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

export default function (props: FcPfpProps) {
  return (
    <Suspense fallback={<EmojiAvatar address={props.address} />}>
      <SuspendedFcPfp {...props} />
    </Suspense>
  )
}
