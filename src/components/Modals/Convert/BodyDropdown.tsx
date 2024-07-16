import { Dropdown, DropdownItem } from 'flowbite-react'
import availableTokens from 'helpers/swap/availableTokens'

export interface BodyDropDownProps {
  tokenIndex: number
  setTokenIndex: (val: number) => void
}

function TokenImage({ href = '' }: { href?: string }) {
  return <img className="h-5 w-5 rounded-3xl" src={href} />
}

function DropDownLabel({
  logoURI,
  symbol,
}: {
  logoURI: string
  symbol: string | undefined
}) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <TokenImage href={logoURI} />
      <span>{symbol}</span>
    </div>
  )
}

export default function ({ setTokenIndex, tokenIndex }: BodyDropDownProps) {
  return (
    <Dropdown
      theme={{
        inlineWrapper:
          'flex flex-row gap-x-1 items-center w-32 hover:bg-primary bg-opacity-20 transition-colors px-2 py-1 rounded-3xl',
        content:
          'bg-primary-dark rounded-sm h-32 overflow-y-scroll transition-all w-32 rounded-2xl z-30',
        floating: {
          base: 'rounded-2xl z-30',
          item: {
            base: 'bg-primary hover:bg-primary-dark transition-all flex flex-row gap-x-1 px-2 py-1 w-full items-center',
          },
        },
      }}
      label={
        <DropDownLabel
          logoURI={availableTokens[tokenIndex].logoURI}
          symbol={availableTokens[tokenIndex].symbol}
        />
      }
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
