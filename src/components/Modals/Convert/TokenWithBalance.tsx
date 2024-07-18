import BodyDropdown, {
  BodyDropDownProps,
} from 'components/Modals/Convert/BodyDropdown'
import DotsLoader from 'components/icons/DotsLoader'

export default function ({
  tokenIndex,
  setTokenIndex,
  isWithdraw,
  balance,
}: BodyDropDownProps & { balance?: string | undefined | null }) {
  return (
    <div class="flex flex-col items-end gap-y-2">
      <div class="flex bg-primary-bright rounded-full">
        <BodyDropdown
          tokenIndex={tokenIndex}
          setTokenIndex={setTokenIndex}
          isWithdraw={isWithdraw}
        />
      </div>
      <span class="text-sm opacity-75">
        Balance: {balance ? Number(balance).toFixed(2) : <DotsLoader />}
      </span>
    </div>
  )
}
