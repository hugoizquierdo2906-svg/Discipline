import { notFound } from 'next/navigation'

import { EmptyStateScene } from './empty-state-demo'

/**
 * EmptyState proof — development only (404 in production). DISCIPLINE's
 * meaningful-absence indicator. Basic, icon, with/without action, sizes,
 * alignments, inside table/list, and every content family (no results, no
 * clients, no sessions, no notifications, first use, no programs, gallery),
 * plus RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function EmptyStatePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">EmptyState proof</h1>
      <EmptyStateScene />
    </main>
  )
}
