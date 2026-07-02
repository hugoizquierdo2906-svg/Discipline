import { notFound } from 'next/navigation'

import { ToastScenes } from './toast-demo'
import '../card/card.css'

/**
 * Toast proof — development only (404 in production). The transient feedback
 * surface: GlassSurface → .ds-floating → FloatingSurface → Toast. Variants
 * (default · success · warning · error · loading · info), action, dismiss,
 * long/sticky, progress timer (existing Progress primitive), promise pattern
 * (loading → update → success), queue of 6 with max 4 visible, six stack
 * positions, pause on hover, swipe, Escape/F8. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ToastPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Toast proof</h1>
      <ToastScenes />
    </main>
  )
}
