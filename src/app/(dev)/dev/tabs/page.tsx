import { notFound } from 'next/navigation'

import { TabsScene } from './tabs-demo'

/**
 * Tabs proof — development only (404 in production). DISCIPLINE's control
 * for switching between a small, named, always-visible set of alternate
 * content views for the same record. Basic, controlled/uncontrolled,
 * horizontal/vertical, automatic/manual activation, disabled, force mount,
 * long labels, responsive, RTL, keyboard.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TabsPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Tabs proof</h1>
      <TabsScene />
    </main>
  )
}
