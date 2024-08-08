import { usePrivy } from '@privy-io/react-auth'
import GmModal from 'components/Modals/GmModal'
import { useState } from 'preact/hooks'

export default function () {
  const { ready, authenticated, user } = usePrivy()
  const [modalOpen, setModalOpen] = useState(false)

  const address = user?.wallet?.address.toLowerCase()

  if (!ready || !authenticated || !address) return null

  return (
    <>
      <button
        className="flex z-20 items-center justify-center rounded-full disabled:bg-opacity-40 bg-yellow-200 disabled:bg-yellow-500 fixed right-4 md:right-10 bottom-5 h-12 w-10 md:h-24 md:w-20 md:text-4xl gm-button"
        onClick={() => setModalOpen(true)}
      >
        🔥
      </button>
      <GmModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        address={address}
      />
    </>
  )
}
