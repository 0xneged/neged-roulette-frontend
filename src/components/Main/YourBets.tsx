import BigButton from 'components/BigButton'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useCallback, useEffect, useState } from 'preact/hooks'
import DashedCard from './DashedCard'
import HatInCircle from '../icons/HatInCircle'
import BetsProps from 'types/BetsProps'
import BetModal from './BetModal'

export default function ({ deposits, totalDeposits }: BetsProps) {
  const { openConnectModal } = useConnectModal()
  const { address } = useAccount()
  const { isConnected } = useAccount()
  const [userDeposit, setUserDeposit] = useState({ amount: 0, chance: '0' })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const amount =
      deposits.find((deposit) => deposit.address === address)?.amount || 0
    const chance = Number((amount / totalDeposits) * 100).toFixed(2)

    setUserDeposit({ amount, chance })
  }, [totalDeposits, deposits, address])

  const onClick = useCallback(() => {
    if (isConnected) {
      setModalOpen(true)
      return
    }
    if (openConnectModal) openConnectModal()
  }, [isConnected, openConnectModal, address])

  if (userDeposit.amount > 0)
    return (
      <div className="flex flex-row items-center justify-center gap-x-2">
        <DashedCard subtitle="your bets">
          <div className="flex gap-x-2">
            {userDeposit.amount}
            <HatInCircle />
          </div>
        </DashedCard>
        <DashedCard orange subtitle="your chance">
          {userDeposit.chance}%
        </DashedCard>
      </div>
    )

  return (
    <>
      <BigButton onClick={onClick}>TRY YOUR LUCK</BigButton>
      <BetModal
        address={address}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}
