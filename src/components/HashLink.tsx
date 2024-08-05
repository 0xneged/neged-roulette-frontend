import { Link, LinkProps } from 'wouter-preact'
import { PropsWithChildren } from 'preact/compat'
import { navigate } from 'wouter-preact/use-hash-location'

export default function ({
  children,
  ...props
}: PropsWithChildren & LinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        if (typeof props.href === 'string') navigate(props.href)
      }}
    >
      {children}
    </Link>
  )
}
