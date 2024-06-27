export default function ({
  address,
  fcUsername,
  truncate,
}: {
  address: string
  fcUsername: string | undefined
  truncate?: boolean
}) {
  const styles =
    'w-16 hover:underline font-semibold opacity-70 text-xs leading-tight '
  const truncation = truncate ? 'truncate' : 'double-rows-break'

  return <span className={styles + truncation}>{fcUsername || address}</span>
}
