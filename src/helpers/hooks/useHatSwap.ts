import { TokenWithLogo } from 'helpers/swap/availableTokens'
import { getTokenQuotes } from 'helpers/api/token'
import { useQuery } from '@tanstack/react-query'

export default function (token: TokenWithLogo) {
  return useQuery({
    queryKey: ['hatSwap' + token.address],
    queryFn: () => getTokenQuotes(token),
  })
}
