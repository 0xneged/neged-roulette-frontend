export default function ({ quantity }: { quantity: string }) {
  return (
    <>
      <div className="flex flex-col justify-center gap-y-1">
        <span className="opacity-60">Quantity</span>
        <span>{quantity}</span>
      </div>
      <span>Hats</span>
    </>
  )
}
