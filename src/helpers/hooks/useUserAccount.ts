import { useQuery } from '@tanstack/react-query'
import getUser from 'helpers/api/user'

export default function (address: string) {
  const { data } = useQuery({
    queryKey: ['user' + address],
    queryFn: () => getUser(address),
  })

  return { data, address }
}
