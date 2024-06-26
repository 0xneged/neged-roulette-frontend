type ShortUser = {
  address: string
  fcPfpLink: string | undefined
  fcUsername: string | undefined
}

export type Deposit = ShortUser & {
  amount: number
}
export type Winner = ShortUser & {
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
  winner: string
  winnerAmount: number
  roundStatus: RoundStatus
}
