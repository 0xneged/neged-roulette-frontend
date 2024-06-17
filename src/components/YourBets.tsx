import BigButton from './BigButton'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useCallback } from 'preact/hooks'

export default function () {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

  const onClick = useCallback(() => {
    if (isConnected) console.log('open bet modal')
    if (openConnectModal) openConnectModal()
    console.log(openConnectModal)
  }, [isConnected, openConnectModal])

  return <BigButton onClick={onClick}>TRY YOUR LUCK</BigButton>
}
