import HatIcon from './HatIcon'

export default function ({ darkBg }: { darkBg?: boolean }) {
  const bg = darkBg ? 'bg-neged' : 'bg-hat'

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-3xl ${bg}`}
    >
      <HatIcon />
    </div>
  )
}
