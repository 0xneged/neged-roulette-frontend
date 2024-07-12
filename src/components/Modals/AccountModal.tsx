import { Button as FlowBiteButton } from 'flowbite-react'
import { Tooltip } from 'flowbite-react'
import { useCallback } from 'preact/compat'
import DefaultModal from 'components/Modals/DefaultModal'
import DotsLoader from 'components/icons/DotsLoader'
import FaqIcon from 'components/icons/FaqIcon'
import ModalProps from 'types/ModalProps'
import ShareRefButton from 'components/ShareRefButton'
import getAccountLink from 'helpers/getAccountLink'
import useMorningStreak from 'helpers/hooks/useMorningStreak'
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
    <a
      className="!text-primary font-bold text-lg truncate"
      href={address ? getAccountLink(address) : ''}
    >
      {address}
    </a>
  )
}

function YourReferrer({ address }: AddressProp) {
  const { data, status } = useReferrer(address)

  if (status === 'pending') return <DotsLoader />

  return (
    <div className="flex flex-row gap-x-2 justify-between items-center">
      <span>Your referrer</span>
      <StyledAddress address={data} />
    </div>
  )
}

function MorningStreak() {
  const { data, status } = useMorningStreak()
  const maxSteak = 7

  return (
    <div className="flex flex-row gap-x-1 justify-between items-center leading-tight">
      <span>Your morning streak</span>
      {status === 'pending' || !data ? (
        <DotsLoader />
      ) : (
        <>
          {Array.from(Array(data.morningStreak)).map(() => (
            <span>🔥</span>
          ))}
          {Array.from(Array(maxSteak - data.morningStreak)).map(() => (
            <span className="grayscale">🔥</span>
          ))}
        </>
      )}
      <Tooltip
        content="For 1-6th days you get 50HATs. For 7th you get 500 HATs. Click the floating button when it appears"
        className="!bg-pale-purple text-primary-bright w-40"
      >
        <FaqIcon small />
      </Tooltip>
    </div>
  )
}

function BodyContent({ address }: AddressProp) {
  return (
    <div className="flex flex-col w-full gap-y-2 text-white leading-tight">
      <YourReferrer address={address} />
      <MorningStreak />
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
      headerText="Your account"
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
