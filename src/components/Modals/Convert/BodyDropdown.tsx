import { Dropdown, DropdownItem } from 'flowbite-react'
import availableTokens from 'helpers/swap/availableTokens'

export interface BodyDropDownProps {
  tokenIndex: number
  setTokenIndex: (val: number) => void
  isWithdraw?: boolean | undefined
}

function TokenImage({ href = '' }: { href?: string }) {
  return <img className="h-8 w-8 rounded-3xl" src={href} />
}

function DropDownLabel({
  logoURI,
  symbol,
  isWithdraw,
}: {
  logoURI: string
  symbol: string | undefined
  isWithdraw?: boolean
}) {
  const paddings = isWithdraw ? 'p-1 pr-2' : ''

  return (
    <div className={`flex flex-row gap-x-1 items-center font-bold ${paddings}`}>
      <TokenImage href={logoURI} />
      <span>{symbol}</span>
    </div>
  )
}

export default function ({
  setTokenIndex,
  tokenIndex,
  isWithdraw,
}: BodyDropDownProps) {
  const sizes = isWithdraw ? 'w-fit' : 'w-32'

  if (isWithdraw)
    return (
      <DropDownLabel
        logoURI={
          isWithdraw
            ? '/img/hat-token.png'
            : availableTokens[tokenIndex].logoURI
        }
        symbol={isWithdraw ? 'HAT' : availableTokens[tokenIndex].symbol}
        isWithdraw
      />
    )

  return (
    <Dropdown
      theme={{
        inlineWrapper: `flex flex-row gap-x-1 items-center justify-center border-2 border-black hover:bg-primary active:bg-primary bg-opacity-20 transition-colors rounded-3xl p-1 pr-2 ${sizes}`,
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
