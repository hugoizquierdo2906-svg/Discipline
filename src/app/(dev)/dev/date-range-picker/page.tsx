import { notFound } from 'next/navigation'

import { DateRangePickerScene } from './date-range-picker-demo'
import '../card/card.css'

/**
 * Date Range Picker proof — development only (404 in production). Select a
 * start and an end date representing one continuous period, on Input itself
 * with the frozen DatePicker calendar language in range mode. States, real
 * examples. Neutral + rich scenes.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function DateRangePickerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Date Range Picker proof</h1>
      <DateRangePickerScene bg="proof-canvas" />
      <DateRangePickerScene bg="proof-media" />
    </main>
  )
}
