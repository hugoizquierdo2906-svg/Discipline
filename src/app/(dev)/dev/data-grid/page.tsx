import { notFound } from 'next/navigation'

import { DataGridScene } from './data-grid-demo'

/**
 * DataGrid proof — development only (404 in production). The Data
 * Display primitive: basic, selection, sorting, pagination, toolbar,
 * empty, loading, mixed content, long content, responsive, disabled,
 * sticky header and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function DataGridPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">DataGrid proof</h1>
      <DataGridScene />
    </main>
  )
}
