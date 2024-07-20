import { WETH_CONTRACT_ADDRESS } from 'helpers/swap/availableTokens'
import { base } from 'viem/chains'
import { writeContract } from '@wagmi/core'
import walletConfig from 'helpers/walletConfig'

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
