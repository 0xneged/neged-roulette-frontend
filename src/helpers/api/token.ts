import { getAccessToken } from '@privy-io/react-auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = `${env.VITE_BACKEND_URL}/token`

export async function convertTokensHats(amount: number, withdraw: boolean) {
  if (amount <= 0) return

  try {
    const authToken = await getAccessToken()

    if (!authToken) {
      toast.error(
        'Looks like your wallet lost connection, please reconnect using our button 🙏'
      )
      return
    }

    const result = await axios.post<{ balance: number | undefined }>(
      `${backendEndpoint}/convert`,
      { amount, withdraw: Number(withdraw) },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    return result.data.balance
  } catch (e) {
    toast.error('Failed to swap tokens', e)
  }
}

export async function getTokensForUser(address?: string) {
  if (!address) return 0

  try {
    const { data } = await axios.get<number>(backendEndpoint, {
      params: { address },
    })
    return data
  } catch (e) {
    console.error(e)
    return 0
  }
}
