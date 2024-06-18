import { Suspense } from 'preact/compat'
import CustomConnectButton from './CustomConnectButton'
import FcPfp from './FcPfp'
import HatsCounterButton from './HatsCounterButton'
import useFcAccount from 'helpers/useFcAccount'

export default function () {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md px-5 py-3 flex-row flex items-center justify-between">
      <p className="font-script text-neged text-3xl">negeD Hat</p>
      <div className="flex flex-row gap-x-2">
        <Suspense fallback="">
          <FcPfp />
        </Suspense>
        <HatsCounterButton />
        <CustomConnectButton />
      </div>
    </div>
  )
}
