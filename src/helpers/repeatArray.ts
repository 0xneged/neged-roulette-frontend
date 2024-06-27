export default function <T>(arr: T[], repeats: number) {
  return Array.from({ length: repeats }, () => arr).flat()
}
