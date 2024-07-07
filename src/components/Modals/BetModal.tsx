import { Button as FlowBiteButton } from 'flowbite-react'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import DefaultModal from 'components/Modals/DefaultModal'
import EthAddress from 'types/EthAddress'
import ModalProps from 'types/ModalProps'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'
import useSocket from 'helpers/hooks/useSocket'

interface BetModalProps extends ModalProps {
  address: EthAddress | string | undefined
  userHats: number | undefined
  userDeposit: { amount: number; chance: string }
}

const maxDeposit = env.MAX_DEPOSIT_PER_PLAYER

export default function ({
  address,
  modalOpen,
  setModalOpen,
  userHats,
  userDeposit,
}: BetModalProps) {
  const socket = useSocket()
  const [betValue, setBetValue] = useState(1)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const placeBet = useCallback(() => {
    if (userDeposit.amount >= maxDeposit) {
      toast.error(`You can't deposit more than ${maxDeposit} HATs`)
      closeModal()
    }

    if (socket && address && betValue > 0) {
      socket.emit('placeBet', { address, amount: betValue })

      // Wait for DB update
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
      }, 500)
      closeModal()
    }
  }, [address, betValue, closeModal, socket, userDeposit])

  const max = userHats
    ? userHats > maxDeposit
      ? maxDeposit
      : userHats.toFixed(0)
    : 1000

  const BodyContent = (
    <div class="relative mb-6">
      <label for="labels-range-input" class="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value={betValue}
        min={1}
        max={max}
        class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        onChange={(e) => setBetValue(e.currentTarget.valueAsNumber)}
      />
      <span class="text-sm text-gray-400 absolute start-0 -bottom-6">
        1 Hat
      </span>
      <span class="text-sm text-gray-400 absolute end-0 -bottom-6">
        {max} Hats
      </span>
    </div>
  )

  const FooterContent = (
    <>
      <span className="text-gray-400">
        {betValue} Hat{betValue > 1 ? 's' : ''}
      </span>
      {FlowBiteButton({
        onClick: placeBet,
        color: 'purple',
        children: 'Accept',
      })}
    </>
  )

  return (
    <DefaultModal
      headerText="Place a bet"
      bodyContent={BodyContent}
      footerContent={FooterContent}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
