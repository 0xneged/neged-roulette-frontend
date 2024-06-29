export default function ({
  quantity,
  isReversed,
}: {
  quantity: number
  isReversed?: boolean
}) {
  return (
    <>
      <div className="flex flex-col justify-center gap-y-1">
        <span className="opacity-60">Quantity</span>
        <span>{quantity || 0}</span>
      </div>
      <span>{isReversed ? 'negeD' : 'Hats'}</span>
    </>
  )
}
