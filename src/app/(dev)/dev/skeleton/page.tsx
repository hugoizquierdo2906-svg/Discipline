import { notFound } from 'next/navigation'

import { SkeletonScene } from './skeleton-demo'

/**
 * Skeleton proof — development only (404 in production). DISCIPLINE's
 * silent layout placeholder. Basic, rectangle, circle, text, multiple
 * lines, avatar, card, table, list, dashboard, article, image, responsive,
 * RTL, animated, static.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SkeletonPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Skeleton proof</h1>
      <SkeletonScene />
    </main>
  )
}
