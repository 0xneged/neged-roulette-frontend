import {
  TowerCardStatus,
  TowerGame,
  TowerType,
  TypeToGuessMax,
  TypeToMultipliers,
} from 'types/TowerGame'
import { guess } from 'helpers/api/towerGame'
import { toast } from 'react-toastify'
import { useCallback } from 'preact/hooks'
import GridWrapper from 'components/TowerGame/GridWrapper'
import HatIcon from 'components/icons/HatIcon'
import TowerCard from 'components/TowerGame/TowerCard'
import towerHeight from 'components/TowerGame/towerHeight'

const statusToElement = (hatAmount: string) => ({
  [TowerCardStatus.hidden]: (
    <div className="rounded-3xl w-28 h-12 bg-primary flex flex-row gap-x-2 items-center justify-center drop-shadow">
      {hatAmount} <HatIcon />
    </div>
  ),
  [TowerCardStatus.lose]: <div>💣</div>,
  [TowerCardStatus.win]: <img src="img/neged-hat.webp" className="w-16" />,
})

function CardRow({
  guess,
  rowLength,
  onClick,
  disabled,
  hatAmount,
}: {
  guess?: number | undefined
  rowLength: number
  onClick: (index: number) => void
  disabled: boolean
  hatAmount: string
}) {
  const cards = [...Array(rowLength)].map((_, index) => (
    <TowerCard
      onClick={() => onClick(index)}
      status={guess === index ? TowerCardStatus.win : TowerCardStatus.hidden}
      disabled={disabled}
    >
      {
        statusToElement(hatAmount)[
          guess === index ? TowerCardStatus.win : TowerCardStatus.hidden
        ]
      }
    </TowerCard>
  ))
  return <>{cards}</>
}

interface TowerGameProps {
  game: TowerGame
  towerType: TowerType
  loading: boolean
}

export default function ({ game, towerType, loading }: TowerGameProps) {
  const multipliers = TypeToMultipliers[towerType]
  const maxInRow = TypeToGuessMax[towerType] + 1

  const onClick = useCallback(
    (index: number) => {
      if (index < 0 || index > TypeToGuessMax[towerType]) {
        toast.error('Guess out of bounds')
        return
      }
      if (!game._id) {
        toast.error('Game not found')
        return
      }
      void guess({ guess: index, towerType, _id: game._id })
    },
    [game._id, towerType]
  )

  const step = game.guesses.length || 0

  console.log(game.guesses)

  return (
    <GridWrapper maxInRow={maxInRow}>
      {[...Array(towerHeight)].map((_, index) => (
        <CardRow
          guess={game.guesses?.[index]}
          rowLength={maxInRow}
          onClick={onClick}
          disabled={loading || !game.betAmount || index >= step}
          hatAmount={
            game.betAmount
              ? String(game.betAmount * multipliers[index])
              : `x${multipliers[index]}`
          }
        />
      ))}
    </GridWrapper>
  )
}
