import { getPreviousWinner } from 'helpers/api/token'
import ParticipantData from './ParticipantData'
import { useQuery } from '@tanstack/react-query'

export default function () {
  const { data } = useQuery({
    queryKey: ['prevWinner'],
    queryFn: getPreviousWinner,
  })

  if (!data) return null

  return (
    <div className="flex flex-col items-center gap-y-1">
      <span className="font-bold text-3xl sm:text-6xl">Winner</span>
      <ParticipantData limitWidth {...data} />
    </div>
  )
}
