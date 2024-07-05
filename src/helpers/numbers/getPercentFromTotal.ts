export default function (amount: number, total: number) {
  return Math.round((amount / total) * 100) || 1
}
