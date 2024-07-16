import { Dispatch, StateUpdater, useCallback, useState } from 'preact/hooks'
import { TargetedEvent } from 'preact/compat'
import CoinToHats from 'components/Modals/Convert/CoinToHats'
import ExchangerBlock from 'components/Modals/Convert/ExchangerBlock'
import Input from 'components/Input'

interface BodyProps {
  setIsWithdraw: Dispatch<StateUpdater<boolean>>
  isWithdraw: boolean
  minimumWithdrawal: number
  setAmount: (value: number) => void
  amount: number
  hats: number | null | undefined
}

export default function ({
  setIsWithdraw,
  isWithdraw,
  minimumWithdrawal,
  setAmount,
  amount,
  hats,
}: BodyProps) {
  const [tokenIndex, setTokenIndex] = useState(0)

  const onInputChange = useCallback(
    ({ currentTarget }: TargetedEvent<HTMLInputElement>) => {
      if (!isWithdraw) setAmount(currentTarget.valueAsNumber || 0)

      setAmount(currentTarget.valueAsNumber || 0)
    },
    [isWithdraw, setAmount]
  )

  const onReversePress = useCallback(() => {
    setIsWithdraw((isWithdraw) => {
      isWithdraw
        ? setAmount(1000)
        : setAmount(Math.floor(Number(hats)) || minimumWithdrawal)

      return !isWithdraw
    })
  }, [hats, minimumWithdrawal, setAmount, setIsWithdraw])

  const inputProps = {
    value: amount,
    onChange: onInputChange,
    type: 'number',
    min: isWithdraw ? minimumWithdrawal : 1,
  }

  return (
    <div className="flex flex-col items-center gap-y-7 text-white">
      <div className="text-4xl text-primary font-bold">
        <Input {...inputProps} />
        <span>{isWithdraw ? 'Hats' : 'negeD'}</span>
      </div>
      {isWithdraw ? (
        <span className="font-semibold opacity-70 text-center">
          Minimum withdrawal amount is {minimumWithdrawal} HATs
        </span>
      ) : null}

      <ExchangerBlock label="Exchange">
        <CoinToHats
          tokenIndex={tokenIndex}
          setTokenIndex={setTokenIndex}
          isReversed={isWithdraw}
          onReverse={onReversePress}
        />
      </ExchangerBlock>
    </div>
  )
}
