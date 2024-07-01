import { Button as FlowBitButton, Modal, useThemeMode } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'preact/hooks'
import EthAddress from 'types/EthAddress'
import queryClient from 'helpers/queryClient'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import useSocket from 'helpers/useSocket'

export default function ({
  address,
  modalOpen,
  setModalOpen,
}: {
  address: EthAddress | string | undefined
  modalOpen: boolean
  setModalOpen: (is: boolean) => void
}) {
  const socket = useSocket()
  const [betValue, setBetValue] = useState(1)
  const mode = useThemeMode()
  const userHats = useHatsCounter(address)

  useEffect(() => {
    mode.setMode('dark')
  }, [mode])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const placeBet = useCallback(() => {
    if (socket && address && betValue > 0) {
      socket.emit('placeBet', { address, amount: betValue })
      void queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
    }

    closeModal()
  }, [address, betValue, closeModal, socket])

  const max = userHats?.toFixed(0) || 1000

  return (
    <Modal
      dismissible
      show={modalOpen}
      onClose={closeModal}
      theme={{ content: { inner: 'rounded-2xl' } }}
    >
      <Modal.Header className="bg-primary-bg rounded-t-2xl">
        <h2 className="text-3xl font-script text-primary-bright">
          Place a bet
        </h2>
      </Modal.Header>
      <Modal.Body className="bg-primary-bg">
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
      </Modal.Body>
      <Modal.Footer className="bg-primary-bg rounded-b-2xl justify-between">
        <span className="text-gray-400">
          {betValue} Hat{betValue > 1 ? 's' : ''}
        </span>
        {FlowBitButton({
          onClick: placeBet,
          color: 'purple',
          children: 'Accept',
        })}
      </Modal.Footer>
    </Modal>
  )
}
