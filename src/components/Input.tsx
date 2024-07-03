import { HTMLAttributes } from 'preact/compat'

export default function (inputProps: HTMLAttributes<HTMLInputElement>) {
  const className =
    'text-4xl text-primary font-bold bg-transparent w-32 border-0 p-0 focus-visible:outline-0 focus-visible:ring-0 invalid:text-red-500 ' +
    inputProps.className

  return <input {...inputProps} className={className} />
}
