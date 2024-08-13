import User from 'types/User'

enum CoinFlipGameStatus {
  preparing,
  ongoing,
  finished,
}

export const minCoinFlipEntry = 50
export const maxCoinFlipEntry = 50000

export default interface CoinFlipGame {
  status: CoinFlipGameStatus
  user1: User
  user2?: User
  betAmount: number
  winner?: User
  endTime?: Date
}
