import { Button as FlowBiteButton } from 'flowbite-react'
import { Suspense, useCallback } from 'preact/compat'
import DefaultModal from 'components/Modals/DefaultModal'
import DotsLoader from 'components/icons/DotsLoader'
import ModalProps from 'types/ModalProps'
import ethAddressRegex from 'helpers/ethAddressRegex'
import useReferrer from 'helpers/hooks/useReferrer'

interface AccountModalProps extends ModalProps {
  address: string
  logout: () => Promise<void>
}

function BodyContent({ address }: { address: string }) {
  const referrer = useReferrer(address)

  return (
    <div className="flex flex-col w-full">
      <span className="text-white mr-1">Your referrer:</span>
      <span
        pattern={ethAddressRegex}
        className="text-primary font-bold text-lg w-full"
      >
        {referrer}
      </span>
    </div>
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
      bodyContent={
        <Suspense fallback={DotsLoader}>
          <BodyContent address={address} />
        </Suspense>
      }
      footerContent={FlowBiteButton({
        onClick: async () => {
          await logout()
          closeModal()
        },
        color: 'red',
        children: 'Logout',
      })}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
