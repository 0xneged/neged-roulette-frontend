[![Build and deploy app](https://github.com/0xneged/neged-roulette-frontend/actions/workflows/deployflow.yml/badge.svg)](https://github.com/0xneged/neged-roulette-frontend/actions/workflows/deployflow.yml)

# Local launch

1. Install dependencies with `yarn`
2. Setup the `.env` file in project root (check `.env.sample`)
3. Run the server with `yarn start`
4. Build production via `yarn build`, it builds into `/dist`

## About .env

Make sure to include values in [deployflow.yml](/.github/workflows/deployflow.yml#L27) so they can be accessed by GitHub actions
