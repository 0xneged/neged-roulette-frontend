import Button from 'components/Button'
import Input from 'components/Input'

const max = 280

export default function ({
  value,
  setValue,
  onSend,
}: {
  value: string
  setValue: (text: string) => void
  onSend: () => void
}) {
  const disabled = !value || value.length > max

  return (
    <div className="flex flex-row gap-x-2 justify-between w-full items-center text-white">
      <Input
        plainInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="!w-full h-10"
        maxLength={max}
      />
      <span className="min-w-20 text-center">
        {value.length}/{max}
      </span>
      <Button disabled={disabled} onClick={onSend} bgHat>
        SEND
      </Button>
    </div>
  )
}
