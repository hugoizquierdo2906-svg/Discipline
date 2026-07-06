'use client'

import {
  Copy,
  Link2,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

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

const cities = [
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice',
  'Nantes',
  'Strasbourg',
  'Montpellier',
  'Bordeaux',
  'Lille',
  'Rennes',
  'Reims',
  'Le Havre',
  'Saint-Étienne',
  'Toulon',
  'Grenoble',
  'Dijon',
  'Angers',
  'Nîmes',
  'Villeurbanne',
]

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'

  const [state, setState] = useState('closed')
  const [detent, setDetent] = useState('—')
  const [playing, setPlaying] = useState(true)

  return (
    <GlassPanel className="w-full max-w-2xl px-8 py-10">
      <div
        className={`relative z-[3] flex flex-col gap-10 ${dark ? '[&_label]:text-white/95' : ''}`}
      >
        <p className={body}>
          Bottom Sheet — DISCIPLINE&apos;s touch-first immersive surface on the
          frozen Modal foundation. Drag the grab handle (or the header) to move
          it; release to snap to a detent; throw it down to dismiss. On a body
          list, the sheet only takes the drag once the list is scrolled to its
          top. State:{' '}
          <span data-testid="state" className="font-medium">
            {state}
          </span>{' '}
          · detent:{' '}
          <span data-testid="detent" className="font-medium">
            {detent}
          </span>
        </p>

        {/* Core. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Core</Head>
          <div className="flex flex-wrap gap-4">
            <BottomSheet
              title="Simple bottom sheet"
              description="One detent, drag handle, swipe down to dismiss."
              detents={['content']}
              trigger={<Button variant="secondary">Simple</Button>}
              data-testid="simple-sheet"
              onStateChange={setState}
              onSnapChange={(d) => setDetent(String(d))}
            >
              <p className="text-body-sm text-text-secondary">
                A minimal sheet sized to its content. Pull the handle down and
                let go to dismiss.
              </p>
            </BottomSheet>

            <BottomSheet
              title="Snap points"
              description="Three detents: small, medium, full. Drag between them."
              detents={['small', 'medium', 'full']}
              defaultDetent="small"
              trigger={<Button variant="secondary">Snap points</Button>}
              data-testid="snap-sheet"
              onStateChange={setState}
              onSnapChange={(d) => setDetent(String(d))}
            >
              <div className="flex flex-col gap-3">
                {Array.from({ length: 14 }, (_, i) => (
                  <p key={i} className="text-body-sm text-text-secondary">
                    Row {i + 1} — drag the handle up to expand through the
                    detents, down to collapse or dismiss.
                  </p>
                ))}
              </div>
            </BottomSheet>

            <BottomSheet
              title="Custom detents"
              description="A 40% and a 92% custom snap."
              detents={[0.4, 0.92]}
              trigger={<Button variant="secondary">Custom %</Button>}
              data-testid="custom-sheet"
              onSnapChange={(d) => setDetent(String(d))}
            >
              <p className="text-body-sm text-text-secondary">
                Detents can be arbitrary fractions of the viewport height.
              </p>
            </BottomSheet>

            <BottomSheet
              title="No handle"
              description="showHandle=false — the header is still a drag origin."
              detents={['content']}
              showHandle={false}
              trigger={<Button variant="secondary">No handle</Button>}
              data-testid="nohandle-sheet"
            >
              <p className="text-body-sm text-text-secondary">
                Drag from the title area instead of a grab bar.
              </p>
            </BottomSheet>
          </div>
        </section>

        {/* Patterns. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Patterns</Head>
          <div className="flex flex-wrap gap-4">
            {/* Action sheet. */}
            <BottomSheet
              title="Session actions"
              detents={['content']}
              trigger={<Button variant="secondary">Action sheet</Button>}
              data-testid="action-sheet"
            >
              <div className="flex flex-col gap-1">
                {[
                  ['Share session', Share2],
                  ['Duplicate', Copy],
                  ['Copy link', Link2],
                ].map(([label, ic]) => (
                  <BottomSheet.Close asChild key={label as string}>
                    <button className="flex items-center gap-3 rounded-sm px-3 py-3 text-left text-body-sm text-text hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]">
                      <Icon
                        icon={ic as typeof Share2}
                        className="text-text-tertiary"
                      />
                      {label as string}
                    </button>
                  </BottomSheet.Close>
                ))}
                <Separator className="my-1" />
                <BottomSheet.Close asChild>
                  <button className="flex items-center gap-3 rounded-sm px-3 py-3 text-left text-body-sm text-error hover:bg-[color-mix(in_srgb,var(--ds-color-error)_12%,transparent)]">
                    <Icon icon={Trash2} className="text-error" />
                    Delete session
                  </button>
                </BottomSheet.Close>
              </div>
            </BottomSheet>

            {/* Share sheet. */}
            <BottomSheet
              title="Share program"
              description="Send this program to a client or a colleague."
              detents={['content']}
              trigger={<Button variant="secondary">Share sheet</Button>}
              data-testid="share-sheet"
            >
              <div className="grid grid-cols-4 gap-4 py-2">
                {[
                  'Léa',
                  'Marc',
                  'Sofia',
                  'Noah',
                  'Emma',
                  'Hugo',
                  'Inès',
                  'Tom',
                ].map((name) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-pill border border-border bg-accent-subtle text-body-sm font-medium text-text">
                      {name[0]}
                    </span>
                    <span className="text-caption text-text-tertiary">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </BottomSheet>

            {/* Filters. */}
            <BottomSheet
              title="Filter exercises"
              detents={['medium', 'full']}
              trigger={<Button variant="secondary">Filters</Button>}
              data-testid="filters-sheet"
              footer={
                <div className="flex justify-between gap-3">
                  <BottomSheet.Close asChild>
                    <Button variant="secondary">Reset</Button>
                  </BottomSheet.Close>
                  <BottomSheet.Close asChild>
                    <Button>Show 42 results</Button>
                  </BottomSheet.Close>
                </div>
              }
            >
              <div className="flex flex-col gap-4">
                {[
                  'Compound',
                  'Isolation',
                  'Bodyweight',
                  'Machine',
                  'Cable',
                  'Free weight',
                ].map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-3 text-body-sm text-text"
                  >
                    <Checkbox /> {f}
                  </label>
                ))}
              </div>
            </BottomSheet>

            {/* Media player. */}
            <BottomSheet
              title="Now playing"
              detents={['small', 'large']}
              defaultDetent="small"
              trigger={<Button variant="secondary">Media player</Button>}
              data-testid="media-sheet"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="h-14 w-14 shrink-0 rounded-md border border-border bg-accent-subtle" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-body font-medium text-text">
                      Warm-up mobility flow
                    </span>
                    <span className="text-body-sm text-text-tertiary">
                      Coaching audio · 8:24
                    </span>
                  </div>
                </div>
                <Slider defaultValue={[35]} aria-label="Playback position" />
                <div className="flex items-center justify-center gap-6">
                  <IconButton
                    variant="ghost"
                    label="Previous"
                    icon={<Icon icon={SkipBack} />}
                  />
                  <IconButton
                    label={playing ? 'Pause' : 'Play'}
                    onClick={() => setPlaying((p) => !p)}
                    icon={<Icon icon={playing ? Pause : Play} />}
                  />
                  <IconButton
                    variant="ghost"
                    label="Next"
                    icon={<Icon icon={SkipForward} />}
                  />
                </div>
              </div>
            </BottomSheet>

            {/* Mobile settings. */}
            <BottomSheet
              title="Settings"
              detents={['medium', 'full']}
              trigger={<Button variant="secondary">Mobile settings</Button>}
              data-testid="settings-sheet"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm text-text">
                    Push notifications
                  </span>
                  <Switch defaultChecked aria-label="Push notifications" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm text-text">Sound effects</span>
                  <Switch aria-label="Sound effects" />
                </div>
                <Separator />
                <span className="text-caption text-text-tertiary">Units</span>
                <SegmentedControl defaultValue="kg">
                  <SegmentedControl.Item value="kg">
                    Kilograms
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="lb">
                    Pounds
                  </SegmentedControl.Item>
                </SegmentedControl>
              </div>
            </BottomSheet>
          </div>
        </section>

        {/* Content & scroll. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Content & scroll</Head>
          <div className="flex flex-wrap gap-4">
            {/* Long list — scroll coordination. */}
            <BottomSheet
              title="Pick a city"
              description="Scroll the list; drag the handle to resize or dismiss."
              detents={['medium', 'full']}
              trigger={<Button variant="secondary">Long list</Button>}
              data-testid="list-sheet"
            >
              <ul className="flex flex-col">
                {cities.concat(cities).map((c, i) => (
                  <li
                    key={`${c}-${i}`}
                    className="border-b border-border py-3 text-body-sm text-text"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </BottomSheet>

            {/* Long form + keyboard. */}
            <BottomSheet
              title="New session"
              description="Focus a field on mobile — the sheet lifts above the keyboard."
              detents={['large', 'full']}
              defaultDetent="large"
              trigger={
                <Button variant="secondary">Long form / keyboard</Button>
              }
              data-testid="form-sheet"
              footer={
                <div className="flex justify-end gap-3">
                  <BottomSheet.Close asChild>
                    <Button variant="secondary">Cancel</Button>
                  </BottomSheet.Close>
                  <BottomSheet.Close asChild>
                    <Button>Save session</Button>
                  </BottomSheet.Close>
                </div>
              }
            >
              <div className="flex flex-col gap-5">
                <Input label="Session name" placeholder="Upper body — week 3" />
                <Input label="Focus" placeholder="Chest & shoulders" />
                <Input label="Duration (min)" placeholder="52" />
                <Input label="Notes" placeholder="Keep RPE at 8." />
                <Input label="Location" placeholder="Studio A" />
                <Input label="Equipment" placeholder="Barbell, dumbbells" />
              </div>
            </BottomSheet>

            {/* Loading. */}
            <BottomSheet
              title="Loading"
              detents={['small']}
              loading
              trigger={<Button variant="secondary">Loading</Button>}
              data-testid="loading-sheet"
            />
          </div>
        </section>

        {/* Behavior. */}
        <section className="flex flex-col gap-5">
          <Head dark={dark}>Behavior</Head>
          <div className="flex flex-wrap gap-4">
            <BottomSheet
              title="Non-dismissible"
              description="dismissible=false — no overlay tap, no Escape, no swipe-away."
              detents={['content']}
              dismissible={false}
              trigger={<Button variant="secondary">Non-dismissible</Button>}
              data-testid="locked-sheet"
              footer={
                <div className="flex justify-end">
                  <BottomSheet.Close asChild>
                    <Button data-testid="locked-done">I understand</Button>
                  </BottomSheet.Close>
                </div>
              }
            >
              <p className="text-body-sm text-text-secondary">
                This sheet only closes through its own action button.
              </p>
            </BottomSheet>

            <BottomSheet
              title="No swipe-away"
              description="disableSwipeToDismiss — drag between detents, never off."
              detents={['small', 'large']}
              disableSwipeToDismiss
              trigger={<Button variant="secondary">No swipe-away</Button>}
              data-testid="noswipe-sheet"
            >
              <p className="text-body-sm text-text-secondary">
                Throwing it down snaps back to the lowest detent instead of
                dismissing.
              </p>
            </BottomSheet>

            <BottomSheet
              title="Disabled"
              detents={['content']}
              disabled
              trigger={<Button variant="secondary">Disabled</Button>}
              data-testid="disabled-sheet"
            >
              <p>Never opens.</p>
            </BottomSheet>

            {/* Nested. */}
            <BottomSheet
              title="Nested bottom sheets"
              detents={['medium']}
              trigger={<Button variant="secondary">Nested</Button>}
              data-testid="outer-sheet"
            >
              <div className="flex flex-col gap-4">
                <p className="text-body-sm text-text-secondary">
                  Open a second sheet from inside this one.
                </p>
                <BottomSheet
                  title="Inner sheet"
                  detents={['content']}
                  trigger={
                    <Button variant="secondary" data-testid="open-inner">
                      Open inner sheet
                    </Button>
                  }
                  data-testid="inner-sheet"
                >
                  <p className="text-body-sm text-text-secondary">
                    The inner sheet stacks above; Escape closes it first.
                  </p>
                </BottomSheet>
              </div>
            </BottomSheet>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function BottomSheetScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — Bottom Sheet (Immersive)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
