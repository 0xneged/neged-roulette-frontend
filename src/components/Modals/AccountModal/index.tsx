import { AccountModalProps } from 'components/Modals/AccountModal/Props'
import { invalidateManyQueries } from 'helpers/queryClient'
import { useCallback } from 'preact/compat'
import BodyContent from 'components/Modals/AccountModal/Body'
import DefaultModal from 'components/Modals/DefaultModal'
import Footer from 'components/Modals/AccountModal/Footer'

export default function ({
  address,
  modalOpen,
  setModalOpen,
  logout,
  setOpenShareFaq,
}: AccountModalProps) {
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const onLogout = useCallback(async () => {
    await logout()
    await invalidateManyQueries(['morningStreak', 'hatsCounter', 'referrer'])
  }, [logout])

  return (
    <DefaultModal
      header="Your account"
      bodyContent={<BodyContent address={address} />}
      footerContent={
        <Footer
          logout={onLogout}
          address={address}
          closeModal={closeModal}
          setOpenShareFaq={() => {
            closeModal()
            setOpenShareFaq()
          }}
        />
      }
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
