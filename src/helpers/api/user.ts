import axios from 'axios'
import env from 'helpers/env'
import User from 'types/User'

const backendEndpoint = `${env.VITE_BACKEND_URL}/user`

export default async function (address: string): Promise<Partial<User>> {
  try {
    const result = await axios.get<User>(backendEndpoint, {
      params: { address },
    })
    return result.data
  } catch (e) {
    console.error("Can't fetch Farcaster user", e)
    return {}
  }
}
