import {
  AlphaRouter,
  SwapOptions,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router'
import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import {
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  ERC20_ABI,
  TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
  V3_SWAP_ROUTER_ADDRESS,
} from 'helpers/swap/constants'
import { fromReadableAmount } from 'helpers/swap/conversion'
import { ethers } from 'ethers'
import { ChainId } from '@uniswap/sdk-core'
import TxState from 'types/TxState'
import { ProviderWithAddress } from 'types/ProviderWithAddress'
import { sendTransaction } from './wallet'

type GenerateRouteProps = ProviderWithAddress & {
  tokenIn: { data: Token; amount: number }
  tokenOut: { data: Token }
}

export async function generateRoute({
  provider,
  address,
  tokenIn,
  tokenOut,
}: GenerateRouteProps): Promise<SwapRoute | null> {
  try {
    const router = new AlphaRouter({
      chainId: ChainId.BASE,
      provider,
    })

    const options: SwapOptions = {
      recipient: address,
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    }

    const route = await router.route(
      CurrencyAmount.fromRawAmount(
        tokenIn.data,
        fromReadableAmount(tokenIn.amount, tokenIn.data.decimals).toString()
      ),
      tokenOut.data,
      TradeType.EXACT_INPUT,
      options
    )

    return route
  } catch (e) {
    console.error(e)
    return null
  }
}

type ExecuteRouteProps = ProviderWithAddress & {
  route: SwapRoute
  token: Token
}

export async function executeRoute({
  route,
  address,
  provider,
  token,
}: ExecuteRouteProps) {
  if (!address || !provider)
    throw new Error('Cannot execute a trade without a connected wallet')

  const tokenApproval = await getTokenTransferApproval({
    token,
    provider,
    address,
  })

  if (tokenApproval !== TxState.Sent || !route.methodParameters) {
    return TxState.Failed
  }

  const res = await sendTransaction(provider, {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: route.methodParameters.value,
    from: address,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  })

  return res
}

export async function getTokenTransferApproval({
  address,
  provider,
  token,
}: { token: Token } & ProviderWithAddress): Promise<TxState> {
  try {
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    )

    const transaction = await tokenContract.populateTransaction['approve'](
      V3_SWAP_ROUTER_ADDRESS,
      fromReadableAmount(
        TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
        token.decimals
      ).toString()
    )

    return sendTransaction(provider, {
      ...transaction,
      from: address,
    })
  } catch (e) {
    console.error(e)
    return TxState.Failed
  }
}
