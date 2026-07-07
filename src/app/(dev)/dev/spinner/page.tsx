import { notFound } from 'next/navigation'

import { SpinnerScene } from './spinner-demo'

/**
 * Spinner proof — development only (404 in production). DISCIPLINE's
 * purely indeterminate activity indicator. Basic, sizes, colors, inline,
 * centered, with/without label, disabled, responsive, RTL, and inside
 * Button/Card/Drawer/FullscreenOverlay.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SpinnerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Spinner proof</h1>
      <SpinnerScene />
    </main>
  )
}
