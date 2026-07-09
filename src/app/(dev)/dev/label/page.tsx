import { notFound } from 'next/navigation'

import { LabelScene } from './label-demo'

/**
 * Label proof — development only (404 in production). The Forms accessibility
 * primitive: a real `<label>` bound via `htmlFor`, a discreet non-red required
 * marker, a disabled state, long/multiline wrapping, responsive, and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function LabelPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Label proof</h1>
      <LabelScene />
    </main>
  )
}
