import { notFound } from 'next/navigation'

import { GlassButtonPrimary } from './glass-button-primary'

/**
 * Glass material proof — development only (404 in production).
 * Renders the single Primary reference button over a light canvas and a dark
 * media panel so the material's transparency, edge light and violet capture can
 * be judged on both backgrounds. No other component is involved.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function GlassReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <section className="proof-light flex min-h-[50vh] flex-col items-center justify-center gap-6 p-12">
        <p className="text-caption uppercase tracking-widest text-text-tertiary">
          Light canvas
        </p>
        <GlassButtonPrimary>Primary</GlassButtonPrimary>
      </section>

      <section className="proof-dark flex min-h-[50vh] flex-col items-center justify-center gap-6 p-12">
        <p className="proof-cap-dark text-caption uppercase tracking-widest">
          Dark media panel
        </p>
        <GlassButtonPrimary>Primary</GlassButtonPrimary>
      </section>
    </main>
  )
}
