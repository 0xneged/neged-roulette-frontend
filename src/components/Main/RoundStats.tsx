import Round from 'types/Round'
import BiPeople from '../BiPeople'
import HatIcon from 'components/icons/HatIcon'
import useCountDown from 'helpers/hooks/useCountDown'
import getPercentFromTime from 'helpers/getPercentFromTime'
import padZeros from 'helpers/padZeros'

function InnerComponent({ round }: { round: Round }) {
  const { minutes, seconds } = useCountDown(round.endTime)
  const participants = new Set(round.deposits.map(({ address }) => address))

  return (
    <>
      <span className="opacity-25 text-white">start of the round</span>
      <span className="font-bold text-white text-3xl">
        {padZeros(minutes)}:{padZeros(seconds)}
      </span>
      <div className="flex flex-row text-white items-center">
        <BiPeople /> {participants.size}
      </div>
    </>
  )
}

export default function ({ round }: { round: Round | null }) {
  const isRoundStarted = !!round
  const roundProgress = isRoundStarted
    ? getPercentFromTime(round.startTime, round.endTime)
    : 0

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
          <HatIcon rotateAnimation />
        )}
      </div>
    </div>
  )
}
