import { FcUser } from 'types/FcUser'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = `${env.VITE_BACKEND_URL}/farcaster/getUser`

export default async function (address: string): Promise<Partial<FcUser>> {
  try {
    const result = await axios.post<FcUser>(backendEndpoint, { address })
    return result.data
  } catch (e) {
    console.error("Can't fetch Farcaster user", e)
    return {}
  }
}
