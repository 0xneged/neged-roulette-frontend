import {
  TowerCardStatus,
  towerHeight,
  TowerType,
  TypeToGuessMax,
} from 'types/TowerGame'

export default function (towerType: TowerType) {
  const rowLength = TypeToGuessMax[towerType] + 1

  const singleRow = Array(rowLength).fill(TowerCardStatus.hidden)
  return Array(towerHeight(towerType)).fill(singleRow)
}
