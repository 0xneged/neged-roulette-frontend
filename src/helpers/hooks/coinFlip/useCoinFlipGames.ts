import { getGames } from 'helpers/api/coinFlipGame'
import handleError from 'helpers/handleError'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { Socket } from 'socket.io-client'
import CoinFlipGame from 'types/CoinFlipGame'

const roomUpdate = 'coin-flip-update'

export default function (socket: Socket) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CoinFlipGame[]>([])

  useEffect(() => {
    async function setup() {
      setLoading(true)
      const initialGames = await getGames()
      setData(initialGames)

      socket.on(roomUpdate, ({ room }: { room: CoinFlipGame }) => {
        setData((prev) => {
          const existingRoomIndex = prev.findIndex(
            ({ _id }) => _id === room._id
          )

          if (existingRoomIndex !== -1) {
            const updatedRooms = [...prev]
            updatedRooms[existingRoomIndex] = room
            return updatedRooms.slice(0, 150)
          } else {
            const updatedRooms = [...prev, room]
            return updatedRooms.slice(0, 150)
          }
        })
      })
      socket.on('error', (e: string) => handleError({ e, toastMessage: e }))
    }

    void setup().finally(() => setLoading(false))

    return () => {
      socket.off(roomUpdate)
    }
  }, [socket])

  const onJoinRoom = useCallback(
    (_id: string) => {
      return socket.emitWithAck('coin-flip-join', {
        _id,
      })
    },
    [socket]
  )

  return { data, loading, onJoinRoom }
}
