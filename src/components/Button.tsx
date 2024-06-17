import { PropsWithChildren } from 'preact/compat'
import OnClick from 'types/OnClick'

interface ButtonProps extends PropsWithChildren, OnClick {
  styles?: string
}

const basicButtonStyles =
  'flex-row flex cursor-pointer items-center justify-center gap-x-2 text-lg text-white font-medium px-4 py-2 bg-primary rounded-md bg-opacity-20'

export default function ({ children, onClick, styles = '' }: ButtonProps) {
  return (
    <div onClick={onClick} className={basicButtonStyles + styles}>
      {children}
    </div>
  )
}
