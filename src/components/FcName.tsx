import { Suspense } from 'preact/compat'
import DotsLoader from 'components/icons/DotsLoader'
import truncateString from 'helpers/truncateString'
import useFcAccount from 'helpers/hooks/useFcAccount'

interface FcNameProps {
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

export default function ({ address }: FcNameProps) {
  return (
    <Suspense fallback={<DotsLoader />}>
      <FcName address={address} />
    </Suspense>
  )
}
