import { getTopWinOfTheDay } from 'helpers/api/round'
import { useQuery } from '@tanstack/react-query'

export default function () {
  return useQuery({
    queryKey: ['topWin'],
    queryFn: getTopWinOfTheDay,
  })
}
