import { notFound } from 'next/navigation'

import { TreeViewScene } from './tree-view-demo'

/**
 * TreeView proof — development only (404 in production). The Data
 * Display primitive: basic, nested, default open, controlled/
 * uncontrolled, disabled, icons, badges, avatar, long labels, mixed
 * hierarchy, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TreeViewPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">TreeView proof</h1>
      <TreeViewScene />
    </main>
  )
}
