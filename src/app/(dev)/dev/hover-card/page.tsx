import { notFound } from 'next/navigation'

import { HoverCardScene } from './hover-card-demo'
import '../card/card.css'

/**
 * HoverCard proof — development only (404 in production). The fourth Floating
 * member, derived from the FROZEN Popover (same pane, lift, entrance, sizes,
 * arrow — only HOW IT OPENS changes: hover intent with open/close delays and a
 * forgiving pointer bridge). Trio (FloatingSurface · Popover · HoverCard),
 * previews (user · exercise · book · workout), delays, sides/aligns, arrow
 * on/off, sizes, scrollable container, edge collision. Never a menu.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function HoverCardPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">HoverCard proof</h1>
      <HoverCardScene bg="proof-canvas" />
      <HoverCardScene bg="proof-media" />
    </main>
  )
}
