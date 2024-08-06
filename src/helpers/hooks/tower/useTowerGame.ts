import { useQuery } from '@tanstack/react-query'
import { getLastTower } from 'helpers/api/towerGame'
import { TowerType } from 'types/TowerGame'

export default function (towerType: TowerType) {
  return useQuery({
    queryKey: [`towerGame-${towerType}`],
    queryFn: () => getLastTower(towerType),
  })
}
