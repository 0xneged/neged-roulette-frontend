import { PropsWithChildren } from 'preact/compat'
import Tilt from 'react-parallax-tilt'
import { ClassNameProp } from 'types/Props'

interface TowerCardProps extends PropsWithChildren {
  onClick?: () => void
  animated?: boolean
  disabled?: boolean
  glow?: boolean
}

export default function ({
  onClick,
  children,
  animated,
  disabled,
  glow,
  className,
}: TowerCardProps & ClassNameProp) {
  const boxShadow = glow ? 'shadow-card shadow-secondary' : ''
  const border = glow ? 'border-secondary' : 'border-primary-dark '
  const opacity = disabled ? 'opacity-50' : 'opacity-100'
  const animation = animated ? 'bg-scroll' : 'hover:bg-scroll'
  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <Tilt
      className={`${animation} ${opacity} ${cursor} ${boxShadow} rounded-lg border-2 ${border} transition-all w-full h-20 ${className}`}
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
        className={`rounded-lg h-20 w-full flex justify-center items-center flex-col ${className}`}
        style={{ transform: 'translateZ(2rem)' }}
        onClick={() => {
          if (!disabled && onClick) onClick()
        }}
      >
        {children}
      </div>
    </Tilt>
  )
}
