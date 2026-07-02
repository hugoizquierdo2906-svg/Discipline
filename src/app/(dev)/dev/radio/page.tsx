import { notFound } from 'next/navigation'

import { RadioScene } from './radio-demo'
import '../card/card.css'

/**
 * Radio proof — development only (404 in production). Mutually exclusive
 * selection on the frozen micro-control foundation: GlassSurface → Micro
 * Surface → micro-control → Radio. Exactly the frozen Checkbox language (only
 * the shape differs: ○/●). States (unselected · selected · disabled ·
 * readOnly · invalid · required), vertical + horizontal groups (Membership ·
 * Goal · Frequency · Gender), permission + template selectors with
 * descriptions. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function RadioPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Radio proof</h1>
      <RadioScene bg="proof-canvas" />
      <RadioScene bg="proof-media" />
    </main>
  )
}
