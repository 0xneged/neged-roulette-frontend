import GridWrapper from 'components/TowerGame/GridWrapper'
import { towerHeight, TowerType, TypeToGuessMax } from 'types/TowerGame'

export default function ({ towerType }: { towerType: TowerType }) {
  const cardsInRow = TypeToGuessMax[towerType] + 1

  const components = [...Array(cardsInRow * towerHeight(towerType))].map(() => (
    <div className="rounded-2xl w-full h-20 bg-pale-purple animate-pulse" />
  ))
  return <GridWrapper maxInRow={cardsInRow}>{components}</GridWrapper>
}
