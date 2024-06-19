import useFcAccount from 'helpers/useFcAccount'

export default function () {
  const fcUser = useFcAccount()

  return (
    <img
      className="aspect-square"
      width={44}
      src={fcUser ? fcUser.pfp_url : ''}
    />
  )
}
