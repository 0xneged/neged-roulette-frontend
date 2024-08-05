import { PropsWithChildren } from 'preact/compat'
import HatIcon from 'components/icons/HatIcon'
import OnClick from 'types/OnClick'

interface ButtonProps extends PropsWithChildren, OnClick {
  disabled?: boolean
  styles?: string
  loading?: boolean
  bgHat?: boolean
}

const basicButtonStyles =
  'flex-row flex cursor-pointer disabled:cursor-default items-center justify-center gap-x-2 text-lg text-white font-medium px-4 py-2 rounded-md disabled:opacity-20 enabled:active:scale-105 transition-all enabled:hover:hue-rotate-15 '

export default function ({
  children,
  onClick,
  styles = '',
  disabled,
  loading,
  bgHat,
}: ButtonProps) {
  const bg = bgHat ? 'bg-hat' : 'bg-primary bg-opacity-20'
  const precomputedStyles = basicButtonStyles + bg + ' '

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      className={precomputedStyles + styles}
      disabled={disabled}
    >
      {loading ? <HatIcon rotateAnimation /> : children}
    </button>
  )
}
