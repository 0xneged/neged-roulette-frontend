export default function (
  previousRoundEndTime: string,
  nextRoundTimeout: number
) {
  const prevDate = new Date(previousRoundEndTime)

  return (
    new Date() >= prevDate &&
    new Date() <= new Date(prevDate.getTime() + nextRoundTimeout)
  )
}
