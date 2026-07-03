import { notFound } from 'next/navigation'

import { SwitchScene } from './switch-demo'
import '../card/card.css'

/**
 * Switch proof — development only (404 in production). Immediate on/off on the
 * frozen micro-control foundation: GlassSurface → Micro Surface →
 * micro-control → Switch. Every state, preference/permission/workout panels,
 * nested master switch. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SwitchPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Switch proof</h1>
      <SwitchScene bg="proof-canvas" />
      <SwitchScene bg="proof-media" />
    </main>
  )
}
