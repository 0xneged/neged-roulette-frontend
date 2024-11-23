import { useAutoAnimate } from '@formkit/auto-animate/preact'
import CoinFlipCard from 'components/CoinFlipGame/CoinFlipCard'
import CreateCoinFlipRoom from 'components/CoinFlipGame/CreateCoinFlipRoom'
import HatIcon from 'components/icons/HatIcon'
import CoinFlipModal from 'components/Modals/CoinFlipModal'
import useCoinFlipGames from 'helpers/hooks/coinFlip/useCoinFlipGames'
import { useCallback, useEffect, useState } from 'preact/hooks'
import CoinFlipGame from 'types/CoinFlipGame'
import { useLocation } from 'wouter-preact'

export default function ({ params }: { params: { roomId?: string } }) {
  const [parent] = useAutoAnimate()
  const { data, status } = useCoinFlipGames()
  const [modalOpen, setModalOpen] = useState(false)
  const [, setLocation] = useLocation()

  const [room, setRoom] = useState<CoinFlipGame>()

  const fetchingGames = status === 'pending'

  const setDefaultLocation = useCallback(
    () => setLocation('/coin-flip'),
    [setLocation]
  )

  useEffect(() => {
    if (!data?.length || !params.roomId) return
    const match = data.find(({ _id }) => _id === params.roomId)
    if (!match) {
      setDefaultLocation()
      return
    }

    setRoom(match)
    setModalOpen(true)
  }, [data, params.roomId, setDefaultLocation])

  return (
    <>
      <div className="sticky top-20 w-full z-30">
        <CreateCoinFlipRoom />
      </div>
      {fetchingGames ? (
        <div className="my-4">
          <HatIcon centered rotateAnimation />
        </div>
      ) : (
        <div
          className="grid grid-cols-3 gap-2 align-middle justify-items-center my-4"
          ref={parent}
        >
          {data?.map((props) => (
            <CoinFlipCard
              {...props}
              onClick={() => {
                setLocation(`/coin-flip/${props._id}`)
                setModalOpen(true)
              }}
              key={props._id}
            />
          ))}
        </div>
      )}

      <CoinFlipModal
        room={room}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onCloseEx={setDefaultLocation}
      />
    </>
  )
}
