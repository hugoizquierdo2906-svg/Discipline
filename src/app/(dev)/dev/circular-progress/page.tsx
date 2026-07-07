import { notFound } from 'next/navigation'

import { CircularProgressScene } from './circular-progress-demo'

/**
 * CircularProgress proof — development only (404 in production). DISCIPLINE's
 * ring presentation of the known fraction of completion, for compact/
 * circular spaces. Basic, determinate, indeterminate, sizes, colors,
 * percentage, custom max, 0%/100%, disabled, loading, responsive, RTL,
 * long values.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function CircularProgressPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">CircularProgress proof</h1>
      <CircularProgressScene />
    </main>
  )
}
