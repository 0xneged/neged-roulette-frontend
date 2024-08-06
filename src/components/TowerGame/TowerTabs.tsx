import TabNavigation from 'components/TabNavigation'
import TowerHistory from 'components/TowerGame/TowerHistory'
import TowerPlayerHistory from 'components/TowerGame/TowerPlayerHistory'
import { TowerType } from 'types/TowerGame'

const tabHeaders = ['History', 'Your stats']
const tabComponents = (towerType: TowerType) => [
  <TowerHistory towerType={towerType} />,
  <TowerPlayerHistory towerType={towerType} />,
]

export default function ({ towerType }: { towerType: TowerType }) {
  return (
    <TabNavigation
      tabHeaders={tabHeaders}
      tabComponents={tabComponents(towerType)}
    />
  )
}
