import { useQuery } from '@tanstack/react-query'
import { getGames } from 'helpers/api/coinFlipGame'
import { QueryKeys } from 'helpers/queryClient'

export default function () {
  return useQuery({
    queryKey: [QueryKeys.coinFlip],
    queryFn: () => getGames({}),
    refetchInterval: 500,
  })
}
