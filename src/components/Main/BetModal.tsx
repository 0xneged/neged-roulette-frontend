import { Button, Modal, useThemeMode } from 'flowbite-react'
import socket from 'helpers/api/socket'
import { useCallback, useEffect, useState } from 'preact/hooks'
import EthAddress from 'types/EthAddress'

export default function ({
  address,
  modalOpen,
  setModalOpen,
}: {
  address: EthAddress | string | undefined
  modalOpen: boolean
  setModalOpen: (is: boolean) => void
}) {
  const [betValue, setBetValue] = useState(500)
  const mode = useThemeMode()

  useEffect(() => {
    mode.setMode('dark')
  }, [mode])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const placeBet = useCallback(() => {
    if (address && betValue > 0)
      socket.emit('placeBet', { address, amount: betValue })

    closeModal()
  }, [address, betValue])

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
            min="1"
            max="1000"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
            onChange={(e) => setBetValue(e.currentTarget.valueAsNumber)}
          />
          <span class="text-sm text-gray-400 absolute start-0 -bottom-6">
            1 Hat
          </span>
          <span class="text-sm text-gray-400 absolute end-0 -bottom-6">
            1000 Hat
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-primary-bg rounded-b-2xl justify-between">
        <span className="text-gray-400">{betValue} Hat</span>
        <Button onClick={placeBet} color="purple">
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
