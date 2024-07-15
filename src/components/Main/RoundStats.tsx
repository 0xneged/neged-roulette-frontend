import { RoundWithTime } from 'types/Round'
import { Suspense } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import BiPeople from 'components/icons/BiPeople'
import HatIcon from 'components/icons/HatIcon'
import PreviousRoundResult from 'components/Main/PreviousRoundResult'
import getPercentFromTime from 'helpers/numbers/getPercentFromTime'
import padZeros from 'helpers/numbers/padZeros'
import useCountDown from 'helpers/hooks/useCountDown'
import useRound from 'helpers/hooks/useRound'

function InnerComponent({ round }: { round: RoundWithTime }) {
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

export default function () {
  const { data, roundType } = useRound()
  const [roundProgress, setRoundProgress] = useState(0)

  const round = data?.currentRound
  const roundHasStarted = round && round.startTime && round.endTime

  useEffect(() => {
    if (!roundHasStarted) return

    const interval = setInterval(() => {
      if (!round || !round.startTime || !round.endTime) return
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
  }, [round?.startTime, round?.endTime, round, roundHasStarted])

  return (
    <div className="relative">
      <img
        src="img/neged-hat.png"
        className={
          roundType ? 'transition-transform' : 'scale-90 transition-transform'
        }
      />
      {roundHasStarted ? (
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
        {round ? (
          roundHasStarted ? (
            <InnerComponent round={round as RoundWithTime} />
          ) : (
            <>
              <span className="font-bold mb-2">Waiting for second bet</span>
              <HatIcon rotateAnimation />
            </>
          )
        ) : (
          <Suspense fallback={<HatIcon rotateAnimation />}>
            <PreviousRoundResult />
          </Suspense>
        )}
      </div>
    </div>
  )
}
