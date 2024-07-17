import OnClick from 'types/OnClick'

interface ArrowProps extends OnClick {
  rotate?: number
  noBg?: boolean
}

export default function ({ onClick, rotate, noBg }: ArrowProps) {
  const background = noBg ? '' : 'bg-opacity-30 bg-primary'

  return (
    <div
      className={
        'rounded-3xl cursor-pointer p-2 hover:animate-pulse active:scale-105 transition-transform ' +
        background
      }
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 1L16.5 7M16.5 7L10.5 13M16.5 7L1.5 7"
          stroke="#8B5CF6"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </div>
  )
}
