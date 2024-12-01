import ImageWithFallback from 'components/ImageWithFallback'
import { Dropdown, DropdownItem } from 'flowbite-react'
import availableTokens from 'helpers/swap/availableTokens'

export interface BodyDropDownProps {
  tokenIndex: number
  setTokenIndex: (val: number) => void
  isWithdraw?: boolean | undefined
  disabled?: boolean | undefined
}

function TokenImage({ href = '' }: { href?: string }) {
  return (
    <ImageWithFallback
      imgUrl={href}
      fallback={() => (
        <div className="w-full h-full bg-slate-200 rounded-3xl" />
      )}
      size={8}
    />
  )
}

function DropDownLabel({
  logoURI,
  symbol,
  isWithdraw,
  disabled,
}: {
  logoURI: string
  symbol: string | undefined
  isWithdraw?: boolean | undefined
  disabled?: boolean | undefined
}) {
  const paddings = isWithdraw ? 'p-1 pr-2' : ''
  const opacity = disabled ? 'opacity-80' : 'opacity-100'
  const cursor = isWithdraw ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      className={`flex flex-row gap-x-1 items-center font-bold transition-opacity ${paddings} ${opacity} ${cursor}`}
    >
      <TokenImage href={logoURI} />
      <span className="hidden md:block">{symbol}</span>
    </button>
  )
}

const onlyOneToken = true

export default function ({
  setTokenIndex,
  tokenIndex,
  isWithdraw,
  disabled,
}: BodyDropDownProps) {
  const sizes = onlyOneToken ? 'w-fit' : 'w-fit md:w-32'
  tokenIndex = isWithdraw ? 0 : tokenIndex

  if (onlyOneToken)
    return (
      <DropDownLabel
        logoURI={
          isWithdraw
            ? '/img/hat-token.png'
            : availableTokens[tokenIndex].logoURI
        }
        symbol={isWithdraw ? 'HAT' : availableTokens[tokenIndex].symbol}
        disabled={disabled}
        isWithdraw={onlyOneToken}
      />
    )

  return (
    <Dropdown
      theme={{
        inlineWrapper: `flex flex-row gap-x-1 items-center justify-between border-2 border-black hover:bg-primary active:bg-primary bg-opacity-20 transition-colors rounded-3xl p-1 pr-2 ${sizes}`,
        content:
          'bg-roulette-box border-2 border-black rounded-sm h-32 overflow-y-scroll transition-all w-32 rounded-2xl z-30',
        floating: {
          base: 'rounded-2xl z-30',
          item: {
            base: 'bg-hat hover:bg-primary-dark transition-all flex flex-row gap-x-1 p-2 w-full items-center',
          },
        },
      }}
      label={
        <DropDownLabel
          logoURI={availableTokens[tokenIndex].logoURI}
          symbol={availableTokens[tokenIndex].symbol}
          disabled={disabled}
        />
      }
      arrowIcon={!isWithdraw}
      floatingArrow={!isWithdraw}
      inline
    >
      {availableTokens.map(({ logoURI, symbol }, index) => (
        <DropdownItem
          icon={() => <TokenImage href={logoURI} />}
          onClick={() => setTokenIndex(index)}
          key={logoURI + index}
          className="gap-x-1"
        >
          {symbol}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
