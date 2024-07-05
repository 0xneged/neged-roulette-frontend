import { isAddress } from 'viem'
import { useEffect } from 'preact/hooks'
import { usePrivy } from '@privy-io/react-auth'
import updateReferral from 'helpers/api/referral'

export default function (referrer: string) {
  const { user } = usePrivy()

  useEffect(() => {
    const refAddress = referrer.split('=')[1]
    if (!user?.wallet?.address || !isAddress(refAddress)) return

    void updateReferral(refAddress, user.wallet.address.toLowerCase())
  }, [referrer, user?.wallet?.address])
}
