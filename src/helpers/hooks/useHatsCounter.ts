import { getUserHats } from 'helpers/api/token'
import { useQuery } from '@tanstack/react-query'

export default function (address?: string | undefined) {
  const { data } = useQuery({
    queryKey: ['hatsCounter'],
    queryFn: () => getUserHats(address),
  })

  return data
}
