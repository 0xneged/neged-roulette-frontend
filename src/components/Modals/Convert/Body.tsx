import { Dispatch, StateUpdater, useCallback, useState } from 'preact/hooks'
import { TargetedEvent } from 'preact/compat'
import DotsLoader from 'components/icons/DotsLoader'
import HatInCircle from 'components/icons/HatInCircle'
import Input from 'components/Input'
import ReverseButton from 'components/Modals/Convert/ReverseButton'
import TokenWithBalance from 'components/Modals/Convert/TokenWithBalance'

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
    <div className="flex flex-col items-center gap-y-2 text-white">
      <span className="font-semibold opacity-70 text-center">
        <span>Minimum withdrawal amount is {minimumWithdrawal} HATs</span>
        <br />
        <span>You can only withdrawal to negeD for now</span>
      </span>

      <div class="flex flex-col w-full gap-y-1">
        <div className="z-40">
          <div class="flex justify-between items-center bg-hat p-4 rounded-t-lg">
            <div>
              <p class="text-sm opacity-50">From</p>
              <Input textColor="text-white" {...inputProps} />
            </div>
            <TokenWithBalance
              tokenIndex={tokenIndex}
              setTokenIndex={setTokenIndex}
              isWithdraw={isWithdraw}
            />
          </div>

          <ReverseButton onReversePress={onReversePress} />
        </div>

        <div class="flex justify-between items-center bg-hat-alt p-4 rounded-b-lg">
          <div>
            <p class="text-sm opacity-50">To</p>
            <p class="text-4xl">
              <DotsLoader />
            </p>
          </div>

          <div className="flex items-center gap-x-2 w-32 justify-end">
            <span>{isWithdraw ? 'negeD' : 'Hats'}</span>
            <HatInCircle darkBg={isWithdraw} />
          </div>
        </div>
      </div>
    </div>
  )
}
