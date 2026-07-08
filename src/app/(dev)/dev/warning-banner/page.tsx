import { notFound } from 'next/navigation'

import { WarningBannerScene } from './warning-banner-demo'

/**
 * WarningBanner proof — development only (404 in production). DISCIPLINE's
 * persistent, in-flow warning: a situation that needs attention without
 * blocking. Like the frozen SuccessBanner, the banner OWNS its warning-tinted
 * surface, so it is shown directly in the page flow on the capture wallpaper.
 * Basic, with/without description, dismissible, with/without action, sizes,
 * real-world variants (subscription expiring, storage almost full, profile
 * incomplete, program unpublished, partial sync), responsive width, and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function WarningBannerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">WarningBanner proof</h1>
      <WarningBannerScene />
    </main>
  )
}
