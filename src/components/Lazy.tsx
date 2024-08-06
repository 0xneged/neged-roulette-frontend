import HatIcon from 'components/icons/HatIcon'
import { PropsWithChildren, Suspense } from 'preact/compat'

export default function ({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<HatIcon rotateAnimation centered />}>
      {children}
    </Suspense>
  )
}
