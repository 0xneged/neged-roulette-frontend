import OnClick from 'types/OnClick'

export default function ({ onClick }: OnClick) {
  return (
    <div
      className="flex items-center justify-center rounded-3xl cursor-pointer p-2 bg-opacity-30 bg-primary hover:animate-pulse active:scale-105 transition-transform h-11 w-11"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="24"
        height="24"
      >
        <path
          d="M47.9,73.9c-3,0-5.5-2.5-5.5-5.5v-2.2C42,54.2,50.1,49,56,45.2c6.4-4.1,10-6.8,10-14.1c0-9.3-6.8-15.3-17.3-15.3    c-2.5,0.1-14.2,1.4-14.2,15.2c0,3-2.5,5.5-5.5,5.5s-5.5-2.5-5.5-5.5c0-20.3,16.4-26,25-26.2c0,0,0.1,0,0.1,0    c16.7,0,28.4,10.8,28.4,26.3c0,13.7-8.7,19.3-15,23.4c-5.9,3.8-8.7,5.9-8.5,11.4c0,0.1,0,0.1,0,0.2v2.3    C53.4,71.5,50.9,73.9,47.9,73.9z"
          fill="#7F60F9"
        />
        <circle cx="48.4" cy="88.7" r="6.3" fill="#7F60F9" />
      </svg>
    </div>
  )
}
