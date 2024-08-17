import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { usePrivy } from '@privy-io/react-auth'
import Button from 'components/Button'
import Input from 'components/Input'
import { getAvailablePromoCodes, updatePromoCode } from 'helpers/api/promoCodes'
import useAuthToken from 'helpers/hooks/useAuthToken'
import { useCallback, useState } from 'preact/hooks'
import PromoCode from 'types/PromoCode'

export default function () {
  useAuthToken()
  const { ready, authenticated } = usePrivy()
  const [parent] = useAutoAnimate()
  const [adminPassword, setAdminPassword] = useState('')
  const [activeCodes, setActiveCodes] = useState<PromoCode[] | undefined>()
  const [newCode, setNewCode] = useState<PromoCode>({
    secret: 'HATS4',
    activations: 0,
    rewardAmount: 50,
    userLimit: 5000,
  })

  const onAdminPassword = useCallback(async () => {
    setActiveCodes(await getAvailablePromoCodes(adminPassword))
  }, [adminPassword])

  const onCodeUpdate = useCallback(() => {
    void updatePromoCode(adminPassword, newCode)
  }, [adminPassword, newCode])

  return (
    <div
      className="flex flex-col justify-center w-full items-center"
      ref={parent}
    >
      <div className="flex flex-row gap-x-1 items-center">
        <span>Admin password:</span>
        <Input
          className="text-3xl"
          type="password"
          id="neged-admin-password"
          value={adminPassword}
          onInput={(e) => setAdminPassword(e.currentTarget.value)}
          plainInput
        />
        <Button
          onClick={onAdminPassword}
          loading={!ready}
          disabled={!authenticated}
        >
          Accept
        </Button>
      </div>

      {typeof activeCodes !== 'undefined' ? (
        <div className="flex flex-col gap-y-1 my-2 w-full bg-secondary bg-opacity-90 p-4 rounded-3xl">
          <span className="text-3xl font-bold">New code:</span>
          <span className="font-bold space-x-2">
            <span>Code secret:</span>
            <Input
              plainInput
              className="uppercase"
              value={newCode?.secret}
              onInput={(e) =>
                setNewCode((prev) => ({
                  ...prev,
                  secret: e.currentTarget.value,
                }))
              }
            />
          </span>
          <span className="text-xs">(use same secret to update the code)</span>
          <span className="space-x-2">
            <span>Reward Amount:</span>
            <Input
              plainInput
              value={newCode?.rewardAmount}
              type="number"
              onInput={(e) =>
                setNewCode((prev) => ({
                  ...prev,
                  rewardAmount: e.currentTarget.valueAsNumber,
                }))
              }
            />
          </span>
          <span className="space-x-2">
            <span>User limit:</span>
            <Input
              plainInput
              value={newCode.userLimit}
              type="number"
              onInput={(e) =>
                setNewCode((prev) => ({
                  ...prev,
                  userLimit: e.currentTarget.valueAsNumber,
                }))
              }
            />
          </span>
          <Button styles="w-full" onClick={onCodeUpdate}>
            Add/Update
          </Button>
        </div>
      ) : null}

      <h2 className="w-full text-center text-3xl text-primary-bright font-bold">
        Other codes
      </h2>
      {activeCodes?.map(({ rewardAmount, activations, secret, userLimit }) => (
        <div className="flex flex-col gap-y-1 my-1 w-full bg-hat p-4 rounded-3xl">
          <span className="font-bold">Code secret: {secret}</span>
          <span>Reward amount: {rewardAmount}</span>
          <span>User Limit: {userLimit}</span>
          <span>Activations: {activations}</span>
        </div>
      ))}
    </div>
  )
}
