import { Suspense } from 'preact/compat'
import CustomConnectButton from './CustomConnectButton'
import FcPfp from './FcPfp'
import HatsCounterButton from './Main/HatsCounterButton'
import Logo from './Logo'

export default function () {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md px-5 py-3 flex-row flex items-center justify-between">
      <Logo />
      <div className="flex flex-row gap-x-2">
        <HatsCounterButton />
        <CustomConnectButton />
      </div>
    </div>
  )
}
