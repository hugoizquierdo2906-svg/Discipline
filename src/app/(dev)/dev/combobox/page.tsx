import { notFound } from 'next/navigation'

import { ComboboxScene } from './combobox-demo'
import '../card/card.css'

/**
 * Combobox proof — development only (404 in production). A single value
 * found through search across a very large list, on Input itself with the
 * frozen Control Surface popup and the frozen Select row language. States,
 * real examples. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ComboboxPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Combobox proof</h1>
      <ComboboxScene bg="proof-canvas" />
      <ComboboxScene bg="proof-media" />
    </main>
  )
}
