import { notFound } from 'next/navigation'

import { CommandPaletteScene } from './command-palette-demo'
import '../card/card.css'

/**
 * CommandPalette proof — development only (404 in production). The first
 * Immersive member: composes the new reusable Modal (promoted from the
 * /dev/modal reference — frozen `.ds-immersive` + `.ds-scrim`, verbatim), the
 * FROZEN SearchInput and the frozen menu-language rows. Groups (Recent ·
 * Navigation · Actions · Settings · AI), filtering, full keyboard navigation,
 * loading / empty / disabled / long-list states, ⌘K hotkey. The proof script
 * opens each palette for real (click / typing / arrows).
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CommandPalettePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">CommandPalette proof</h1>
      <CommandPaletteScene bg="proof-canvas" />
      <CommandPaletteScene bg="proof-media" />
    </main>
  )
}
