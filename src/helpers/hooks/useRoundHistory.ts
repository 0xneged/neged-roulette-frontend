import { getPlayerHistory, getRoundHistory } from 'helpers/api/round'
import { useAtomValue } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'

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
    queryKey: ['playerHistory' + roundType],
    queryFn: () => getPlayerHistory(roundType, address),
  })
}
