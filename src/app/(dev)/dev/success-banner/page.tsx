import { notFound } from 'next/navigation'

import { SuccessBannerScene } from './success-banner-demo'

/**
 * SuccessBanner proof — development only (404 in production). DISCIPLINE's
 * persistent, in-flow confirmation that an operation succeeded. Unlike the
 * content-only states, the banner OWNS its success-tinted surface, so it is
 * shown directly in the page flow on the capture wallpaper. Basic, with/without
 * description, dismissible, with/without action, sizes, real-world variants
 * (program published, payment confirmed, import completed, settings saved),
 * responsive width, and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SuccessBannerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">SuccessBanner proof</h1>
      <SuccessBannerScene />
    </main>
  )
}
