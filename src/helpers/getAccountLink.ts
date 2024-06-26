export default function (address: string, fcUsername?: string) {
  if (fcUsername) return `https://warpcast.com/${fcUsername}`
  else return `https://basescan.org/address/${address}`
}
