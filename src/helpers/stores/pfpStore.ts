import persistedAtom from 'helpers/stores/persistedAtom'

type PfpStore = { [address: string]: { color: string; emoji: string } }

export default persistedAtom<PfpStore>('pfp-store', {})
