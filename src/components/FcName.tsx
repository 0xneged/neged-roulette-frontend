import { Suspense } from 'preact/compat'
import { User } from '@privy-io/react-auth'
import DotsLoader from 'components/icons/DotsLoader'
import truncateString from 'helpers/truncateString'
import useFcAccount from 'helpers/useFcAccount'

interface FcNameProps {
  user: User | null
  address?: string | undefined
}

function Name({ name }: { name?: string | undefined }) {
  return <div className="hidden md:block opacity-70">{name}</div>
}

function FcName({ address }: { address?: string | undefined }) {
  const { data } = useFcAccount(address)

  const name = truncateString({
    fullString: data?.fcUsername || address,
    backChars: 5,
  })

  return <Name name={name} />
}

export default function ({ user, address }: FcNameProps) {
  const displayName = user?.farcaster?.displayName
  if (displayName) return <Name name={displayName} />

  return (
    <Suspense fallback={<DotsLoader />}>
      <FcName address={address} />
    </Suspense>
  )
}
