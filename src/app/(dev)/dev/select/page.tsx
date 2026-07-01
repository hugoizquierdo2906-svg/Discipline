import { Dumbbell, HeartPulse, Timer } from 'lucide-react'
import { notFound } from 'next/navigation'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import '../card/card.css'

/**
 * Select proof — development only (404 in production). Shows Input → Textarea →
 * SearchInput → Select aligned (one Control family, indistinguishable when closed)
 * plus every Select state. Neutral capture background + rich media panel. No frozen
 * role touched.
 */
export const metadata = { robots: { index: false, follow: false } }

const plans = [
  {
    value: 'strength',
    label: 'Strength',
    icon: <Icon icon={Dumbbell} size="sm" />,
    description: 'Heavy compounds, low reps',
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
    icon: <Icon icon={HeartPulse} size="sm" />,
    description: 'Lifting + conditioning',
  },
  {
    value: 'endurance',
    label: 'Endurance',
    icon: <Icon icon={Timer} size="sm" />,
    description: 'Long, steady sessions',
  },
]

const goals = [
  { value: 'loss', label: 'Weight loss' },
  { value: 'gain', label: 'Muscle gain' },
  { value: 'perf', label: 'Performance' },
  { value: 'health', label: 'General health' },
  { value: 'mobility', label: 'Mobility & flexibility' },
  { value: 'strength', label: 'Maximal strength' },
  { value: 'endurance', label: 'Endurance & stamina' },
  { value: 'physique', label: 'Physique & aesthetics' },
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
          Input → Textarea → SearchInput → Select — one family, same Control
          glass. Closed, they are indistinguishable; only the interaction
          differs.
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
        </div>

        {/* Selected + icons + descriptions. */}
        <Select
          label="Training plan"
          description="You can change this any time."
          defaultValue="hybrid"
          options={plans}
        />

        {/* States. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Required"
            required
            placeholder="Pick one"
            options={goals}
          />
          <Select
            label="Loading"
            loading
            placeholder="Loading…"
            options={goals}
          />
          <Select
            label="Error"
            error="Please choose a plan."
            placeholder="Select…"
            options={plans}
          />
          <Select
            label="Success"
            success
            helperText="Saved."
            defaultValue="perf"
            options={goals}
          />
          <Select
            label="Disabled"
            disabled
            placeholder="Unavailable"
            options={goals}
          />
          <Select
            label="Read only"
            readOnly
            defaultValue="strength"
            options={plans}
          />
        </div>

        {/* Long label. */}
        <Select
          label="Long value"
          defaultValue="long"
          options={[
            {
              value: 'long',
              label:
                'Physique & aesthetics — a long option label that must truncate cleanly inside the field',
            },
            ...goals,
          ]}
        />
      </div>
    </GlassPanel>
  )
}

function Scene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Select (Control Surface)
      </p>
      <Demo dark={dark} />
    </section>
  )
}

export default function SelectPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Select proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
