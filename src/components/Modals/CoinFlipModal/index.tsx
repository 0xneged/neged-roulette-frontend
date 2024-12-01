import Body from 'components/Modals/CoinFlipModal/Body'
import Footer from 'components/Modals/CoinFlipModal/Footer'
import DefaultModal from 'components/Modals/DefaultModal'
import CoinFlipGame from 'types/CoinFlipGame'
import ModalProps from 'types/ModalProps'

export default function ({
  room,
  modalOpen,
  setModalOpen,
  onCloseEx,
  onJoinRoom,
}: ModalProps & {
  room: CoinFlipGame | undefined
  onCloseEx: () => void
  onJoinRoom: (_id: string) => Promise<void>
}) {
  if (!room) return null

  return (
    <DefaultModal
      header={`room-${room._id}`}
      bodyContent={<Body room={room} />}
      footerContent={<Footer room={room} onJoinRoom={onJoinRoom} />}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      onCloseEx={onCloseEx}
    />
  )
}
