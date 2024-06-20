import OnClick from 'types/OnClick'

export default function ({ onClick }: OnClick) {
  return (
    <div
      className="rounded-3xl cursor-pointer p-2 bg-opacity-30 bg-primary"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4L4 8M4 8L8 12M4 8H18C19.1046 8 20 8.89543 20 10V10"
          stroke="#7F60F9"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <path
          d="M16 12L20 16M20 16L16 20M20 16L5 16C3.89543 16 3 15.1046 3 14V14"
          stroke="#7F60F9"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </div>
  )
}
