import Button from './Button'
import HatIcon from './icons/HatIcon'

export default function () {
  return (
    <Button
      onClick={() => console.log('display hats here!')}
      styles="bg-primary rounded-3xl"
    >
      <HatIcon /> 1000K
    </Button>
  )
}
