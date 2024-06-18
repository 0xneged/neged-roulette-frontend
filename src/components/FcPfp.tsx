import useFcAccount from 'helpers/useFcAccount'

export default function () {
  const fcUser = useFcAccount()

  console.log(fcUser)

  return <img src={fcUser ? fcUser.pfp_url : ''} />
}
