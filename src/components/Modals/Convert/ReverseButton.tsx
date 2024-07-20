import { useCallback, useState } from 'preact/hooks'
import ArrowRight from 'components/icons/ArrowRight'

export default function ({
  onReversePress,
  disabled,
}: {
  onReversePress: () => void
  disabled: boolean
}) {
  const [animate, setAnimate] = useState(false)

  const onClick = useCallback(() => {
    onReversePress()
    setAnimate((prev) => !prev)
  }, [onReversePress])

  const rotate = animate ? 'rotate-360' : 'rotate-0'

  return (
    <button
      className={
        'flex justify-center bg-primary-bg w-8 rounded-lg transition-all disabled:text-bg-primary-bg ' +
        rotate
      }
      style={{ margin: '-16px auto' }}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowRight noBg rotate={90} />
    </button>
  )
}
