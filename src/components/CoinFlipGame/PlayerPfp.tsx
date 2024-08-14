import ImageWithFallback from 'components/ImageWithFallback'
import User from 'types/User'

export default function ({
  user,
  isWinner,
  size = 16,
}: {
  user?: User | undefined
  isWinner?: boolean
  size?: number
}) {
  if (!user)
    return (
      <div className="rounded-full h-16 w-16 border-2 border-dashed border-hat -mx-4 xs:-mx-2" />
    )

  const border = isWinner
    ? 'border-2 border-dashed border-secondary shadow-card shadow-secondary'
    : ''

  return (
    <div className={`-mx-4 xs:-mx-2 ${border} rounded-full`}>
      <ImageWithFallback
        address={user.address}
        imgUrl={user.fcPfpLink}
        className="rounded-full"
        size={size}
      />
    </div>
  )
}
