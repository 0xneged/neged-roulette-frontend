import { usePrivy } from '@privy-io/react-auth'
import FcName from 'components/FcName'
import FcPfp from 'components/FcPfp'
import HatsCounterButton from 'components/Main/HatsCounterButton'

export default function () {
  const { logout, user } = usePrivy()

  const address = user?.wallet?.address

  return (
    <div className="flex flex-row gap-x-2">
      <HatsCounterButton address={address} />
      <div
        className="flex flex-row items-center gap-x-1 cursor-pointer text-white hover:text-red-400"
        onClick={logout}
      >
        <div className="flex w-11 h-11 rounded-3xl">
          <FcPfp address={address} />
        </div>
        <FcName address={address} />
      </div>
    </div>
  )
}
