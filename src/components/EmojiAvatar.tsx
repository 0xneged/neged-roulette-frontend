import emojiAvatarForAddress from 'helpers/emojiAvatarForAddress'

export default function ({ address }: { address: string | undefined }) {
  const { color, emoji } = emojiAvatarForAddress(address)

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex items-center justify-center h-full w-full rounded-3xl"
    >
      {emoji}
    </div>
  )
}
