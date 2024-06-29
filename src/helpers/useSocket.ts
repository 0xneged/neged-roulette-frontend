import { useEffect, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import { Socket, io } from 'socket.io-client'
import env from './env'

export default function () {
  const { getAccessToken, ready } = usePrivy()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (!ready) return

    const connect = async () => {
      setSocket(
        io(env.VITE_BACKEND_URL, {
          extraHeaders: { Authorization: `Bearer ${await getAccessToken()}` },
        })
      )
    }

    void connect()
  }, [getAccessToken])

  useEffect(() => {
    socket?.connect()
  }, [socket])

  return socket
}
