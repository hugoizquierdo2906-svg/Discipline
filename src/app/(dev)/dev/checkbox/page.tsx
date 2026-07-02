import { notFound } from 'next/navigation'

import { CheckboxScene } from './checkbox-demo'
import '../card/card.css'

/**
 * Checkbox proof — development only (404 in production). The canonical small
 * Micro control: GlassSurface → Micro Surface → Checkbox (the shared
 * micro-control expression; the full Micro glass lives on Button). Every state
 * (unchecked · checked · indeterminate · disabled · readOnly · required ·
 * invalid · description · helper · error · labelPosition), groups (multiple ·
 * error · disabled), nested settings with a mixed parent, and a permissions
 * matrix. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CheckboxPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Checkbox proof</h1>
      <CheckboxScene bg="proof-canvas" />
      <CheckboxScene bg="proof-media" />
    </main>
  )
}
