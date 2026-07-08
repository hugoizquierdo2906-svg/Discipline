import { notFound } from 'next/navigation'

import { AvatarLauncherScene } from './avatar-launcher-demo'

/**
 * AvatarLauncher proof — development only (404 in production). The single, calm
 * entry point to the DISCIPLINE Guide, composed only from frozen primitives.
 * All states (idle, unread, active, coach, loading, unavailable, disabled),
 * sizes, a realistic fixed placement, and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function AvatarLauncherPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Avatar Launcher proof</h1>
      <AvatarLauncherScene />
    </main>
  )
}
