import { User } from '@privy-io/react-auth'
import truncateString from 'helpers/truncateString'
import useFcAccount from 'helpers/useFcAccount'
import { Suspense } from 'preact/compat'
import DotsLoader from './icons/DotsLoader'

interface FcNameProps {
  user: User | null
  address?: string | undefined
}

function FcName({
  displayName,
  address,
  pfp,
}: {
  displayName?: string | undefined | null
  address?: string | undefined
  pfp?: string | undefined | null
}) {
  const { data } = useFcAccount(address, pfp)

  const name = truncateString({
    fullString: displayName || data?.username || address,
    backChars: 5,
  })

  return <div className="hidden md:block opacity-70">{name}</div>
}

export default function ({ user, address }: FcNameProps) {
  const displayName = user?.farcaster?.displayName
  const pfp = user?.farcaster?.pfp

  return (
    <Suspense fallback={<DotsLoader />}>
      <FcName displayName={displayName} pfp={pfp} address={address} />
    </Suspense>
  )
}
