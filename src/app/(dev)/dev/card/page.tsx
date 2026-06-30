import { notFound } from 'next/navigation'

import { CardReference } from './card-reference'

/**
 * Structural Surface (Card) reference proof — development only (404 in
 * production). Shows the single reference card on a light canvas and over a rich
 * media panel (so refraction + transmission read), neutral and primary intent.
 * No other component is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CardReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Structural Surface card reference</h1>

      <section className="proof-light flex min-h-screen flex-col items-center justify-center gap-8 p-12">
        <p className="proof-cap text-caption uppercase tracking-widest">
          Light canvas
        </p>
        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          <CardReference
            eyebrow="Programme"
            title="Hypertrophy, 12 weeks"
            body="A progressive block built around compound lifts, calibrated to your recovery and tracked session by session."
            cta="View plan"
          />
          <CardReference
            intent="primary"
            eyebrow="Coaching"
            title="Work with a coach"
            body="Weekly check-ins, form review, and adjustments. The plan adapts to you, not the other way around."
            cta="Start now"
          />
        </div>
      </section>

      <section className="proof-media flex min-h-screen flex-col items-center justify-center gap-8 p-12">
        <p className="proof-cap-media text-caption uppercase tracking-widest">
          Media panel
        </p>
        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          <CardReference
            eyebrow="Programme"
            title="Hypertrophy, 12 weeks"
            body="A progressive block built around compound lifts, calibrated to your recovery and tracked session by session."
            cta="View plan"
          />
          <CardReference
            intent="primary"
            eyebrow="Coaching"
            title="Work with a coach"
            body="Weekly check-ins, form review, and adjustments. The plan adapts to you, not the other way around."
            cta="Start now"
          />
        </div>
      </section>
    </main>
  )
}
