import { addToMorningStreak } from 'helpers/api/morningStreak'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import HatIcon from 'components/icons/HatIcon'
import useMorningStreak from 'helpers/hooks/useMorningStreak'

export default function () {
  const { data } = useMorningStreak()
  const [loading, setLoading] = useState(false)

  if (!data) return null

  const isAvailable = new Date() > new Date(data.morningStreakTimeout)

  if (!isAvailable) return null

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await addToMorningStreak()
    } catch (e) {
      console.error(e)
      toast.error('Ooof, please try GM again 😥')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <button
      className="flex items-center justify-center rounded-full bg-opacity-70 disabled:bg-opacity-40 bg-yellow-200 disabled:bg-yellow-500 fixed right-10 bottom-5 h-12 w-10 gm-button"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <HatIcon rotateAnimation small /> : '🔥'}
    </button>
  )
}
