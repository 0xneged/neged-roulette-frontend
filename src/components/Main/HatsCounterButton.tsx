import { Suspense } from 'preact/compat'
import { useLocation } from 'wouter-preact'
import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import roundNumber from 'helpers/roundNumber'
import useHatsCounter from 'helpers/hooks/useHatsCounter'

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
