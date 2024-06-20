import BigButton from 'components/BigButton'
import CoinToHats from 'components/Convert/CoinToHats'
import ExchangerBlock from 'components/Convert/ExchangerBlock'
import HatsQuantity from 'components/Convert/HatsQuantity'
import { useCallback, useState } from 'preact/hooks'

export default function () {
  const [quantity, setQuantity] = useState('1.0000')

  const processExchange = useCallback(() => {
    console.log('implement!', quantity)
  }, [quantity])

  return (
    <div className="flex flex-col items-center gap-y-7">
      <span>You Convert</span>
      <div className="text-4xl text-primary font-bold">
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.currentTarget.value)}
          className="bg-transparent w-32"
        />
        <span> negeD</span>
      </div>
      <ExchangerBlock label="You Receive">
        <HatsQuantity quantity={quantity} />
      </ExchangerBlock>
      <ExchangerBlock label="Exchange">
        <CoinToHats />
      </ExchangerBlock>
      <BigButton onClick={processExchange}>CONVERT</BigButton>
    </div>
  )
}
