import { notFound } from 'next/navigation'

import { TimelineScene } from './timeline-demo'

/**
 * Timeline proof — development only (404 in production). The Data Display
 * primitive: basic, horizontal, avatar, badge, icons, dense/comfortable,
 * long descriptions, date groups, exercise/client/nutrition history, empty
 * state, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TimelinePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Timeline proof</h1>
      <TimelineScene />
    </main>
  )
}
