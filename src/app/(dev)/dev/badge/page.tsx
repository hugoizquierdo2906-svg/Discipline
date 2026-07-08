import { notFound } from 'next/navigation'

import { BadgeScene } from './badge-demo'

/**
 * Badge proof — development only (404 in production). DISCIPLINE's Data Display
 * primitive: a small, static property attached to a datum. Shown inside real
 * data surfaces (Card, table, list) on the capture wallpaper, never floating
 * alone. Variants, appearances (soft/solid/outline), sizes, shapes, icon
 * present/absent, status/role/priority/category/count families, responsive,
 * and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function BadgePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Badge proof</h1>
      <BadgeScene />
    </main>
  )
}
