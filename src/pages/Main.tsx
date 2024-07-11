import { Suspense } from 'preact/compat'
import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useEffect } from 'preact/hooks'
import { useWallets } from '@privy-io/react-auth'
import FloatingGmButton from 'components/FloatingGmButton'
import HatIcon from 'components/icons/HatIcon'
import Roulette from 'components/Main/Roulette'
import Round from 'types/Round'
import RoundStats from 'components/Main/RoundStats'
import RoundTab from 'components/Main/RoundTab'
import TopWin from 'components/TopWin'
import TotalBets from 'components/Main/TotalBets'
import YourBets from 'components/Main/YourBets'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import queryClient from 'helpers/queryClient'
import roundAtom from 'helpers/atoms/roundAtom'
import useSocket from 'helpers/hooks/useSocket'

export default function () {
  const socket = useSocket()
  const [parent] = useAutoAnimate()
  const { wallets } = useWallets()
  const address = wallets?.[0]?.address.toLowerCase()
  const [currentRound, setCurrentRound] = useAtom(roundAtom)
  const safeDeposits = currentRound?.deposits || []
  const totalDeposits = getTotalDeposits(safeDeposits)

  useEffect(() => {
    socket?.on('updateRound', (data: { currentRound: Round }) => {
      setCurrentRound(data.currentRound)
    })

    socket?.on(
      'roundEnd',
      ({
        round,
        nextRoundTimeout,
      }: {
        round: Round
        nextRoundTimeout: number
      }) => {
        setCurrentRound(round)

        // Round ends, we spin a bit and wait for next round for 1000ms
        document.documentElement.style.setProperty(
          '--round-timeout',
          nextRoundTimeout - 750 + 'ms'
        )

        setTimeout(async () => {
          await queryClient.invalidateQueries({
            queryKey: [
              'hatsCounter',
              'prevWinner',
              'topWin',
              'roundHistory',
              'playerHistory',
            ],
          })
          setCurrentRound(null)
        }, nextRoundTimeout)
      }
    )

    return () => {
      socket?.off('updateRound')
      socket?.off('roundEnd')
    }
  }, [socket, address, setCurrentRound])

  return (
    <Suspense fallback={<HatIcon rotateAnimation />}>
      <div ref={parent}>
        <TopWin />
        <Roulette round={currentRound} totalDeposits={totalDeposits} />
        <TotalBets totalDeposits={totalDeposits} />
        <RoundStats round={currentRound} />
        <YourBets round={currentRound} totalDeposits={totalDeposits} />
        <RoundTab />
      </div>
      <FloatingGmButton />
    </Suspense>
  )
}
