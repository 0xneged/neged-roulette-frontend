import { invalidateManyQueries } from 'helpers/queryClient'
import { toast } from 'react-toastify'
import MorningStreakResponse from 'types/MorningStreak'
import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'
import roundNumber from 'helpers/numbers/roundNumber'

const backendEndpoint = env.VITE_BACKEND_URL

export async function addToMorningStreak() {
  try {
    const authToken = await checkAuthToken()

    const { data } = await axios.post<{ success: boolean; balance: number }>(
      `${backendEndpoint}/gm`,
      {},
      { headers: { Authorization: `Bearer ${authToken}` } }
    )

    if (data.success) {
      toast.success(
        'Nice 🔥 Your balance is ' +
          roundNumber(data.balance) +
          ' 🎩 Comeback in 24h'
      )
      await invalidateManyQueries(['hatsCounter', 'morningStreak'])
    }

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getMorningStreak() {
  try {
    const authToken = await checkAuthToken()

    const { data } = await axios.get<MorningStreakResponse>(
      `${backendEndpoint}/gm`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
