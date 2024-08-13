import axios from 'axios'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import CoinFlipGame from 'types/CoinFlipGame'

const backendUrl = env.VITE_BACKEND_URL + '/coinFlip'

export async function getGames({
  betFrom = 50,
  betTo = 50000,
}: {
  betFrom?: number
  betTo?: number
}) {
  try {
    const { data } = await axios.get<CoinFlipGame[]>(backendUrl, {
      params: { betFrom, betTo },
    })
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to fetch games :(' })
    return []
  }
}

export async function currentGame(params: { _id: string }) {
  try {
    const { data } = await axios.get<CoinFlipGame>(
      backendUrl + '/currentGame',
      { params }
    )
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to get your game :(' })
    return []
  }
}

export async function createRoom(betAmount: number) {
  try {
    const { data } = await axios.post<CoinFlipGame>(
      backendUrl + '/createRoom',
      { betAmount }
    )
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to create a room :(' })
    return null
  }
}

export async function joinRoom(_id: string) {
  try {
    const { data } = await axios.post<CoinFlipGame>(backendUrl + '/joinRoom', {
      _id,
    })
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to get your game :(' })
    return null
  }
}
