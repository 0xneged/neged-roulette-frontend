import axios from 'axios'
import env from 'helpers/env'
import { isAddress } from 'viem'

type Referrer = {
  referrer: string | undefined
}

const backendEndpoint = `${env.VITE_BACKEND_URL}/referral`

export async function getReferrer(userAddress: string) {
  try {
    const { data: previous } = await axios.get<Referrer>(backendEndpoint, {
      params: { userAddress },
    })
    return previous.referrer
  } catch (e) {
    console.error(e)
  }
}

export async function postNewReferrer(referrer: string, userAddress: string) {
  try {
    if (!isAddress(referrer)) throw new Error('Eth address invalid')

    const { data } = await axios.post<Referrer>(backendEndpoint, {
      referrer,
      userAddress,
    })
    return data.referrer
  } catch (e) {
    console.error(e)
  }
}

export default async function (referrer: string, userAddress: string) {
  if (!isAddress(referrer)) return
  try {
    const prevReferrer = await getReferrer(userAddress)
    if (prevReferrer) return

    const result = await postNewReferrer(referrer, userAddress)
    return result
  } catch (e) {
    console.error(e)
  }
}
