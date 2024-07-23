import { addToMorningStreak } from 'helpers/api/morningStreak'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import { useTimer } from 'react-timer-hook'
import BigButton from 'components/BigButton'
import DefaultModal from 'components/Modals/DefaultModal'
import HatIcon from 'components/icons/HatIcon'
import ModalLoader from 'components/Modals/ModalLoader'
import ModalProps from 'types/ModalProps'
import MorningStreakResponse from 'types/MorningStreak'
import padZeros from 'helpers/numbers/padZeros'
import useMorningStreak from 'helpers/hooks/useMorningStreak'

function StreakTime({ morningStreakTimeout }: MorningStreakResponse) {
  const dateTimeout = new Date(morningStreakTimeout)

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: dateTimeout,
    autoStart: true,
  })
  const expired = hours === 0 && minutes === 0 && seconds === 0

  if (expired) return null

  return (
    <span>
      Until next claim {padZeros(hours)}:{padZeros(minutes)}:{padZeros(seconds)}
    </span>
  )
}

function Announcement() {
  return (
    <div className="flex flex-col items-center justify-center mt-4 text-white bg-hat py-2 px-3 rounded-3xl">
      <h2 className="text-xl font-bold">50,000 Hats daily raffle! </h2>
      <p className="text-center">
        🎲 Every day at <b>15:00 UTC</b>, we will randomly select one player who
        has participated in the Based Hat game. Winners will be announced here:
        <a
          href="https://warpcast.com/neged"
          target="_blank"
          className="underline"
        >
          {' '}
          https://warpcast.com/neged
        </a>
      </p>
    </div>
  )
}
function HatGridBlock({
  amount = 50,
  claimed,
  currentClaim,
  onTimeout,
}: {
  amount?: number
  claimed: boolean
  currentClaim: boolean
  onTimeout: boolean
}) {
  const colSpan = amount === 500 ? ' col-span-2' : ''
  const currentOnTimeout = currentClaim && onTimeout
  const claimedStyle =
    claimed || currentOnTimeout
      ? 'text-primary-bright border-primary-bright'
      : 'border-white text-white'
  const opacity = currentOnTimeout ? 'opacity-30' : ''

  const className =
    opacity +
    ' relative flex flex-col items-center justify-center gap-y-1 border rounded-md p-4 ' +
    claimedStyle +
    colSpan

  return (
    <div className={className}>
      <HatIcon />
      <span>{amount}</span>
      {currentClaim && !onTimeout ? (
        <img
          className="absolute h-full w-full right-1 -z-0"
          src="/img/fireAnimated.svg"
        />
      ) : null}
    </div>
  )
}
function ModalBody({
  morningStreak,
  morningStreakTimeout,
}: MorningStreakResponse) {
  const maxSteak = 7
  const onTimeout = new Date(morningStreakTimeout) > new Date()

  return (
    <>
      <div className="grid grid-cols-4 gap-2 items-center justify-center">
        {Array.from(Array(maxSteak)).map((_val, index) => (
          <HatGridBlock
            claimed={morningStreak > index}
            currentClaim={morningStreak === index}
            amount={index === 6 ? 500 : 50}
            onTimeout={onTimeout}
          />
        ))}
      </div>
      <Announcement />
    </>
  )
}

function ModalFooter(data: MorningStreakResponse) {
  const [loading, setLoading] = useState(false)
  const onTimeout = new Date(data.morningStreakTimeout) > new Date()

  const onClick = useCallback(async () => {
    if (onTimeout) {
      toast.warn('Please wait until next claim')
      return
    }
    try {
      setLoading(true)
      await addToMorningStreak()
    } catch (e) {
      console.error(e)
      toast.error('Ooof, please try GM again 😥')
    } finally {
      setLoading(false)
    }
  }, [onTimeout])

  return (
    <BigButton
      disabled={onTimeout}
      loading={loading}
      onClick={onClick}
      exClassName="w-full"
    >
      {onTimeout ? <StreakTime {...data} /> : 'GM 🔥'}
    </BigButton>
  )
}

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  const { data, status } = useMorningStreak()

  const isPending = status === 'pending' || !data

  return (
    <DefaultModal
      header="GM Streak"
      bodyContent={isPending ? <ModalLoader /> : <ModalBody {...data} />}
      footerContent={data ? <ModalFooter {...data} /> : null}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
