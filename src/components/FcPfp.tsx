import { Suspense } from 'preact/compat'
import EmojiAvatar from 'components/EmojiAvatar'
import PfpWithFallback from 'components/PfpWithFallback'
import useFcAccount from 'helpers/hooks/useFcAccount'

type FcPfpProps = {
  address?: string | undefined
  pfpUrl?: string | null | undefined
}

function SuspendedFcPfp({ address }: { address: string }) {
  const { data } = useFcAccount(address)

  const pfp = data?.fcPfpLink

  return <PfpWithFallback address={address} pfpUrl={pfp} />
}

export default function ({ address, pfpUrl }: FcPfpProps) {
  if (!address) return null
  if (pfpUrl) return <PfpWithFallback address={address} pfpUrl={pfpUrl} />

  return (
    <Suspense fallback={<EmojiAvatar address={address} />}>
      <SuspendedFcPfp address={address} />
    </Suspense>
  )
}
