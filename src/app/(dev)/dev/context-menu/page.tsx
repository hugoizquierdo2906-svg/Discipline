import { notFound } from 'next/navigation'

import { ContextMenuScene } from './context-menu-demo'
import '../card/card.css'

/**
 * ContextMenu proof — development only (404 in production). The third Floating
 * member, derived from the FROZEN DropdownMenu (same pane, same items — only
 * the trigger changes: right-click / menu key / long-press at the cursor). The
 * chain FloatingSurface → Popover → DropdownMenu → ContextMenu, object zones
 * (image · selected text · file with nested submenu · workspace with
 * checkbox/radio), long scrollable menu, edge collision, and the hierarchy
 * against the Immersive reference.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ContextMenuPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">ContextMenu proof</h1>
      <ContextMenuScene bg="proof-canvas" />
      <ContextMenuScene bg="proof-media" />
    </main>
  )
}
