import { TokenWithLogo } from 'helpers/swap/availableTokens'
import { toast } from 'react-toastify'
import TokenQuotes from 'types/TokenQuotes'
import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'

const backendEndpoint = `${env.VITE_BACKEND_URL}/token`

export async function convertTokensHats(
  tokenIndex: number,
  amount: number,
  withdraw: boolean
) {
  if (amount <= 0) return

  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<{ balance: number | undefined }>(
      `${backendEndpoint}/convert`,
      { tokenIndex, amount, withdraw: Number(withdraw) },
      { headers }
    )
    return data.balance
  } catch (e) {
    toast.error(
      'Failed to swap tokens 😵 If transaction succeeded, please save tx hash and send it to us',
      e
    )
  }
}

export async function getUserHats(address?: string) {
  if (!address) return null

  try {
    const { data } = await axios.get<number>(backendEndpoint, {
      params: { address },
    })
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getTokenQuotes(token: TokenWithLogo) {
  try {
    const { data } = await axios.get<TokenQuotes>(backendEndpoint + '/quotes', {
      params: { tokenAddress: token.address },
    })
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
