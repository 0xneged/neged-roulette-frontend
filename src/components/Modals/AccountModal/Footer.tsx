import { AccountModalInner } from 'components/Modals/AccountModal/Props'
import { Button as FlowBiteButton } from 'flowbite-react'
import FaqIcon from 'components/icons/FaqIcon'
import ShareRefButton from 'components/ShareRefButton'
import vibrate from 'helpers/vibrate'

export default function ({
  address,
  logout,
  closeModal,
  setOpenShareFaq,
}: AccountModalInner & {
  closeModal: () => void
}) {
  const LogoutButton = () =>
    FlowBiteButton({
      onClick: async () => {
        vibrate()
        await logout()
        closeModal()
      },
      color: 'red',
      children: 'Logout',
    })

  const ShareButton = () => (
    <div className="flex flex-row gap-x-2">
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
