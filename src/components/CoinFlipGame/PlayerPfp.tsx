import ImageWithFallback from 'components/ImageWithFallback'
import User from 'types/User'

export default function ({
  user,
  isWinner,
  size = 16,
  maskUser,
}: {
  user?: User | undefined
  maskUser?: boolean
  isWinner?: boolean
  size?: number
}) {
  if (!user)
    return (
      <div
        className={`rounded-full h-${size} w-${size} border-2 border-dashed border-hat -mx-4 xs:-mx-2`}
      />
    )

  const border = isWinner
    ? 'border-4 border-dashed border-secondary shadow-card shadow-secondary'
    : ''

  return (
    <div className={`-mx-4 xs:-mx-2 ${border} transition-colors rounded-full`}>
      {maskUser ? (
        <span className="text-9xl">?</span>
      ) : (
        <ImageWithFallback
          address={user.address}
          imgUrl={user.fcPfpLink}
          className="rounded-full"
          size={size}
        />
      )}
    </div>
  )
}
