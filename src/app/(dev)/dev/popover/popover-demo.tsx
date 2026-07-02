'use client'

import { Button } from '@/components/ui/button'
import {
  FloatingSurface,
  floatingContentClass,
  floatingHostClass,
} from '@/components/ui/floating-surface'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { ModalReference } from '../modal/modal-reference'

/** Static demo popovers open on mount; keep focus (and scroll) where it is. */
const stay = { onOpenAutoFocus: (e: Event) => e.preventDefault() }

function DemoPop({
  dark,
  children,
  label,
  ...content
}: {
  dark: boolean
  children: React.ReactNode
  label: string
} & React.ComponentProps<typeof Popover.Content>) {
  return (
    <Popover defaultOpen>
      <Popover.Trigger asChild>
        <Button variant="secondary">{label}</Button>
      </Popover.Trigger>
      <Popover.Content
        {...stay}
        {...content}
        className={`${dark ? 'text-white/95' : 'text-text'} ${content.className ?? ''}`}
      >
        {children}
      </Popover.Content>
    </Popover>
  )
}

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'
  const cap = dark
    ? 'text-caption text-white/60'
    : 'text-caption text-text-tertiary'
  const head = dark
    ? 'text-body font-medium text-white/95'
    : 'text-body font-medium text-text'

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-16">
        <p className={body}>
          Popover — the first generalized Floating Surface. Same glass as the
          FloatingSurface base (and the DatePicker calendar); Popover adds only
          behavior: anchor, collision, dismiss, focus. Tooltip reads · Popover
          converses · Modal takes over.
        </p>

        {/* A — Floating base vs Popover: only the behavior changes. */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>
            FloatingSurface (static) vs Popover (behavior)
          </h2>
          <div className="flex flex-wrap items-start gap-24">
            <div
              className={`${floatingHostClass} rounded-md p-4 ${dark ? 'text-white/95' : 'text-text'}`}
            >
              <FloatingSurface />
              <p className={`${floatingContentClass} w-56 text-body-sm`}>
                The raw Floating pane — material only, no behavior.
              </p>
            </div>
            <DemoPop dark={dark} label="Open popover" side="bottom" arrow>
              <p className="text-body-sm">
                The same pane, now anchored, dismissable and collision-aware.
              </p>
            </DemoPop>
          </div>
        </section>

        {/* B — Placements (interactive). */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>Placements — side × align (click each)</h2>
          <div className="flex flex-wrap gap-3">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Popover key={side}>
                <Popover.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    {side}
                  </Button>
                </Popover.Trigger>
                <Popover.Content side={side} arrow size="xs">
                  <p className="text-body-sm">side=&quot;{side}&quot;</p>
                </Popover.Content>
              </Popover>
            ))}
            {(['start', 'center', 'end'] as const).map((align) => (
              <Popover key={align}>
                <Popover.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    align {align}
                  </Button>
                </Popover.Trigger>
                <Popover.Content align={align} size="xs">
                  <p className="text-body-sm">align=&quot;{align}&quot;</p>
                </Popover.Content>
              </Popover>
            ))}
          </div>
        </section>

        {/* C — Arrow vs no arrow (both open). */}
        <section className="flex flex-col gap-6 pb-28">
          <h2 className={head}>With arrow / without arrow</h2>
          <div className="flex flex-wrap gap-24">
            <DemoPop dark={dark} label="With arrow" side="bottom" arrow>
              <p className="text-body-sm">The shared Floating tail.</p>
            </DemoPop>
            <DemoPop dark={dark} label="Without arrow" side="bottom">
              <p className="text-body-sm">Detached, plain pane.</p>
            </DemoPop>
          </div>
        </section>

        {/* D — Collision: asked for `right`, flips inside the viewport. */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>
            Collision — side=&quot;right&quot; near the edge auto-flips
          </h2>
          <div className="flex justify-end">
            <DemoPop dark={dark} label="Prefers right" side="right" arrow>
              <p className="text-body-sm">
                No room on the right — flipped and shifted into view.
              </p>
            </DemoPop>
          </div>
        </section>

        {/* E — Scrollable container (interactive). */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>Inside a scrollable container</h2>
          <div
            className={`h-36 overflow-y-auto rounded-md border p-4 ${dark ? 'border-white/20' : 'border-border'}`}
          >
            <div className="flex h-72 flex-col items-start pt-2">
              <Popover>
                <Popover.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    Open, then scroll
                  </Button>
                </Popover.Trigger>
                <Popover.Content arrow size="xs">
                  <p className="text-body-sm">
                    Tracks the anchor while scrolling.
                  </p>
                </Popover.Content>
              </Popover>
            </div>
          </div>
        </section>

        {/* F — Modal vs non-modal + nested + disabled (interactive). */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>
            Modal · non-modal · nested · disabled trigger
          </h2>
          <div className="flex flex-wrap gap-3">
            <Popover modal>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  modal=true
                </Button>
              </Popover.Trigger>
              <Popover.Content size="xs">
                <p className="text-body-sm">
                  Focus is trapped; the page behind is scroll-locked.
                </p>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  non-modal
                </Button>
              </Popover.Trigger>
              <Popover.Content size="xs">
                <p className="text-body-sm">Light: the page stays live.</p>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  nested
                </Button>
              </Popover.Trigger>
              <Popover.Content size="xs" data-testid="nested-outer">
                <div className="flex flex-col gap-3">
                  <p className="text-body-sm">A popover…</p>
                  <Popover>
                    <Popover.Trigger asChild>
                      <Button variant="secondary" size="sm">
                        …opens another
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content side="right" arrow size="xs">
                      <p className="text-body-sm">Nested pane.</p>
                    </Popover.Content>
                  </Popover>
                </div>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm" disabled>
                  disabled
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <p className="text-body-sm">Never opens.</p>
              </Popover.Content>
            </Popover>
          </div>
        </section>

        {/* G — Long + interactive content (both open). */}
        <section className="flex flex-col gap-6 pb-64">
          <h2 className={head}>Long content · interactive content</h2>
          <div className="flex flex-wrap gap-24">
            <DemoPop
              dark={dark}
              label="Long content"
              side="bottom"
              avoidCollisions={false}
              className="max-h-44 w-72 overflow-y-auto"
            >
              <div className="flex flex-col gap-2 text-body-sm">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i}>
                    Paragraph {i + 1} — the pane caps its height and scrolls.
                  </p>
                ))}
              </div>
            </DemoPop>
            <DemoPop
              dark={dark}
              label="Edit goal"
              side="bottom"
              arrow
              avoidCollisions={false}
              size="md"
            >
              <form className="flex flex-col gap-3">
                <p className="text-body-sm font-medium">Weekly goal</p>
                <Input aria-label="Weekly sessions" placeholder="4 sessions" />
                <a
                  href="#top"
                  className={
                    dark
                      ? 'text-body-sm text-white/80 underline'
                      : 'text-body-sm text-accent-accessible underline'
                  }
                >
                  How goals work
                </a>
                <div className="flex justify-end gap-2">
                  <Popover.Close asChild>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </Popover.Close>
                  <Button variant="primary" size="sm">
                    Save
                  </Button>
                </div>
              </form>
            </DemoPop>
          </div>
        </section>

        {/* G2 — The shared Floating size scale (xs · sm · md · lg). */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>
            Size scale — xs · sm · md · lg (shared by every Floating member)
          </h2>
          <div className="flex flex-wrap justify-between pb-28">
            <DemoPop
              dark={dark}
              label="xs"
              side="bottom"
              align="start"
              avoidCollisions={false}
              size="xs"
            >
              <p className="text-body-sm">xs — 224px. Hints, small actions.</p>
            </DemoPop>
            <DemoPop
              dark={dark}
              label="sm"
              side="bottom"
              align="end"
              avoidCollisions={false}
              size="sm"
            >
              <p className="text-body-sm">
                sm — 288px (default). Standard contextual content.
              </p>
            </DemoPop>
          </div>
          <div className="flex flex-wrap justify-between pb-32">
            <DemoPop
              dark={dark}
              label="md"
              side="bottom"
              align="start"
              avoidCollisions={false}
              size="md"
            >
              <p className="text-body-sm">
                md — 320px. Forms, user menus, notifications.
              </p>
            </DemoPop>
            <DemoPop
              dark={dark}
              label="lg"
              side="bottom"
              align="end"
              avoidCollisions={false}
              size="lg"
            >
              <p className="text-body-sm">
                lg — 384px. Command palette, calendar, emoji picker.
              </p>
            </DemoPop>
          </div>
        </section>

        {/* H — Tooltip · Popover · Modal: read → converse → take over. */}
        <section className="flex flex-col gap-6">
          <h2 className={head}>
            Tooltip (reads) · Popover (converses) · Modal (takes over)
          </h2>
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div className="flex flex-col items-start gap-16 pt-2">
              <TooltipProvider>
                <Tooltip open>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>One line of reading.</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className={cap}>Tooltip — inverted chip, read-only.</p>
            </div>
            <div className="flex flex-col items-start gap-4 pb-28">
              <DemoPop
                dark={dark}
                label="Talk to me"
                side="bottom"
                arrow
                avoidCollisions={false}
              >
                <p className="text-body-sm">Light interaction, flow intact.</p>
              </DemoPop>
              <p className={cap}>Popover — Floating glass, interactive.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative mx-auto flex min-h-[280px] w-full max-w-md items-center overflow-hidden rounded-lg p-6">
              <ModalReference />
            </div>
            <p className={`${cap} text-center`}>
              Modal — Immersive glass + scrim (reference).
            </p>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function PopoverScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — Popover (Floating
        Surface)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
