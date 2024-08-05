import EmojiAvatar from 'components/EmojiAvatar'
import ImageWithFallback from 'components/ImageWithFallback'
import useUserAccount from 'helpers/hooks/useUserAccount'
import { Suspense } from 'preact/compat'

type FcPfpProps = {
  address?: string | undefined
  pfpUrl?: string | null | undefined
}

function SuspendedFcPfp({ address }: { address: string }) {
  const { data } = useUserAccount(address)

  return <ImageWithFallback address={address} imgUrl={data?.fcPfpLink} />
}

export default function ({ address, pfpUrl }: FcPfpProps) {
  if (!address) return null
  if (pfpUrl) return <ImageWithFallback address={address} imgUrl={pfpUrl} />

  return (
    <Suspense fallback={<EmojiAvatar address={address} />}>
      <SuspendedFcPfp address={address} />
    </Suspense>
  )
}
