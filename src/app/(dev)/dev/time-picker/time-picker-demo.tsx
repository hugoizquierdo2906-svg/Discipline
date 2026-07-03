'use client'

import { useState } from 'react'

import { GlassPanel } from '@/components/ui/glass-panel'
import { TimePicker } from '@/components/ui/time-picker'

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

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [meeting, setMeeting] = useState('')
  const [reminder, setReminder] = useState('09:00')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Time Picker — select an hour (and optionally minutes) representing one
          point-in-time value. The trigger is Input itself; the picker is the
          frozen Popover with two scrollable hour/minute lists reusing the
          frozen Select row language. Type &quot;14:30&quot; directly, or open
          the picker and use the arrow keys.
        </p>

        {/* States. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States</Head>
          <div className="flex flex-col gap-5">
            <TimePicker label="Closed" data-testid="closed-target" />
            <TimePicker
              label="Open"
              data-testid="open-target"
              defaultValue="14:30"
            />
            <TimePicker label="Selected" defaultValue="09:45" />
            <TimePicker
              label="Keyboard"
              data-testid="keyboard-target"
              defaultValue="12:00"
            />
            <TimePicker label="Loading" loading />
            <TimePicker label="Disabled" defaultValue="10:00" disabled />
            <TimePicker label="Read only" defaultValue="16:15" readOnly />
            <TimePicker
              label="Error"
              defaultValue="08:00"
              error="This slot is no longer available."
            />
            <TimePicker label="Required" required />
          </div>
        </section>

        {/* Granularities. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Granularities</Head>
          <div className="flex flex-col gap-5">
            <TimePicker
              label="Hour only"
              granularity="hour"
              data-testid="hour-only-target"
              defaultValue="09:00"
            />
            <TimePicker
              label="Hour + minutes (step 15)"
              minuteStep={15}
              data-testid="step-15-target"
              defaultValue="09:15"
            />
          </div>
        </section>

        {/* Real examples. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Real examples</Head>
          <div className="flex flex-col gap-5">
            <TimePicker
              label="Meeting start"
              description="24h format, 5-minute steps."
              value={meeting}
              onValueChange={setMeeting}
            />
            <TimePicker
              label="Daily reminder"
              minTime="06:00"
              maxTime="22:00"
              helperText="Between 06:00 and 22:00."
              value={reminder}
              onValueChange={setReminder}
            />
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function TimePickerScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — Time Picker (Control)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
