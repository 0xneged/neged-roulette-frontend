import { getAccessToken } from '@privy-io/react-auth'
import { toast } from 'react-toastify'

export default async function () {
  const authToken = await getAccessToken()

  if (!authToken) {
    const err =
      'Looks like your wallet lost connection, please reconnect using our button 🙏'
    toast.error(err)
    throw err
  }
  return { authToken, headers: { Authorization: `Bearer ${authToken}` } }
}
