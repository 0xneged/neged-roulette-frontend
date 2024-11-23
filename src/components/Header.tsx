import { useAutoAnimate } from '@formkit/auto-animate/preact'
import CustomConnectButton from 'components/CustomConnectButton'
import Logo from 'components/Logo'
import useReferralQuery from 'helpers/hooks/useReferralQuery'
import { useSearch } from 'wouter-preact'

export default function () {
  const [parent] = useAutoAnimate()

  const searchString = useSearch()
  useReferralQuery(searchString)

  return (
    <>
      <div
        className="sticky top-0 z-20 bg-primary-bg xl:bg-transparent xl:backdrop-blur-sm backdrop-brightness-90 md:backdrop-brightness-100 px-5 py-3 flex-row flex items-center justify-between"
        ref={parent}
      >
        <Logo />
        <div className="flex flex-row gap-x-2">
          <CustomConnectButton />
        </div>
      </div>
    </>
  )
}
