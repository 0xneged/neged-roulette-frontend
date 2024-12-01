import sdk from '@farcaster/frame-sdk'
import { usePrivy } from '@privy-io/react-auth'
import BigButton from 'components/BigButton'
import HatIcon from 'components/icons/HatIcon'
import getAccountLink from 'helpers/getAccountLink'
import getUserAddress from 'helpers/getUserAddress'
import handleError from 'helpers/handleError'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import roundNumber from 'helpers/numbers/roundNumber'
import { useCallback, useState } from 'preact/hooks'
import CoinFlipGame, { CoinFlipGameStatus } from 'types/CoinFlipGame'

export default function ({
  room,
  onJoinRoom,
}: {
  room: CoinFlipGame
  onJoinRoom: (_id: string) => Promise<void>
}) {
  const { ready, user } = usePrivy()
  const userAddress = getUserAddress(user)

  const { data } = useHatsCounter(userAddress)
  const [loading, setLoading] = useState(false)

  const userBalance = data || 0

  const isYours = userAddress === room.user1.address

  const notEnough = userBalance < room.betAmount
  const difference = roundNumber(room.betAmount - userBalance)

  const roundPreparing = room.status === CoinFlipGameStatus.preparing
  const roundOngoing = room.status === CoinFlipGameStatus.ongoing
  const roundFinished = room.status === CoinFlipGameStatus.finished

  const canShare = isYours && roundPreparing

  const onClick = useCallback(async () => {
    if (canShare) {
      const shareUrl =
        'https://warpcast.com/~/compose?text=I bet on heads, they have 60% chance to win!&embeds[]=https://degenflip.xyz'

      window.open(shareUrl, '_blank')
      return
    }

    setLoading(true)
    try {
      await onJoinRoom(room._id)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to join the room' })
    } finally {
      setLoading(false)
    }
  }, [canShare, onJoinRoom, room._id])

  return (
    <BigButton
      onClick={onClick}
      loading={loading || !ready || roundOngoing}
      disabled={notEnough || roundFinished}
      exClassName="gap-x-2 w-full"
    >
      {roundFinished ? (
        <span className="truncate">
          Finished! The winner is
          <p>
            <a
              href={getAccountLink(
                room.winner?.address,
                room.winner?.fcUsername
              )}
              target="_blank"
              className="underline"
            >
              {room.winner?.fcUsername || room.winner?.address}
            </a>
          </p>
        </span>
      ) : isYours ? (
        'Invite opponent 🔗'
      ) : notEnough ? (
        `You need ${difference} more to join`
      ) : (
        <>
          Join for {room.betAmount} <HatIcon />
        </>
      )}
    </BigButton>
  )
}
