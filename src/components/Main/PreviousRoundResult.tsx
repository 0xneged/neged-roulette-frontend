import { getPreviousWinner } from 'helpers/api/token'
import usePromise from 'react-promise-suspense'
import ParticipantData from './ParticipantData'

export default function () {
  const winner = usePromise(getPreviousWinner, [])

  if (!winner) return null

  return (
    <div className="flex flex-col items-center gap-y-1">
      <span className="font-bold text-3xl sm:text-6xl">Winner</span>
      <ParticipantData {...winner} />
    </div>
  )
}
