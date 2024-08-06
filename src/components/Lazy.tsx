import HatIcon from 'components/icons/HatIcon'
import { lazy, Suspense } from 'preact/compat'

export default function ({ path }: { path: string }) {
  const Component = lazy(() => import(path))

  return (
    <Suspense fallback={<HatIcon rotateAnimation centered />}>
      <Component />
    </Suspense>
  )
}
