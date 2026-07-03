import { notFound } from 'next/navigation'

import { MultiSelectScene } from './multiselect-demo'
import '../card/card.css'

/**
 * MultiSelect proof — development only (404 in production). A list of
 * values with several selectable at once, on the Control Surface trigger
 * with the frozen Select menu recipe and the frozen Checkbox as every row.
 * States, real examples. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function MultiSelectPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">MultiSelect proof</h1>
      <MultiSelectScene bg="proof-canvas" />
      <MultiSelectScene bg="proof-media" />
    </main>
  )
}
