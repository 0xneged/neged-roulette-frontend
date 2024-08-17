import baseScanAddress from 'helpers/baseScanAddress'

export default function (address?: string, fcUsername?: string) {
  if (fcUsername) return `https://warpcast.com/${fcUsername}`
  if (address) return baseScanAddress(address)
  return undefined
}
