import { notFound } from 'next/navigation'

import { HeadingScene } from './heading-demo'

/**
 * Heading proof — development only (404 in production). The Typography
 * primitive: h1–h6, level/as decoupling, long heading, inside Card/Drawer/
 * Modal, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function HeadingPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Heading proof</h1>
      <HeadingScene />
    </main>
  )
}
