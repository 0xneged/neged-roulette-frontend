import { useEffect, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import { Socket, io } from 'socket.io-client'
import env from './env'

export default function () {
  const { getAccessToken } = usePrivy()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
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
  }, [])

  return socket
}
