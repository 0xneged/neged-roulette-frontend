import Button from 'components/Button'
import WalletIcon from 'components/icons/WalletIcon'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import CustomConnectButton from './CustomConnectButton'

export default function () {
  return (
    <div className="px-5 py-3 flex-row flex items-center justify-between">
      <p className="font-script text-neged text-3xl">negeD Hat</p>
      <CustomConnectButton />
    </div>
  )
}
