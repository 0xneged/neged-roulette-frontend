import { PropsWithChildren } from 'preact/compat'

interface DashedCardProps extends PropsWithChildren {
  subtitle: string
  orange?: boolean
}

export default function ({ children, orange, subtitle }: DashedCardProps) {
  const bgColor = orange ? 'bg-secondary' : 'bg-primary'
  const borderColor = orange ? 'border-secondary' : 'border-primary'
  const className = `flex flex-col rounded-xl items-center justify-center w-40 h-20 gap-y-1 ${bgColor} ${borderColor} border-dashed border-2 bg-opacity-20 text-center`

  return (
    <div className={className}>
      <span className="text-2xl font-bold">{children}</span>
      <span className="text-xs opacity-60">{subtitle}</span>
    </div>
  )
}
