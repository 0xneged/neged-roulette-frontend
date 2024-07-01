import { Suspense } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import BiPeople from 'components/BiPeople'
import HatIcon from 'components/icons/HatIcon'
import PreviousRoundResult from 'components/Main/PreviousRoundResult'
import Round from 'types/Round'
import getPercentFromTime from 'helpers/getPercentFromTime'
import padZeros from 'helpers/padZeros'
import useCountDown from 'helpers/hooks/useCountDown'

function InnerComponent({ round }: { round: Round }) {
  const { minutes, seconds } = useCountDown(round.endTime)
  const participants = new Set(round.deposits.map(({ address }) => address))

  const itSpins = minutes < 0 && seconds < 0

  return (
    <>
      <span className={itSpins ? 'font-bold' : 'opacity-25'}>
        {itSpins ? "Let's roll 🤟" : 'Start of the round'}
      </span>
      <span className="font-bold text-white text-3xl">
        {itSpins ? '' : padZeros(minutes) + ':' + padZeros(seconds)}
      </span>
      <div className="flex flex-row text-white items-center">
        <BiPeople /> {participants.size}
      </div>
    </>
  )
}

export default function ({ round }: { round: Round | null }) {
  const [roundProgress, setRoundProgress] = useState(0)

  const isRoundStarted = !!round

  useEffect(() => {
    if (!isRoundStarted) return

    const interval = setInterval(() => {
      const percent = getPercentFromTime(round.startTime, round.endTime)
      if (percent <= 100) setRoundProgress(percent)
      else {
        setRoundProgress(100)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [round?.startTime, round?.endTime, isRoundStarted])

  return (
    <div className="relative">
      <img src="img/neged-hat.png" />
      {isRoundStarted ? (
        <>
          <div
            style={{
              height: 100 - roundProgress + '%',
              backgroundColor: '#F9BC6080',
            }}
            className="absolute w-full top-0 mask-hat"
          />
          <div
            style={{
              height: roundProgress + '%',
              backgroundColor: '#60F0F980',
              maskPosition: 'bottom',
            }}
            className="absolute w-full bottom-0 mask-hat"
          />
        </>
      ) : null}

      <div className="absolute top-1/2 flex flex-col justify-center w-full items-center">
        {isRoundStarted ? (
          <InnerComponent round={round} />
        ) : (
          <Suspense fallback={<HatIcon rotateAnimation />}>
            <PreviousRoundResult />
          </Suspense>
        )}
      </div>
    </div>
  )
}
