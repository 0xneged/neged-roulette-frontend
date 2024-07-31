import { banUser } from 'helpers/api/chat'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import { useLongPress } from 'use-long-press'
import ChatMessage from 'types/ChatMessage'
import ImageWithFallback from 'components/ImageWithFallback'
import env from 'helpers/env'
import getAccountLink from 'helpers/getAccountLink'

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
      className={`flex gap-x-1 max-w-96 ${yourMessage} ${opacity} items-center p-2 rounded-xl handle text-wrap break-all transition-opacity duration-${threshold}`}
      onDblClick={onDoubleClick}
      {...bind()}
    >
      <a href={getAccountLink(user.address, user.fcUsername)} target="_blank">
        <ImageWithFallback address={user.address} imgUrl={user.fcPfpLink} />
      </a>
      <span className="max-w-80">{text}</span>
    </div>
  )
}
