import HashLink from 'components/HashLink'
import HatIcon from 'components/icons/HatIcon'
import TowerCard from 'components/TowerGame/TowerCard'
import { navigate } from 'wouter-preact/use-hash-location'

export default function () {
  const linkStyle = 'font-bold font-script text-3xl flex flex-col items-center'

  return (
    <div className="h-96 flex flex-row gap-x-4">
      <TowerCard onClick={() => navigate('/hatGame')} animated>
        <HashLink href="/hatGame" className={linkStyle}>
          <span>Hat Game</span>
          <HatIcon />
        </HashLink>
      </TowerCard>
      <TowerCard onClick={() => navigate('/towerGame')} animated>
        <HashLink href="/towerGame" className={linkStyle}>
          Tower Game
        </HashLink>
        <span
          style={{
            color: 'transparent',
            textShadow: '0 0 0 white',
            fontSize: '1.25rem',
            lineHeight: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          🗼
        </span>
      </TowerCard>
    </div>
  )
}
