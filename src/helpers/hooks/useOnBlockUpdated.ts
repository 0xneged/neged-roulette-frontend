import { useEffect } from 'preact/hooks'
import usePrivyProvider from 'helpers/hooks/usePrivyProvider'

export default function (callback: (blockNumber: number) => void) {
  const { provider } = usePrivyProvider()

  useEffect(() => {
    if (!provider) return

    const subscription = provider.on('block', callback)

    return () => {
      subscription.off('block', callback)
    }
  }, [callback, provider])
}
