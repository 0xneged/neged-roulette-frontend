import { useCallback, useState } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import Body from 'components/Modals/ChatModal/Body'
import DefaultModal from 'components/Modals/DefaultModal'
import Footer from 'components/Modals/ChatModal/Footer'
import ModalProps from 'types/ModalProps'
import useChat from 'helpers/hooks/useChat'

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  const { user } = usePrivy()

  const { messages, sendMessage, deleteMessage } = useChat()
  const [text, setText] = useState('')

  const userAddress = user?.wallet?.address.toLowerCase()

  const onSend = useCallback(() => {
    sendMessage(text)
    setText('')
  }, [sendMessage, text])

  const onDelete = useCallback(
    (messageId: string, isOwnerOrAdmin: boolean) => {
      if (!isOwnerOrAdmin) return
      deleteMessage(messageId)
    },
    [deleteMessage]
  )

  return (
    <DefaultModal
      header="Chat with frens (or enemies)"
      bodyContent={
        <Body
          messages={messages}
          userAddress={userAddress}
          onDelete={onDelete}
        />
      }
      bodyId="chat-modal-body"
      footerContent={<Footer value={text} setValue={setText} onSend={onSend} />}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
