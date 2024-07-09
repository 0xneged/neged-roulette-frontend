import { atomWithStorage } from 'jotai/utils'

export default function persistedAtom<T>(key: string, initialValue: T) {
  return atomWithStorage<T>(key, initialValue)
}
