import { usePrivy } from '@privy-io/react-auth'
import axios from 'axios'
import { useEffect } from 'preact/hooks'

export default function () {
  const { ready, authenticated, getAccessToken } = usePrivy()

  useEffect(() => {
    if (!ready || !authenticated) {
      axios.defaults.headers.common['Authorization'] = ''
      return
    }

    async function auth() {
      const token = await getAccessToken()
      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    void auth()
  }, [authenticated, getAccessToken, ready])
}
