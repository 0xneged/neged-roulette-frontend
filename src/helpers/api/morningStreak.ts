import { getAccessToken } from '@privy-io/react-auth'
import { invalidateManyQueries } from 'helpers/queryClient'
import { toast } from 'react-toastify'
import MorningStreakResponse from 'types/MorningStreak'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = env.VITE_BACKEND_URL

export async function addToMorningStreak() {
  const authToken = await getAccessToken()

  if (!authToken) {
    toast.error(
      'Looks like your wallet lost connection, please reconnect using our button 🙏'
    )
    return
  }

  const { data } = await axios.post<{ success: boolean; balance: number }>(
    `${backendEndpoint}/gm`,
    {},
    { headers: { Authorization: `Bearer ${authToken}` } }
  )

  if (data.success) {
    toast.success('Nice 🔥 Your balance is ' + data.balance + ' HATs')
    await invalidateManyQueries(['hatsCounter', 'morningStreak'])
  }

  return data
}
export async function getMorningStreak() {
  const authToken = await getAccessToken()

  if (!authToken) {
    toast.error(
      'Looks like your wallet lost connection, please reconnect using our button 🙏'
    )
    return
  }

  const { data } = await axios.get<MorningStreakResponse>(
    `${backendEndpoint}/gm`,
    { headers: { Authorization: `Bearer ${authToken}` } }
  )

  return data
}
