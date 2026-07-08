import { notFound } from 'next/navigation'

import { ErrorBannerScene } from './error-banner-demo'

/**
 * ErrorBanner proof — development only (404 in production). DISCIPLINE's
 * persistent, in-flow, non-modal error. Like its frozen banner siblings, the
 * banner OWNS its error-tinted surface, so it is shown directly in the page
 * flow on the capture wallpaper. Basic, with/without description, dismissible,
 * with/without action, sizes, real-world variants (payment failed, import
 * failed, publish failed, sync failed, quota exceeded), responsive width, and
 * RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ErrorBannerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">ErrorBanner proof</h1>
      <ErrorBannerScene />
    </main>
  )
}
