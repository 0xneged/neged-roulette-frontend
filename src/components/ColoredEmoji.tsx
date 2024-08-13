import { PropsWithChildren } from 'preact/compat'

export default function ({
  children,
  animate,
}: PropsWithChildren & { animate?: boolean }) {
  return (
    <span
      className={animate ? 'animate-rotate3d' : ''}
      style={{
        color: '#ffffff10',
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
