import { RoundType } from 'types/Round'
import { invalidateManyQueries } from 'helpers/queryClient'
import { useCallback } from 'preact/hooks'
import TabButton from 'components/TabButton'
import useRound from 'helpers/hooks/useRound'

const tabHeaders = ['Newbie Hat (1-1K)', 'Based Hat (1K-50K)']

export default function () {
  const { roundType, setRoundType } = useRound()

  const changeRoundType = useCallback(
    (index: RoundType) => {
      setRoundType(index ? RoundType.whale : RoundType.hamster)
      void invalidateManyQueries(['roundHistory', 'playerHistory'])
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
