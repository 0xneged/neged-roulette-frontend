import { Flowbite, Modal } from 'flowbite-react'
import { JSX } from 'preact/jsx-runtime'
import ModalProps from 'types/ModalProps'

interface DefaultModalProps extends ModalProps {
  header: JSX.Element | string
  bodyContent: JSX.Element
  footerContent: JSX.Element | null
}

export default function ({
  modalOpen,
  setModalOpen,
  header,
  bodyContent,
  footerContent,
}: DefaultModalProps) {
  return (
    <Flowbite theme={{ mode: 'dark' }}>
      <Modal
        dismissible
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        theme={{
          content: { inner: 'rounded-2xl', base: 'relative h-auto w-full p-4' },
          root: { base: 'backdrop-blur-lg transition-all z-30' },
        }}
      >
        <Modal.Header className="bg-primary-bg rounded-t-2xl p-3 md:p-6">
          {typeof header === 'string' ? (
            <h2 className="text-3xl font-script text-primary-bright">
              {header}
            </h2>
          ) : (
            header
          )}
        </Modal.Header>
        <Modal.Body className="bg-primary-bg p-3 md:p-6 overflow-hidden">
          {bodyContent}
        </Modal.Body>
        <Modal.Footer className="bg-primary-bg rounded-b-2xl justify-between p-3 md:p-6">
          {footerContent}
        </Modal.Footer>
      </Modal>
    </Flowbite>
  )
}
