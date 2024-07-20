const factor = 1000

export default function (num: number | string) {
  return (Math.floor(Number(num) * factor) / factor).toFixed(4)
}
