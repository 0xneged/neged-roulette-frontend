import DotsLoader from 'components/icons/DotsLoader'
import getAccountLink from 'helpers/getAccountLink'

export default function ({
  label,
  address,
  isLoading,
}: {
  label: string
  address?: string | undefined
  isLoading?: boolean | undefined
}) {
  return (
    <div className="flex flex-row gap-x-2 justify-between items-center">
      <span>{label}</span>
      {isLoading ? (
        <DotsLoader />
      ) : (
        <a
          className="!text-primary font-bold text-lg truncate"
          href={getAccountLink(address)}
        >
          {address}
        </a>
      )}
    </div>
  )
}
