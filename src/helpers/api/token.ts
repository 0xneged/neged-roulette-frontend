import axios from 'axios'
import env from 'helpers/env'
import LoginBody from 'types/LoginBody'

const backendEndpoint = `${env.VITE_BACKEND_URL}/token`

export async function swapTokens(loginBody: LoginBody) {
  try {
    const result = await axios.post<{ success: boolean }>(
      `${backendEndpoint}/convert`,
      loginBody
    )
    return result.data.success
  } catch (e) {
    console.error('Failed to swap tokens', e)
    return false
  }
}

export async function getTokensForUser(address: string) {
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
