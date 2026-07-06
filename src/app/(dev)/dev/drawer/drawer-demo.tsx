'use client'

import { Settings, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
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

const sides = ['left', 'right', 'top', 'bottom'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

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
