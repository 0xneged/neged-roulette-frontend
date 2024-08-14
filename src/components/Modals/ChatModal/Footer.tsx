import { usePrivy } from '@privy-io/react-auth'
import BigButton from 'components/BigButton'
import Button from 'components/Button'
import Input from 'components/Input'
import getUserAddress from 'helpers/getUserAddress'
import useUserAccount from 'helpers/hooks/useUserAccount'

interface FooterProps {
  value: string
  setValue: (text: string) => void
  onSend: () => void
}

const max = 280

function ChatInput({
  value,
  setValue,
  onSend,
  userAddress,
}: FooterProps & { userAddress: string }) {
  const { data } = useUserAccount(userAddress)
  const isBanned = !!data?.bannedFromChat
  const disabled = !value || value.length > max || isBanned

  return (
    <div className="flex flex-row gap-x-1 justify-between w-full items-center text-white">
      <Input
        plainInput
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        className="!w-full h-10"
        maxLength={max}
        disabled={isBanned}
        placeholder={isBanned ? "You're banned ⛔" : "Let's roll 🎲"}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSend()
        }}
        enterkeyhint="send"
      />
      <span className="min-w-14 md:min-w-20 text-xs md:text-base text-center ">
        {value.length}/{max}
      </span>
      <Button disabled={disabled} onClick={onSend} bgHat>
        SEND
      </Button>
    </div>
  )
}

export default function ({ value, setValue, onSend }: FooterProps) {
  const { user, login } = usePrivy()
  const userAddress = getUserAddress(user)

  if (!userAddress) return <BigButton onClick={login}>Login to chat</BigButton>

  return (
    <ChatInput
      value={value}
      setValue={setValue}
      onSend={onSend}
      userAddress={userAddress}
    />
  )
}
