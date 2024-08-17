import emojiAvatarForAddress from 'helpers/emojiAvatarForAddress'
import { ClassNameProp } from 'types/Props'

export default function ({
  address,
  className = 'rounded-3xl',
}: { address: string | undefined } & ClassNameProp) {
  const { color, emoji } = emojiAvatarForAddress(address)

  return (
    <div
      style={{ backgroundColor: color }}
      className={`flex items-center justify-center h-full w-full ${className}`}
    >
      {emoji}
    </div>
  )
}
