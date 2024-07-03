import { Button as FlowBiteButton } from 'flowbite-react'
import { Suspense, useCallback } from 'preact/compat'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import DefaultModal from 'components/Modals/DefaultModal'
import DotsLoader from 'components/icons/DotsLoader'
import ModalProps from 'types/ModalProps'
import isMobile from 'helpers/isMobile'
import useReferrer from 'helpers/hooks/useReferrer'
import vibrate from 'helpers/vibrate'

interface AccountModalInner {
  address: string
  logout: () => Promise<void>
}

interface AccountModalProps extends AccountModalInner, ModalProps {}

function BodyContentSuspended({ address }: { address: string }) {
  const referrer = useReferrer(address)

  return (
    <span className="text-primary font-bold text-lg w-full">{referrer}</span>
  )
}

function BodyContent({ address }: { address: string }) {
  return (
    <div className="flex flex-col w-full">
      <span className="text-white mr-1">Your referrer:</span>
      <Suspense fallback={DotsLoader}>
        <BodyContentSuspended address={address} />
      </Suspense>
    </div>
  )
}

function ModalFooter({
  address,
  logout,
  closeModal,
}: AccountModalInner & { closeModal: () => void }) {
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

  const shareOnClick = useCallback(async () => {
    const url = document.location.origin + '?ref=' + address
    if (isMobile) {
      await navigator.share({
        title: 'Try your 🍀 at negeD game 😏',
        url,
      })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Copied 😎')
    }
  }, [address])

  const ShareButton = () => (
    <Button onClick={shareOnClick} bgHat>
      Share your referral
    </Button>
  )

  return (
    <>
      <LogoutButton />
      <ShareButton />
    </>
  )
}

export default function ({
  address,
  modalOpen,
  setModalOpen,
  logout,
}: AccountModalProps) {
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <DefaultModal
      headerText="Your account"
      bodyContent={<BodyContent address={address} />}
      footerContent={
        <ModalFooter
          logout={logout}
          address={address}
          closeModal={closeModal}
        />
      }
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
