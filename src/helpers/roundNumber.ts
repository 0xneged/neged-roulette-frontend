export function roundNumber(num: number) {
  num = Math.ceil(num * 1000) / 1000
  if (num > 1000) return String(num / 1000) + 'K'
  if (num > 1000000) return String(num / 1000000) + 'KK'
  else return num
}
