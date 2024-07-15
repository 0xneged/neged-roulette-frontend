import Round, { Deposit } from 'types/Round'

export default interface BetsProps {
  deposits: Deposit[]
  totalDeposits: number
}

export type RoundWithTotal = {
  round: Round | null | undefined
  totalDeposits: number
}
