import BodyDropdown, {
  BodyDropDownProps,
} from 'components/Modals/Convert/BodyDropdown'

export default function ({
  tokenIndex,
  setTokenIndex,
  isWithdraw,
}: BodyDropDownProps) {
  return (
    <div class="flex flex-col items-center gap-y-2">
      <div class="flex bg-primary-bright rounded-full">
        <BodyDropdown
          tokenIndex={isWithdraw ? 0 : tokenIndex}
          setTokenIndex={setTokenIndex}
          isWithdraw={isWithdraw}
        />
      </div>
      <p class="text-sm opacity-75">{}</p>
    </div>
  )
}
