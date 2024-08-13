import CoinFlipCard from 'components/CoinFlipGame/CoinFlipCard'
import CreateCoinFlipRoom from 'components/CoinFlipGame/CreateCoinFlipRoom'
import useCoinFlipGames from 'helpers/hooks/coinFlip/useCoinFlipGames'

export default function () {
  const { data, status } = useCoinFlipGames()

  const isLoading = status === 'pending'

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="sticky top-20 w-full">
        <CreateCoinFlipRoom />
      </div>
      {data?.map(CoinFlipCard)}
    </div>
  )
}
