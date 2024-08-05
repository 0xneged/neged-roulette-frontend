import HatIcon from 'components/icons/HatIcon'
import DashedCard from 'components/Main/DashedCard'
import { PreviousRoundComponent } from 'components/Main/PreviousRoundResult'
import useTopWin from 'helpers/hooks/useTopWin'

export default function () {
  const { data } = useTopWin()

  return (
    <DashedCard fullSize extStyles="p-4 mb-2">
      Top win of the day
      {data ? (
        <PreviousRoundComponent
          winner={data.winner}
          total={data.deposits.reduce((prev, { amount }) => prev + amount, 0)}
        />
      ) : (
        <div className="flex w-full justify-center">
          <HatIcon rotateAnimation />
        </div>
      )}
    </DashedCard>
  )
}
