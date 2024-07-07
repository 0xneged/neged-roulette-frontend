import { RoundWithTime } from 'types/Round'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = env.VITE_BACKEND_URL + '/token/most-win'

export default async function getTopWinOfTheDay(): Promise<RoundWithTime | null> {
  try {
    const { data } = await axios.get<RoundWithTime>(backendEndpoint)
    return data || null
  } catch (e) {
    console.error(e)
    return null
  }
}
