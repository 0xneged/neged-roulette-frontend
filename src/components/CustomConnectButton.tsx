import { usePrivy } from '@privy-io/react-auth'
import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import HeaderInfo from 'components/HeaderInfo'
import WalletIcon from 'components/icons/WalletIcon'

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
