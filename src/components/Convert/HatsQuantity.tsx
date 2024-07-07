import { HTMLAttributes } from 'preact/compat'
import Input from 'components/Input'

interface HatsQuantityProps extends HTMLAttributes<HTMLInputElement> {
  isReversed?: boolean
}

export default function ({ isReversed, ...inputProps }: HatsQuantityProps) {
  return (
    <>
      <div className="flex flex-col justify-center gap-y-1">
        <span className="opacity-60">Quantity</span>
        <Input {...inputProps} plainInput />
      </div>
      <span>{isReversed ? 'negeD' : 'Hats'}</span>
    </>
  )
}
