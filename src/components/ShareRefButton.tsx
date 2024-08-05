import Button from 'components/Button'
import Share from 'components/icons/Share'
import share from 'helpers/share'
import { useCallback } from 'preact/hooks'

export default function ({ address }: { address?: string | undefined }) {
  const shareRef = useCallback(async () => {
    const url = document.location.origin + '?ref=' + address
    await share(url)
  }, [address])

  return (
    <Button onClick={shareRef} bgHat>
      <Share size={14} /> referral
    </Button>
  )
}
