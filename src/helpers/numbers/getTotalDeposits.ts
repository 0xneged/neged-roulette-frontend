import { Deposit } from 'types/Round'

export default function (deposits: Deposit[]) {
  return deposits.reduce((prev, { amount }) => prev + amount, 0)
}
