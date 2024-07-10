import { getPlayerHistory, getRoundHistory } from 'helpers/api/round'
import { useQuery } from '@tanstack/react-query'

export function useRoundHistory() {
  return useQuery({
    queryKey: ['roundHistory'],
    queryFn: getRoundHistory,
  })
}

export function usePlayerHistory(address?: string) {
  return useQuery({
    queryKey: ['playerHistory'],
    queryFn: () => getPlayerHistory(address),
  })
}
