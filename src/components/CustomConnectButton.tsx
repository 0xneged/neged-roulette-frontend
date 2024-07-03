import { usePrivy } from '@privy-io/react-auth'
import Button from 'components/Button'
import HeaderInfo from 'components/HeaderInfo'
import WalletIcon from 'components/icons/WalletIcon'

export default function () {
  const { authenticated, login, ready } = usePrivy()

  if (!ready) {
    return <Button loading />
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
