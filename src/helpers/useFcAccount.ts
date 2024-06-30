import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'
import { useQuery } from '@tanstack/react-query'

export default function (address?: string, pfpUrl?: string | null) {
  const { data } = useQuery({
    queryKey: ['prevWinner'],
    queryFn: () => farcaster(address, pfpUrl),
  })

  return { data, address }
}
