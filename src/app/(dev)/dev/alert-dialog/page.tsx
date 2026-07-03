import { notFound } from 'next/navigation'

import { AlertDialogScene } from './alert-dialog-demo'
import '../card/card.css'

/**
 * Alert Dialog proof — development only (404 in production). An
 * interrupting confirmation on the frozen Modal: one question, an explicit
 * confirm-or-cancel answer, neutral and destructive variants. Neutral +
 * rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function AlertDialogPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Alert Dialog proof</h1>
      <AlertDialogScene bg="proof-canvas" />
      <AlertDialogScene bg="proof-media" />
    </main>
  )
}
