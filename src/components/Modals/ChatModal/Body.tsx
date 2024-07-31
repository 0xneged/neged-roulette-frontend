import { memo } from 'preact/compat'
import ChatMessage from 'types/ChatMessage'
import HatIcon from 'components/icons/HatIcon'
import MessageBox, { OnDelete } from 'components/Modals/ChatModal/MessageBox'
import env from 'helpers/env'

function Body({
  messages,
  userAddress,
  onDelete,
}: {
  messages: ChatMessage[]
  userAddress: string | undefined
  onDelete: OnDelete
}) {
  const isAdmin = userAddress === env.VITE_ADMIN_ADDRESS

  return (
    <div className="flex flex-col-reverse relative overflow-auto h-[70vh] md:h-[60vh] text-white gap-y-2">
      {messages.length ? (
        messages
          .toReversed()
          .map((message, id) => (
            <MessageBox
              message={message}
              isYours={message.user.address === userAddress}
              isAdmin={isAdmin}
              onDelete={onDelete}
              key={message.id + id}
            />
          ))
      ) : (
        <HatIcon rotateAnimation centered />
      )}
    </div>
  )
}

export default memo(Body)
