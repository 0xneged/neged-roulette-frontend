import HatIcon from 'components/icons/HatIcon'
import Input from 'components/Input'
import DefaultModal from 'components/Modals/DefaultModal'
import { Button as FlowBiteButton } from 'flowbite-react'
import queryClient from 'helpers/queryClient'
import { TargetedEvent } from 'preact/compat'
import { useCallback, useState } from 'preact/hooks'
import { toast } from 'react-toastify'
import ModalProps from 'types/ModalProps'
import { RoundParams } from 'types/Round'

interface BetModalProps extends ModalProps, RoundParams {
  header?: string
  userAddress?: string | undefined
  userHats: number | undefined | null
  userDeposit: number
  onBet: (betValue: number) => Promise<unknown> | void
}

export default function ({
  header = 'Place a bet',
  userAddress,
  modalOpen,
  setModalOpen,
  userHats,
  userDeposit,
  minBet,
  maxBet,
  onBet,
}: BetModalProps) {
  const min = userDeposit >= minBet ? 1 : minBet
  const max = userHats
    ? userHats > maxBet
      ? maxBet
      : Math.floor(userHats)
    : 1000

  const [betValue, setBetValue] = useState(min)
  const [loading, setLoading] = useState(false)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const addedValue = userDeposit + betValue
  const disabled =
    !userHats ||
    addedValue < minBet ||
    betValue > userHats ||
    addedValue > maxBet ||
    loading

  const placeBetOnClick = useCallback(async () => {
    if (!userAddress) {
      toast.error("You're not logged in")
      return
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
      await onBet(betValue)
      await queryClient.invalidateQueries({
        queryKey: ['hatsCounter' + userAddress],
      })
      closeModal()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [
    addedValue,
    betValue,
    closeModal,
    maxBet,
    minBet,
    onBet,
    userAddress,
    userHats,
  ])

  const commonInputProps = {
    value: betValue,
    min,
    max,
    onKeyDown: async (e: TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
      if (e.key === 'Enter') await placeBetOnClick()
    },
    onInput: (e: TargetedEvent<HTMLInputElement>) => {
      setBetValue(e.currentTarget.valueAsNumber || 1)
    },
  }

  const BodyContent = (
    <div class="relative mb-6">
      <label for="labels-range-input" class="sr-only">
        Select your bet
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
        isProcessing: loading,
        processingSpinner: <HatIcon rotateAnimation />,
        disabled,
      })}
    </>
  )

  return (
    <DefaultModal
      header={header}
      bodyContent={BodyContent}
      footerContent={FooterContent}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  )
}
