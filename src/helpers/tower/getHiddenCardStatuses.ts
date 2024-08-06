import towerHeight from 'components/TowerGame/towerHeight'
import { TowerCardStatus, TowerType, TypeToGuessMax } from 'types/TowerGame'

export default function (towerType: TowerType) {
  const rowLength = TypeToGuessMax[towerType] + 1

  const singleRow = Array(rowLength).fill(TowerCardStatus.hidden)
  return Array(towerHeight).fill(singleRow)
}
