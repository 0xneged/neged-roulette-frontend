import { PropsWithChildren } from 'preact/compat'

export default function ({
  maxInRow,
  children,
}: { maxInRow: number } & PropsWithChildren) {
  const grid = `grid grid-cols-${maxInRow}`

  return (
    <div
      className={`${grid} justify-items-center gap-x-4 md:gap-x-10 gap-y-5 my-4`}
    >
      {children}
    </div>
  )
}
