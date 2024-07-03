import { useQuery } from '@tanstack/react-query'
import farcaster from 'helpers/api/farcaster'

export default function (address: string) {
  const { data } = useQuery({
    queryKey: ['fcUser' + address],
    queryFn: () => farcaster(address),
  })

  return { data, address }
}
