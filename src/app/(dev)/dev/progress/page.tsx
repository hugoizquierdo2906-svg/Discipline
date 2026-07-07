import { notFound } from 'next/navigation'

import { ProgressScene } from './progress-demo'

/**
 * Progress proof — development only (404 in production). DISCIPLINE's
 * indicator of the known fraction of completion of one continuous
 * operation. Basic, determinate, indeterminate, custom max, sizes, label,
 * percentage, disabled, loading screen, responsive, RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ProgressPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Progress proof</h1>
      <ProgressScene />
    </main>
  )
}
