import { Button as FlowBiteButton } from 'flowbite-react'
import { PropsWithChildren, useCallback } from 'preact/compat'
import { invalidateManyQueries } from 'helpers/queryClient'
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

function StyledAddress({
  label,
  children,
}: PropsWithChildren & { label: string }) {
  return (
    <div className="flex flex-row gap-x-2 justify-between items-center">
      <span>{label}</span>
      <span className="!text-primary font-bold text-lg truncate">
        {children}
      </span>
    </div>
  )
}

function YourAddress({ address }: AddressProp) {
  return <StyledAddress label="Your address">{address}</StyledAddress>
}

function YourReferrer({ address }: AddressProp) {
  const { data, status } = useReferrer(address)

  return (
    <StyledAddress label="Your referrer">
      {status === 'pending' ? <DotsLoader /> : data}
    </StyledAddress>
  )
}

function BodyContent({ address }: AddressProp) {
  return (
    <div className="flex flex-col w-full gap-y-2 text-white leading-tight">
      <YourReferrer address={address} />
      <YourAddress address={address} />
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

  const onLogout = useCallback(async () => {
    await logout()
    await invalidateManyQueries(['morningStreak', 'hatsCounter', 'referrer'])
  }, [logout])

  return (
    <DefaultModal
      header="Your account"
      bodyContent={<BodyContent address={address} />}
      footerContent={
        <ModalFooter
          logout={onLogout}
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
