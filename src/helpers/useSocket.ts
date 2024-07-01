import { Socket, io } from 'socket.io-client'
import { useEffect, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import env from 'helpers/env'

export default function () {
  const { getAccessToken, ready } = usePrivy()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (!ready) return

    const connect = async () => {
      const authToken = await getAccessToken()

      setSocket(
        io(env.VITE_BACKEND_URL, {
          extraHeaders: { Authorization: `Bearer ${authToken}` },
        })
      )
    }

    void connect()
  }, [ready, getAccessToken])

  useEffect(() => {
    socket?.connect()
  }, [socket])

  return socket
}
