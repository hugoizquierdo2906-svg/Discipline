'use client'

import { useState } from 'react'

import {
  DateRangePicker,
  type DateRangeValue,
} from '@/components/ui/date-range-picker'
import { GlassPanel } from '@/components/ui/glass-panel'

function Head({
  dark,
  children,
}: {
  dark: boolean
  children: React.ReactNode
}) {
  return (
    <h2
      className={
        dark
          ? 'text-body font-medium text-white/95'
          : 'text-body font-medium text-text'
      }
    >
      {children}
    </h2>
  )
}

// Fixed dates so captures and the proof script are deterministic.
const july10 = new Date(2026, 6, 10)
const july15 = new Date(2026, 6, 15)
const july1 = new Date(2026, 6, 1)
const july31 = new Date(2026, 6, 31)

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [booking, setBooking] = useState<DateRangeValue | undefined>()
  const [block, setBlock] = useState<DateRangeValue | undefined>({
    from: july10,
    to: july15,
  })

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Date Range Picker — a start and an end date representing one
          continuous period. The trigger is Input itself; the overlay is the
          frozen DatePicker calendar language in range mode: first pick anchors
          the start (stays open), second pick anchors the end and closes. An end
          picked before the start swaps into place — a period has no invalid
          orientation.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <DateRangePicker label="Empty" data-testid="empty-target" />
            <DateRangePicker
              label="Open"
              data-testid="open-target"
              defaultValue={{ from: july10, to: july15 }}
            />
            <DateRangePicker
              label="Partially selected"
              defaultValue={{ from: july10 }}
              data-testid="partial-target"
            />
            <DateRangePicker
              label="Complete"
              defaultValue={{ from: july10, to: july15 }}
            />
            <DateRangePicker
              label="Keyboard"
              data-testid="keyboard-target"
              defaultValue={{ from: july10 }}
            />
            <DateRangePicker
              label="Inversion (end before start)"
              data-testid="inversion-target"
            />
            <DateRangePicker
              label="Month navigation"
              data-testid="month-target"
              defaultValue={{ from: july10, to: july15 }}
            />
            <DateRangePicker
              label="Loading"
              loading
              data-testid="loading-target"
            />
            <DateRangePicker
              label="Disabled"
              defaultValue={{ from: july10, to: july15 }}
              disabled
              data-testid="disabled-target"
            />
            <DateRangePicker
              label="Read only"
              defaultValue={{ from: july10, to: july15 }}
              readOnly
              data-testid="readonly-target"
            />
            <DateRangePicker
              label="Error"
              defaultValue={{ from: july10, to: july15 }}
              error="This period is no longer available."
              data-testid="error-target"
            />
            <DateRangePicker
              label="Invalid"
              invalid
              data-testid="invalid-target"
            />
            <DateRangePicker label="Required" required />
          </div>
        </section>

        {/* Bounds. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Bounds</Head>
          <div className="flex flex-col gap-5">
            <DateRangePicker
              label="Within July 2026 only"
              minDate={july1}
              maxDate={july31}
              helperText="Days outside July 2026 are disabled."
              data-testid="bounds-target"
            />
          </div>
        </section>

        {/* Real examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <DateRangePicker
              label="Booking dates"
              description="Check-in and check-out."
              value={booking}
              onChange={setBooking}
              name="booking"
            />
            <DateRangePicker
              label="Training block"
              helperText="The period this program covers."
              value={block}
              onChange={setBlock}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function DateRangePickerScene({
  bg,
}: {
  bg: 'proof-canvas' | 'proof-media'
}) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Date Range Picker
        (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
