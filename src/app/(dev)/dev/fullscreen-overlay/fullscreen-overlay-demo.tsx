'use client'

import {
  Bold,
  ChevronRight,
  Image as ImageIcon,
  Italic,
  List,
  Search,
  Send,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FullscreenOverlay } from '@/components/ui/fullscreen-overlay'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { Input } from '@/components/ui/input'
import { SearchInput } from '@/components/ui/search-input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

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

function LongBody() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {Array.from({ length: 30 }, (_, i) => (
        <p key={i} className="text-body-sm text-text-secondary">
          Paragraph {i + 1} — the body is the only scroll region; the header,
          toolbar, footer and status bar stay pinned while the viewport itself
          never scrolls.
        </p>
      ))}
    </div>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [name, setName] = useState('')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Fullscreen Overlay — DISCIPLINE&apos;s maximal immersive surface on
          the frozen Modal foundation: a temporary takeover of the whole
          viewport for a long, complex or focus-hungry task, without leaving the
          page. Sticky header and footer, one scrollable body, optional sidebar
          / inspector / toolbar / status bar. Escape or the close button returns
          you exactly where you were.
        </p>

        {/* Structure. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Structure</Head>
          <div className="flex flex-wrap gap-4">
            <FullscreenOverlay
              title="Simple overlay"
              description="Header, scrollable body, footer."
              trigger={<Button variant="secondary">Simple</Button>}
              data-testid="simple-overlay"
              footer={
                <>
                  <FullscreenOverlay.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </FullscreenOverlay.Close>
                  <FullscreenOverlay.Close asChild>
                    <Button>Done</Button>
                  </FullscreenOverlay.Close>
                </>
              }
            >
              <LongBody />
            </FullscreenOverlay>

            <FullscreenOverlay
              title="Empty"
              trigger={<Button variant="secondary">Empty</Button>}
              data-testid="empty-overlay"
            >
              <div className="flex h-full items-center justify-center text-body-sm text-text-tertiary">
                Nothing here yet.
              </div>
            </FullscreenOverlay>

            <FullscreenOverlay
              title="Loading"
              loading
              trigger={<Button variant="secondary">Loading</Button>}
              data-testid="loading-overlay"
            />

            <FullscreenOverlay
              title="Disabled"
              disabled
              trigger={<Button variant="secondary">Disabled</Button>}
              data-testid="disabled-overlay"
            >
              <p>Never opens.</p>
            </FullscreenOverlay>
          </div>
        </section>

        {/* Workspaces. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Workspaces</Head>
          <div className="flex flex-wrap gap-4">
            {/* Program builder — sidebar + body + footer + status. */}
            <FullscreenOverlay
              title="Program builder"
              description="Hypertrophy block · 8 weeks"
              breadcrumb={
                <span className="inline-flex items-center gap-1">
                  Programs <Icon icon={ChevronRight} size="sm" aria-hidden />{' '}
                  New
                </span>
              }
              trigger={<Button variant="secondary">Program builder</Button>}
              data-testid="builder-overlay"
              sidebar={
                <nav className="flex flex-col gap-1">
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map(
                    (w, i) => (
                      <span
                        key={w}
                        className={`rounded-sm px-3 py-2 text-body-sm ${i === 0 ? 'bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)] text-text' : 'text-text-secondary'}`}
                      >
                        {w}
                      </span>
                    ),
                  )}
                </nav>
              }
              statusBar={
                <>
                  <span>34 exercises</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>All changes saved</span>
                </>
              }
              footer={
                <>
                  <FullscreenOverlay.Close asChild>
                    <Button variant="secondary">Discard</Button>
                  </FullscreenOverlay.Close>
                  <FullscreenOverlay.Close asChild>
                    <Button>Publish program</Button>
                  </FullscreenOverlay.Close>
                </>
              }
            >
              <div className="flex flex-col gap-5">
                <h3 className="text-h5 font-semibold text-text">
                  Week 1 — sessions
                </h3>
                {['Upper A', 'Lower A', 'Upper B', 'Lower B'].map((s) => (
                  <div
                    key={s}
                    className="rounded-md border border-border px-4 py-3 text-body-sm text-text"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </FullscreenOverlay>

            {/* Client creation — long form. */}
            <FullscreenOverlay
              title="New client"
              description="Create a client profile."
              trigger={<Button variant="secondary">Client creation</Button>}
              data-testid="client-overlay"
              footer={
                <>
                  <FullscreenOverlay.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </FullscreenOverlay.Close>
                  <FullscreenOverlay.Close asChild>
                    <Button>Create client</Button>
                  </FullscreenOverlay.Close>
                </>
              }
            >
              <div className="mx-auto flex max-w-xl flex-col gap-5">
                <Input
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="lea@example.com"
                />
                <Input label="Phone" placeholder="+33…" />
                <Textarea
                  label="Goals"
                  placeholder="What are they training for?"
                />
                <Input label="Start date" placeholder="2026-07-10" />
              </div>
            </FullscreenOverlay>

            {/* AI assistant — body + sticky composer footer. */}
            <FullscreenOverlay
              title="AI assistant"
              description="Draft a training block with the assistant."
              trigger={<Button variant="secondary">AI assistant</Button>}
              data-testid="ai-overlay"
              footer={
                <div className="flex w-full items-center gap-3">
                  <Input
                    className="flex-1"
                    placeholder="Ask the assistant to draft a week…"
                  />
                  <IconButton label="Send" icon={<Icon icon={Send} />} />
                </div>
              }
            >
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Icon
                    icon={Sparkles}
                    className="mt-1 text-accent-accessible"
                  />
                  <p className="text-body-sm text-text-secondary">
                    Tell me the goal and available days, and I&apos;ll propose a
                    week you can edit.
                  </p>
                </div>
              </div>
            </FullscreenOverlay>

            {/* Rich text / markdown editor — toolbar + body. */}
            <FullscreenOverlay
              title="Program notes"
              trigger={<Button variant="secondary">Editor</Button>}
              data-testid="editor-overlay"
              toolbar={
                <>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label="Bold"
                    icon={<Icon icon={Bold} />}
                  />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label="Italic"
                    icon={<Icon icon={Italic} />}
                  />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label="List"
                    icon={<Icon icon={List} />}
                  />
                  <Separator orientation="vertical" className="mx-1 h-5" />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label="Image"
                    icon={<Icon icon={ImageIcon} />}
                  />
                </>
              }
              statusBar={<span>Draft · 128 words</span>}
              footer={
                <FullscreenOverlay.Close asChild>
                  <Button>Save notes</Button>
                </FullscreenOverlay.Close>
              }
            >
              <div className="mx-auto max-w-2xl">
                <Textarea
                  label="Notes"
                  autoResize
                  minRows={12}
                  defaultValue={'# Week 3 intent\n\nKeep top sets at RPE 8.'}
                />
              </div>
            </FullscreenOverlay>
          </div>
        </section>

        {/* Views. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Views</Head>
          <div className="flex flex-wrap gap-4">
            {/* Split view — sidebar + body + inspector. */}
            <FullscreenOverlay
              title="Session inspector"
              trigger={<Button variant="secondary">Split view</Button>}
              data-testid="split-overlay"
              sidebar={
                <nav className="flex flex-col gap-1">
                  {['Overview', 'Exercises', 'History', 'Notes'].map((s, i) => (
                    <span
                      key={s}
                      className={`rounded-sm px-3 py-2 text-body-sm ${i === 1 ? 'bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)] text-text' : 'text-text-secondary'}`}
                    >
                      {s}
                    </span>
                  ))}
                </nav>
              }
              inspector={
                <dl className="flex flex-col gap-3 text-body-sm">
                  {[
                    ['Sets', '24'],
                    ['Volume', '14 320 kg'],
                    ['Duration', '52 min'],
                    ['RPE', '8'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-text-tertiary">{k}</dt>
                      <dd className="font-medium text-text">{v}</dd>
                    </div>
                  ))}
                </dl>
              }
            >
              <div className="flex flex-col gap-3">
                {['Bench Press', 'Incline DB Press', 'Cable Fly', 'Dip'].map(
                  (e) => (
                    <div
                      key={e}
                      className="rounded-md border border-border px-4 py-3 text-body-sm text-text"
                    >
                      {e}
                    </div>
                  ),
                )}
              </div>
            </FullscreenOverlay>

            {/* Fullscreen search. */}
            <FullscreenOverlay
              title="Search everything"
              header={
                <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                  <Icon icon={Search} className="text-text-tertiary" />
                  <SearchInput
                    className="flex-1"
                    placeholder="Search clients, programs, exercises…"
                    aria-label="Search everything"
                  />
                  <FullscreenOverlay.Close asChild>
                    <Button variant="secondary">Esc</Button>
                  </FullscreenOverlay.Close>
                </div>
              }
              trigger={<Button variant="secondary">Fullscreen search</Button>}
              data-testid="search-overlay"
            >
              <div className="mx-auto flex max-w-2xl flex-col gap-2">
                {[
                  'Léa Moreau',
                  'Hypertrophy block',
                  'Bench Press',
                  'Marc Dubois',
                ].map((r) => (
                  <div
                    key={r}
                    className="rounded-sm px-3 py-2.5 text-body-sm text-text hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </FullscreenOverlay>

            {/* Image viewer / gallery. */}
            <FullscreenOverlay
              title="Progress photos"
              trigger={<Button variant="secondary">Gallery</Button>}
              data-testid="gallery-overlay"
              statusBar={<span>1 of 12</span>}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md border border-border bg-surface-raised"
                  />
                ))}
              </div>
            </FullscreenOverlay>

            {/* Nested. */}
            <FullscreenOverlay
              title="Outer overlay"
              trigger={<Button variant="secondary">Nested</Button>}
              data-testid="outer-overlay"
            >
              <div className="mx-auto flex max-w-xl flex-col items-start gap-4">
                <p className="text-body-sm text-text-secondary">
                  Open a second overlay from inside this one — Escape closes the
                  top one first.
                </p>
                <FullscreenOverlay
                  title="Inner overlay"
                  trigger={
                    <Button variant="secondary" data-testid="open-inner">
                      Open inner overlay
                    </Button>
                  }
                  data-testid="inner-overlay"
                >
                  <p className="text-body-sm text-text-secondary">
                    The inner overlay stacks above the outer one.
                  </p>
                </FullscreenOverlay>
              </div>
            </FullscreenOverlay>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function FullscreenOverlayScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — Fullscreen Overlay
        (Immersive)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
