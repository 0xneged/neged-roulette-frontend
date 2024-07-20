import { getUserHats } from 'helpers/api/token'
import { useQuery } from '@tanstack/react-query'

export default function (address?: string | undefined) {
  return useQuery({
    queryKey: ['hatsCounter' + address],
    queryFn: () => getUserHats(address),
  })
}
