import { notFound } from 'next/navigation'

import { ChartContainerScene } from './chart-container-demo'

/**
 * ChartContainer proof — development only (404 in production). The Data
 * Display primitive: basic, header, description, legend, footer, loading,
 * empty, error, dashboard metric, line/bar/pie placeholders, mixed
 * dashboard, responsive and RTL. Every visualization is a token-only SVG
 * placeholder — no chart library.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ChartContainerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">ChartContainer proof</h1>
      <ChartContainerScene />
    </main>
  )
}
