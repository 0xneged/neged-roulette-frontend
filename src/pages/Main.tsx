import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'

export default function () {
  return (
    <>
      <Roulette />
      <TotalBets />
      <RoundStats />
      <YourBets />
    </>
  )
}
