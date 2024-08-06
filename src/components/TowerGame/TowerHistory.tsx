import HatIcon from 'components/icons/HatIcon'
import useTowerHistory from 'helpers/hooks/tower/useTowerHistory'
import { TowerType } from 'types/TowerGame'

export default function ({ towerType }: { towerType: TowerType }) {
  const { data, status } = useTowerHistory({ towerType })

  if (status === 'pending') return <HatIcon rotateAnimation centered />

  return (
    <div className="text-center">
      {data
        ? data.map((entry) => (
            <div>
              {entry.user.address} - {entry.betAmount}
            </div>
          ))
        : 'No history yet :)'}
    </div>
  )
}
