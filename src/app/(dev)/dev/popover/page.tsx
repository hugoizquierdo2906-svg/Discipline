import { notFound } from 'next/navigation'

import { PopoverScene } from './popover-demo'
import '../card/card.css'

/**
 * Popover proof — development only (404 in production). The first generalized
 * Floating Surface: the raw FloatingSurface pane beside a live Popover (only the
 * behavior changes), placements (side × align), arrow/no-arrow, collision
 * auto-flip, scrollable container, modal vs non-modal, nested, long + interactive
 * content, disabled trigger, and the Tooltip (reads) · Popover (converses) ·
 * Modal (takes over) hierarchy. Neutral capture background + rich media panel.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function PopoverPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Popover proof</h1>
      <PopoverScene bg="proof-canvas" />
      <PopoverScene bg="proof-media" />
    </main>
  )
}
