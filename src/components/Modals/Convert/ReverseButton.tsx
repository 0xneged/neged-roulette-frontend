import ArrowRight from 'components/icons/ArrowRight'

export default function ({ onReversePress }: { onReversePress: () => void }) {
  return (
    <button
      class="flex justify-center border-2 border-primary-bg bg-primary-bg w-8 rounded-lg"
      style={{ margin: '-18px auto' }}
      onClick={onReversePress}
    >
      <ArrowRight noBg rotate={90} />
    </button>
  )
}
