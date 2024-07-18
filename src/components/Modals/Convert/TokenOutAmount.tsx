import DotsLoader from 'components/icons/DotsLoader'
import TokenQuotes from 'types/TokenQuotes'

export default function ({
  tokenOutData,
  inputAmount,
}: {
  inputAmount: number
  tokenOutData?: TokenQuotes | undefined | null
}) {
  if (!tokenOutData) return <DotsLoader />

  const { ratio } = tokenOutData

  return <span>{ratio * inputAmount}</span>
}
