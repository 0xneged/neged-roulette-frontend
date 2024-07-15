import { getTopWinOfTheDay } from 'helpers/api/round'
import { useAtomValue } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'

export default function () {
  const roundType = useAtomValue(roundTypeAtom)
  return useQuery({
    queryKey: ['topWin' + roundType],
    queryFn: () => getTopWinOfTheDay(roundType),
  })
}
