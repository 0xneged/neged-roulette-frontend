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
  const width = limitWidth ? 'w-18 md:w-20' : 'w-40'
  const styles =
    width + ' hover:underline font-semibold opacity-70 text-xs leading-tight '
  const truncation = truncate ? 'truncate' : 'double-rows-break'

  return <span className={styles + truncation}>{fcUsername || address}</span>
}
