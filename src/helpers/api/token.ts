import axios from 'axios'
import env from 'helpers/env'
import LoginBody from 'types/LoginBody'
import { Deposit, Winner } from 'types/Round'
import { getAccessToken } from '@privy-io/react-auth'

const backendEndpoint = `${env.VITE_BACKEND_URL}/token`

export async function swapTokens(loginBody: LoginBody) {
  try {
    const result = await axios.post<{ success: boolean }>(
      `${backendEndpoint}/convert`,
      {},
      { headers: { Authorization: `Bearer ${await getAccessToken()}` } }
    )
    return result.data.success
  } catch (e) {
    console.error('Failed to swap tokens', e)
    return false
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

export async function getPreviousWinner() {
  try {
    const { data } = await axios.get<Winner>(`${backendEndpoint}/prevWinner`)
    return data
  } catch (e) {
    console.error(e)
    return ''
  }
}
