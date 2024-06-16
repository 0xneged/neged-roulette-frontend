import { PropsWithChildren } from 'preact/compat'

export default function ({ children }: PropsWithChildren) {
  return (
    <div className="text-2xl text-white bg-gradient-to-r from-primary-bright to-primary-dark cursor-pointer px-16 py-6 font-bold rounded-2xl flex items-center justify-center">
      {children}
    </div>
  )
}
