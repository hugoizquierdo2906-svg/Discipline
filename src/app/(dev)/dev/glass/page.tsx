import { notFound } from 'next/navigation'

import { GlassButtonPrimary } from './glass-button-primary'

/**
 * Glass material proof — development only (404 in production).
 * Renders the single Primary reference button on a light canvas and a dark media
 * panel (transparency, edge light, violet capture), plus a blind (empty) button
 * and a grayscale silhouette strip for DISCIPLINE_GLASS_TESTS.md. No other
 * component is involved.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function GlassReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      {/* Refraction displacement filter (defined once; referenced by .gb__glass). */}
      <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
        <filter id="gb-refract" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={8}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <section className="proof-light flex min-h-[42vh] flex-col items-center justify-center gap-6 p-12">
        <p className="text-caption uppercase tracking-widest text-text-tertiary">
          Light canvas
        </p>
        <div className="flex items-center gap-6">
          <GlassButtonPrimary>Primary</GlassButtonPrimary>
          {/* Blind test — empty button must still read as glass. */}
          <GlassButtonPrimary>{'    '}</GlassButtonPrimary>
        </div>
      </section>

      <section className="proof-dark flex min-h-[42vh] flex-col items-center justify-center gap-6 p-12">
        <p className="proof-cap-dark text-caption uppercase tracking-widest">
          Dark media panel
        </p>
        <div className="flex items-center gap-6">
          <GlassButtonPrimary>Primary</GlassButtonPrimary>
          <GlassButtonPrimary>{'    '}</GlassButtonPrimary>
        </div>
      </section>

      {/* Silhouette test — grayscale: volume must still read without color. */}
      <section className="proof-dark proof-grayscale flex min-h-[24vh] flex-col items-center justify-center gap-4 p-12">
        <p className="proof-cap-dark text-caption uppercase tracking-widest">
          Silhouette (grayscale)
        </p>
        <GlassButtonPrimary>Primary</GlassButtonPrimary>
      </section>
    </main>
  )
}
