import { useEffect } from 'preact/hooks'
import socket from './api/socket'

export default function () {
  useEffect(() => {
    socket.connect()
  }, [])
}
