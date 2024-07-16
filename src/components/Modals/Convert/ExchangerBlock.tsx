import { PropsWithChildren } from 'preact/compat'

interface ExchangerBlockProps extends PropsWithChildren {
  label: string
}

export default function ({ label, children }: ExchangerBlockProps) {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <span>{label}</span>
      <div className="flex flex-row items-center bg-roulette-box rounded-2xl justify-between py-6 px-3">
        {children}
      </div>
    </div>
  )
}
