import { Socket, io } from 'socket.io-client'
import { toast } from 'react-toastify'
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

      const extraHeaders = authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {}

      setSocket(
        io(env.VITE_BACKEND_URL, {
          extraHeaders,
        })
      )
    }

    void connect()
  }, [ready, getAccessToken])

  useEffect(() => {
    const connection = socket?.connect()
    connection?.on('serverError', ({ message }: { message: string }) =>
      toast.error(message)
    )

    return () => {
      connection?.off('serverError')
    }
  }, [socket])

  return socket
}
