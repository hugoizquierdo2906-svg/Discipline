import { notFound } from 'next/navigation'

import { CardReference } from '../card/card-reference'

import './card-contexts.css'

/**
 * Card context demonstration — development only (404 in production). The single
 * reference Card placed, unchanged, on five backgrounds (flat white · light
 * gradient · image · video · a full app interface) to decide whether the
 * Structural material needs recalibration or only usage rules.
 */
export const metadata = { robots: { index: false, follow: false } }

function Pair() {
  return (
    <div className="ctx__cards">
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
  )
}

export default function CardContextsPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Card context demonstration</h1>

      <section className="ctx ctx-white ctx-light">
        <p className="ctx__label">1 — Flat white</p>
        <Pair />
      </section>

      <section className="ctx ctx-gradient ctx-light">
        <p className="ctx__label">2 — Light gradient</p>
        <Pair />
      </section>

      <section className="ctx ctx-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ctx__bg" src="/backgrounds/demo-photo.jpg" alt="" />
        <p className="ctx__label">3 — Image</p>
        <Pair />
      </section>

      <section className="ctx ctx-dark">
        <video
          className="ctx__bg"
          src="/videos/demo-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <p className="ctx__label">4 — Video</p>
        <Pair />
      </section>

      <section className="ctx ctx-ui ctx-light">
        <div className="ui-mock" aria-hidden>
          <div className="ui-mock__bar">
            <span className="ui-mock__brand">DISCIPLINE</span>
            <nav className="ui-mock__nav">
              <span>Programs</span>
              <span>Coaching</span>
              <span>Pricing</span>
              <span>Account</span>
            </nav>
          </div>
          <p className="ui-mock__hero">Train with intent. Track everything.</p>
          <div className="ui-mock__grid">
            <div className="ui-mock__tile" />
            <div className="ui-mock__tile" />
            <div className="ui-mock__tile" />
          </div>
        </div>
        <p className="ctx__label">5 — Full interface behind</p>
        <Pair />
      </section>
    </main>
  )
}
