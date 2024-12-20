import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { usePrivy } from '@privy-io/react-auth'
import BigButton from 'components/BigButton'
import HatIcon from 'components/icons/HatIcon'
import BetModal from 'components/Modals/BetModal'
import RoomTypeSwitch from 'components/RoomTypeSwitch'
import TowerGame from 'components/TowerGame/index'
import SkeletonLoader from 'components/TowerGame/SkeletonLoader'
import { exitTower, placeTowerBet } from 'helpers/api/towerGame'
import getUserAddress from 'helpers/getUserAddress'
import useTowerGame from 'helpers/hooks/tower//useTowerGame'
import useAuthToken from 'helpers/hooks/useAuthToken'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import roundNumber from 'helpers/numbers/roundNumber'
import { setHatsQueryData } from 'helpers/queryClient'
import { useCallback, useState } from 'preact/hooks'
import { TowerGameStatus, TowerType, TypeToMultipliers } from 'types/TowerGame'

export default function () {
  useAuthToken()
  const [parent] = useAutoAnimate()
  const [towerType, setTowerType] = useState(TowerType.easy)
  const [betModalOpen, setBetModalOpen] = useState(false)
  const { user, ready, authenticated, login } = usePrivy()
  const { data, status, refetch } = useTowerGame(towerType)
  const address = getUserAddress(user)
  const { data: hats, status: hatsStatus } = useHatsCounter(address)
  const [interactionLoading, setInteractionLoading] = useState(false)

  const gameLoading = !ready || status === 'pending' || hatsStatus === 'pending'

  const step = (data?.guesses?.length || 1) - 1
  const multiplier = TypeToMultipliers[towerType][step]
  const isFinished = data?.status === TowerGameStatus.finished

  const onBigButtonPress = useCallback(async () => {
    if (!authenticated) {
      login()
      return
    }

    if (!isFinished && data?.betAmount && address) {
      try {
        setInteractionLoading(true)
        const newBalance = await exitTower(data._id)
        await setHatsQueryData(address, newBalance)
        await refetch()
      } finally {
        setInteractionLoading(false)
      }
      return
    }

    setBetModalOpen(true)
  }, [
    authenticated,
    isFinished,
    data?.betAmount,
    data?._id,
    login,
    address,
    refetch,
  ])

  const exitWith = data?.betAmount
    ? roundNumber(
        data.guesses.length ? data.betAmount * multiplier : data.betAmount
      )
    : 0

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
        {authenticated ? (
          data?.betAmount ? (
            <span className="flex flex-row items-center gap-x-2">
              <span>
                {isFinished ? 'Finished! Try again?' : `Exit with ${exitWith}`}
              </span>{' '}
              <HatIcon />
            </span>
          ) : (
            'Place bet'
          )
        ) : (
          'Login'
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
