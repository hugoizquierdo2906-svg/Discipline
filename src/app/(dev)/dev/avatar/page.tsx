import { notFound } from 'next/navigation'

import { AvatarScene } from './avatar-demo'

/**
 * Avatar proof — development only (404 in production). The foundational Data
 * Display primitive: image with a guaranteed fallback (image → initials → user
 * icon), sizes, shapes, groups with overflow, and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function AvatarPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Avatar proof</h1>
      <AvatarScene />
    </main>
  )
}
