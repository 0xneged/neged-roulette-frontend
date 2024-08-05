import { useQuery } from '@tanstack/react-query'
import DotsLoader from 'components/icons/DotsLoader'
import PulseSphere from 'components/PulseSphere'
import { getOnlineUsers } from 'helpers/api/chat'

export default function () {
  const { data, status } = useQuery({
    queryKey: ['chatOnline'],
    queryFn: getOnlineUsers,
    refetchInterval: 3000,
  })

  return (
    <div className="flex flex-row gap-x-2 items-center text-3xl font-script text-primary-bright">
      <span>Chat with frens</span>
      <PulseSphere />
      <span className="text-xl">
        {status === 'success' ? data : <DotsLoader />} online
      </span>
    </div>
  )
}
