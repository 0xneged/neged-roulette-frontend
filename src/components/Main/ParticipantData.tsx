import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'

export default function ({
  address,
  fcPfpLink,
  fcUsername,
  limitWidth,
}: {
  address: string
  fcPfpLink: string | undefined
  fcUsername: string | undefined
  limitWidth?: boolean
}) {
  return (
    <a
      href={getAccountLink(address, fcUsername)}
      target="_blank"
      className="flex flex-row gap-x-2 items-center justify-between"
    >
      <Username
        address={address}
        fcUsername={fcUsername}
        limitWidth={limitWidth}
      />
      <FcPfp address={address} pfpUrl={fcPfpLink} />
    </a>
  )
}
