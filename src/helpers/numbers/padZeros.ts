export default function (num: number, size = 2) {
  return ('000000000' + num).substr(-size)
}
