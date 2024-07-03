import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useSearch } from 'wouter-preact'
import CustomConnectButton from 'components/CustomConnectButton'
import Logo from 'components/Logo'
import useReferralQuery from 'helpers/hooks/useReferralQuery'

export default function () {
  const [parent] = useAutoAnimate()

  const searchString = useSearch()
  useReferralQuery(searchString)

  return (
    <div
      className="sticky top-0 z-10 backdrop-blur-md px-5 py-3 flex-row flex items-center justify-between"
      ref={parent}
    >
      <Logo />
      <CustomConnectButton />
    </div>
  )
}
