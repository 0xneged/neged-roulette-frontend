import DotsLoader from 'components/icons/DotsLoader'
import useUserAccount from 'helpers/hooks/useUserAccount'
import truncateString from 'helpers/truncateString'
import { Suspense } from 'preact/compat'

interface FcNameProps {
  address?: string | undefined
}

function Name({ name }: { name?: string | undefined }) {
  const truncated = truncateString({
    fullString: name,
    backChars: 5,
  })

  return <div className="hidden md:block opacity-70">{truncated}</div>
}

function FcName({ address }: { address: string }) {
  const { data } = useUserAccount(address)

  const name = data?.fcUsername || address

  return <Name name={name} />
}

export default function ({ address }: FcNameProps) {
  if (!address) return <Name name={address} />

  return (
    <Suspense fallback={<DotsLoader />}>
      <FcName address={address} />
    </Suspense>
  )
}
