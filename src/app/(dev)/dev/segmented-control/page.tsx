import { notFound } from 'next/navigation'

import { SegmentedControlScene } from './segmented-control-demo'
import '../card/card.css'

/**
 * SegmentedControl proof — development only (404 in production). An
 * exclusive choice among 2–6 visible options, on the Control Surface
 * material with the frozen Switch illumination on the selected segment.
 * States, sizes, orientation, real examples. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SegmentedControlPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">SegmentedControl proof</h1>
      <SegmentedControlScene bg="proof-canvas" />
      <SegmentedControlScene bg="proof-media" />
    </main>
  )
}
