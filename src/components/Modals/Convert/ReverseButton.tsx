import { useCallback, useState } from 'preact/hooks'
import ArrowRight from 'components/icons/ArrowRight'

export default function ({ onReversePress }: { onReversePress: () => void }) {
  const [animate, setAnimate] = useState(false)

  const onClick = useCallback(() => {
    onReversePress()
    setAnimate((prev) => !prev)
  }, [onReversePress])

  const rotate = animate ? 'rotate-360' : 'rotate-0'

  return (
    <button
      className={
        'flex justify-center border-2 border-primary-bg bg-primary-bg w-8 rounded-lg transition-all ' +
        rotate
      }
      style={{ margin: '-18px auto' }}
      onClick={onClick}
    >
      <ArrowRight noBg rotate={90} />
    </button>
  )
}
