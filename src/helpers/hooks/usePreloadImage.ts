import { useEffect } from 'preact/hooks'

export default function (src: string) {
  useEffect(() => {
    const img = new Image()
    img.src = src
  }, [src])
}
