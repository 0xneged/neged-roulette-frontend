import 'components/Modals/CoinFlipModal/coin.css'

import PlayerPfp from 'components/CoinFlipGame/PlayerPfp'
import getAccountLink from 'helpers/getAccountLink'
import useCountDown from 'helpers/hooks/useCountDown'
import CoinFlipGame from 'types/CoinFlipGame'

const edgeDetailLevel = 20

export default function ({ user1, user2, winner, endTime }: CoinFlipGame) {
  const { seconds, milliSeconds } = useCountDown(endTime, 1)

  const coinEdges = [...Array(edgeDetailLevel)].map((_, index) => (
    <figure
      className="side"
      style={{
        transform: `translate3d(-50%, -50%, 0) rotateY(90deg) rotateX(${(360 / edgeDetailLevel) * index}deg) translateZ(4.9em)`,
      }}
    />
  ))

  const animationDelay = winner
    ? '0s'
    : endTime
      ? `-${(seconds * 1000 + milliSeconds) * 2}ms`
      : '0s'

  const maskUser = !!(!winner && endTime && seconds < 4)

  return (
    <>
      <div class="coin-wrapper">
        <div
          class="coin euro"
          style={{
            animationDelay,
            animationDirection: 'linear',
            animationDuration: '2s',
            animationFillMode: 'both',
            animationIterationCount: endTime && !winner ? 10 : 'infinite',
            animationName: 'spinEuro',
            animationPlayState: endTime && !winner ? 'paused' : 'playing',
            animationTimingFunction: 'linear',
          }}
        >
          <div class="face front">
            <div class="symbol">
              <PlayerPfp
                user={winner || user1}
                size={32}
                maskUser={maskUser}
                isWinner={!!winner}
              />
            </div>
          </div>
          <div class="face back">
            <div class="symbol">
              {user2 ? (
                <PlayerPfp
                  user={winner || user2}
                  maskUser={maskUser}
                  size={32}
                  isWinner={!!winner}
                />
              ) : (
                <span className="text-9xl">?</span>
              )}
            </div>
          </div>
          {coinEdges}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full px-4">
        <a
          href={getAccountLink(user1.address, user1.fcUsername)}
          target="_blank"
          className="flex flex-row items-center gap-x-4 p-2 px-4 rounded-3xl md:bg-hat md:bg-opacity-50 hover:underline"
        >
          <PlayerPfp
            user={user1}
            size={12}
            isWinner={user1.address === winner?.address}
          />
          <span className="truncate hidden md:block w-32">
            {user1.fcUsername || user1.address}
          </span>
        </a>
        <span>{user2 ? `${seconds}.${milliSeconds}` : 'VS'}</span>
        <a
          href={getAccountLink(user2?.address, user2?.fcUsername)}
          target="_blank"
          className="flex flex-row items-center gap-x-4 p-2 px-4 rounded-3xl md:bg-hat md:bg-opacity-50 hover:underline"
        >
          <span className="truncate hidden md:block w-32 text-right">
            {user2?.fcUsername || user2?.address || '...'}
          </span>
          <PlayerPfp
            user={user2}
            size={12}
            isWinner={user2?.address === winner?.address}
          />
        </a>
      </div>
    </>
  )
}
