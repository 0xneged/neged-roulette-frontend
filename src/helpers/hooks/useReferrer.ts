import { getReferrer } from 'helpers/api/referral'
import { useQuery } from '@tanstack/react-query'

export default function (userAddress: string) {
  return useQuery({
    queryKey: ['referrer' + userAddress],
    queryFn: () => getReferrer(userAddress),
  })
}
