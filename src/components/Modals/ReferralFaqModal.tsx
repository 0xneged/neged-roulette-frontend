import DefaultModal from 'components/Modals/DefaultModal'
import ShareRefButton from 'components/ShareRefButton'
import ModalProps from 'types/ModalProps'

export default function ({
  address,
  modalOpen,
  setModalOpen,
}: ModalProps & { address?: string }) {
  return (
    <DefaultModal
      header="About your ref"
      bodyContent={
        <span className="text-primary">
          A user can attract referrals using an invite link. In case the user
          has referrals, the site's commission is reduced to 7.5% of the win
          amount. Also, the user will receive 2.5% of the referral's winnings.
        </span>
      }
      footerContent={<ShareRefButton address={address} />}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
