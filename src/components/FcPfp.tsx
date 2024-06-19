import useFcAccount from 'helpers/useFcAccount'

export default function () {
  const fcUser = useFcAccount()

  return (
    <div>
      <img
        className="object-cover max-w-11 "
        src={fcUser ? fcUser.pfp_url : ''}
      />
    </div>
  )
}
