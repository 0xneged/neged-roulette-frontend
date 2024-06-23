export function roundNumber(num: number) {
  if (num > 1000) return String(num / 1000) + 'K'
  if (num > 1000000) return String(num / 1000000) + 'KK'
  else return num
}
