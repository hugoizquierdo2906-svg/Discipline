import { notFound } from 'next/navigation'

import { SeparatorScene } from './separator-demo'

/**
 * Separator proof — development only (404 in production). The Layout
 * primitive: horizontal, vertical, decorative vs. semantic, between Cards,
 * inside Card/Drawer/Modal, navigation split, form sections, responsive and
 * RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SeparatorPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Separator proof</h1>
      <SeparatorScene />
    </main>
  )
}
