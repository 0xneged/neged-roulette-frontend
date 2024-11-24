import HatIcon from 'components/icons/HatIcon'

export default function ({
  darkBg,
  small,
}: {
  darkBg?: boolean
  small?: boolean
}) {
  const bg = darkBg ? 'bg-neged' : 'bg-hat'
  const size = small ? 'w-5 h-5' : 'w-8 h-8'

  return (
    <div
      className={`flex items-center justify-center rounded-3xl rotate-180 ${size} ${bg}`}
    >
      <HatIcon small={small} />
    </div>
  )
}
