import { notFound } from 'next/navigation'

import { ActivityFeedScene } from './activity-feed-demo'

/**
 * ActivityFeed proof — development only (404 in production). The Data
 * Display primitive: basic, compact/comfortable, avatar, icon, badge, long
 * descriptions, metadata, actions, mixed feed, empty state, responsive and
 * RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ActivityFeedPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">ActivityFeed proof</h1>
      <ActivityFeedScene />
    </main>
  )
}
