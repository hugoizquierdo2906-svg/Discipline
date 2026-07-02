import { notFound } from 'next/navigation'

import { DropdownMenuScene } from './dropdown-menu-demo'
import '../card/card.css'

/**
 * DropdownMenu proof — development only (404 in production). The second Floating
 * member, derived from the FROZEN Popover (same pane, lift, entrance, size
 * scale): the material trio (FloatingSurface · Popover · DropdownMenu), the full
 * menu language (labels · groups · icons · shortcuts · destructive · disabled ·
 * loading), checkbox/radio items, nested submenu, long scrollable menu,
 * collision auto-flip, and the hierarchy against the Immersive reference.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function DropdownMenuPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">DropdownMenu proof</h1>
      <DropdownMenuScene bg="proof-canvas" />
      <DropdownMenuScene bg="proof-media" />
    </main>
  )
}
