'use client'

import { Settings, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code } from '@/components/ui/code'
import { Drawer } from '@/components/ui/drawer'
import { FileInput } from '@/components/ui/file-input'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
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

const sides = ['left', 'right', 'top', 'bottom'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

const tableRows = [
  ['Bench Press', '4 × 6', 'RPE 8', 'Done'],
  ['Incline DB Press', '3 × 10', 'RPE 7', 'Done'],
  ['Cable Fly', '3 × 12', 'RPE 7', 'Skipped'],
  ['Overhead Press', '4 × 8', 'RPE 8', 'Done'],
  ['Lateral Raise', '3 × 15', 'RPE 6', 'Done'],
] as const

const timelineEvents = [
  ['Today', 'Session logged — Upper body, 52 min'],
  ['2 days ago', 'Check-in submitted — weight 71.4 kg'],
  ['5 days ago', 'Program updated to week 3'],
  ['1 week ago', 'New PR — Deadlift 180 kg'],
  ['2 weeks ago', 'Joined the Hypertrophy block'],
] as const

const weeklyVolume = [
  ['Mon', 62],
  ['Tue', 0],
  ['Wed', 88],
  ['Thu', 45],
  ['Fri', 100],
  ['Sat', 30],
  ['Sun', 0],
] as const

function LongContent() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 24 }, (_, i) => (
        <p key={i} className="text-body-sm text-text-secondary">
          Paragraph {i + 1} — the body scrolls on its own inside the drawer
          while the header and footer stay pinned; the page behind keeps its
          scroll position untouched.
        </p>
      ))}
    </div>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [clientName, setClientName] = useState('Léa Moreau')
  const [tab, setTab] = useState('overview')

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Drawer — an edge-anchored immersive panel on the frozen Modal
          foundation: a secondary workspace that slides in from one side, holds
          real content (forms, settings, inspectors, navigation) and hands the
          screen back where you left it. Focus trap, restore focus, scroll lock,
          Escape, overlay and ARIA are all inherited from Modal — never
          reimplemented.
        </p>

        {/* Sides. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sides</Head>
          <div className="flex flex-wrap gap-4">
            {sides.map((side) => (
              <Drawer
                key={side}
                side={side}
                title={`From the ${side}`}
                description="Same frozen pane, repositioned — nothing else changes."
                trigger={<Button variant="secondary">{side}</Button>}
                data-testid={`${side}-drawer`}
                footer={
                  <div className="flex justify-end gap-3">
                    <Drawer.Close asChild>
                      <Button variant="secondary">Close</Button>
                    </Drawer.Close>
                  </div>
                }
              >
                <p className="text-body-sm text-text-secondary">
                  Content area for the {side} drawer.
                </p>
              </Drawer>
            ))}
          </div>
        </section>

        {/* Sizes. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Sizes (right side)</Head>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size) => (
              <Drawer
                key={size}
                size={size}
                title={`Size ${size}`}
                trigger={<Button variant="secondary">{size}</Button>}
                data-testid={`${size}-drawer`}
              >
                <p className="text-body-sm text-text-secondary">
                  The {size} width step of the shared scale.
                </p>
              </Drawer>
            ))}
          </div>
        </section>

        {/* Workspaces. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Workspaces</Head>
          <div className="flex flex-wrap gap-4">
            <Drawer
              title="Client settings"
              description="Everything about this client, without leaving the page."
              icon={<Icon icon={Settings} className="text-text-tertiary" />}
              trigger={<Button variant="secondary">Settings panel</Button>}
              data-testid="settings-drawer"
              footer={
                <div className="flex justify-end gap-3">
                  <Drawer.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Button data-testid="settings-save">Save changes</Button>
                  </Drawer.Close>
                </div>
              }
            >
              <div className="flex flex-col gap-5">
                <Input
                  label="Client name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  data-testid="settings-name"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="lea@example.com"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm text-text">
                    Weekly check-in reminders
                  </span>
                  <Switch
                    defaultChecked
                    aria-label="Weekly check-in reminders"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm text-text">
                    Share progress photos with coach
                  </span>
                  <Switch aria-label="Share progress photos" />
                </div>
              </div>
            </Drawer>

            <Drawer
              side="left"
              size="sm"
              title="Navigation"
              trigger={<Button variant="secondary">Navigation panel</Button>}
              data-testid="nav-drawer"
            >
              <nav className="flex flex-col gap-1">
                {[
                  'Dashboard',
                  'Clients',
                  'Programs',
                  'Library',
                  'Billing',
                  'Settings',
                ].map((item) => (
                  <a
                    key={item}
                    href={`/dev/drawer#${item.toLowerCase()}`}
                    className="rounded-sm px-3 py-2.5 text-body-sm text-text hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </Drawer>

            <Drawer
              size="sm"
              title="Session inspector"
              description="Upper body — week 3, day 2."
              icon={
                <Icon icon={SlidersHorizontal} className="text-text-tertiary" />
              }
              trigger={<Button variant="secondary">Inspector panel</Button>}
              data-testid="inspector-drawer"
            >
              <dl className="flex flex-col gap-3 text-body-sm">
                {[
                  ['Exercises', '6'],
                  ['Estimated duration', '52 min'],
                  ['Volume', '14 320 kg'],
                  ['Intensity anchor', 'RPE 8'],
                  ['Last completed', '2 days ago'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-text-tertiary">{k}</dt>
                    <dd className="font-medium text-text">{v}</dd>
                  </div>
                ))}
              </dl>
            </Drawer>

            <Drawer
              title="Delete this program?"
              description="A destructive workflow can live in a drawer when it needs review before the decision."
              icon={<Icon icon={Trash2} className="text-error" />}
              trigger={
                <Button variant="secondary">Destructive workflow</Button>
              }
              data-testid="destructive-drawer"
              footer={
                <div className="flex justify-end gap-3">
                  <Drawer.Close asChild>
                    <Button variant="secondary">Keep program</Button>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Button variant="destructive">Delete program</Button>
                  </Drawer.Close>
                </div>
              }
            >
              <p className="text-body-sm text-text-secondary">
                Review what gets removed before confirming: 12 sessions, 4
                progression rules and 3 client assignments.
              </p>
            </Drawer>
          </div>
        </section>

        {/* States & structure. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>States & structure</Head>
          <div className="flex flex-wrap gap-4">
            <Drawer
              title="Long content"
              description="Sticky header, scrolling body, sticky footer."
              trigger={<Button variant="secondary">Long content</Button>}
              data-testid="long-drawer"
              footer={
                <div className="flex justify-end">
                  <Drawer.Close asChild>
                    <Button variant="secondary">Done</Button>
                  </Drawer.Close>
                </div>
              }
            >
              <LongContent />
            </Drawer>

            <Drawer
              title="Loading"
              description="The body shows the frozen Spinner while content loads."
              loading
              trigger={<Button variant="secondary">Loading</Button>}
              data-testid="loading-drawer"
            />

            <Drawer
              title="Disabled"
              disabled
              trigger={<Button variant="secondary">Disabled</Button>}
              data-testid="disabled-drawer"
            >
              <p>Never opens.</p>
            </Drawer>

            <Drawer
              title="Stay open"
              description="closeOnOverlay={false} — only Escape or the close button dismiss."
              closeOnOverlay={false}
              trigger={<Button variant="secondary">No overlay close</Button>}
              data-testid="no-overlay-drawer"
            >
              <p className="text-body-sm text-text-secondary">
                Clicking the scrim does nothing here.
              </p>
            </Drawer>

            <Drawer
              side="bottom"
              size="full"
              title="Full screen"
              description="size=full turns any side into a full-screen surface."
              trigger={<Button variant="secondary">Full screen</Button>}
              data-testid="fullscreen-drawer"
            >
              <p className="text-body-sm text-text-secondary">
                An entire editing surface, still one frozen pane.
              </p>
            </Drawer>

            <Drawer
              title="Nested drawers"
              description="A drawer can open another — Escape closes the top one only."
              trigger={<Button variant="secondary">Nested</Button>}
              data-testid="outer-drawer"
            >
              <div className="flex flex-col gap-4">
                <p className="text-body-sm text-text-secondary">
                  Open a second drawer from inside this one.
                </p>
                <Drawer
                  side="left"
                  size="sm"
                  title="Inner drawer"
                  trigger={
                    <Button variant="secondary" data-testid="open-inner">
                      Open inner drawer
                    </Button>
                  }
                  data-testid="inner-drawer"
                >
                  <p className="text-body-sm text-text-secondary">
                    The inner drawer stacks above; Escape closes it first.
                  </p>
                </Drawer>
              </div>
            </Drawer>
          </div>
        </section>

        {/* Reference cases — content KINDS a drawer hosts. Tabs, accordion,
            data table and timeline do not exist yet as DISCIPLINE
            components, so these compose frozen primitives + semantic
            token-styled HTML; they upgrade transparently when those
            components are built. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Reference cases</Head>
          <div className="flex flex-wrap gap-4">
            <Drawer
              size="lg"
              title="Session table"
              description="A data table inside a drawer."
              trigger={<Button variant="secondary">Data table</Button>}
              data-testid="table-drawer"
            >
              <table className="w-full text-body-sm">
                <thead>
                  <tr className="border-b border-border text-left text-caption text-text-tertiary">
                    <th className="py-2 font-medium">Exercise</th>
                    <th className="py-2 font-medium">Sets</th>
                    <th className="py-2 font-medium">Intensity</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(([name, sets, rpe, status]) => (
                    <tr key={name} className="border-b border-border">
                      <td className="py-2.5 text-text">{name}</td>
                      <td className="py-2.5 text-text-secondary">{sets}</td>
                      <td className="py-2.5 text-text-secondary">{rpe}</td>
                      <td className="py-2.5">
                        <Badge
                          variant={status === 'Done' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Drawer>

            <Drawer
              title="Client activity"
              description="A timeline inside a drawer."
              trigger={<Button variant="secondary">Timeline</Button>}
              data-testid="timeline-drawer"
            >
              <ol className="flex flex-col">
                {timelineEvents.map(([when, what], i) => (
                  <li key={when} className="relative flex gap-4 pb-6">
                    {i < timelineEvents.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[5px] top-4 h-full w-px bg-border"
                      />
                    )}
                    <span
                      aria-hidden
                      className="mt-1.5 h-[11px] w-[11px] shrink-0 rounded-pill border border-border bg-accent-subtle"
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-caption text-text-tertiary">
                        {when}
                      </span>
                      <span className="text-body-sm text-text">{what}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </Drawer>

            <Drawer
              title="Program notes"
              description="Rendered markdown-style prose inside a drawer."
              trigger={<Button variant="secondary">Markdown</Button>}
              data-testid="markdown-drawer"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-h5 font-semibold text-text">
                  Week 3 — intent
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Volume peaks this week. Keep every top set at{' '}
                  <Code>RPE 8</Code> and stop two reps short of failure on
                  back-offs.
                </p>
                <ul className="list-disc pl-5 text-body-sm text-text-secondary">
                  <li>Rest 2–3 min between compound sets.</li>
                  <li>Log bar speed notes on the last set.</li>
                  <li>Deload follows next week — do not add weight.</li>
                </ul>
                <Separator />
                <blockquote className="border-l-2 border-border pl-4 text-body-sm italic text-text-tertiary">
                  “The best program is the one executed as written.”
                </blockquote>
              </div>
            </Drawer>

            <Drawer
              title="Weekly volume"
              description="A simple graph inside a drawer — bars are data, drawn with tokens."
              trigger={<Button variant="secondary">Graph</Button>}
              data-testid="graph-drawer"
            >
              <div
                className="flex h-40 items-end gap-3"
                role="img"
                aria-label="Weekly training volume by day"
              >
                {weeklyVolume.map(([day, pct]) => (
                  <div
                    key={day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-32 w-full items-end">
                      <div
                        className="w-full rounded-sm bg-[color-mix(in_srgb,var(--ds-color-accent)_55%,transparent)]"
                        style={{ height: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                    <span className="text-caption text-text-tertiary">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </Drawer>

            <Drawer
              size="lg"
              title="Client profile"
              description="Sections switched with the frozen SegmentedControl (DISCIPLINE has no Tabs component yet)."
              trigger={<Button variant="secondary">Tabs</Button>}
              data-testid="tabs-drawer"
            >
              <div className="flex flex-col gap-5">
                <SegmentedControl value={tab} onValueChange={setTab} size="sm">
                  <SegmentedControl.Item value="overview">
                    Overview
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="history">
                    History
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="notes">
                    Notes
                  </SegmentedControl.Item>
                </SegmentedControl>
                {tab === 'overview' && (
                  <p className="text-body-sm text-text-secondary">
                    34 sessions completed this block · adherence 92% · next
                    check-in Friday.
                  </p>
                )}
                {tab === 'history' && (
                  <p className="text-body-sm text-text-secondary">
                    Previous blocks: Strength (12 wk), Base (8 wk), Intro (4
                    wk).
                  </p>
                )}
                {tab === 'notes' && (
                  <p className="text-body-sm text-text-secondary">
                    Prefers morning sessions. Left shoulder needs longer
                    warm-ups.
                  </p>
                )}
              </div>
            </Drawer>

            <Drawer
              title="Frequently asked"
              description="Native disclosure styled with tokens (DISCIPLINE has no Accordion component yet)."
              trigger={<Button variant="secondary">Accordion</Button>}
              data-testid="accordion-drawer"
            >
              <div className="flex flex-col">
                {[
                  [
                    'Can I swap an exercise?',
                    'Yes — tap the exercise and pick an approved alternative.',
                  ],
                  [
                    'What if I miss a session?',
                    'It rolls to the next free day; the week never silently shrinks.',
                  ],
                  [
                    'How is RPE tracked?',
                    'You log it on the last set; the coach sees the weekly trend.',
                  ],
                ].map(([q, a]) => (
                  <details
                    key={q}
                    className="group border-b border-border py-3"
                  >
                    <summary className="cursor-pointer list-none text-body-sm font-medium text-text">
                      {q}
                    </summary>
                    <p className="pt-2 text-body-sm text-text-secondary">{a}</p>
                  </details>
                ))}
              </div>
            </Drawer>

            <Drawer
              title="Upload check-in photos"
              description="The frozen FileInput inside a drawer."
              trigger={<Button variant="secondary">Upload</Button>}
              data-testid="upload-drawer"
              footer={
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Progress value={64} aria-label="Upload progress" />
                  </div>
                  <Drawer.Close asChild>
                    <Button variant="secondary">Done</Button>
                  </Drawer.Close>
                </div>
              }
            >
              <FileInput
                label="Progress photos"
                helperText="JPG or PNG, up to 10 MB each."
                accept="image/*"
                multiple
              />
            </Drawer>

            <Drawer
              title="Fix these fields"
              description="Validation errors surfaced with the frozen Input error language."
              trigger={<Button variant="secondary">Validation errors</Button>}
              data-testid="validation-drawer"
              footer={
                <div className="flex justify-end gap-3">
                  <Drawer.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </Drawer.Close>
                  <Button disabled>Save (2 errors)</Button>
                </div>
              }
            >
              <div className="flex flex-col gap-5">
                <p className="rounded-sm border border-border px-4 py-3 text-body-sm text-error">
                  2 fields need attention before saving.
                </p>
                <Input
                  label="Session name"
                  defaultValue=""
                  error="A session name is required."
                />
                <Input
                  label="Duration (min)"
                  defaultValue="240"
                  error="Sessions longer than 180 minutes are not allowed."
                />
                <Input label="Coach note" defaultValue="Solid week." />
              </div>
            </Drawer>

            <Drawer
              size="lg"
              title="New training program"
              description="A very long form — the body scrolls, actions stay pinned."
              trigger={<Button variant="secondary">Very long form</Button>}
              data-testid="longform-drawer"
              footer={
                <div className="flex justify-end gap-3">
                  <Drawer.Close asChild>
                    <Button variant="secondary">Discard</Button>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Button>Create program</Button>
                  </Drawer.Close>
                </div>
              }
            >
              <div className="flex flex-col gap-5">
                <Input label="Program name" placeholder="Hypertrophy block" />
                <Textarea
                  label="Description"
                  placeholder="What this program is for…"
                />
                <Select
                  label="Goal"
                  placeholder="Pick a goal"
                  options={[
                    { value: 'hypertrophy', label: 'Hypertrophy' },
                    { value: 'strength', label: 'Strength' },
                    { value: 'endurance', label: 'Endurance' },
                  ]}
                />
                {Array.from({ length: 4 }, (_, w) => (
                  <div key={w} className="flex flex-col gap-5">
                    <Separator />
                    <h3 className="text-body font-medium text-text">
                      Week {w + 1}
                    </h3>
                    <Input
                      label={`Sessions in week ${w + 1}`}
                      placeholder="4"
                    />
                    <Input label={`Volume target (sets)`} placeholder="80" />
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-body-sm text-text">
                        Deload week
                      </span>
                      <Switch aria-label={`Week ${w + 1} deload`} />
                    </div>
                  </div>
                ))}
              </div>
            </Drawer>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function DrawerScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Drawer (Immersive)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
