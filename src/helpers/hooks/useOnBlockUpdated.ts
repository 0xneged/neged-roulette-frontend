import { useEffect } from 'preact/hooks'
import useProvider from 'helpers/swap/usePrivyProvider'

export default function (callback: (blockNumber: number) => void) {
  const { provider } = useProvider()

  useEffect(() => {
    if (!provider) return

    const subscription = provider.on('block', callback)

    return () => {
      subscription.off('block', callback)
    }
  }, [callback, provider])
}
