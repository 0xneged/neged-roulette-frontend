import { Button as FlowBiteButton } from 'flowbite-react'
import { useCallback } from 'preact/compat'
import DefaultModal from 'components/Modals/DefaultModal'
import DotsLoader from 'components/icons/DotsLoader'
import FaqIcon from 'components/icons/FaqIcon'
import ModalProps from 'types/ModalProps'
import ShareRefButton from 'components/ShareRefButton'
import useReferrer from 'helpers/hooks/useReferrer'
import vibrate from 'helpers/vibrate'

type AddressProp = { address: string }

interface AccountModalInner extends AddressProp {
  logout: () => Promise<void>
  setOpenShareFaq: () => void
}

interface AccountModalProps extends AccountModalInner, ModalProps {}

function StyledAddress({ address }: { address?: string | undefined }) {
  return (
    <span className="!text-primary font-bold text-lg truncate">{address}</span>
  )
}

function YourReferrer({ address }: AddressProp) {
  const { data, status } = useReferrer(address)

  return (
    <div className="flex flex-row gap-x-2 justify-between items-center">
      <span>Your referrer</span>
      {status === 'pending' || !data ? (
        <DotsLoader />
      ) : (
        <StyledAddress address={data} />
      )}
    </div>
  )
}

function BodyContent({ address }: AddressProp) {
  return (
    <div className="flex flex-col w-full gap-y-2 text-white leading-tight">
      <YourReferrer address={address} />
    </div>
  )
}

function ModalFooter({
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

export default function ({
  address,
  modalOpen,
  setModalOpen,
  logout,
  setOpenShareFaq,
}: AccountModalProps) {
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <DefaultModal
      header="Your account"
      bodyContent={<BodyContent address={address} />}
      footerContent={
        <ModalFooter
          logout={logout}
          address={address}
          closeModal={closeModal}
          setOpenShareFaq={() => {
            closeModal()
            setOpenShareFaq()
          }}
        />
      }
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
