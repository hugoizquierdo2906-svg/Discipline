import { notFound } from 'next/navigation'

import { TextScene } from './text-demo'

/**
 * Text proof — development only (404 in production). The Typography
 * primitive: paragraph, span, strong, em, small, long paragraph, inside
 * Card/Drawer/Modal, inline with Code, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TextPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Text proof</h1>
      <TextScene />
    </main>
  )
}
