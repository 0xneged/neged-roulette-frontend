import { HTMLAttributes } from 'preact/compat'

interface CustomInputProps extends HTMLAttributes<HTMLInputElement> {
  plainInput?: boolean
}

export default function (inputProps: CustomInputProps) {
  const textStyle = inputProps.plainInput ? '' : 'text-4xl text-primary '
  const className =
    textStyle +
      'font-bold bg-transparent w-32 border-0 p-0 focus-visible:outline-0 focus-visible:ring-0 invalid:text-red-500 ' +
      inputProps.className || ''

  return <input {...inputProps} className={className} autoFocus />
}
