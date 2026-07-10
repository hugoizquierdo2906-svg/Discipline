import { notFound } from 'next/navigation'

import { TableScene } from './table-demo'

/**
 * Table proof — development only (404 in production). The Data Display
 * primitive: basic, caption, header, footer, numeric/text columns, mixed
 * content (Avatar/Badge/Code), dense/comfortable, sticky header, empty
 * cells, long content, responsive and RTL.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TablePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Table proof</h1>
      <TableScene />
    </main>
  )
}
