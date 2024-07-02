import { Link } from 'wouter-preact'

export default function () {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Link
        className="!text-primary-bright font-bold text-9xl text-center"
        href="/"
      >
        404
      </Link>
      <Link href="/" className="!underline">
        Go back 🔄🎩
      </Link>
    </div>
  )
}
