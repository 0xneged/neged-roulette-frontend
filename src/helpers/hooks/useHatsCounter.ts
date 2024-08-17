import { useQuery } from '@tanstack/react-query'
import { getUserHats } from 'helpers/api/token'

export default function (address?: string | undefined) {
  return useQuery({
    queryKey: ['hatsCounter' + address],
    queryFn: () => getUserHats(address),
    refetchInterval: 2500,
  })
}
