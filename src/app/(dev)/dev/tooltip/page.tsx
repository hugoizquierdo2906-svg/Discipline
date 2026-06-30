import { notFound } from 'next/navigation'

import { TooltipReference } from './tooltip-reference'

/**
 * Floating Surface (Tooltip) reference proof — development only (404 in
 * production). Shows the single reference pane on a light canvas and, mainly,
 * over a rich media panel — a floating surface is always read against the
 * content it temporarily covers. No frozen component is touched.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TooltipReferencePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Floating Surface tooltip reference</h1>

      <section className="proof-light flex min-h-[60vh] flex-col items-center justify-center gap-10 p-12">
        <p className="proof-cap text-caption uppercase tracking-widest">
          Light canvas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <TooltipReference label="Save your progress" />
          <TooltipReference label="Streak: 12 days" />
        </div>
      </section>

      <section className="proof-media flex min-h-[60vh] flex-col items-center justify-center gap-10 p-12">
        <p className="proof-cap-media text-caption uppercase tracking-widest">
          Media panel
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <TooltipReference label="Save your progress" />
          <TooltipReference label="Next session in 2 days" />
        </div>
      </section>
    </main>
  )
}
