import { RoundWithTime } from 'types/Round'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = env.VITE_BACKEND_URL + '/token/most-win'

export default async function getTopWinOfTheDay() {
  try {
    const { data } = await axios.get<RoundWithTime>(backendEndpoint)
    return data || ''
  } catch (e) {
    console.error(e)
    return ''
  }
}
