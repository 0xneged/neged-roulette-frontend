import FaqIcon from 'components/icons/FaqIcon'
import HatIcon from 'components/icons/HatIcon'
import { AccountModalInner } from 'components/Modals/AccountModal/Props'
import ShareRefButton from 'components/ShareRefButton'
import { Button as FlowBiteButton } from 'flowbite-react'
import vibrate from 'helpers/vibrate'
import { useState } from 'preact/hooks'

export default function ({
  address,
  logout,
  closeModal,
  setOpenShareFaq,
}: AccountModalInner & {
  closeModal: () => void
}) {
  const [loading, setLoading] = useState(false)

  const LogoutButton = () =>
    FlowBiteButton({
      onClick: async () => {
        vibrate()
        setLoading(true)
        await logout()
        setLoading(false)
        closeModal()
      },
      color: 'red',
      children: 'Logout',
      isProcessing: loading,
      processingSpinner: <HatIcon rotateAnimation />,
    })

  const ShareButton = () => (
    <div className="hidden flex-row gap-x-2">
      <FaqIcon onClick={setOpenShareFaq} />
      <ShareRefButton address={address} />
    </div>
  )

  return (
    <>
      <LogoutButton />
      <ShareButton />
    </>
  )
}
