import { notFound } from 'next/navigation'

import { TimePickerScene } from './time-picker-demo'
import '../card/card.css'

/**
 * Time Picker proof — development only (404 in production). Select an hour
 * (and optionally minutes) representing one point-in-time value, on Input
 * itself with the frozen Popover as the picker. States, granularities.
 * Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function TimePickerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Time Picker proof</h1>
      <TimePickerScene bg="proof-canvas" />
      <TimePickerScene bg="proof-media" />
    </main>
  )
}
