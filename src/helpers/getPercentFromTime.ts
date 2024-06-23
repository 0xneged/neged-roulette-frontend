export default function (start: string, end: string) {
  const now = new Date().getTime()
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  const totalTime = endTime - startTime
  const progress = now - startTime
  return (progress / totalTime) * 100
}
