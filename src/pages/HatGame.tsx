import { useAutoAnimate } from '@formkit/auto-animate/preact'
import HatGameTabs from 'components/Main/HatGameTabs'
import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import RoomTypeSwitch from 'components/RoomTypeSwitch'
import TopWin from 'components/TopWin'
import useRound from 'helpers/hooks/hatGame/useRound'
import useAuthToken from 'helpers/hooks/useAuthToken'
import { useEffect } from 'preact/hooks'

export default function () {
  useAuthToken()
  const [parent] = useAutoAnimate()
  const { roundType, setRoundType } = useRound()

  useEffect(() => {
    // preload
    const img = new Image()
    img.src = 'img/neged-hat.webp'
  }, [])

  return (
    <div ref={parent}>
      <TopWin />
      <RoomTypeSwitch
        roundType={roundType}
        setRoundType={setRoundType}
        tabHeaders={['Newbie Hat (1-1K)', 'Based Hat (1K-50K)']}
      />
      <Roulette />
      <TotalBets />
      <RoundStats />
      <YourBets />
      <HatGameTabs />
    </div>
  )
}
