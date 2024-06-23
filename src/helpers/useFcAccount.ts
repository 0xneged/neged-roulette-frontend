import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'

export default function (address?: string) {
  const data = usePromise(farcaster, [address])

  return { data, address }
}
