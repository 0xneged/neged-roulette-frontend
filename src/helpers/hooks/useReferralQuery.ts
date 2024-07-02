import { usePrivy } from '@privy-io/react-auth'
import updateReferral from 'helpers/api/referral'
import { useEffect } from 'preact/hooks'
import { isAddress } from 'viem'

export default function (referrer: string) {
  const { user } = usePrivy()

  useEffect(() => {
    if (!user?.wallet?.address || !isAddress(referrer)) return

    void updateReferral(referrer, user.wallet.address)
  }, [user?.wallet?.address])
}
