import { notFound } from 'next/navigation'

import { ModalReference } from './modal-reference'

/**
 * Immersive Surface (Modal) reference proof — development only (404 in
 * production). The single reference modal over a rich photographic scene, so the
 * scrim's dim + blur and the thickest glass volume both read against real
 * content. No frozen component is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ModalReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Immersive Surface modal reference</h1>
      <section className="proof-scene">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="proof-scene__bg"
          src="/backgrounds/demo-photo.jpg"
          alt=""
        />
        <ModalReference />
      </section>
    </main>
  )
}
