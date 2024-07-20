import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'preact/hooks'
import { useWallets } from '@privy-io/react-auth'

export default function () {
  const { ready, wallets } = useWallets()
  const [data, setData] = useState<{
    provider: Web3Provider | undefined
    address: string | undefined
  }>({ provider: undefined, address: undefined })

  useEffect(() => {
    if (!ready || !wallets[0]) return

    async function setup() {
      setData({
        provider: await wallets[0].getEthersProvider(),
        address: wallets[0].address,
      })
    }
    void setup()
  }, [ready, wallets])

  return data
}
