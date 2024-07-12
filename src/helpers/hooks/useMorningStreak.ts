import { getMorningStreak } from 'helpers/api/morningStreak'
import { useQuery } from '@tanstack/react-query'

export default function () {
  return useQuery({
    queryKey: ['morningStreak'],
    queryFn: getMorningStreak,
  })
}
