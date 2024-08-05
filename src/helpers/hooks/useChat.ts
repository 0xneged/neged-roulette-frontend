import useSocket from 'helpers/hooks/useSocket'
import { useCallback, useEffect, useState } from 'preact/hooks'
import ChatMessage from 'types/ChatMessage'

export default function () {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    const key = 'updateChat'

    socket.on(key, ({ messages }) => {
      setMessages(messages || [])
    })

    return () => {
      socket.off(key, setMessages)
    }
  }, [socket])

  const sendMessage = useCallback(
    (text: string) => {
      if (!socket) return

      socket.emit('addMessage', { text })
    },
    [socket]
  )

  const deleteMessage = useCallback(
    (messageId: string) => {
      if (!socket) return

      socket.emit('deleteMessage', { messageId })
    },
    [socket]
  )

  return { messages, sendMessage, deleteMessage }
}
