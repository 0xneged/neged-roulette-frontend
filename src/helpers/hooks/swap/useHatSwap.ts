import { useQuery } from '@tanstack/react-query'
import { getTokenQuotes } from 'helpers/api/token'
import { TokenWithLogo } from 'helpers/swap/availableTokens'

export default function (token: TokenWithLogo) {
  return useQuery({
    queryKey: ['hatSwap' + token.address],
    queryFn: () => getTokenQuotes(token),
  })
}
