export type Deposit = {
  amount: number
  address: string
  fcPfpLink: string | undefined
  fcUsername: string | undefined
}
export type Winner = Deposit & {
  winnerAmount: number
}
export enum RoundStatus {
  ongoing,
  ended,
}

export default interface Round {
  startTime: string
  endTime: string
  deposits: Deposit[]
  winner: Winner
  winnerAmount: number
  roundStatus: RoundStatus
}
