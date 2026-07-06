import { notFound } from 'next/navigation'

import { BottomSheetScene } from './bottom-sheet-demo'
import '../card/card.css'

/**
 * Bottom Sheet proof — development only (404 in production). DISCIPLINE's
 * touch-first immersive surface on the frozen Modal foundation: drag,
 * detents, snap points, velocity dismissal, scroll coordination, safe-area,
 * keyboard avoidance, nested. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function BottomSheetPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Bottom Sheet proof</h1>
      <BottomSheetScene bg="proof-canvas" />
      <BottomSheetScene bg="proof-media" />
    </main>
  )
}
