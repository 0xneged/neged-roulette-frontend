import { cleanEnv, str } from 'envalid'

// eslint-disable-next-line node/no-process-env
export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_PRIVY_APP_ID: str(),
  VITE_TOKEN_ADDRESS: str(),
  VITE_TOKEN_RECEIVER_CONTRACT: str(),
})
