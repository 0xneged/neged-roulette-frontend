import { toast } from 'react-toastify'
import PromoCode from 'types/PromoCode'
import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'
import toastResponseError from 'helpers/api/toastResponseError'

const backendEndpoint = env.VITE_BACKEND_URL + '/promoCode'

export async function sendPromoCode(code: string) {
  try {
    const { headers } = await checkAuthToken()

    const { data } = await axios.post<{
      balance: number
      rewardAmount: number
    }>(backendEndpoint, { code }, { headers })

    toast.success(
      `Promo code activated 🎉 You got ${data.rewardAmount}, your balance is: ${data.balance} 🎩`
    )
  } catch (e) {
    console.error(e)

    toastResponseError(e, 'Failed to activate promo code, please try again')
  }
}

export async function getAvailablePromoCodes(adminPassword: string) {
  try {
    const { data } = await axios.get<PromoCode[]>(backendEndpoint + '/admin', {
      params: { adminPassword },
    })
    toast.success('Well cum 😎')
    return data
  } catch (e) {
    console.error(e)
    toastResponseError(e, 'Failed to get codes')
  }
}

export async function updatePromoCode(
  adminPassword: string,
  promoCodeData: PromoCode
) {
  try {
    const { data } = await axios.post<{ success: boolean }>(
      backendEndpoint + '/admin',
      { adminPassword, promoCodeData }
    )
    toast.success(`Created/updated the code: ${data.success}`)
    return data
  } catch (e) {
    console.error(e)
    toastResponseError(e, 'Failed to update codes')
  }
}
