import { PropsWithChildren } from 'preact/compat'
import emojiAvatarForAddress from 'helpers/emojiAvatarForAddress'

interface DashedCardProps extends PropsWithChildren {
  subtitle: string
  address?: string | undefined
}

export default function ({ children, address, subtitle }: DashedCardProps) {
  const { color } = emojiAvatarForAddress(address)
  const className = `flex flex-col rounded-xl items-center justify-center w-40 h-20 gap-y-1 border-dashed border-2 text-center`

  return (
    <div
      className={className}
      style={{
        backgroundColor: address ? color + 20 : '#7F60F920',
        borderColor: address ? color : '#7F60F9',
      }}
    >
      <span className="text-2xl font-bold">{children}</span>
      <span className="text-xs opacity-60">{subtitle}</span>
    </div>
  )
}
