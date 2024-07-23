import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import FloatingGmButton from 'components/FloatingGmButton'
import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import RoundTab from 'components/Main/RoundTab'
import RoundTypeSwitch from 'components/Main/RoundTypeSwitch'
import TopWin from 'components/TopWin'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import env from 'helpers/env'
import shownWelcomeAlertAtom from 'helpers/stores/userVariables'
import useAuthToken from 'helpers/hooks/useAuthToken'

export default function () {
  const [shownWelcomeAlert, setShownWelcomeAlertAtom] = useAtom(
    shownWelcomeAlertAtom
  )
  useAuthToken()
  const [parent] = useAutoAnimate()

  if (!env.DEV && !shownWelcomeAlert) {
    alert(
      'The game is currently in test mode.\nBy playing it, you accept the fact that there might be some bugs or malfunctions'
    )
    setShownWelcomeAlertAtom(true)
  }

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
    </>
  )
}
