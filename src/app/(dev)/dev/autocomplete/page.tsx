import { notFound } from 'next/navigation'

import { AutocompleteScene } from './autocomplete-demo'
import '../card/card.css'

/**
 * Autocomplete proof — development only (404 in production). Free text
 * assisted, never constrained, by suggestions, on Input itself with the
 * frozen Control Surface popup and the frozen Select row language. States,
 * real examples. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function AutocompletePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Autocomplete proof</h1>
      <AutocompleteScene bg="proof-canvas" />
      <AutocompleteScene bg="proof-media" />
    </main>
  )
}
