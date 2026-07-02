'use client'

import {
  Bell,
  Copy,
  CreditCard,
  Download,
  LogOut,
  Pencil,
  Settings,
  Share2,
  Trash2,
  User,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import {
  FloatingSurface,
  floatingContentClass,
  floatingHostClass,
} from '@/components/ui/floating-surface'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Icon } from '@/components/ui/icon'
import { Popover } from '@/components/ui/popover'

import { ModalReference } from '../modal/modal-reference'

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

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'
  const cap = dark
    ? 'text-caption text-white/60'
    : 'text-caption text-text-tertiary'
  const [showGrid, setShowGrid] = useState(true)
  const [showRuler, setShowRuler] = useState(false)
  const [sort, setSort] = useState('date')

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-16">
        <p className={body}>
          DropdownMenu — a structured list of actions opened from a button. It
          derives from the frozen Popover (same pane, same lift, same entrance,
          same size scale) and adds only the menu language. Popover holds free
          content · DropdownMenu holds actions.
        </p>

        {/* A — One material, three behaviors. */}
        <section className="flex flex-col gap-6 pb-72">
          <Head dark={dark}>
            FloatingSurface (material) · Popover (free content) · DropdownMenu
            (actions)
          </Head>
          <div className="flex flex-wrap items-start gap-16">
            <div
              className={`${floatingHostClass} rounded-md p-4 ${dark ? 'text-white/95' : 'text-text'}`}
            >
              <FloatingSurface />
              <p className={`${floatingContentClass} w-48 text-body-sm`}>
                The raw Floating pane.
              </p>
            </div>
            <Popover defaultOpen>
              <Popover.Trigger asChild>
                <Button variant="secondary">Popover</Button>
              </Popover.Trigger>
              <Popover.Content
                {...stay}
                size="xs"
                avoidCollisions={false}
                className={dark ? 'text-white/95' : 'text-text'}
              >
                <p className="text-body-sm">Free contextual content.</p>
              </Popover.Content>
            </Popover>
            <DropdownMenu defaultOpen modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary">DropdownMenu</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                {...stay}
                avoidCollisions={false}
                className={dark ? 'text-white/95' : ''}
              >
                <DropdownMenu.Item icon={<Icon icon={Pencil} size="sm" />}>
                  Rename
                </DropdownMenu.Item>
                <DropdownMenu.Item icon={<Icon icon={Copy} size="sm" />}>
                  Duplicate
                </DropdownMenu.Item>
                <DropdownMenu.Item icon={<Icon icon={Share2} size="sm" />}>
                  Share
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* B — The full menu language. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Sections · labels · icons · shortcuts · destructive · disabled ·
            loading
          </Head>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary">Account</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                size="sm"
                className={dark ? 'text-white/95' : ''}
              >
                <DropdownMenu.Label>Signed in as Hugo</DropdownMenu.Label>
                <DropdownMenu.Group>
                  <DropdownMenu.Item
                    icon={<Icon icon={User} size="sm" />}
                    shortcut="⇧⌘P"
                  >
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    icon={<Icon icon={CreditCard} size="sm" />}
                    shortcut="⌘B"
                  >
                    Billing
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    icon={<Icon icon={Settings} size="sm" />}
                    shortcut="⌘,"
                  >
                    Settings
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Label>Workspace</DropdownMenu.Label>
                <DropdownMenu.Item
                  icon={<Icon icon={Download} size="sm" />}
                  loading
                >
                  Exporting data…
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  icon={<Icon icon={Bell} size="sm" />}
                  disabled
                >
                  Notifications (soon)
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  icon={<Icon icon={Trash2} size="sm" />}
                  shortcut="⌘⌫"
                  destructive
                >
                  Delete workspace
                </DropdownMenu.Item>
                <DropdownMenu.Item icon={<Icon icon={LogOut} size="sm" />}>
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* C — Checkbox + radio items. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>Checkbox items · radio items</Head>
          <div className="flex flex-wrap gap-48">
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary">View</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={dark ? 'text-white/95' : ''}>
                <DropdownMenu.Label>Appearance</DropdownMenu.Label>
                <DropdownMenu.CheckboxItem
                  checked={showGrid}
                  onCheckedChange={setShowGrid}
                  shortcut="⌘G"
                >
                  Show grid
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem
                  checked={showRuler}
                  onCheckedChange={setShowRuler}
                  shortcut="⌘R"
                >
                  Show ruler
                </DropdownMenu.CheckboxItem>
              </DropdownMenu.Content>
            </DropdownMenu>
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary">Sort by</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={dark ? 'text-white/95' : ''}>
                <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenu.RadioItem value="date">
                    Date added
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="name">
                    Name
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="size">
                    Size
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* D — Nested submenu (interactive; the proof script opens it). */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Nested submenu (click, then hover “Export as”)
          </Head>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary" size="sm">
                  File actions
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={dark ? 'text-white/95' : ''}>
                <DropdownMenu.Item icon={<Icon icon={Copy} size="sm" />}>
                  Duplicate
                </DropdownMenu.Item>
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger
                    icon={<Icon icon={Download} size="sm" />}
                  >
                    Export as
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    className={dark ? 'text-white/95' : ''}
                  >
                    <DropdownMenu.Item shortcut="⌘E">PDF</DropdownMenu.Item>
                    <DropdownMenu.Item>CSV</DropdownMenu.Item>
                    <DropdownMenu.Item>PNG (2×)</DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator />
                <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* E — Long, scrollable menu. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>Long menu — capped and scrollable</Head>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Move to project…
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={cn2(dark)}>
                {Array.from({ length: 24 }, (_, i) => (
                  <DropdownMenu.Item key={i}>
                    Project {String(i + 1).padStart(2, '0')}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* F — Collision at the panel edge. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Collision — asked for “right”, flips into view
          </Head>
          <div className="flex justify-end">
            <DropdownMenu modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Prefers right
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                side="right"
                className={dark ? 'text-white/95' : ''}
              >
                <DropdownMenu.Item>Flipped left</DropdownMenu.Item>
                <DropdownMenu.Item>Shifted into view</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </section>

        {/* G — Hierarchy: free content → actions → contextual → takeover. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Popover (free content) · DropdownMenu (actions) · ContextMenu
            (planned) · Modal (takes over)
          </Head>
          <p className={cap}>
            Popover and DropdownMenu are live above; ContextMenu will derive
            from the same frozen pair (FloatingSurface → Popover) with
            right-click semantics. Below, the Immersive reference for contrast:
          </p>
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

/** Tiny helper — dark text override for portaled menu content. */
function cn2(dark: boolean) {
  return dark ? 'text-white/95' : ''
}

export function DropdownMenuScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — DropdownMenu (Floating ←
        Popover)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
