import { notFound } from 'next/navigation'

import { SliderScene } from './slider-demo'
import '../card/card.css'

/**
 * Slider proof — development only (404 in production). A continuous value
 * on the frozen Micro Surface material: the same illuminated glass already
 * validated on Switch. States, sizes, orientation, values, real examples.
 * Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SliderPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Slider proof</h1>
      <SliderScene bg="proof-canvas" />
      <SliderScene bg="proof-media" />
    </main>
  )
}
