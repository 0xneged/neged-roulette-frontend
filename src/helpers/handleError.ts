import { toast } from 'react-toastify'

export default function (e: unknown, toastMessage: string) {
  console.error(e)
  toast.error(toastMessage)
}
