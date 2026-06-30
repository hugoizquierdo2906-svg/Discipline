import { notFound } from 'next/navigation'

import { Showcase } from './showcase'

/**
 * Level 1 component gallery — development only (404 in production, like
 * /dev/tokens). Every primitive is shown with all of its states.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ComponentsPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <Showcase />
}
