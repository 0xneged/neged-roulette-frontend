import FcPfp from 'components/FcPfp'
import Username from 'components/Username'
import getAccountLink from 'helpers/getAccountLink'

export default function ({
  address,
  fcPfpLink,
  fcUsername,
}: {
  address: string
  fcPfpLink: string | undefined
  fcUsername: string | undefined
}) {
  return (
    <a
      href={getAccountLink(address, fcUsername)}
      target="_blank"
      className="flex flex-row gap-x-2 items-center justify-between"
    >
      <div className="w-16">
        <Username address={address} fcUsername={fcUsername} />
      </div>
      <FcPfp address={address} pfpUrl={fcPfpLink} />
    </a>
  )
}
