import { PropsWithChildren } from 'preact/compat'

interface DarkCardProps extends PropsWithChildren {
  hasDeposits?: boolean
  extStyle?: string
}

export default function ({ children, hasDeposits }: DarkCardProps) {
  return (
    <div
      className={`relative flex flex-1 flex-row rounded-lg bg-roulette-box py-3 overflow-hidden w-full gap-x-2 ${hasDeposits ? '' : 'hats-bg'}`}
    >
      {children}
    </div>
  )
}
