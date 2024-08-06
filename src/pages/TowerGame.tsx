import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { usePrivy } from '@privy-io/react-auth'
import BigButton from 'components/BigButton'
import HatIcon from 'components/icons/HatIcon'
import BetModal from 'components/Modals/BetModal'
import RoomTypeSwitch from 'components/RoomTypeSwitch'
import TowerGame from 'components/TowerGame/index'
import SkeletonLoader from 'components/TowerGame/SkeletonLoader'
import { exitTower, placeTowerBet } from 'helpers/api/towerGame'
import useAuthToken from 'helpers/hooks/useAuthToken'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import useTowerGame from 'helpers/hooks/useTowerGame'
import roundNumber from 'helpers/numbers/roundNumber'
import queryClient from 'helpers/queryClient'
import { useCallback, useState } from 'preact/hooks'
import { TowerGameStatus, TowerType, TypeToMultipliers } from 'types/TowerGame'

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

  const gameLoading = !ready || status === 'pending' || hatsStatus === 'pending'

  const step = (data?.guesses?.length || 1) - 1
  const multiplier = TypeToMultipliers[towerType][step]
  const isFinished = data?.status === TowerGameStatus.finished

  const onBigButtonPress = useCallback(async () => {
    if (!isFinished && data?.betAmount) {
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
  }, [isFinished, data?.betAmount, refetch, towerType, address])

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
            <span>
              {isFinished
                ? 'Finished! Try again?'
                : `Exit with ${roundNumber(data.betAmount * multiplier)}`}
            </span>{' '}
            <HatIcon />
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
          setLoading={setInteractionLoading}
        />
      )}

      {gameLoading ? null : (
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
