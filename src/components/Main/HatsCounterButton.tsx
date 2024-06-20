import Button from '../Button'
import HatIcon from '../icons/HatIcon'
import { useLocation } from 'wouter-preact'

export default function () {
  const [, navigate] = useLocation()

  return (
    <Button
      onClick={() => navigate('/convert')}
      styles="bg-primary rounded-3xl"
    >
      <HatIcon /> 1000K
    </Button>
  )
}
