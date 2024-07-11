import { MorningStreakResponse } from 'types/MorningStreak'
import { getAccessToken } from '@privy-io/react-auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import env from 'helpers/env'
import queryClient from 'helpers/queryClient'

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
    await queryClient.invalidateQueries({
      queryKey: ['morningStreak', 'hatsCounter'],
    })
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
