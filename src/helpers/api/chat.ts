import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'
import { toast } from 'react-toastify'

const backendEndpoint = env.VITE_BACKEND_URL + '/chat'

export async function banUser(address: string) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<{ success: boolean }>(
      `${backendEndpoint}/banUser`,
      { address },
      { headers }
    )

    if (data.success) toast.success("You've 🔨 him")
    else throw new Error('User not found')
  } catch (e) {
    console.error(e)
    toast.error('Failed to ban the user')
  }
}

export async function getOnlineUsers() {
  try {
    const { data } = await axios.get<{ amount: number }>(
      `${backendEndpoint}/users`
    )

    return data.amount
  } catch (e) {
    console.error(e)
    toast.error('Failed to ban the user')
    return 1
  }
}
