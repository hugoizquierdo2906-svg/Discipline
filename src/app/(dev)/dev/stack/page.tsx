import { notFound } from 'next/navigation'

import { StackScene } from './stack-demo'

/**
 * Stack proof — development only (404 in production). The Layout primitive:
 * vertical/horizontal, the gap scale, align, justify, wrap, reverse,
 * responsive (via consumer className), semantic `as`, RTL and composition
 * across the real Design System.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function StackPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Stack proof</h1>
      <StackScene />
    </main>
  )
}
