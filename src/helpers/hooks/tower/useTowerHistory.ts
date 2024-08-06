import { useQuery } from '@tanstack/react-query'
import { getTowerHistory, TowerHistoryProps } from 'helpers/api/towerGame'

export default function ({ towerType, address }: TowerHistoryProps) {
  return useQuery({
    queryKey: [`towerHistory-${towerType}-${address}`],
    queryFn: () => getTowerHistory({ towerType, address }),
  })
}
