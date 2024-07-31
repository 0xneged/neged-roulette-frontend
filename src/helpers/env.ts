import { bool, cleanEnv, num, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_PRIVY_APP_ID: str(),
  VITE_TOKEN_ADDRESS: str(),
  VITE_TOKEN_RECEIVER_CONTRACT: str(),
  VITE_DEV_CLIENT_ID: str({ default: '' }),
  VITE_PROD_CLIENT_ID: str(),
  VITE_MAX_PLAYERS: num({ default: 50 }),
  VITE_ADMIN_ADDRESS: str({
    default: '0xf347dbe25eb4e8bff5636c36b53b0eb59cf0761d',
  }),
  DEV: bool({ default: import.meta.env.DEV }),
})
