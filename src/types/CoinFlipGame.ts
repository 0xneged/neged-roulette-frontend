import User from 'types/User'

export enum CoinFlipGameStatus {
  preparing,
  ongoing,
  finished,
}

export const minCoinFlipEntry = 50
export const maxCoinFlipEntry = 50000

export default interface CoinFlipGame {
  _id: string
  updatedAt: string
  status: CoinFlipGameStatus
  user1: User
  user2?: User
  betAmount: number
  winner?: User
  endTime?: string
}
