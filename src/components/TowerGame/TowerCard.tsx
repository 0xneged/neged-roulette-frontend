import { PropsWithChildren } from 'preact/compat'
import Tilt from 'react-parallax-tilt'
import { TowerCardStatus } from 'types/TowerGame'

const statusToBg = {
  [TowerCardStatus.hidden]: '',
  [TowerCardStatus.lose]: 'bg-primary-dark',
  [TowerCardStatus.win]: 'bg-primary-bright',
}

interface TowerCardProps extends PropsWithChildren {
  status?: TowerCardStatus
  onClick?: () => void
  animated?: boolean
  disabled?: boolean
}

export default function ({
  status = TowerCardStatus.hidden,
  onClick,
  children,
  animated,
  disabled,
}: TowerCardProps) {
  const bg = statusToBg[status]
  const opacity = disabled ? 'opacity-70' : 'opacity-100'
  const animation = animated ? 'bg-scroll' : 'hover:bg-scroll'
  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  const transform =
    status === TowerCardStatus.hidden
      ? 'translateZ(2rem)'
      : 'translateY(180deg)'

  return (
    <Tilt
      className={`${bg} ${animation} ${opacity} ${cursor} rounded-lg border-2 border-primary-dark transition-all w-full h-20`}
      style={{
        transformStyle: 'preserve-3d',
        background: 'url(img/hatsBg.svg)',
        backgroundSize: '120%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat-x',
      }}
      tiltEnable={!disabled}
      glareEnable={!disabled}
      glareBorderRadius="0.4rem"
      gyroscope={!disabled}
      scale={disabled ? 1 : 1.05}
    >
      <div
        className={`rounded-lg h-20 w-full flex justify-center items-center flex-col`}
        style={{ transform }}
        onClick={() => {
          if (!disabled && onClick) onClick()
        }}
      >
        {children}
      </div>
    </Tilt>
  )
}
