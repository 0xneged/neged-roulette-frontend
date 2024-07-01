import { bool, cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_PRIVY_APP_ID: str(),
  VITE_TOKEN_ADDRESS: str(),
  VITE_TOKEN_RECEIVER_CONTRACT: str(),
  VITE_DEV_CLIENT_ID: str({ default: '' }),
  VITE_PROD_CLIENT_ID: str(),
  DEV: bool({ default: import.meta.env.DEV }),
})
