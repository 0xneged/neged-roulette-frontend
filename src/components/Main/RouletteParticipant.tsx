import getPercentFromTotal from 'helpers/getPercentFromTotal'
import { roundNumber } from 'helpers/roundNumber'

export default function ({
  address,
  amount,
  totalDeposits,
}: {
  address: string
  amount: number
  totalDeposits: number
}) {
  return (
    <div className="bg-participant2 rounded-lg flex flex-col p-3 w-32 ">
      <div className="truncate">{address}</div>
      <div className="flex flex-row justify-between items-center text-white">
        <span className="font-bold text-sm">{roundNumber(amount)}</span>
        <span className="font-medium text-xs">
          {getPercentFromTotal(amount, totalDeposits)}%
        </span>
      </div>
    </div>
  )
}
