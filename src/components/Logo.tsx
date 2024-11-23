import baseUrl from 'baseUrl'
import HashLink from 'components/HashLink'

export default function () {
  return (
    <HashLink href={baseUrl}>
      <p className="font-script text-hat text-3xl hover:hue-rotate-15 transition-all drop-shadow-md">
        DEGEN FLIP
      </p>
    </HashLink>
  )
}
