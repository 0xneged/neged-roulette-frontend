import { TowerType } from 'types/TowerGame'
import { getLastTower } from 'helpers/api/towerGame'
import { useQuery } from '@tanstack/react-query'

export default function (towerType: TowerType) {
  return useQuery({
    queryKey: [`towerGame-${towerType}`],
    queryFn: () => getLastTower(towerType),
  })
}
