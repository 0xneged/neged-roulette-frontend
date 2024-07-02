import { Suspense } from 'preact/compat'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useEffect, useState } from 'preact/hooks'
import { useWallets } from '@privy-io/react-auth'
import AllBetters from 'components/Main/AllBetters'
import HatIcon from 'components/icons/HatIcon'
import Roulette from 'components/Main/Roulette'
import Round from 'types/Round'
import RoundStats from 'components/Main/RoundStats'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import queryClient from 'helpers/queryClient'
import useSocket from 'helpers/useSocket'

export default function () {
  const socket = useSocket()
  const [parent] = useAutoAnimate()
  const { wallets } = useWallets()
  const address = wallets?.[0]?.address
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const safeDeposits = currentRound?.deposits || []
  const totalDeposits = safeDeposits.reduce(
    (prev, { amount }) => prev + amount,
    0
  )

  useEffect(() => {
    socket?.on('updateRound', (data: { currentRound: Round }) => {
      setCurrentRound(data.currentRound)
    })

    socket?.on(
      'roundEnd',
      async ({
        round,
        nextRoundTimeout,
      }: {
        nextRoundTimeout: number
        round: Round
      }) => {
        setCurrentRound(round)

        // Round ends, we spin a bit and wait for next round for 1000ms
        document.documentElement.style.setProperty(
          '--round-timeout',
          nextRoundTimeout - 750 + 'ms'
        )

        await queryClient.invalidateQueries({ queryKey: ['prevWinner'] })
        setTimeout(() => {
          setCurrentRound(null)
        }, nextRoundTimeout)
      }
    )

    return () => {
      socket?.off('updateRound')
      socket?.off('roundEnd')
    }
  }, [socket, address])

  return (
    <Suspense fallback={<HatIcon rotateAnimation />}>
      <div ref={parent}>
        <Roulette round={currentRound} totalDeposits={totalDeposits} />
        <TotalBets totalDeposits={totalDeposits} />
        <RoundStats round={currentRound} />
        <YourBets deposits={safeDeposits} totalDeposits={totalDeposits} />
        <AllBetters deposits={safeDeposits} totalDeposits={totalDeposits} />
      </div>
    </Suspense>
  )
}
