import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'preact/hooks'
import AccountModal from 'components/Modals/AccountModal'
import FcName from 'components/FcName'
import FcPfp from 'components/FcPfp'
import HatsCounterButton from 'components/Main/HatsCounterButton'

export default function () {
  const { logout, user } = usePrivy()
  const [showModal, setShowModal] = useState(false)

  const address = user?.wallet?.address

  return (
    <>
      <div className="flex flex-row gap-x-2">
        <HatsCounterButton address={address} />
        <div
          className="flex flex-row items-center gap-x-1 cursor-pointer text-white hover:text-primary-bright transition-colors"
          onClick={() => setShowModal(true)}
        >
          <div className="flex w-11 h-11 rounded-3xl">
            <FcPfp address={address} />
          </div>
          <FcName address={address} />
        </div>
      </div>
      {address ? (
        <AccountModal
          modalOpen={showModal}
          setModalOpen={setShowModal}
          address={address}
          logout={logout}
        />
      ) : null}
    </>
  )
}
