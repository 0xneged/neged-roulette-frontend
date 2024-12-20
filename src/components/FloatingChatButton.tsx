import { usePrivy } from '@privy-io/react-auth'
import ChatModal from 'components/Modals/ChatModal'
import { useState } from 'preact/hooks'

export default function () {
  const { ready, authenticated } = usePrivy()
  const [modalOpen, setModalOpen] = useState(false)

  if (!ready || !authenticated) return null

  return (
    <>
      <button
        style={{ display: 'none' }}
        className="flex items-center z-20 justify-center rounded-full disabled:bg-opacity-40 bg-primary-bright hover:bg-primary-dark active:bg-hat drop-shadow-xl transition-colors fixed left-4 md:left-10 bottom-5 h-12 w-10 md:h-24 md:w-20 md:text-4xl"
        onClick={() => setModalOpen(true)}
      >
        💬
      </button>
      <ChatModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}
