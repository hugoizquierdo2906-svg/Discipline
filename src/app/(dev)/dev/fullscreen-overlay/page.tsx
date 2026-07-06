import { notFound } from 'next/navigation'

import { FullscreenOverlayScene } from './fullscreen-overlay-demo'
import '../card/card.css'

/**
 * Fullscreen Overlay proof — development only (404 in production).
 * DISCIPLINE's maximal immersive surface on the frozen Modal foundation: a
 * full-viewport takeover for long, complex, focus-hungry tasks — editor,
 * builder, onboarding, assistant, viewer, fullscreen search — with sticky
 * header/footer, a single scrollable body, and optional sidebar/inspector/
 * toolbar/status bar. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function FullscreenOverlayPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Fullscreen Overlay proof</h1>
      <FullscreenOverlayScene bg="proof-canvas" />
      <FullscreenOverlayScene bg="proof-media" />
    </main>
  )
}
