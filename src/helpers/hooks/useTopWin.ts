import { useQuery } from '@tanstack/react-query'
import getTopWinOfTheDay from 'helpers/api/topWin'

export default function () {
  return useQuery({
    queryKey: ['topWin'],
    queryFn: getTopWinOfTheDay,
  })
}
