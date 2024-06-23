import { useEffect, useState } from 'preact/hooks'

export default function (endTime: string) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()

      const distance = end - now

      setTime({
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })

      if (distance < 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return time
}
