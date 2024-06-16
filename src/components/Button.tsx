import { PropsWithChildren } from 'preact/compat'

export default function ({ children }: PropsWithChildren) {
  return (
    <div className="flex-row flex cursor-pointer items-center justify-center gap-x-2 text-lg text-white font-medium px-4 py-2 bg-primary rounded-md bg-opacity-20">
      {children}
    </div>
  )
}
