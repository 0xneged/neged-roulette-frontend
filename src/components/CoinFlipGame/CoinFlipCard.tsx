import CoinFlipGame from 'types/CoinFlipGame'

export default function ({
  betAmount,
  status,
  user1,
  endTime,
  user2,
  winner,
}: CoinFlipGame) {
  return (
    <div className="p-4 bg-primary">
      {user1.fcUsername || user1.address}
      {betAmount}
    </div>
  )
}
