import { useQuery } from '@tanstack/react-query'
import { getPlayerHistory, getRoundHistory } from 'helpers/api/round'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'
import { useAtomValue } from 'jotai'

export function useRoundHistory() {
  const roundType = useAtomValue(roundTypeAtom)
  return useQuery({
    queryKey: ['roundHistory' + roundType],
    queryFn: () => getRoundHistory(roundType),
  })
}

export function usePlayerHistory(address?: string) {
  const roundType = useAtomValue(roundTypeAtom)
  return useQuery({
    queryKey: [`playerHistory-${roundType}`],
    queryFn: () => getPlayerHistory(roundType, address),
  })
}
