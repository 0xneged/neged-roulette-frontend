import { addToMorningStreak } from 'helpers/api/morningStreak'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import BigButton from 'components/BigButton'
import DefaultModal from 'components/Modals/DefaultModal'
import HatIcon from 'components/icons/HatIcon'
import ModalProps from 'types/ModalProps'
import MorningStreakResponse from 'types/MorningStreak'

type MorningStreakProp = { streakData: MorningStreakResponse }

function HatGridBlock({
  amount = 50,
  claimed,
  currentClaim,
}: {
  amount?: number
  claimed: boolean
  currentClaim: boolean
}) {
  const colSpan = amount === 500 ? ' col-span-2' : ''
  const claimedStyle = claimed
    ? 'text-primary-bright border-primary-bright'
    : 'border-white text-white'

  return (
    <div
      className={
        'relative flex flex-col items-center justify-center gap-y-1 border rounded-md p-4 ' +
        claimedStyle +
        colSpan
      }
    >
      <HatIcon />
      <span>{amount}</span>
      {currentClaim ? (
        <img
          className="absolute h-full w-full right-1 -z-0"
          src="/img/fireAnimated.svg"
        />
      ) : null}
    </div>
  )
}
function ModalBody({ streakData }: MorningStreakProp) {
  const maxSteak = 7

  return (
    <div className="grid grid-cols-4 gap-2 items-center justify-center">
      {Array.from(Array(maxSteak)).map((_val, index) => (
        <HatGridBlock
          claimed={streakData.morningStreak > index}
          currentClaim={streakData.morningStreak === index}
          amount={index === 6 ? 500 : 50}
        />
      ))}
    </div>
  )
}

function ModalFooter() {
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await addToMorningStreak()
    } catch (e) {
      console.error(e)
      toast.error('Ooof, please try GM again 😥')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <BigButton loading={loading} onClick={onClick} exClassName="w-full">
      GM 🔥
    </BigButton>
  )
}

export default function ({
  streakData,
  modalOpen,
  setModalOpen,
}: ModalProps & MorningStreakProp) {
  return (
    <DefaultModal
      header="GM Streak"
      bodyContent={<ModalBody streakData={streakData} />}
      footerContent={<ModalFooter />}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
