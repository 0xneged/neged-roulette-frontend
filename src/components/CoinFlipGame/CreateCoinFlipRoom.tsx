import BigButton from 'components/BigButton'
import BetModal from 'components/Modals/BetModal'
import { createRoom } from 'helpers/api/coinFlipGame'
import getUserAddress from 'helpers/getUserAddress'
import useAuthToken from 'helpers/hooks/useAuthToken'
import useHatsCounter from 'helpers/hooks/useHatsCounter'
import queryClient, { QueryKeys } from 'helpers/queryClient'
import { useCallback, useState } from 'preact/hooks'

export default function () {
  const { authenticated, ready, login, user } = useAuthToken()
  const address = getUserAddress(user)
  const { data: hats } = useHatsCounter(address)
  const [modalOpen, setModalOpen] = useState(false)

  const onClick = useCallback(() => {
    if (!ready) return
    if (!authenticated) {
      login()
      return
    }

    setModalOpen(true)
  }, [authenticated, login, ready])

  return (
    <>
      <BigButton
        onClick={onClick}
        exClassName="w-full drop-shadow-lg"
        loading={!ready}
      >
        Create room
      </BigButton>

      <BetModal
        header="Create 🪙 flip room"
        userAddress={address}
        onBet={async (betAmount) => {
          await createRoom(betAmount)
          await queryClient.invalidateQueries({
            queryKey: [QueryKeys.coinFlip],
          })
        }}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        userDeposit={0}
        userHats={hats}
        minBet={50}
        maxBet={50000}
      />
    </>
  )
}
