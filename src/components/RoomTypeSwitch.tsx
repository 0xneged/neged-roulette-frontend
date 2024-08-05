import { RoundType } from 'types/Round'
import { useCallback } from 'preact/hooks'
import TabButton from 'components/TabButton'

interface RoundSwitcherProps {
  roundType: number
  setRoundType: (index: number) => void
  tabHeaders: string[]
}

export default function ({
  roundType,
  setRoundType,
  tabHeaders,
}: RoundSwitcherProps) {
  const changeRoundType = useCallback(
    (index: RoundType) => {
      setRoundType(index)
    },
    [setRoundType]
  )

  return (
    <div className="flex flex-row gap-x-1 my-2">
      {tabHeaders.map((text, index) => (
        <TabButton
          children={text}
          isCurrent={index === roundType}
          onClick={() => changeRoundType(index)}
          exClassName="w-full"
        />
      ))}
    </div>
  )
}
