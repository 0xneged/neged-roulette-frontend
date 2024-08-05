import Body from 'components/Modals/ChatModal/Body'
import Footer from 'components/Modals/ChatModal/Footer'
import Header from 'components/Modals/ChatModal/Header'
import DefaultModal from 'components/Modals/DefaultModal'
import useChat from 'helpers/hooks/useChat'
import { useCallback, useState } from 'preact/hooks'
import ModalProps from 'types/ModalProps'

export default function ({ modalOpen, setModalOpen }: ModalProps) {
  const { messages, sendMessage, deleteMessage } = useChat()
  const [text, setText] = useState('')

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
      header={<Header />}
      bodyContent={<Body messages={messages} onDelete={onDelete} />}
      bodyId="chat-modal-body"
      footerContent={<Footer value={text} setValue={setText} onSend={onSend} />}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
