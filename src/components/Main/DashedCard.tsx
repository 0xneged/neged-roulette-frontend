import emojiAvatarForAddress from 'helpers/emojiAvatarForAddress'
import { PropsWithChildren } from 'preact/compat'

interface DashedCardProps extends PropsWithChildren {
  subtitle?: string
  address?: string | undefined
  fullSize?: boolean
  extStyles?: string
}

export default function ({
  children,
  address,
  subtitle,
  fullSize,
  extStyles = '',
}: DashedCardProps) {
  const { color } = emojiAvatarForAddress(address)
  const size = fullSize ? '' : 'w-40 h-20'
  const className = `flex flex-col rounded-xl items-center justify-center gap-y-1 border-dashed border-2 finalStyles text-center ${size} ${extStyles}`

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
