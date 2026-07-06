import { notFound } from 'next/navigation'

import { BreadcrumbScene } from './breadcrumb-demo'

/**
 * Breadcrumb proof — development only (404 in production). DISCIPLINE's
 * hierarchical position indicator: the current view's path of ancestors,
 * never primary navigation, never a Stepper, never Pagination. Minimal,
 * long hierarchy, collapse, icons, disabled, loading, responsive, long
 * labels, RTL, and separator variants.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function BreadcrumbPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Breadcrumb proof</h1>
      <BreadcrumbScene />
    </main>
  )
}
