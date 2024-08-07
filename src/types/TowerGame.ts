export enum TowerType {
  easy,
  hard,
}

export const TypeToGuessMax = {
  [TowerType.easy]: 2,
  [TowerType.hard]: 1,
}

export const TypeToMultipliers = {
  [TowerType.easy]: [1.2, 1.4, 2.1, 3, 4.4, 6.5, 9.4, 13.8, 20, 29.2],
  [TowerType.hard]: [
    1.96, 3.76, 7.3, 14.16, 27.47, 53.31, 103.42, 200.63, 389.21, 755.12,
  ],
}

export const towerHeight = (towerType: TowerType) =>
  TypeToMultipliers[towerType].length

export enum TowerGameStatus {
  ongoing,
  finished,
}

export enum TowerCardStatus {
  lose,
  win,
  hidden,
}

export type TowerGame = {
  towerType: TowerType
  status: TowerGameStatus
  betAmount: number
  guesses: number[]
  cardStatuses: TowerCardStatus[][]
  _id: string
}

export type TowerGameProp = Partial<TowerGame> & {
  towerType: TowerType
}
