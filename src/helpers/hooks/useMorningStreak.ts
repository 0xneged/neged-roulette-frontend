import { useQuery } from '@tanstack/react-query'
import { getMorningStreak } from 'helpers/api/morningStreak'

export default function () {
  return useQuery({
    queryKey: ['morningStreak'],
    queryFn: getMorningStreak,
  })
}
