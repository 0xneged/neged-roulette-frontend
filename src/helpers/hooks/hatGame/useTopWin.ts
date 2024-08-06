import { useQuery } from '@tanstack/react-query'
import { getTopWinOfTheDay } from 'helpers/api/round'
import roundTypeAtom from 'helpers/atoms/roundTypeAtom'
import { useAtomValue } from 'jotai'

export default function () {
  const roundType = useAtomValue(roundTypeAtom)
  return useQuery({
    queryKey: ['topWin' + roundType],
    queryFn: () => getTopWinOfTheDay(roundType),
  })
}
