import BodyContent from 'components/Modals/AccountModal/Body'
import Footer from 'components/Modals/AccountModal/Footer'
import { AccountModalProps } from 'components/Modals/AccountModal/Props'
import DefaultModal from 'components/Modals/DefaultModal'
import { invalidateManyQueries } from 'helpers/queryClient'
import { useCallback } from 'preact/compat'

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
    if (!address) return

    await logout()
    await invalidateManyQueries(['morningStreak', 'towerGame'])
  }, [address, logout])

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
