import AddressProp from 'types/AddressProp'
import PromoCode from 'components/Modals/AccountModal/PromoCode'
import StyledAddress from 'components/StyledAddress'
import useReferrer from 'helpers/hooks/useReferrer'

function YourAddress({ address }: AddressProp) {
  return <StyledAddress label="Your address" address={address} />
}

function YourReferrer({ address }: AddressProp) {
  const { data, status } = useReferrer(address)

  return (
    <StyledAddress
      label="Your referrer"
      isLoading={status === 'pending'}
      address={data}
    />
  )
}

export default function BodyContent({ address }: AddressProp) {
  return (
    <div className="flex flex-col w-full gap-y-2 text-white leading-tight">
      <YourReferrer address={address} />
      <YourAddress address={address} />
      <PromoCode />
    </div>
  )
}
