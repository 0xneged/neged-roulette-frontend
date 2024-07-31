import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'preact/hooks'
import GmModal from 'components/Modals/GmModal'

export default function () {
  const { ready, authenticated } = usePrivy()
  const [modalOpen, setModalOpen] = useState(false)

  if (!ready || !authenticated) return null

  return (
    <>
      <button
        className="flex items-center justify-center rounded-full bg-opacity-70 disabled:bg-opacity-40 bg-yellow-200 disabled:bg-yellow-500 fixed right-4 md:right-10 bottom-5 h-12 w-10 md:h-24 md:w-20 md:text-4xl gm-button"
        onClick={() => setModalOpen(true)}
      >
        🔥
      </button>
      <GmModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}
