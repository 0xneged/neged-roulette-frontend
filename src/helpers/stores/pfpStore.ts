import persistedAtom from 'helpers/stores/persistedAtom'

export type PfpStore = { [address: string]: { color: string; emoji: string } }

export default persistedAtom('pfp-store', '')
