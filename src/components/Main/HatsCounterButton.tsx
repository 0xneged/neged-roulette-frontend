import Button from '../Button'
import HatIcon from '../icons/HatIcon'
import { useLocation } from 'wouter-preact'
import { roundNumber } from 'helpers/roundNumber'
import usePromise from 'react-promise-suspense'
import { getTokensForUser } from 'helpers/api/token'

export default function ({ address }: { address: string }) {
  const amount = usePromise(getTokensForUser, [address])
  const [, navigate] = useLocation()

  const hasData = typeof amount === 'number'

  return (
    <Button
      onClick={() => navigate('/convert')}
      styles="bg-primary rounded-full !h-11"
      disabled={!hasData}
    >
      <HatIcon rotateAnimation={!hasData} /> {hasData && roundNumber(amount)}
    </Button>
  )
}
