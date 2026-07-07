import { notFound } from 'next/navigation'

import { ErrorStateScene } from './error-state-demo'

/**
 * ErrorState proof — development only (404 in production). DISCIPLINE's
 * failed-load indicator. Basic, retry, without action, sizes, alignments,
 * inside card/table/list, dashboard, and every error family (server, load
 * failed / network, unknown), plus RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ErrorStatePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">ErrorState proof</h1>
      <ErrorStateScene />
    </main>
  )
}
