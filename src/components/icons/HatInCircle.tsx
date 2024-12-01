import HatIcon from 'components/icons/HatIcon'

export default function ({
  isWithdrawal,
  small,
}: {
  isWithdrawal?: boolean
  small?: boolean
}) {
  const bg = isWithdrawal ? 'bg-neged' : 'bg-hat'
  const size = small ? 'w-5 h-5' : 'w-8 h-8'

  return (
    <div
      className={`flex items-center justify-center rounded-3xl ${size} ${bg}`}
    >
      {isWithdrawal ? (
        <img src="https://basescan.org/token/images/degentips_32.png" />
      ) : (
        <HatIcon rotate={180} small={small} />
      )}
    </div>
  )
}
