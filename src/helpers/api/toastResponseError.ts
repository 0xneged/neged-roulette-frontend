import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

export default function (e: unknown, fallback: string) {
  if (isAxiosError(e) && e?.response?.data?.message)
    toast.error(e.response.data.message)
  else toast.error(fallback)
}
