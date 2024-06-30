import axios from 'axios'
import env from 'helpers/env'
import { FcUser } from 'types/FcUser'

const backendEndpoint = `${env.VITE_BACKEND_URL}/farcaster/getUser`

export default async function (address?: string): Promise<Partial<FcUser>> {
  try {
    if (!address) return {}
    const result = await axios.post<FcUser>(backendEndpoint, { address })
    return result.data
  } catch (e) {
    console.error("Can't fetch Farcaster user", e)
    return {}
  }
}
