import baseScanAddress from 'helpers/baseScanAddress'

export default function (address?: string, fcUsername?: string) {
  if (!address || !fcUsername) return ''
  if (fcUsername) return `https://warpcast.com/${fcUsername}`

  return baseScanAddress(address)
}
