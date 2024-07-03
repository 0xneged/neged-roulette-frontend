import { getReferrer } from 'helpers/api/referral'
import { useQuery } from '@tanstack/react-query'

export default function (userAddress: string) {
  const { data } = useQuery({
    queryKey: ['referrer'],
    queryFn: () => getReferrer(userAddress),
  })

  return data
}
