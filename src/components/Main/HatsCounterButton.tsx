import { Suspense } from 'preact/compat'
import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import roundNumber from 'helpers/numbers/roundNumber'
import useHatsCounter from 'helpers/hooks/useHatsCounter'

interface HatsCounterProps {
  address?: string | undefined
  setModalOpen: (is: boolean) => void
}

function SuspendedHatsCounter({ address, setModalOpen }: HatsCounterProps) {
  const hats = useHatsCounter(address)

  const hasData = typeof hats === 'number'

  return (
    <Button
      onClick={() => setModalOpen(true)}
      styles="rounded-full h-11"
      disabled={!hasData}
      bgHat
    >
      <HatIcon rotateAnimation={!hasData} /> {hasData && roundNumber(hats)}
    </Button>
  )
}

export default function (props: HatsCounterProps) {
  return (
    <Suspense fallback={<HatIcon rotateAnimation />}>
      <SuspendedHatsCounter {...props} />
    </Suspense>
  )
}
