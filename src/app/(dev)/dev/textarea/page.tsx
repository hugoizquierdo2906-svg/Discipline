import { notFound } from 'next/navigation'

import { GlassPanel } from '@/components/ui/glass-panel'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import '../card/card.css'

/**
 * Textarea proof — development only (404 in production). Shows every Textarea state
 * inside a GlassPanel (so it reads on both backgrounds), plus an Input↔Textarea
 * comparison to prove they are siblings — same Control material, geometry the only
 * difference. Neutral capture background + rich media panel. No frozen role touched.
 */
export const metadata = { robots: { index: false, follow: false } }

const LONG =
  'Track how the session felt today. Note your energy, sleep, and any pain or ' +
  'tightness. The more context you give your coach, the better the next block ' +
  'adapts to you. This field auto-grows as you type, then scrolls once it reaches ' +
  'its maximum height so the form never jumps. Keep writing — it holds as much as ' +
  'you need while staying calm and readable, exactly like the single-line field.'

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
          GlassPanel → Textarea — every state shares the frozen Control
          material.
        </p>

        {/* Sibling comparison: Input above Textarea, same label language. */}
        <div className="flex flex-col gap-4">
          <Input label="Session title" placeholder="Push day — upper body" />
          <Textarea
            label="Session notes"
            placeholder="How did it feel?"
            helperText="Idle · placeholder integrated into the glass."
          />
        </div>

        {/* Filled + description + character counter. */}
        <Textarea
          label="Weekly check-in"
          description="Shared with your coach every Sunday."
          defaultValue="Energy was high all week and sleep averaged 7h30. Right shoulder felt a little tight on the last set of presses."
          maxLength={500}
          showCharacterCount
        />

        {/* Error. */}
        <Textarea
          label="Goal"
          defaultValue="x"
          error="Tell us a little more — at least 20 characters."
        />

        {/* Success. */}
        <Textarea
          label="Coach reply"
          defaultValue="Great work this week — let's add one more set to the squat."
          success
          helperText="Saved."
        />

        {/* Auto-resize + long content → grows then scrolls at maxRows. */}
        <Textarea
          label="Journal (auto-resize)"
          defaultValue={LONG}
          autoResize
          minRows={3}
          maxRows={6}
          showCharacterCount
        />

        {/* Disabled + readonly. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea
            label="Disabled"
            defaultValue="Locked until your plan starts."
            disabled
          />
          <Textarea
            label="Read only"
            defaultValue="Submitted on Jul 1 — awaiting review."
            readOnly
          />
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
        {dark ? 'Rich panel' : 'Capture background'} — Textarea (Control
        Surface)
      </p>
      <Demo dark={dark} />
    </section>
  )
}

export default function TextareaPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      <h1 className="sr-only">Textarea proof</h1>
      <Scene bg="proof-canvas" />
      <Scene bg="proof-media" />
    </main>
  )
}
