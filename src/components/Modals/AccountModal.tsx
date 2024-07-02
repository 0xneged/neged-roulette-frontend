import ModalProps from 'types/ModalProps'
import DefaultModal from './DefaultModal'
import useReferrer from 'helpers/hooks/useReferrer'
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'preact/compat'
import DotsLoader from 'components/icons/DotsLoader'
import { Button as FlowBiteButton } from 'flowbite-react'
import ethAddressRegex from 'helpers/ethAddressRegex'
import Button from 'components/Button'
import { postNewReferrer } from 'helpers/api/referral'
import { toast } from 'react-toastify'
import Input from 'components/Input'

interface AccountModalProps extends ModalProps {
  address: string
  logout: () => Promise<void>
}

function BodyContent({ address }: { address: string }) {
  const referrer = useReferrer(address)
  const [inputReferrer, setInputReferrer] = useState(referrer)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputReferrer(referrer)
  }, [referrer])

  const updateReferrer = useCallback(() => {
    const update = async () => {
      if (!inputReferrer) return
      if (inputReferrer.toLowerCase() == address.toLowerCase()) {
        toast.error("You can't refer yourself ⛈")
        return
      }
      try {
        setLoading(true)
        await postNewReferrer(inputReferrer, address)
        toast.success('Updated referrer 🎉')
      } catch (e) {
        console.error(e)
        toast.error('Error :( Please try again')
      } finally {
        setLoading(false)
      }
    }

    void update()
  }, [inputReferrer, address])

  return (
    <div className="flex flex-row justify-between items-center gap-x-2">
      <div className="flex flex-col w-full">
        <span className="text-white mr-1">Your referrer:</span>
        <Input
          value={inputReferrer}
          onChange={(e) => setInputReferrer(e.currentTarget.value)}
          pattern={ethAddressRegex}
          className="!text-lg !w-full"
          ref={inputRef}
        />
      </div>
      <Button onClick={updateReferrer} loading={loading}>
        Update
      </Button>
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
