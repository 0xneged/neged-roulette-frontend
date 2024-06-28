import AllBetters from 'components/Main/AllBetters'
import Roulette from 'components/Main/Roulette'
import RoundStats from 'components/Main/RoundStats'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import HatIcon from 'components/icons/HatIcon'
import socket from 'helpers/api/socket'
import { Suspense } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import Round from 'types/Round'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import queryClient from 'helpers/queryClient'
import { usePrivy } from '@privy-io/react-auth'

export default function () {
  const [parent] = useAutoAnimate()

  const { user } = usePrivy()
  const address = user?.farcaster?.ownerAddress || user?.wallet?.address
  const [showAllBetter, setShowAllBetters] = useState(false)
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const safeDeposits = currentRound?.deposits || []
  const totalDeposits = safeDeposits.reduce(
    (prev, { amount }) => prev + amount,
    0
  )

  useEffect(() => {
    socket.on('updateRound', (data: { currentRound: Round }) => {
      setCurrentRound(data.currentRound)
    })

    socket.on(
      'roundEnd',
      ({
        round,
        nextRoundTimeout,
      }: {
        nextRoundTimeout: number
        round: Round
      }) => {
        setCurrentRound(round)
        document.documentElement.style.setProperty(
          '--round-timeout',
          nextRoundTimeout - 500 + 'ms'
        )
        queryClient.invalidateQueries({ queryKey: ['prevWinner'] })
        setTimeout(() => {
          setCurrentRound(null)
        }, nextRoundTimeout)
      }
    )

    return () => {
      socket.off('updateRound')
      socket.off('roundEnd')
    }
  }, [address])

  return (
    <Suspense fallback={<HatIcon rotateAnimation />}>
      <div ref={parent}>
        <Roulette round={currentRound} totalDeposits={totalDeposits} />
        <TotalBets
          totalDeposits={totalDeposits}
          setShowAllBetters={setShowAllBetters}
        />
        <RoundStats round={currentRound} />
        <YourBets deposits={safeDeposits} totalDeposits={totalDeposits} />
        <AllBetters
          deposits={safeDeposits}
          totalDeposits={totalDeposits}
          showAllBetter={showAllBetter}
        />
      </div>
    </Suspense>
  )
}
