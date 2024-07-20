import BigButton from 'components/BigButton'

interface FooterProps {
  processExchange: () => void
  disabled: boolean
  loading: boolean
}

export default function ({ processExchange, disabled, loading }: FooterProps) {
  return (
    <BigButton
      onClick={processExchange}
      disabled={disabled}
      loading={loading}
      exClassName="w-full"
    >
      CONVERT
    </BigButton>
  )
}
