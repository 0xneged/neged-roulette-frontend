import HatIcon from 'components/icons/HatIcon'
import GridWrapper from 'components/TowerGame/GridWrapper'
import TowerCard from 'components/TowerGame/TowerCard'
import { guess } from 'helpers/api/towerGame'
import roundNumber from 'helpers/numbers/roundNumber'
import queryClient from 'helpers/queryClient'
import getHiddenCardStatuses from 'helpers/tower/getHiddenCardStatuses'
import { useCallback } from 'preact/hooks'
import { toast } from 'react-toastify'
import {
  TowerCardStatus,
  TowerGame,
  TowerGameStatus,
  towerHeight,
  TowerType,
  TypeToGuessMax,
  TypeToMultipliers,
} from 'types/TowerGame'

const statusToElement = (hatAmount: string | number) => ({
  [TowerCardStatus.hidden]: (
    <div className="rounded-3xl w-20 md:w-28 h-12 bg-primary flex flex-row gap-x-2 items-center justify-center drop-shadow">
      {typeof hatAmount === 'number' ? roundNumber(hatAmount) : hatAmount}{' '}
      <HatIcon />
    </div>
  ),
  [TowerCardStatus.lose]: (
    <div className="w-16 h-16 text-4xl flex items-center justify-center">
      <span>💣</span>
    </div>
  ),
  [TowerCardStatus.win]: <img src="img/neged-hat.webp" className="w-16" />,
})

function CardRow({
  rowLength,
  onClick,
  disabled,
  hatAmount,
  cardStatuses,
  guess,
}: {
  rowLength: number
  onClick: (index: number) => void
  disabled: boolean
  hatAmount: string | number
  cardStatuses: TowerCardStatus[]
  guess?: number
}) {
  const elements = statusToElement(hatAmount)

  const cards = [...Array(rowLength)].map((_, index) => (
    <TowerCard
      onClick={() => onClick(index)}
      status={cardStatuses[index]}
      disabled={disabled}
      glow={guess === index}
    >
      {elements[cardStatuses[index]]}
    </TowerCard>
  ))
  return <>{cards}</>
}

interface TowerGameProps {
  game?: TowerGame | undefined | null
  towerType: TowerType
  loading: boolean
  setLoading: (val: boolean) => void
  bombIndex?: number
}

export default function ({
  game,
  towerType,
  loading,
  setLoading,
}: TowerGameProps) {
  const multipliers = TypeToMultipliers[towerType]
  const maxInRow = TypeToGuessMax[towerType] + 1

  const guesses = game?.guesses || []
  const isFinished = game?.status === TowerGameStatus.finished
  const cardStatuses = game?.cardStatuses?.length
    ? game.cardStatuses
    : getHiddenCardStatuses(towerType)
  const betAmount = game?.betAmount
  const step = guesses.length

  const onClick = useCallback(
    async (index: number) => {
      if (index < 0 || index > TypeToGuessMax[towerType]) {
        toast.error('Guess out of bounds')
        return
      }
      if (!game?._id) {
        toast.error('Game not found')
        return
      }
      try {
        setLoading(true)
        await guess({ guess: index, towerType, _id: game._id })
        await queryClient.invalidateQueries({
          queryKey: [`towerGame-${towerType}`],
        })
      } finally {
        setLoading(false)
      }
    },
    [game?._id, setLoading, towerType]
  )

  return (
    <GridWrapper maxInRow={maxInRow}>
      {[...Array(towerHeight(towerType))].map((_, index) => (
        <CardRow
          rowLength={maxInRow}
          onClick={onClick}
          disabled={
            loading || !betAmount || index > step || index < step || isFinished
          }
          cardStatuses={cardStatuses[index]}
          guess={guesses[index]}
          hatAmount={
            betAmount && !isFinished
              ? betAmount * multipliers[index]
              : `x${multipliers[index]}`
          }
        />
      ))}
    </GridWrapper>
  )
}
