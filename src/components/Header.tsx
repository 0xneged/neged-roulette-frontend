import CustomConnectButton from './CustomConnectButton'
import Logo from './Logo'

export default function () {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md px-5 py-3 flex-row flex items-center justify-between">
      <Logo />
      <CustomConnectButton />
    </div>
  )
}
