import axios from 'axios'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'
import env from 'helpers/env'
import { readAtom } from 'helpers/stores/atomStore'
import { toast } from 'react-toastify'
import { RoundService, RoundType, RoundWithTime } from 'types/Round'

const backendEndpoint = env.VITE_BACKEND_URL + '/round'

export async function getTopWinOfTheDay(
  roundType: RoundType
): Promise<RoundWithTime | null> {
  try {
    const { data } = await axios.get<RoundWithTime>(
      backendEndpoint + '/mostWin',
      { params: { roundType } }
    )
    return data || null
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getRoundHistory(roundType: RoundType) {
  try {
    const { data } = await axios.get<RoundWithTime[]>(
      `${backendEndpoint}/roundHistory`,
      { params: { roundType } }
    )
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getPlayerHistory(
  roundType: RoundType,
  userAddress?: string
) {
  if (!userAddress) return []

  try {
    const { data } = await axios.get<RoundWithTime[]>(
      `${backendEndpoint}/playerHistory`,
      { params: { userAddress: userAddress.toLowerCase(), roundType } }
    )
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function placeBet(amount: number) {
  try {
    const roundType = readAtom(roundTypeAtom)
    if (!amount) throw 'Amount is 0 or less'

    await axios.post(`${backendEndpoint}/placeBet`, { amount, roundType })
  } catch (e) {
    toast.error('Error while placing a bet, please try again')
    console.error(e)
  }
}

export async function getRoundStatus(roundType: RoundType) {
  try {
    const { data } = await axios.get<RoundService>(
      `${backendEndpoint}/roundStatus`,
      { params: { roundType } }
    )
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
