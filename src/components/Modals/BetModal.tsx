import { Button as FlowBiteButton } from 'flowbite-react'
import { RoundParams } from 'types/Round'
import { TargetedEvent } from 'preact/compat'
import { placeBet } from 'helpers/api/round'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'preact/hooks'
import DefaultModal from 'components/Modals/DefaultModal'
import EthAddress from 'types/EthAddress'
import Input from 'components/Input'
import ModalProps from 'types/ModalProps'
import queryClient from 'helpers/queryClient'

interface BetModalProps extends ModalProps, RoundParams {
  address: EthAddress | string | undefined
  userHats: number | undefined | null
  userDeposit: { amount: number; chance: string }
}

export default function ({
  address,
  modalOpen,
  setModalOpen,
  userHats,
  userDeposit,
  minBet,
  maxBet,
}: BetModalProps) {
  const min = userDeposit.amount >= minBet ? 1 : minBet

  const [betValue, setBetValue] = useState(min)
  const [loading, setLoading] = useState(false)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const addedValue = userDeposit.amount + betValue
  const disabled =
    !userHats ||
    addedValue < minBet ||
    betValue > userHats ||
    addedValue > maxBet ||
    loading

  const placeBetOnClick = useCallback(async () => {
    if (!address) {
      toast.error('Unauthorized')
      closeModal()
    }
    if (betValue < 1 || addedValue < minBet) {
      toast.error("Can't bet that low")
      return
    }
    if (!userHats || betValue > userHats) {
      toast.error("You don't have enough HATs")
      closeModal()
    }
    if (addedValue > maxBet) {
      toast.error(`You can't deposit more than ${maxBet} HATs`)
      closeModal()
    }

    try {
      setLoading(true)
      await placeBet(betValue)
      await queryClient.invalidateQueries({ queryKey: ['hatsCounter'] })
      closeModal()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [addedValue, address, betValue, closeModal, maxBet, minBet, userHats])

  const max = userHats
    ? userHats > maxBet
      ? maxBet
      : Math.floor(userHats)
    : 1000

  const commonInputProps = {
    value: betValue,
    min,
    max,
    onChange: (e: TargetedEvent<HTMLInputElement>) =>
      setBetValue(e.currentTarget.valueAsNumber || 1),
  }

  const BodyContent = (
    <div class="relative mb-6">
      <label for="labels-range-input" class="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        {...commonInputProps}
      />
      <span class="text-sm text-gray-400 absolute start-0 -bottom-6">
        {min} Hat
      </span>
      <span class="text-sm text-gray-400 absolute end-0 -bottom-6">
        {max} Hats
      </span>
    </div>
  )

  const FooterContent = (
    <>
      <div className="text-gray-400 font-bold">
        <Input
          type="number"
          className="!w-20"
          plainInput
          {...commonInputProps}
        />
        <span>Hats</span>
      </div>

      {FlowBiteButton({
        onClick: placeBetOnClick,
        color: 'purple',
        children: 'Accept',
        disabled,
      })}
    </>
  )

  return (
    <DefaultModal
      header="Place a bet"
      bodyContent={BodyContent}
      footerContent={FooterContent}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
