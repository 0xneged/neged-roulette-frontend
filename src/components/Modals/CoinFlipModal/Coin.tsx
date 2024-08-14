import 'components/Modals/CoinFlipModal/coin.css'

import PlayerPfp from 'components/CoinFlipGame/PlayerPfp'
import useCountDown from 'helpers/hooks/useCountDown'
import CoinFlipGame from 'types/CoinFlipGame'

const edgeDetailLevel = 64

export default function ({ user1, user2, winner, endTime }: CoinFlipGame) {
  const { seconds, milliSeconds } = useCountDown(endTime, 77)

  const coinEdges = [...Array(edgeDetailLevel)].map((_, index) => (
    <figure
      className="side"
      style={{
        transform: `translate3d(-50%, -50%, 0) rotateY(90deg) rotateX(${(360 / edgeDetailLevel) * index}deg) translateZ(4.9em)`,
      }}
    />
  ))

  return (
    <>
      <div class="coin-wrapper">
        <div class="coin euro">
          <div class="face front">
            <div class="symbol">
              <PlayerPfp
                user={user1}
                size={32}
                isWinner={user1.address === winner?.address}
              />
            </div>
          </div>
          <div class="face back">
            <div class="symbol">
              {user2 ? (
                <PlayerPfp
                  user={user2}
                  size={32}
                  isWinner={user2.address === winner?.address}
                />
              ) : (
                <span className="text-9xl">?</span>
              )}
            </div>
          </div>
          {coinEdges}
        </div>
      </div>
      <span>
        Till end: {seconds}.{milliSeconds}
      </span>
    </>
  )
}
