import axios from 'axios'
import env from 'helpers/env'
import { FcUser } from 'types/FcUser'

const backendEndpoint = `${env.VITE_BACKEND_URL}/farcaster/getUser`

export default async function (
  address?: string,
  pfpUrl?: string | null
): Promise<Partial<FcUser>> {
  try {
    if (pfpUrl) return Promise.resolve({ fcPfpLink: pfpUrl })
    if (!address) return Promise.resolve({})
    const result = await axios.post<FcUser>(backendEndpoint, { address })
    return result.data
  } catch (e) {
    console.error("Can't fetch Farcaster user", e)
    return {}
  }
}
