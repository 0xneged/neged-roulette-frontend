import Button from '../Button'
import HatIcon from '../icons/HatIcon'
import { useLocation } from 'wouter-preact'
import { roundNumber } from 'helpers/roundNumber'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import { Suspense } from 'preact/compat'

interface HatsCounterProps {
  address?: string | undefined
}

function SuspendedHatsCounter({ address }: HatsCounterProps) {
  const hats = useHatsCounter(address)
  const [, navigate] = useLocation()

  const hasData = typeof hats === 'number'

  return (
    <Button
      onClick={() => navigate('/convert')}
      styles="!bg-hat rounded-full !h-11"
      disabled={!hasData}
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
