'use client'

import { BookOpen, Calendar, Dumbbell, MapPin } from 'lucide-react'
import { forwardRef } from 'react'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FloatingSurface,
  floatingContentClass,
  floatingHostClass,
} from '@/components/ui/floating-surface'
import { GlassPanel } from '@/components/ui/glass-panel'
import { HoverCard } from '@/components/ui/hover-card'
import { Icon } from '@/components/ui/icon'
import { Popover } from '@/components/ui/popover'

/** Static demo overlays open on mount; keep focus (and scroll) where it is. */
const stay = { onOpenAutoFocus: (e: Event) => e.preventDefault() }

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

/** An underlined hover target — reads as "there is a preview here". Forwards
 * ref + props so it can be a Radix `asChild` trigger. */
const Target = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { dark: boolean }
>(function Target({ dark, children, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={`cursor-default underline decoration-dotted underline-offset-4 ${
        dark
          ? 'text-body-sm font-medium text-white/95 decoration-white/50'
          : 'text-body-sm font-medium text-text decoration-border-strong'
      }`}
      {...props}
    >
      {children}
    </span>
  )
})

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'
  const cap = dark
    ? 'text-caption text-white/60'
    : 'text-caption text-text-tertiary'
  const cardText = dark ? 'text-white/95' : 'text-text'
  const sub = dark
    ? 'text-caption text-white/60'
    : 'text-caption text-text-tertiary'

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-16">
        <p className={body}>
          HoverCard — a small contextual preview revealed by hover intent. It
          derives from the frozen Popover: same pane, same suspension, same
          entrance, same sizes, same arrow. Only HOW IT OPENS changes — never a
          menu.
        </p>

        {/* A — Same pane, different opening. */}
        <section className="flex flex-col gap-6 pb-56">
          <Head dark={dark}>
            FloatingSurface (material) · Popover (click) · HoverCard (hover)
          </Head>
          <div className="flex flex-wrap items-start gap-16">
            <div className={`${floatingHostClass} rounded-md p-4 ${cardText}`}>
              <FloatingSurface />
              <p className={`${floatingContentClass} w-44 text-body-sm`}>
                The raw Floating pane.
              </p>
            </div>
            <Popover defaultOpen>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Click me
                </Button>
              </Popover.Trigger>
              <Popover.Content
                {...stay}
                size="xs"
                arrow
                avoidCollisions={false}
                className={cardText}
              >
                <p className="text-body-sm">Opened by click.</p>
              </Popover.Content>
            </Popover>
            <HoverCard defaultOpen>
              <HoverCard.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Hover me
                </Button>
              </HoverCard.Trigger>
              <HoverCard.Content
                size="xs"
                arrow
                avoidCollisions={false}
                className={cardText}
              >
                <p className="text-body-sm">The same pane, opened by intent.</p>
              </HoverCard.Content>
            </HoverCard>
          </div>
        </section>

        {/* B — Previews: user · exercise · book · workout. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Previews — user · exercise (md) · book · workout (md)
          </Head>
          <p className={body}>
            Hover{' '}
            <HoverCard>
              <HoverCard.Trigger asChild>
                <Target dark={dark}>@hugo</Target>
              </HoverCard.Trigger>
              <HoverCard.Content
                arrow
                avoidCollisions={false}
                className={cardText}
                data-preview="user"
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <Avatar.Fallback>
                      {getInitials('Hugo Izquierdo')}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-body-sm font-medium">
                      Hugo Izquierdo
                    </span>
                    <span className={sub}>Head coach — Strength</span>
                    <span className={`${sub} inline-flex items-center gap-1`}>
                      <Icon icon={MapPin} size="sm" aria-hidden /> Madrid, ES
                    </span>
                    <span className={`${sub} inline-flex items-center gap-1`}>
                      <Icon icon={Calendar} size="sm" aria-hidden /> Joined
                      March 2024
                    </span>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard>{' '}
            for a user,{' '}
            <HoverCard>
              <HoverCard.Trigger asChild>
                <Target dark={dark}>Back squat</Target>
              </HoverCard.Trigger>
              <HoverCard.Content
                size="md"
                arrow
                avoidCollisions={false}
                className={cardText}
                data-preview="exercise"
              >
                <div className="flex flex-col gap-3">
                  <div
                    className="h-24 rounded-sm bg-cover bg-center"
                    style={{
                      backgroundImage: 'url(/backgrounds/capture-bg.jpg)',
                    }}
                    aria-hidden
                  />
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={Dumbbell}
                      size="sm"
                      className={dark ? 'text-white/60' : 'text-text-tertiary'}
                      aria-hidden
                    />
                    <span className="text-body-sm font-medium">Back squat</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>Quads</Badge>
                    <Badge>Glutes</Badge>
                    <Badge>Core</Badge>
                  </div>
                  <p className={sub}>
                    Difficulty: intermediate · Equipment: barbell + rack
                  </p>
                </div>
              </HoverCard.Content>
            </HoverCard>{' '}
            for an exercise,{' '}
            <HoverCard>
              <HoverCard.Trigger asChild>
                <Target dark={dark}>Starting Strength</Target>
              </HoverCard.Trigger>
              <HoverCard.Content
                avoidCollisions={false}
                className={cardText}
                data-preview="book"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-16 w-11 shrink-0 items-center justify-center rounded-sm border ${
                      dark ? 'border-white/25' : 'border-border-strong'
                    }`}
                  >
                    <Icon icon={BookOpen} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-body-sm font-medium">
                      Starting Strength
                    </span>
                    <span className={sub}>Mark Rippetoe</span>
                    <span className={sub}>~11h reading time</span>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard>{' '}
            for a book, or{' '}
            <HoverCard>
              <HoverCard.Trigger asChild>
                <Target dark={dark}>Hybrid 12-week</Target>
              </HoverCard.Trigger>
              <HoverCard.Content
                size="md"
                arrow
                avoidCollisions={false}
                className={cardText}
                data-preview="workout"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium">
                    Hybrid — 12-week block
                  </span>
                  <p className={sub}>Split: upper / lower / conditioning</p>
                  <p className={sub}>Duration: 60–75 min · 4×/week</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Avatar size="sm">
                      <Avatar.Fallback>
                        {getInitials('Hugo Izquierdo')}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className={sub}>Coached by Hugo</span>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard>{' '}
            for a workout.
          </p>
        </section>

        {/* C — Delays (interactive) + sides + no-arrow. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Open delays 0 · 200 · 500 ms — close delays 0 · 150 · 300 ms (hover
            each)
          </Head>
          <div className="flex flex-wrap gap-3">
            {(
              [
                [0, 0],
                [200, 150],
                [500, 300],
              ] as const
            ).map(([openDelay, closeDelay]) => (
              <HoverCard
                key={openDelay}
                openDelay={openDelay}
                closeDelay={closeDelay}
              >
                <HoverCard.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    {openDelay}/{closeDelay} ms
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Content size="xs" className={cardText}>
                  <p className="text-body-sm">
                    Opens after {openDelay} ms, closes after {closeDelay} ms.
                  </p>
                </HoverCard.Content>
              </HoverCard>
            ))}
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <HoverCard key={side}>
                <HoverCard.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    {side}
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Content
                  side={side}
                  arrow
                  size="xs"
                  className={cardText}
                >
                  <p className="text-body-sm">side=&quot;{side}&quot;</p>
                </HoverCard.Content>
              </HoverCard>
            ))}
            {(['start', 'center', 'end'] as const).map((align) => (
              <HoverCard key={align}>
                <HoverCard.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    align {align}
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Content align={align} size="xs" className={cardText}>
                  <p className="text-body-sm">align=&quot;{align}&quot;</p>
                </HoverCard.Content>
              </HoverCard>
            ))}
            <HoverCard>
              <HoverCard.Trigger asChild>
                <Button variant="secondary" size="sm">
                  no arrow
                </Button>
              </HoverCard.Trigger>
              <HoverCard.Content size="xs" className={cardText}>
                <p className="text-body-sm">Detached pane.</p>
              </HoverCard.Content>
            </HoverCard>
          </div>
          <p className={cap}>
            Moving the pointer from a trigger onto its card never closes it —
            Radix keeps a forgiving grace area; the card itself is
            hover-interactive. Animation respects prefers-reduced-motion (the
            shared ds-floating-enter). On touch, hover targets stay plain links.
          </p>
        </section>

        {/* D — Sizes (shared scale) + scrollable + collision. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Sizes — shared scale (hover) · scrollable container · edge collision
          </Head>
          <div className="flex flex-wrap items-start gap-3">
            {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
              <HoverCard key={size}>
                <HoverCard.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    {size}
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Content size={size} className={cardText}>
                  <p className="text-body-sm">
                    size=&quot;{size}&quot; — the same floatingSizeClass steps
                    as Popover.
                  </p>
                </HoverCard.Content>
              </HoverCard>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className={`h-32 overflow-y-auto rounded-md border p-4 ${
                dark ? 'border-white/20' : 'border-border'
              }`}
            >
              <div className="flex h-64 flex-col items-start pt-2">
                <HoverCard>
                  <HoverCard.Trigger asChild>
                    <Target dark={dark}>Hover, then scroll</Target>
                  </HoverCard.Trigger>
                  <HoverCard.Content size="xs" arrow className={cardText}>
                    <p className="text-body-sm">Tracks the anchor.</p>
                  </HoverCard.Content>
                </HoverCard>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <HoverCard>
                <HoverCard.Trigger asChild>
                  <Target dark={dark}>Edge target</Target>
                </HoverCard.Trigger>
                <HoverCard.Content
                  side="right"
                  arrow
                  size="xs"
                  className={cardText}
                >
                  <p className="text-body-sm">
                    Asked for right — flipped into view.
                  </p>
                </HoverCard.Content>
              </HoverCard>
            </div>
          </div>
        </section>
      </div>
    </GlassPanel>
  )
}

export function HoverCardScene({ bg }: { bg: 'proof-canvas' | 'proof-media' }) {
  const dark = bg === 'proof-media'
  return (
    <section
      className={`${bg} flex min-h-screen flex-col items-center justify-center gap-8 p-8 py-24`}
    >
      <p
        className={`${dark ? 'proof-cap-media' : 'proof-cap'} text-center text-caption uppercase tracking-widest`}
      >
        {dark ? 'Rich panel' : 'Capture background'} — HoverCard (Floating ←
        Popover)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
