import ImageWithFallback from 'components/ImageWithFallback'
import { banUser } from 'helpers/api/chat'
import env from 'helpers/env'
import getAccountLink from 'helpers/getAccountLink'
import { useCallback, useState } from 'preact/hooks'
import { toast } from 'react-toastify'
import ChatMessage from 'types/ChatMessage'
import { useLongPress } from 'use-long-press'

export type OnDelete = (messageId: string, isAdminOrOwner: boolean) => void
const threshold = 500

export default function ({
  message,
  isYours,
  isAdmin,
  onDelete,
}: {
  message: ChatMessage
  isYours: boolean
  isAdmin: boolean
  onDelete: OnDelete
}) {
  const [opacity, setOpacity] = useState('opacity-100')
  const isAdminOrOwner = isAdmin || isYours

  const bind = useLongPress(() => onDelete(message.id, isAdminOrOwner), {
    threshold,
    onStart: () => (isAdminOrOwner ? setOpacity('opacity-0') : null),
    onCancel: () => (isAdminOrOwner ? setOpacity('opacity-100') : null),
    onFinish: () => (isAdminOrOwner ? setOpacity('opacity-100') : null),
  })
  const yourMessage = isYours
    ? 'flex-row-reverse items-end bg-primary-bright self-end'
    : 'flex-row items-start bg-hat self-start'

  const { user, text } = message

  const onDoubleClick = useCallback(() => {
    if (!isAdmin) return
    if (user.address === env.VITE_ADMIN_ADDRESS) {
      toast.error("You can't ban yourself")
      return
    }
    if (user.bannedFromChat) {
      toast.error('Already banned')
      return
    }
    const res = prompt('Type "yes" if you want to ban the user')

    if (res === 'yes') void banUser(user.address)
  }, [isAdmin, user.address, user.bannedFromChat])

  return (
    <div
      className={`flex gap-x-1 max-w-64 se:max-w-80 sm:max-w-96 ${yourMessage} ${opacity} items-center p-2 rounded-xl handle text-wrap break-words transition-opacity duration-${threshold} leading-tight`}
      onDblClick={onDoubleClick}
      {...bind()}
    >
      <a href={getAccountLink(user.address, user.fcUsername)} target="_blank">
        <ImageWithFallback address={user.address} imgUrl={user.fcPfpLink} />
      </a>
      <span className="max-w-48 se:max-w-64 sm:max-w-80">{text}</span>
    </div>
  )
}
