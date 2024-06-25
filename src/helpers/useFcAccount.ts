import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'

export default function (address?: string, pfpUrl?: string) {
  const data = usePromise(farcaster, [address, pfpUrl])

  return { data, address }
}
