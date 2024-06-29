import Button from './Button'
import WalletIcon from './icons/WalletIcon'
import { Suspense } from 'preact/compat'
import FcPfp from './FcPfp'
import EmojiAvatar from './EmojiAvatar'
import HatsCounterButton from './Main/HatsCounterButton'
import { usePrivy } from '@privy-io/react-auth'
import truncateString from 'helpers/truncateString'
import useFcAccount from 'helpers/useFcAccount'
import DotsLoader from './icons/DotsLoader'

export default function () {
  const { authenticated, user, login, logout } = usePrivy()
  const pfp = user?.farcaster?.pfp
  const address = user?.farcaster?.ownerAddress || user?.wallet?.address

  const { data } = useFcAccount(address, pfp)

  if (!authenticated) {
    return (
      <Button onClick={login}>
        connect <WalletIcon />
      </Button>
    )
  }

  const displayName = user?.farcaster?.username
  const name = truncateString({
    fullString: displayName || data?.username || address,
    backChars: 5,
  })

  return (
    <div className="flex flex-row gap-x-2">
      <Suspense fallback="">
        <HatsCounterButton address={address} />
      </Suspense>
      <div
        className="flex flex-row items-center gap-x-1 cursor-pointer text-white hover:text-red-400"
        onClick={logout}
      >
        <div className="flex w-11 h-11 rounded-3xl">
          <Suspense fallback={<EmojiAvatar address={address} />}>
            <FcPfp address={address} pfpUrl={data?.pfp_url} />
          </Suspense>
        </div>
        <div className="hidden md:block opacity-70">
          <Suspense fallback={DotsLoader}>{name}</Suspense>
        </div>
      </div>
    </div>
  )
}
