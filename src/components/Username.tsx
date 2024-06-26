export default function ({
  address,
  fcUsername,
  textCenter,
}: {
  address: string
  fcUsername: string | undefined
  textCenter?: boolean
}) {
  const styles =
    'double-rows-break font-semibold opacity-70 text-xs leading-tight'
  const center = textCenter ? ' text-center' : ''

  return <span className={styles + center}>{fcUsername || address}</span>
}
