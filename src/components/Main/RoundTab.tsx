import { useState } from 'preact/hooks'
import AllBetters from 'components/Main/AllBetters'
import PlayerHistory from 'components/Main/PlayerHistory'
import RoundHistory from 'components/Main/RoundHistory'

const tabHeaders = ['Player bets', 'Round history', 'Your history']
const tabs = [<AllBetters />, <RoundHistory />, <PlayerHistory />]

export default function () {
  const [tab, setTab] = useState(0)

  return (
    <div className="flex flex-col py-6 px-3 bg-primary-bg rounded-3xl my-8 gap-y-2">
      <div className="flex flex-row gap-x-1 justify-center">
        {tabHeaders.map((header, index) => (
          <button
            className={
              'text-lg text-center font-bold bg-primary-dark rounded-2xl p-2 ' +
              (index === tab ? 'bg-opacity-30' : 'bg-opacity-0')
            }
            onClick={() => setTab(index)}
            key={'roundTab' + index}
          >
            {header}
          </button>
        ))}
      </div>
      {tabs[tab]}
    </div>
  )
}
