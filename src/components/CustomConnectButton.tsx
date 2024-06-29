import Button from './Button'
import WalletIcon from './icons/WalletIcon'
import { usePrivy } from '@privy-io/react-auth'
import HatIcon from './icons/HatIcon'
import HeaderInfo from './HeaderInfo'

export default function () {
  const { authenticated, login, ready } = usePrivy()

  if (!ready) {
    return (
      <Button>
        <HatIcon rotateAnimation />
      </Button>
    )
  }

  if (!authenticated) {
    return (
      <Button onClick={login}>
        connect <WalletIcon />
      </Button>
    )
  }

  return <HeaderInfo />
}
