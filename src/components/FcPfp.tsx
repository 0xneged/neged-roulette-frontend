import useFcAccount from 'helpers/useFcAccount'
import EmojiAvatar from './EmojiAvatar'
import { useState } from 'preact/hooks'
import { Suspense } from 'preact/compat'
import PfpWithFallback from './PfpWithFallback'

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
