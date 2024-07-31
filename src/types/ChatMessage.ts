import User from 'types/User'

type MessageProp = {
  user: User
  text: string
}

export default interface ChatMessage extends MessageProp {
  id: string
  time: Date
}
