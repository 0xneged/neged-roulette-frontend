import { useQuery } from '@tanstack/react-query'
import { getReferrer } from 'helpers/api/referral'

export default function (userAddress: string) {
  const { data } = useQuery({
    queryKey: ['referrer'],
    queryFn: () => getReferrer(userAddress),
  })

  return data
}
