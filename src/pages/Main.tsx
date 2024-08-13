import ColoredEmoji from 'components/ColoredEmoji'
import HashLink from 'components/HashLink'
import HatIcon from 'components/icons/HatIcon'
import TowerCard from 'components/TowerGame/TowerCard'
import { navigate } from 'wouter-preact/use-hash-location'

export default function () {
  const linkStyle = 'font-bold font-script text-3xl flex flex-col items-center'

  return (
    <div className="h-96 flex flex-row flex-wrap gap-4">
      <TowerCard onClick={() => navigate('/hat-game')} animated>
        <HashLink href="/hat-game" className={linkStyle}>
          <span>Hat Game</span>
          <HatIcon rotate3dAnimation />
        </HashLink>
      </TowerCard>
      <TowerCard onClick={() => navigate('/tower-game')} animated>
        <HashLink href="/tower-game" className={linkStyle}>
          Tower Game
        </HashLink>
        <ColoredEmoji animate>🗼</ColoredEmoji>
      </TowerCard>
      <TowerCard onClick={() => navigate('/coin-flip')} animated>
        <HashLink href="/coin-flip" className={linkStyle}>
          Coin Flip Game
        </HashLink>
        <ColoredEmoji animate>🪙</ColoredEmoji>
      </TowerCard>
    </div>
  )
}
