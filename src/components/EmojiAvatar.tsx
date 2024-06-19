import { emojiAvatarForAddress } from 'helpers/emojiAvatarForAddress'
import EthAddress from 'types/EthAddress'

export default function ({ address }: { address: EthAddress | undefined }) {
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
