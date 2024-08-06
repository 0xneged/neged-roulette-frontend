import { PropsWithChildren } from 'preact/compat'

export default function ({ children }: PropsWithChildren) {
  return (
    <span
      style={{
        color: 'transparent',
        textShadow: '0 0 0 white',
        fontSize: '1.25rem',
        lineHeight: '1rem',
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </span>
  )
}
