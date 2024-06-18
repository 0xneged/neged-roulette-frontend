import { useAccount } from 'wagmi'
import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'

export default function () {
  const { address } = useAccount()
  const data = usePromise(farcaster, [address])

  console.log(address, data)

  return data
}
