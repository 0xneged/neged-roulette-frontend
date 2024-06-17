import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './Button'
import WalletIcon from './icons/WalletIcon'

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

              return (
                <Button onClick={openAccountModal}>
                  {account.displayName}
                </Button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
