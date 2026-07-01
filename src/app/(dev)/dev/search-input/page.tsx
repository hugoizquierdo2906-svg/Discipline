import { notFound } from 'next/navigation'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'
import { Textarea } from '@/components/ui/textarea'

import '../card/card.css'

/**
 * SearchInput proof — development only (404 in production). Shows every SearchInput
 * state inside a GlassPanel, plus the Input → Textarea → SearchInput family
 * comparison — same Control material, only geometry/interaction differ. Neutral
 * capture background + rich media panel. No frozen role touched.
 */
export const metadata = { robots: { index: false, follow: false } }

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
          Input → Textarea → SearchInput — one family, same Control glass.
        </p>

        {/* Family comparison. */}
        <div className="flex flex-col gap-4">
          <Input label="Text field (Input)" placeholder="Your name" />
          <Textarea label="Multiline (Textarea)" placeholder="A few words…" />
          <SearchInput
            label="Search (SearchInput)"
            placeholder="Search exercises…"
            shortcut="⌘K"
          />
        </div>

        {/* Filled + clearable + description. */}
        <SearchInput
          label="Clearable"
          description="Type to filter — press Escape or × to clear."
          defaultValue="bench press"
          clearable
        />

        {/* Loading. */}
        <SearchInput label="Loading" defaultValue="squat" loading />

        {/* Error + success. */}
        <SearchInput
          label="Error"
          defaultValue="!"
          clearable
          error="No results — try a different term."
        />
        <SearchInput
          label="Success"
          defaultValue="deadlift"
          clearable
          success
          helperText="12 results."
        />

        {/* Disabled + readonly. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchInput
            label="Disabled"
            placeholder="Search…"
            shortcut="⌘K"
            disabled
          />
          <SearchInput label="Read only" defaultValue="pinned query" readOnly />
        </div>
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
        {dark ? 'Rich panel' : 'Capture background'} — SearchInput (Control
        Surface)
      </p>
      <Demo dark={dark} />
    </section>
  )
}

export default function SearchInputPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">SearchInput proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
