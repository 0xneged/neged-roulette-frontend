import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'
import { useQuery } from '@tanstack/react-query'

export default function (address?: string) {
  const { data } = useQuery({
    queryKey: ['fcUser'],
    queryFn: () => farcaster(address),
  })

  return { data, address }
}
