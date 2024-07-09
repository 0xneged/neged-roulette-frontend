import { getRoundHistory } from 'helpers/api/round'
import { useQuery } from '@tanstack/react-query'

export default function () {
  const { data } = useQuery({
    queryKey: ['roundHistory'],
    queryFn: getRoundHistory,
  })

  return data
}
