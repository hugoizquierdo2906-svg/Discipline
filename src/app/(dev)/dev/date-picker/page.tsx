import { notFound } from 'next/navigation'

import { DatePickerScene } from './date-picker-demo'
import '../card/card.css'

/**
 * DatePicker proof — development only (404 in production). Shows Input → Textarea →
 * SearchInput → Select → DatePicker aligned (one Control family, indistinguishable
 * when closed) plus every DatePicker state, min/max bounds, and locales. Neutral
 * capture background + rich media panel. The calendar is a Floating Surface. The
 * demo lives in a client component (date-fns locale objects can't cross the RSC
 * boundary); this server page keeps the metadata + production guard.
 */
export const metadata = { robots: { index: false, follow: false } }

export default function DatePickerPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">DatePicker proof</h1>
      <DatePickerScene bg="proof-canvas" />
      <DatePickerScene bg="proof-media" />
    </main>
  )
}
