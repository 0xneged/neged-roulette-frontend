export function roundNumber(num: number) {
  num = Math.ceil(num * 1000) / 1000
  if (num > 1000) return (num / 1000).toFixed(0) + 'K'
  if (num > 1000000) return (num / 1000000).toFixed(0) + 'KK'
  else return num.toFixed(0)
}
