import { useAutoAnimate } from '@formkit/auto-animate/preact'
import HatInCircle from 'components/icons/HatInCircle'
import Input from 'components/Input'
import ReverseButton from 'components/Modals/Convert/ReverseButton'
import TokenOutAmount from 'components/Modals/Convert/TokenOutAmount'
import TokenWithBalance from 'components/Modals/Convert/TokenWithBalance'
import availableTokens from 'helpers/swap/availableTokens'
import minimumWithdrawal from 'helpers/swap/minimumWithdrawal'
import { TargetedEvent } from 'preact/compat'
import { Dispatch, StateUpdater, useCallback } from 'preact/hooks'
import TokenQuotes from 'types/TokenQuotes'

interface BodyProps {
  setIsWithdraw: Dispatch<StateUpdater<boolean>>
  isWithdraw: boolean
  setAmount: (value: number) => void
  amount: number
  hats: number | null | undefined
  tokenIndex: number
  setTokenIndex: (value: number) => void
  tokenInBalance?: string | undefined | null
  tokenOutData?: TokenQuotes | undefined | null
  loading: boolean
}

export default function ({
  setIsWithdraw,
  isWithdraw,
  setAmount,
  amount,
  hats,
  tokenIndex,
  setTokenIndex,
  tokenInBalance,
  tokenOutData,
  loading,
}: BodyProps) {
  const [parent] = useAutoAnimate()
  const tokeInNeged = tokenIndex === 0
  const isNative = availableTokens[tokenIndex].isNative

  const onInputChange = useCallback(
    ({ currentTarget }: TargetedEvent<HTMLInputElement>) => {
      setAmount(currentTarget.valueAsNumber || 0)
    },
    [setAmount]
  )

  const onReversePress = useCallback(() => {
    setIsWithdraw((isWithdraw) => {
      isWithdraw
        ? setAmount(1000)
        : setAmount(Number(hats?.toFixed(4)) || minimumWithdrawal)

      return !isWithdraw
    })
  }, [hats, setAmount, setIsWithdraw])

  const setMax = useCallback(
    (balance: number) => {
      setAmount(balance)
    },
    [setAmount]
  )

  const inputProps = {
    value: amount,
    onInput: onInputChange,
    type: 'number',
    step: 'any',
    min: isWithdraw ? minimumWithdrawal : 'any',
  }

  return (
    <div
      className="flex flex-col items-center gap-y-2 text-white overflow-hidden"
      ref={parent}
    >
      {isWithdraw && (
        <span className="font-semibold opacity-70 text-center">
          <span>Minimum withdrawal amount is {minimumWithdrawal} HATs</span>
          <br />
          <span>You can only withdrawal to degen</span>
        </span>
      )}
      {isNative && (
        <span className="font-semibold opacity-70 text-center">
          To deposit ETH, you'll first need to wrap it into WETH, then approve
          spending, you'll see 2 transactions in your wallet
        </span>
      )}

      <div class="flex flex-col w-full gap-y-1">
        <div className="z-40">
          <div class="flex justify-between items-center bg-hat p-4 rounded-t-lg">
            <div>
              <p class="text-sm opacity-50">From</p>
              <Input
                textColor="text-white"
                disabled={loading}
                {...inputProps}
              />
            </div>
            <TokenWithBalance
              tokenIndex={tokenIndex}
              setTokenIndex={setTokenIndex}
              isWithdraw={isWithdraw}
              balance={isWithdraw ? String(hats || '0') : tokenInBalance}
              balanceLoading={loading}
              setMax={setMax}
            />
          </div>

          <ReverseButton onReversePress={onReversePress} disabled={loading} />
        </div>

        <div class="flex justify-between items-center bg-hat-alt p-4 rounded-b-lg">
          <div>
            <p class="text-sm opacity-50">To</p>
            <div class="text-4xl w-44 md:!w-96 overflow-hidden">
              {isWithdraw || tokeInNeged ? (
                amount
              ) : (
                <TokenOutAmount
                  inputAmount={amount}
                  tokenOutData={tokenOutData}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-x-2 w-32 justify-end">
            <span>{isWithdraw ? 'degen' : 'Hats'}</span>
            <HatInCircle darkBg={isWithdraw} />
          </div>
        </div>
      </div>
    </div>
  )
}
