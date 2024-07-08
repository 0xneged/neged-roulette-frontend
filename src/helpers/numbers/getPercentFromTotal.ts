export default function (amount: number, total: number) {
  const result = ((amount / total) * 100).toFixed(2)
  if (result === '100.00') return '99.99'
  if (result === '0.00') return '0.01'
  return result
}
