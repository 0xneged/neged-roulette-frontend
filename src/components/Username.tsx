export default function ({
  address,
  fcUsername,
  truncate,
  limitWidth,
}: {
  address: string
  fcUsername?: string | undefined
  truncate?: boolean | undefined
  limitWidth?: boolean | undefined
}) {
  const width = limitWidth ? 'max-w-16 md:max-w-20' : 'w-24 md:w-40'
  const styles =
    width + ' hover:underline font-semibold opacity-70 text-xs leading-tight '
  const truncation = truncate ? 'truncate' : 'double-rows-break'

  return <span className={styles + truncation}>{fcUsername || address}</span>
}
