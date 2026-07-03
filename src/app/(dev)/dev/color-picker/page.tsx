import { notFound } from 'next/navigation'

import { ColorPickerScene } from './color-picker-demo'
import '../card/card.css'

/**
 * Color Picker proof — development only (404 in production). One color
 * value chosen visually from a palette or entered as hex, on Input itself
 * with the frozen Popover as the panel. States, real examples. Neutral +
 * rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function ColorPickerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Color Picker proof</h1>
      <ColorPickerScene bg="proof-canvas" />
      <ColorPickerScene bg="proof-media" />
    </main>
  )
}
