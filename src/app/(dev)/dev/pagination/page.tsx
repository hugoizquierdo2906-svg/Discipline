import { notFound } from 'next/navigation'

import { PaginationScene } from './pagination-demo'

/**
 * Pagination proof — development only (404 in production). DISCIPLINE's
 * random-access control for a flat, ordered collection split into
 * fixed-size pages. Minimal, first/middle/last page, large dataset, few
 * pages, disabled, loading, compact, sibling counts, responsive, RTL,
 * keyboard, sizes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function PaginationPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Pagination proof</h1>
      <PaginationScene />
    </main>
  )
}
