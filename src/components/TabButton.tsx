import { PropsWithChildren } from 'preact/compat'

export default function ({
  isCurrent,
  onClick,
  children,
  exClassName,
}: {
  isCurrent: boolean
  onClick: () => void
  exClassName?: string
} & PropsWithChildren) {
  return (
    <button
      className={
        'text-base md:text-lg leading-tight text-center font-bold bg-primary rounded-2xl p-2 hover:bg-opacity-30 hover:hue-rotate-15 active:scale-105 transition-all ' +
        (isCurrent ? 'bg-opacity-30' : 'bg-opacity-0') +
        ' ' +
        exClassName
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
