import { useAutoAnimate } from '@formkit/auto-animate/preact'
import FloatingChatButton from 'components/FloatingChatButton'
import FloatingGmButton from 'components/FloatingGmButton'
import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import RoundTab from 'components/Main/RoundTab'
import RoundTypeSwitch from 'components/Main/RoundTypeSwitch'
import TopWin from 'components/TopWin'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import useAuthToken from 'helpers/hooks/useAuthToken'

export default function () {
  useAuthToken()
  const [parent] = useAutoAnimate()

  return (
    <>
      <div ref={parent}>
        <TopWin />
        <RoundTypeSwitch />
        <Roulette />
        <TotalBets />
        <RoundStats />
        <YourBets />
        <RoundTab />
      </div>
      <FloatingGmButton />
      <FloatingChatButton />
    </>
  )
}
