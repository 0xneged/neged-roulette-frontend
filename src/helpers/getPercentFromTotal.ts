export default function (amount: number, total: number) {
  return Math.ceil((amount / total) * 100)
}
