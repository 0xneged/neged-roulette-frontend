import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'preact/hooks'
import AccountModal from 'components/Modals/AccountModal'
import ConvertModal from 'components/Modals/Convert'
import FcName from 'components/FcName'
import FcPfp from 'components/FcPfp'
import HatsCounterButton from 'components/Main/HatsCounterButton'
import ReferralFaqModal from 'components/Modals/ReferralFaqModal'

export default function () {
  const { logout, user } = usePrivy()
  const [accountModal, setAccountModal] = useState(false)
  const [convertModalOpen, setConvertModalOpen] = useState(false)
  const [refFaqModalOpen, setRefFaqModalOpen] = useState(false)

  const address = user?.wallet?.address.toLowerCase()

  return (
    <>
      <div className="flex flex-row gap-x-2">
        <HatsCounterButton
          address={address}
          setModalOpen={setConvertModalOpen}
        />
        <div
          className="flex flex-row items-center gap-x-2 cursor-pointer text-white hover:text-primary-bright transition-colors"
          onClick={() => setAccountModal(true)}
        >
          <FcPfp address={address} />
          <FcName address={address} />
        </div>
      </div>
      {address ? (
        <>
          <AccountModal
            modalOpen={accountModal}
            setModalOpen={setAccountModal}
            address={address}
            logout={logout}
            setOpenShareFaq={() => setRefFaqModalOpen(true)}
          />
          <ReferralFaqModal
            modalOpen={refFaqModalOpen}
            setModalOpen={setRefFaqModalOpen}
            address={address}
          />
          <ConvertModal
            modalOpen={convertModalOpen}
            setModalOpen={setConvertModalOpen}
          />
        </>
      ) : null}
    </>
  )
}
