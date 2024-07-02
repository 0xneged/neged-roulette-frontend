import { Flowbite, Modal } from 'flowbite-react'
import { JSX } from 'preact/jsx-runtime'
import ModalProps from 'types/ModalProps'

interface DefaultModalProps extends ModalProps {
  headerText: string
  bodyContent: JSX.Element
  footerContent: JSX.Element
}

export default function ({
  modalOpen,
  setModalOpen,
  headerText,
  bodyContent,
  footerContent,
}: DefaultModalProps) {
  return (
    <Flowbite theme={{ mode: 'dark' }}>
      <Modal
        dismissible
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        theme={{ content: { inner: 'rounded-2xl' } }}
      >
        <Modal.Header className="bg-primary-bg rounded-t-2xl">
          <h2 className="text-3xl font-script text-primary-bright">
            {headerText}
          </h2>
        </Modal.Header>
        <Modal.Body className="bg-primary-bg">{bodyContent}</Modal.Body>
        <Modal.Footer className="bg-primary-bg rounded-b-2xl justify-between">
          {footerContent}
        </Modal.Footer>
      </Modal>
    </Flowbite>
  )
}
