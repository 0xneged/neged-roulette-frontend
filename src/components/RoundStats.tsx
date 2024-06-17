import BiPeople from './BiPeople'

export default function () {
  return (
    <div className="relative">
      <div className="absolute top-1/2 flex flex-col justify-center w-full items-center">
        <span className="opacity-25 text-white">start of the round</span>
        <span className="font-bold text-white text-3xl">01:00</span>
        <div className="flex flex-row text-white items-center">
          <BiPeople /> 2
        </div>
      </div>
      <img src="img/neged-hat.png" />
    </div>
  )
}
