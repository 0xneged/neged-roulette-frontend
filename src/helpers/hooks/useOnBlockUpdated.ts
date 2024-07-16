import { getProvider } from 'helpers/swap/providers'
import { useState, useEffect } from 'preact/hooks'

export default function (callback: (blockNumber: number) => void) {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}
