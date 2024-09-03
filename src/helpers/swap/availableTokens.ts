import EthAddress from 'types/EthAddress'

export interface TokenWithLogo {
  chainId: number
  address: EthAddress
  name: string
  symbol: string
  decimals: number
  logoURI: string
  isNative?: boolean
}

export const WETH_CONTRACT_ADDRESS =
  '0x4200000000000000000000000000000000000006'

// WARNING: keep neged at 0 index
// ipfs:// links are not supported
export default [
  {
    chainId: 8453,
    address: '0x4229c271c19CA5F319fb67b4BC8A40761A6d6299',
    name: 'negeD',
    symbol: 'NEGED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/36424/standard/neged.jpeg',
  },
  {
    chainId: 8453,
    address: '0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527',
    name: 'moxie',
    symbol: 'MOXIE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/39451/standard/favicon_-_200_x_200.png',
  },
  {
    chainId: 8453,
    address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
    name: 'Degen',
    symbol: 'DEGEN',
    decimals: 18,
    logoURI: 'https://basescan.org/token/images/degentips_32.png',
  },
  {
    name: 'Ether',
    address: WETH_CONTRACT_ADDRESS,
    symbol: 'ETH',
    isNative: true,
    decimals: 18,
    chainId: 8453,
    logoURI: '/img/ethBase.jpg',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        },
      },
    },
  },
  {
    name: 'Farther',
    address: '0x8ad5b9007556749DE59E088c88801a3Aaa87134B',
    symbol: 'Farther',
    decimals: 18,
    chainId: 8453,
    logoURI:
      'https://cdn.dexscreener.com/fetch?src=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F37870%2Flarge%2Ffarther-logo.png',
  },
  {
    chainId: 8453,
    address: '0xc5fecC3a29Fb57B5024eEc8a2239d4621e111CBE',
    name: '1inch',
    symbol: '1INCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0x111111111117dC0aa78b770fA6A738034120C302',
        },
      },
    },
  },
  {
    chainId: 8453,
    address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    name: 'Aerodrome Finance',
    symbol: 'AERO',
    decimals: 18,
    logoURI: 'https://basescan.org/token/images/aerodrome_32.png',
  },
  {
    chainId: 8453,
    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    name: 'Coinbase Wrapped Staked ETH',
    symbol: 'cbETH',
    decimals: 18,
    logoURI: 'https://ethereum-optimism.github.io/data/cbETH/logo.svg',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
        },
      },
    },
  },
  {
    name: 'Dai Stablecoin',
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    symbol: 'DAI',
    decimals: 18,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/DAI/logo.svg',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        },
      },
    },
  },
  {
    chainId: 8453,
    address: '0xB4fDe59a779991bfB6a52253B51947828b982be3',
    name: 'Pepe',
    symbol: 'PEPE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1682922725',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
        },
      },
    },
  },
  {
    name: 'Uniswap',
    address: '0xc3De830EA07524a0761646a6a4e4be0e114a3C83',
    symbol: 'UNI',
    decimals: 18,
    chainId: 8453,
    logoURI:
      'https://cdn.dexscreener.com/fetch?src=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F12504%2Flarge%2Funiswap-logo.png',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        },
      },
    },
  },
  {
    chainId: 8453,
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    name: 'USD Base Coin',
    symbol: 'USDbC',
    decimals: 6,
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    symbol: 'USDC',
    decimals: 6,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        },
      },
    },
  },
  {
    chainId: 8453,
    address: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
    name: 'LayerZero',
    symbol: 'ZRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/28206/standard/ftxG9_TJ_400x400.jpeg?1696527208',
  },
  {
    name: '0x Protocol Token',
    address: '0x3bB4445D30AC020a84c1b5A8A2C6248ebC9779D0',
    symbol: 'ZRX',
    decimals: 18,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/ZRX/logo.png',
    extensions: {
      bridgeInfo: {
        '1': {
          tokenAddress: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
        },
      },
    },
  },
] as TokenWithLogo[]
