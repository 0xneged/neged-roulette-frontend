import { TowerType } from 'types/TowerGame'
import { exitTower, placeTowerBet } from 'helpers/api/towerGame'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useCallback, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import BetModal from 'components/Modals/BetModal'
import BigButton from 'components/BigButton'
import HatIcon from 'components/icons/HatIcon'
import RoomTypeSwitch from 'components/RoomTypeSwitch'
import SkeletonLoader from 'components/TowerGame/SkeletonLoader'
import TowerGame from 'components/TowerGame/index'
import queryClient from 'helpers/queryClient'
import useAuthToken from 'helpers/hooks/useAuthToken'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import useTowerGame from 'helpers/hooks/useTowerGame'

export default function () {
  useAuthToken()
  const [parent] = useAutoAnimate()
  const [towerType, setTowerType] = useState(TowerType.easy)
  const { data, status, refetch } = useTowerGame(towerType)
  const [betModalOpen, setBetModalOpen] = useState(false)
  const { user, ready } = usePrivy()
  const address = user?.wallet?.address.toLowerCase()
  const { data: hats, status: hatsStatus } = useHatsCounter(address)
  const [interactionLoading, setInteractionLoading] = useState(false)

  const gameLoading = status === 'pending' || !ready
  const hatsLoading = hatsStatus === 'pending'

  const onBigButtonPress = useCallback(async () => {
    if (data?.betAmount) {
      try {
        setInteractionLoading(true)
        await exitTower({ towerType })
        await queryClient.invalidateQueries({
          queryKey: ['hatsCounter' + address],
        })
        await refetch()
      } finally {
        setInteractionLoading(false)
      }
      return
    }

    setBetModalOpen(true)
  }, [data?.betAmount, refetch, towerType, address])

  return (
    <div ref={parent}>
      <RoomTypeSwitch
        roundType={towerType}
        setRoundType={setTowerType}
        tabHeaders={['Easy tower', 'Hard tower']}
      />

      <BigButton
        onClick={onBigButtonPress}
        loading={gameLoading || interactionLoading}
      >
        {data?.betAmount ? (
          <span className="flex flex-row items-center gap-x-2">
            <span>Exit with {data.betAmount}</span> <HatIcon />
          </span>
        ) : (
          'Place bet'
        )}
      </BigButton>

      {gameLoading ? (
        <SkeletonLoader towerType={towerType} />
      ) : (
        <TowerGame
          game={data}
          towerType={towerType}
          loading={interactionLoading}
        />
      )}

      {hatsLoading ? null : (
        <BetModal
          userAddress={address}
          onBet={(betAmount) => placeTowerBet({ betAmount, towerType })}
          modalOpen={betModalOpen}
          setModalOpen={setBetModalOpen}
          userDeposit={data?.betAmount || 0}
          userHats={hats}
          minBet={1}
          maxBet={50000}
        />
      )}
    </div>
  )
}
