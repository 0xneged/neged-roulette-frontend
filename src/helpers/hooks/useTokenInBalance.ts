import { useQuery } from '@tanstack/react-query'
import { TokenWithLogo } from 'helpers/swap/availableTokens'
import getBalance from 'helpers/swap/getBalance'

export default function (token: TokenWithLogo, address?: string) {
  return useQuery({
    queryKey: ['tokenInBalance' + token.address],
    queryFn: () => getBalance(token, address),
  })
}
