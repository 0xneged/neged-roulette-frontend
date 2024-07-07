import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'

interface ParticipantDataProps {
  address: string
  fcPfpLink: string | undefined
  fcUsername: string | undefined
  limitWidth?: boolean
}

export default function ({
  address,
  fcPfpLink,
  fcUsername,
  limitWidth,
}: ParticipantDataProps) {
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
