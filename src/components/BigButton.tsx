import HatIcon from 'components/icons/HatIcon'
import { PropsWithChildren } from 'preact/compat'
import OnClick from 'types/OnClick'

interface BigButtonProps extends PropsWithChildren, OnClick {
  loading?: boolean
  disabled?: boolean
  exClassName?: string
}

const commonStyles =
  'text-2xl text-center text-white px-16 py-6 font-bold rounded-2xl flex items-center justify-center transition-all '

export default function ({
  children,
  onClick,
  loading,
  disabled,
  exClassName,
}: BigButtonProps) {
  const styles = disabled
    ? commonStyles + 'bg-pale-purple cursor-not-allowed '
    : commonStyles +
      'bg-gradient-to-r from-primary-bright to-primary-dark cursor-pointer active:scale-105 hover:hue-rotate-15 '

  return (
    <div
      onClick={() => {
        if (disabled || loading) return
        onClick?.()
      }}
      disabled={disabled}
      className={styles + exClassName}
    >
      {loading ? <HatIcon rotateAnimation /> : children}
    </div>
  )
}
