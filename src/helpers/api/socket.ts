import env from 'helpers/env'
import { io } from 'socket.io-client'

export default io(env.VITE_BACKEND_URL)
