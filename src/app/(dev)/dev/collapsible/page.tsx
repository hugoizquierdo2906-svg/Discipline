import { notFound } from 'next/navigation'

import { CollapsibleScene } from './collapsible-demo'

/**
 * Collapsible proof — development only (404 in production). The Disclosure
 * primitive: basic, controlled, uncontrolled, default open, disabled,
 * forceMount, long content, nested, icon, custom trigger (asChild), RTL,
 * responsive and keyboard.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CollapsiblePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Collapsible proof</h1>
      <CollapsibleScene />
    </main>
  )
}
