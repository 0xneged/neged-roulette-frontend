import BigButton from 'components/BigButton'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useCallback, useEffect, useState } from 'preact/hooks'
import socket from 'helpers/api/socket'
import DashedCard from './DashedCard'
import HatInCircle from '../icons/HatInCircle'
import { Deposit } from 'types/Round'

interface YourBetsProps {
  deposits: Deposit[]
  totalDeposits: number
}

export default function ({ deposits, totalDeposits }: YourBetsProps) {
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()
  const { isConnected } = useAccount()
  const [betAmount, setBetAmount] = useState(12)

  const userDeposit = deposits.find(({ address }) => address)?.amount

  const onClick = useCallback(() => {
    if (isConnected && betAmount > 0)
      socket.emit('placeBet', { address, amount: betAmount })

    if (openConnectModal) openConnectModal()
  }, [isConnected, openConnectModal, address, betAmount])

  if (!userDeposit)
    return <BigButton onClick={onClick}>TRY YOUR LUCK</BigButton>

  return (
    <div className="flex flex-row items-center justify-center gap-x-2">
      <DashedCard subtitle="your bets">
        <div className="flex gap-x-2">
          {userDeposit}
          <HatInCircle />
        </div>
      </DashedCard>
      <DashedCard orange subtitle="your chance">
        {Math.ceil(userDeposit / totalDeposits) * 100}%
      </DashedCard>
    </div>
  )
}
