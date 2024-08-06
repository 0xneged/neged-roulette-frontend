import { useAutoAnimate } from '@formkit/auto-animate/preact'
import TabButton from 'components/TabButton'
import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  tabHeaders,
  tabComponents,
}: {
  tabHeaders: string[]
  tabComponents: JSX.Element[]
}) {
  const [tab, setTab] = useState(0)
  const [parent] = useAutoAnimate()

  return (
    <div className="flex flex-col py-6 px-3 bg-roulette-box rounded-3xl my-8 gap-y-2 items-center">
      <div className="flex flex-row gap-x-1 justify-center">
        {tabHeaders.map((header, index) => (
          <TabButton
            children={header}
            onClick={() => setTab(index)}
            isCurrent={tab === index}
          />
        ))}
      </div>

      <div className="flex flex-col w-full gap-y-2" ref={parent}>
        {tabComponents[tab]}
      </div>
    </div>
  )
}
