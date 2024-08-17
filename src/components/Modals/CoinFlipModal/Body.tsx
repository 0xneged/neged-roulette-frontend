import Coin from 'components/Modals/CoinFlipModal/Coin'
import CoinFlipGame from 'types/CoinFlipGame'

export default function ({ room }: { room: CoinFlipGame }) {
  return (
    <div className="text-white flex flex-col justify-center items-center my-2">
      <Coin {...room} />
    </div>
  )
}
