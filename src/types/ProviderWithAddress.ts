import { Web3Provider } from '@ethersproject/providers'

export type ProviderWithAddress = {
  provider: Web3Provider
  address: string
}
