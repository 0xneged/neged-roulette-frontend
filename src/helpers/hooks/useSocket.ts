import { usePrivy } from '@privy-io/react-auth'
import env from 'helpers/env'
import { useEffect, useState } from 'preact/hooks'
import { io, Socket } from 'socket.io-client'

export default function () {
  const { getAccessToken, ready } = usePrivy()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (!ready) return

    const connect = async () => {
      const authToken = await getAccessToken()

      const extraHeaders = authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {}

      const newSocket = io(env.VITE_BACKEND_URL, { extraHeaders })
      newSocket.connect()
      setSocket(newSocket)
    }

    void connect()
  }, [ready, getAccessToken])

  return { socket }
}
