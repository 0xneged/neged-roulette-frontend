import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useSearch } from 'wouter-preact'
import { useState } from 'preact/hooks'
import CustomConnectButton from 'components/CustomConnectButton'
import FaqIcon from 'components/icons/FaqIcon'
import FaqModal from 'components/Modals/FaqModal'
import Logo from 'components/Logo'
import useReferralQuery from 'helpers/hooks/useReferralQuery'

export default function () {
  const [parent] = useAutoAnimate()
  const [faqModalOpen, setFaqModalOpen] = useState(false)

  const searchString = useSearch()
  useReferralQuery(searchString)

  return (
    <>
      <div
        className="sticky top-0 z-20 backdrop-blur-md px-5 py-3 flex-row flex items-center justify-between"
        ref={parent}
      >
        <Logo />
        <div className="flex flex-row gap-x-2">
          <FaqIcon onClick={() => setFaqModalOpen(true)} />
          <CustomConnectButton />
        </div>
      </div>

      <FaqModal modalOpen={faqModalOpen} setModalOpen={setFaqModalOpen} />
    </>
  )
}
