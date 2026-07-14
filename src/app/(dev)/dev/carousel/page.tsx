import { notFound } from 'next/navigation'

import { CarouselScene } from './carousel-demo'

/**
 * Carousel proof — development only (404 in production). The Data Display
 * primitive: basic, cards, mixed content, images, without controls, with
 * indicators, vertical, loop, non-loop, responsive, RTL and empty.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CarouselPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Carousel proof</h1>
      <CarouselScene />
    </main>
  )
}
