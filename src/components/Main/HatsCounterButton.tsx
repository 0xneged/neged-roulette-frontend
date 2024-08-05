import Button from 'components/Button'
import HatIcon from 'components/icons/HatIcon'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import roundNumber from 'helpers/numbers/roundNumber'

interface HatsCounterProps {
  address?: string | undefined
  setModalOpen: (is: boolean) => void
}

export default function ({ address, setModalOpen }: HatsCounterProps) {
  const { data, status } = useHatsCounter(address)

  const hasData = status === 'success'

  return (
    <Button
      onClick={() => setModalOpen(true)}
      styles="rounded-full h-11 !opacity-100"
      disabled={!hasData}
      bgHat
    >
      <HatIcon rotateAnimation={!hasData} /> {data && roundNumber(data)}
    </Button>
  )
}
