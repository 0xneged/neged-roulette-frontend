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
  preparing,
  ongoing,
  ended,
}

export default interface Round {
  startTime?: string
  endTime?: string
  deposits: Deposit[]
  winner: Winner
  roundStatus: RoundStatus
}

export interface RoundWithTime extends Round {
  startTime: string
  endTime: string
}
