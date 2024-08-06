import { writeContract } from '@wagmi/core'
import { WETH_CONTRACT_ADDRESS } from 'helpers/swap/availableTokens'
import walletConfig from 'helpers/walletConfig'
import { base } from 'viem/chains'

export default function (value: bigint) {
  return writeContract(walletConfig, {
    address: WETH_CONTRACT_ADDRESS,
    abi: [
      {
        constant: false,
        inputs: [],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'deposit',
    chainId: base.id,
    value,
  })
}
