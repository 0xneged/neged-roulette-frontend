import User from 'types/User'

export type Deposit = Omit<User, 'bannedFromChat'> & {
  amount: number
}
export type Winner = Deposit & {
  winnerAmount: number
}
export enum RoundStatus {
  preparing,
  ongoing,
  ended,
}
export enum RoundType {
  hamster,
  whale,
}
export type RoundTypeProp = { roundType: RoundType }

export default interface Round {
  startTime?: string
  endTime?: string
  deposits: Deposit[]
  winner: Winner
  roundStatus: RoundStatus
  roundType: RoundType
}

export type RoundParams = { minBet: number; maxBet: number }
export type RoundService = {
  previousRoundEndTime: string | undefined
  nextRoundTimeout: number
  currentRound: Round | null
  roundDuration: number
  roundParams: RoundParams
}

export interface RoundWithTime extends Round {
  startTime: string
  endTime: string
}
