import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './Button'
import WalletIcon from './icons/WalletIcon'
import { Suspense } from 'preact/compat'
import FcPfp from './FcPfp'
import EmojiAvatar from './EmojiAvatar'

export default function () {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>
                    connect <WalletIcon />
                  </Button>
                )
              }

              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>
              }

              const { address } = account

              return (
                <div
                  className="flex flex-row items-center gap-x-2 cursor-pointer text-white"
                  onClick={openAccountModal}
                >
                  <Suspense fallback={<EmojiAvatar address={address} />}>
                    <FcPfp address={address} />
                  </Suspense>
                  <div className="hidden md:block opacity-70">
                    {account.displayName}
                  </div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
