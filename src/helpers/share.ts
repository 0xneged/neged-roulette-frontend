import { toast } from 'react-toastify'
import isMobile from 'helpers/isMobile'

export default async function (url: string) {
  if (isMobile) {
    await navigator.share({
      title: 'Try your 🍀 at negeD game 😏',
      url,
    })
  } else {
    await navigator.clipboard.writeText(url)
    toast.success('Copied 😎')
  }
}
