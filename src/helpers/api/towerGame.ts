import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import roundNumber from 'helpers/numbers/roundNumber'
import queryClient from 'helpers/queryClient'
import { toast } from 'react-toastify'
import ServerResponse from 'types/ServerResponse'
import { TowerGame, TowerType } from 'types/TowerGame'
import User from 'types/User'

const backendEndpoint = env.VITE_BACKEND_URL + '/tower'

export async function getLastTower(towerType: TowerType) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.get<TowerGame>(backendEndpoint, {
      params: { towerType },
      headers,
    })
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to fetch your tower 🗼🦖' })
    return null
  }
}

export async function placeTowerBet({
  betAmount,
  towerType,
}: {
  betAmount: number
  towerType: TowerType
}) {
  try {
    const { headers } = await checkAuthToken()

    await axios.post<ServerResponse>(
      backendEndpoint + '/placeBet',
      {
        towerType,
        betAmount,
      },
      { headers }
    )
    await queryClient.invalidateQueries({
      queryKey: [`towerGame-${towerType}`],
    })
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to place bet 😥' })
  }
}

export async function guess(props: {
  guess: number
  towerType: TowerType
  _id: string
}) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<ServerResponse>(
      backendEndpoint + '/guess',
      props,
      { headers }
    )
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to guess, please try again 😥' })
  }
}

export async function exitTower(_id: string) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<{ balance: number }>(
      backendEndpoint + '/exit',
      { _id },
      { headers }
    )
    toast.success(
      `You exited 🛼 your balance now is ${roundNumber(data.balance)}`
    )
    return data.balance
  } catch (e) {
    handleError({
      e,
      toastMessage: 'Failed to exit the tower, please try again 😥',
    })
    throw e
  }
}

export interface TowerHistoryProps {
  towerType: TowerType
  address?: string | undefined
}

type TowerWithUser = TowerGame & { user: User }

export async function getTowerHistory({
  towerType,
  address,
}: TowerHistoryProps) {
  try {
    const { data } = await axios.get<TowerWithUser[]>(
      backendEndpoint + '/towerHistory',
      { params: { towerType, address } }
    )
    return data
  } catch (e) {
    handleError({ e, toastMessage: 'Failed to fetch tower history 🗼🦖' })
    return null
  }
}
