import PlayerPfp from 'components/CoinFlipGame/PlayerPfp'
import HatIcon from 'components/icons/HatIcon'
import CoinFlipGame, { CoinFlipGameStatus } from 'types/CoinFlipGame'

export default function ({
  betAmount,
  status,
  user1,
  user2,
  winner,
  onClick,
}: CoinFlipGame & { onClick: () => void }) {
  const isFinished = status === CoinFlipGameStatus.finished
  const opacity = isFinished ? 'opacity-50' : 'opacity-100'
  const hover = isFinished
    ? ''
    : 'hover:from-hat-alt hover:border-secondary cursor-pointer'

  return (
    <div
      className={`flex flex-col items-center gap-y-2 w-full h-full justify-center p-3 bg-gradient-to-tr from-pale-purple transition-colors border-2 border-primary rounded-lg ${hover} ${opacity}`}
      onClick={() => {
        if (isFinished) return
        onClick()
      }}
    >
      <div className="flex flex-row">
        <PlayerPfp user={user1} isWinner={user1.address === winner?.address} />
        <PlayerPfp user={user2} isWinner={user2?.address === winner?.address} />
      </div>

      <div className="flex items-center gap-x-2">
        {betAmount}
        <HatIcon />
      </div>
    </div>
  )
}
