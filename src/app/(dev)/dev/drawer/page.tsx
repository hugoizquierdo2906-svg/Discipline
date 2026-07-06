import { notFound } from 'next/navigation'

import { DrawerScene } from './drawer-demo'
import '../card/card.css'

/**
 * Drawer proof — development only (404 in production). An edge-anchored
 * immersive panel on the frozen Modal foundation: sides, sizes, sticky
 * header/footer, internal scroll, nested drawers, real workspace cases.
 * Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function DrawerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Drawer proof</h1>
      <DrawerScene bg="proof-canvas" />
      <DrawerScene bg="proof-media" />
    </main>
  )
}
