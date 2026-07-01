'use client'

import { enGB, fr } from 'date-fns/locale'

import { DatePicker } from '@/components/ui/date-picker'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const selectedDay = new Date(2026, 6, 15) // 2026-07-15 (deterministic proof)
const minDay = new Date(2026, 6, 6)
const maxDay = new Date(2026, 6, 24)

const goals = [
  { value: 'loss', label: 'Weight loss' },
  { value: 'gain', label: 'Muscle gain' },
  { value: 'perf', label: 'Performance' },
]

function Demo({ dark }: { dark: boolean }) {
  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-8">
        <p
          className={
            dark
              ? 'text-body-sm text-white/70'
              : 'text-body-sm text-text-secondary'
          }
        >
          Input → Textarea → SearchInput → Select → DatePicker — one family,
          same Control glass. Closed, they are indistinguishable; only the
          interaction differs. The calendar is a separate Floating Surface.
        </p>

        {/* Family — indistinguishable when closed. */}
        <div className="flex flex-col gap-4">
          <Input label="Text (Input)" placeholder="Your name" />
          <Textarea label="Multiline (Textarea)" placeholder="A few words…" />
          <SearchInput label="Search (SearchInput)" placeholder="Search…" />
          <Select
            label="Choice (Select)"
            placeholder="Select a goal"
            options={goals}
          />
          <DatePicker label="Date (DatePicker)" placeholder="Select a date" />
        </div>

        {/* Selected + description. */}
        <DatePicker
          label="Start date"
          description="You can change this any time."
          defaultValue={selectedDay}
        />

        {/* States. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <DatePicker label="Required" required placeholder="Pick a date" />
          <DatePicker
            label="Error"
            error="Please choose a date."
            placeholder="Select…"
          />
          <DatePicker
            label="Success"
            success
            helperText="Saved."
            defaultValue={selectedDay}
          />
          <DatePicker label="Disabled" disabled placeholder="Unavailable" />
          <DatePicker label="Read only" readOnly defaultValue={selectedDay} />
          <DatePicker
            label="Bounded (min → max)"
            description="Only 6–24 Jul selectable."
            defaultValue={selectedDay}
            minDate={minDay}
            maxDate={maxDay}
          />
        </div>

        {/* Locales + long format. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <DatePicker
            label="Locale — FR (European)"
            locale={fr}
            defaultValue={selectedDay}
          />
          <DatePicker
            label="Locale — UK (European)"
            locale={enGB}
            defaultValue={selectedDay}
          />
          <DatePicker
            label="Long format"
            format="EEEE, MMMM d, yyyy"
            defaultValue={selectedDay}
          />
          <DatePicker
            label="Custom format (US)"
            format="MM/dd/yyyy"
            defaultValue={selectedDay}
          />
        </div>
      </div>
    </GlassPanel>
  )
}

export function DatePickerScene({
  bg,
}: {
  bg: 'proof-canvas' | 'proof-media'
}) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — DatePicker (Control +
        Floating)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
