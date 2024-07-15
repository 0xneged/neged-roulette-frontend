import { RoundService, RoundType } from 'types/Round'
import { getRoundHistory, getRoundStatus } from 'helpers/api/round'
import { invalidateManyQueries } from 'helpers/queryClient'
import { useAtom } from 'jotai'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from '@tanstack/react-query'
import checkRoundTimeout from 'helpers/numbers/checkRoundTimeout'
import getTotalDeposits from 'helpers/numbers/getTotalDeposits'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'
import shootConfetti from 'helpers/shootConfetti'

let isSpinning = false
let cachedRound: RoundService | null
async function getRoundStatusWithEndAnimation(
  roundType: RoundType,
  userAddress?: string
) {
  const roundService = await getRoundStatus(roundType)

  if (!isSpinning && roundService?.currentRound) {
    cachedRound = roundService
  }

  if (
    !isSpinning &&
    cachedRound &&
    cachedRound.currentRound &&
    roundService?.nextRoundTimeout &&
    roundService.previousRoundEndTime &&
    checkRoundTimeout(
      roundService.previousRoundEndTime,
      roundService.nextRoundTimeout
    )
  ) {
    isSpinning = true
    const { nextRoundTimeout } = roundService

    document.documentElement.style.setProperty(
      '--round-timeout',
      nextRoundTimeout - 750 + 'ms'
    )

    const winnerRound = await getRoundHistory(roundType)
    if (winnerRound?.[0])
      cachedRound.currentRound.winner = winnerRound[0].winner

    setTimeout(async () => {
      await invalidateManyQueries([
        'hatsCounter',
        'topWin',
        'roundHistory',
        'playerHistory',
      ])
      isSpinning = false
      cachedRound = null
      if (winnerRound?.[0].winner.address === userAddress?.toLowerCase())
        await shootConfetti()
    }, nextRoundTimeout)
  }

  return isSpinning ? cachedRound : roundService
}

export default function () {
  const { user } = usePrivy()
  const [roundType, setRoundType] = useAtom(roundTypeAtom)
  const query = useQuery({
    queryKey: [`round${roundType}`],
    queryFn: () =>
      getRoundStatusWithEndAnimation(roundType, user?.wallet?.address),
    refetchInterval: 1000,
  })
  const totalDeposits = getTotalDeposits(query.data?.currentRound?.deposits)
  return { ...query, roundType, setRoundType, totalDeposits }
}
