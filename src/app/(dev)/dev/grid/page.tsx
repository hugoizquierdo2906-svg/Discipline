import { notFound } from 'next/navigation'

import { GridScene } from './grid-demo'

/**
 * Grid proof — development only (404 in production). The Layout 2-D primitive:
 * fixed columns, auto-fit/auto-fill, the gap scale, align/justify, nested
 * grids, responsive via consumer className, RTL, and composition across the
 * real Design System (GlassCard/ChartContainer/Table/Input/Badge).
 */
export const metadata = { robots: { index: false, follow: false } }

export default function GridPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Grid proof</h1>
      <GridScene />
    </main>
  )
}
