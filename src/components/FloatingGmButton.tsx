import { useState } from 'preact/hooks'
import GmModal from 'components/Modals/GmModal'
import useMorningStreak from 'helpers/hooks/useMorningStreak'

export default function () {
  const { data } = useMorningStreak()
  const [modalOpen, setModalOpen] = useState(false)

  if (!data) return null

  const isAvailable = new Date() > new Date(data.morningStreakTimeout)

  if (!isAvailable) return null

  return (
    <>
      <button
        className="flex items-center justify-center rounded-full bg-opacity-70 disabled:bg-opacity-40 bg-yellow-200 disabled:bg-yellow-500 fixed right-10 bottom-5 h-12 w-10 md:h-24 md:w-20 md:text-4xl gm-button"
        onClick={() => setModalOpen(true)}
      >
        🔥
      </button>
      <GmModal
        streakData={data}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}
