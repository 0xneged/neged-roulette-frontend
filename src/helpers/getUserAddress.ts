import { User } from '@privy-io/react-auth'

export default function (user: User | null) {
  return user?.wallet?.address.toLowerCase()
}
