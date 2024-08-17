import { useEffect, useState } from 'preact/hooks'

export default function (endTime?: string, updateInterval = 1000) {
  const defaultTime = { minutes: 0, seconds: 0, milliSeconds: 0 }
  const [time, setTime] = useState(defaultTime)

  useEffect(() => {
    if (!endTime) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()

      const distance = end - now

      setTime({
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) || 0,
        seconds: Math.floor((distance % (1000 * 60)) / 1000) || 0,
        milliSeconds: Math.floor(distance % 1000) || 0,
      })

      if (distance < 0) {
        clearInterval(interval)
        setTime({
          minutes: 0,
          seconds: 0,
          milliSeconds: 0,
        })
      }
    }, updateInterval)

    return () => {
      clearInterval(interval)
    }
  }, [endTime, updateInterval])

  if (!endTime) return defaultTime

  return time
}
