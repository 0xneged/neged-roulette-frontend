import AllBetters from 'components/Main/AllBetters'
import PlayerHistory from 'components/Main/PlayerHistory'
import RoundHistory from 'components/Main/RoundHistory'
import TabNavigation from 'components/TabNavigation'

const tabHeaders = ['Player bets', 'Round history', 'Your history']
const tabComponents = [<AllBetters />, <RoundHistory />, <PlayerHistory />]

export default function () {
  return <TabNavigation tabHeaders={tabHeaders} tabComponents={tabComponents} />
}
