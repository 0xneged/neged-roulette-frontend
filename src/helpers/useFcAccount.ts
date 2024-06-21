import usePromise from 'react-promise-suspense'
import farcaster from './api/farcaster'
import { useEffect } from 'preact/hooks'
import socket from './api/socket'

export default function (address?: string) {
  const data = usePromise(farcaster, [address])

  useEffect(() => {
    socket.connect()
  }, [address])

  return { data, address }
}
