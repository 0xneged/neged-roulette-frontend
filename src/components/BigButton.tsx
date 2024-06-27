import { PropsWithChildren } from 'preact/compat'
import OnClick from 'types/OnClick'

export default function ({ children, onClick }: PropsWithChildren & OnClick) {
  return (
    <div
      onClick={onClick}
      className="text-2xl text-center text-white bg-gradient-to-r from-primary-bright to-primary-dark cursor-pointer px-16 py-6 font-bold rounded-2xl flex items-center justify-center active:scale-105 transition-all hover:hue-rotate-15"
    >
      {children}
    </div>
  )
}
