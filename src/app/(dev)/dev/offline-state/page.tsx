import { notFound } from 'next/navigation'

import { OfflineStateScene } from './offline-state-demo'

/**
 * OfflineState proof — development only (404 in production). DISCIPLINE's
 * no-connectivity indicator, shown inside real Liquid Glass surfaces on the
 * capture wallpaper. Basic, retry, without action, sizes, alignments,
 * inside Drawer/Dialog/FullscreenOverlay, dashboard, chat, gallery, files,
 * and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function OfflineStatePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">OfflineState proof</h1>
      <OfflineStateScene />
    </main>
  )
}
