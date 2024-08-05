import { lazy, Suspense } from 'preact/compat'
import HatIcon from './icons/HatIcon'

export default function ({ path }: { path: string }) {
  const Component = lazy(() => import(path))

  return (
    <Suspense fallback={<HatIcon rotateAnimation centered />}>
      <Component />
    </Suspense>
  )
}
