import { usePrivy } from '@privy-io/react-auth'
import HatIcon from 'components/icons/HatIcon'
import MessageBox, { OnDelete } from 'components/Modals/ChatModal/MessageBox'
import env from 'helpers/env'
import getUserAddress from 'helpers/getUserAddress'
import { memo } from 'preact/compat'
import ChatMessage from 'types/ChatMessage'

function Body({
  messages,
  onDelete,
}: {
  messages: ChatMessage[]
  onDelete: OnDelete
}) {
  const { user } = usePrivy()
  const userAddress = getUserAddress(user)
  const isAdmin = userAddress === env.VITE_ADMIN_ADDRESS

  return (
    <div className="flex flex-col-reverse relative overflow-auto h-[70dvh] md:h-[60dvh] text-white gap-y-2">
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
