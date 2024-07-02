import { PropsWithChildren } from 'preact/compat'
import OnClick from 'types/OnClick'
import HatIcon from './icons/HatIcon'

interface ButtonProps extends PropsWithChildren, OnClick {
  disabled?: boolean
  styles?: string
  loading?: boolean
}

const basicButtonStyles =
  'flex-row flex cursor-pointer items-center justify-center gap-x-2 text-lg text-white font-medium px-4 py-2 bg-primary rounded-md bg-opacity-20 disabled:opacity-20 enabled:active:scale-105 transition-all enabled:hover:hue-rotate-15 '

export default function ({
  children,
  onClick,
  styles = '',
  disabled,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      className={basicButtonStyles + styles}
      disabled={disabled}
    >
      {loading ? <HatIcon rotateAnimation /> : children}
    </button>
  )
}
