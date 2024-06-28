// import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './Button'
import WalletIcon from './icons/WalletIcon'
import { Suspense } from 'preact/compat'
import FcPfp from './FcPfp'
import EmojiAvatar from './EmojiAvatar'
import HatsCounterButton from './Main/HatsCounterButton'
import { usePrivy } from '@privy-io/react-auth'
import truncateString from 'helpers/truncateString'

export default function () {
  const { authenticated, user, login, logout } = usePrivy()

  if (!authenticated) {
    return (
      <Button onClick={login}>
        connect <WalletIcon />
      </Button>
    )
  }

  const address = user?.farcaster?.ownerAddress || user?.wallet?.address
  const displayName = user?.farcaster?.username || address

  return (
    <div className="flex flex-row gap-x-2">
      <Suspense fallback="">
        <HatsCounterButton address={address} />
      </Suspense>
      <div
        className="flex flex-row items-center gap-x-1 cursor-pointer text-white"
        onClick={logout}
      >
        <div className="flex w-11 h-11 rounded-3xl">
          <Suspense fallback={<EmojiAvatar address={address} />}>
            <FcPfp address={address} pfpUrl={user?.farcaster?.pfp} />
          </Suspense>
        </div>
        <div className="hidden md:block opacity-70 w-36">
          {truncateString({ fullString: displayName, backChars: 5 })}
        </div>
      </div>
    </div>
  )
}
