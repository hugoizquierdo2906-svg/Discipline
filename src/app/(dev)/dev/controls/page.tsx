'use client'

import { useState } from 'react'

import './controls.css'

import {
  DatePicker,
  FileInput,
  Input,
  SearchInput,
  Select,
  Textarea,
} from '@/components/ui'

/**
 * Control Surface family proof — development only (404 in production). Shows the
 * whole generalized family (Input · Textarea · Search · Select · DatePicker ·
 * FileInput) on a light canvas and a dark media panel, so the shared material
 * and role expression can be validated against the frozen /dev/input reference.
 */
function Family() {
  const [date, setDate] = useState<Date>()
  const [q, setQ] = useState('')
  return (
    <div className="flex w-80 flex-col gap-6">
      <Input
        label="Input"
        placeholder="you@discipline.app"
        helperText="We never share it."
      />
      <div className="flex flex-col gap-2">
        <span className="proof-label text-body-sm font-medium">Search</span>
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder="Search…"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="proof-label text-body-sm font-medium">Select</span>
        <Select
          aria-label="Choose a plan"
          placeholder="Choose a plan"
          options={[
            { value: 'strength', label: 'Strength' },
            { value: 'hybrid', label: 'Hybrid' },
            { value: 'endurance', label: 'Endurance' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="proof-label text-body-sm font-medium">Date</span>
        <DatePicker value={date} onChange={setDate} />
      </div>
      <Textarea label="Textarea" placeholder="Tell us about your goals…" />
      <FileInput hint="PNG or WEBP, up to 10MB" />
      <Input label="Error" defaultValue="bad" error="This value is invalid." />
    </div>
  )
}

export default function ControlsProofPage() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <main>
      <h1 className="sr-only">Control Surface family proof</h1>
      <section className="proof-light flex flex-col items-center gap-7 p-12">
        <p className="text-caption uppercase tracking-widest text-text-tertiary">
          Light canvas
        </p>
        <Family />
      </section>
      <section className="proof-dark flex flex-col items-center gap-7 p-12">
        <p className="proof-cap-dark text-caption uppercase tracking-widest">
          Dark media panel
        </p>
        <Family />
      </section>
    </main>
  )
}
