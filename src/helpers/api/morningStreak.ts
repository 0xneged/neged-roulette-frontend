import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'
import roundNumber from 'helpers/numbers/roundNumber'
import queryClient, { setHatsQueryData } from 'helpers/queryClient'
import { toast } from 'react-toastify'
import MorningStreakResponse from 'types/MorningStreak'

const backendEndpoint = env.VITE_BACKEND_URL

export async function addToMorningStreak(address: string) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<{ success: boolean; balance: number }>(
      `${backendEndpoint}/gm`,
      {},
      { headers }
    )

    if (data.success) {
      toast.success(
        'Nice 🔥 Your balance is ' +
          roundNumber(data.balance) +
          ' 🎩 Comeback in 24h'
      )
      setHatsQueryData(address, data.balance)
      await queryClient.invalidateQueries({ queryKey: ['morningStreak'] })
    }

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getMorningStreak() {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.get<MorningStreakResponse>(
      `${backendEndpoint}/gm`,
      { headers }
    )

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
