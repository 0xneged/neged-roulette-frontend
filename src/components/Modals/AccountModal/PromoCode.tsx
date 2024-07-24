import { sendPromoCode } from 'helpers/api/promoCodes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import Input from 'components/Input'

export default function () {
  const [code, setCode] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: (code: string) => {
      setCode('')
      return sendPromoCode(code)
    },
  })

  return (
    <div className="flex flex-row gap-x-2 items-center justify-between">
      <span>Promo Code</span>
      <Input
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
        className="text-2xl uppercase text-right"
        plainInput
      />
      <Button disabled={!code} loading={isPending} onClick={() => mutate(code)}>
        Activate
      </Button>
    </div>
  )
}
