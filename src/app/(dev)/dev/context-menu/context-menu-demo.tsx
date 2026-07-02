'use client'

import {
  Copy,
  Crop,
  Download,
  FileText,
  FolderOpen,
  Link2,
  Pencil,
  RefreshCw,
  Scissors,
  Share2,
  Trash2,
  ZoomIn,
} from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ContextMenu } from '@/components/ui/context-menu'
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

/** A right-clickable OBJECT — dashed outline so the zone reads as a target.
 * Forwards ref + props so it can be a Radix `asChild` trigger. */
const Zone = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { dark: boolean; title: string }
>(function Zone({ dark, title, children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex min-h-28 flex-col items-center justify-center gap-1 rounded-md border border-dashed p-4 text-center ${
        dark ? 'border-white/30' : 'border-border-strong'
      } ${className ?? ''}`}
      {...props}
    >
      <span
        className={
          dark
            ? 'text-body-sm font-medium text-white/95'
            : 'text-body-sm font-medium text-text'
        }
      >
        {title}
      </span>
      <span
        className={
          dark
            ? 'text-caption text-white/60'
            : 'text-caption text-text-tertiary'
        }
      >
        Right-click (or long-press)
      </span>
      {children}
    </div>
  )
})

function Demo({ dark }: { dark: boolean }) {
  const body = dark
    ? 'text-body-sm text-white/70'
    : 'text-body-sm text-text-secondary'
  const cap = dark
    ? 'text-caption text-white/60'
    : 'text-caption text-text-tertiary'
  const menuText = dark ? 'text-white/95' : ''
  const [snap, setSnap] = useState(true)
  const [rulers, setRulers] = useState(false)
  const [zoom, setZoom] = useState('fit')

  return (
    <GlassPanel className="w-full max-w-3xl px-8 py-10">
      <div className="relative z-[3] flex flex-col gap-16">
        <p className={body}>
          ContextMenu — the DropdownMenu language opened from an OBJECT instead
          of a button: right-click, menu key / Shift+F10, or touch long-press,
          positioned at the cursor. Same frozen pane, same items — only the
          trigger changes.
        </p>

        {/* A — One material, four behaviors. */}
        <section className="flex flex-col gap-6 pb-64">
          <Head dark={dark}>
            FloatingSurface → Popover → DropdownMenu → ContextMenu
          </Head>
          <div className="flex flex-wrap items-start gap-12">
            <div
              className={`${floatingHostClass} rounded-md p-4 ${dark ? 'text-white/95' : 'text-text'}`}
            >
              <FloatingSurface />
              <p className={`${floatingContentClass} w-40 text-body-sm`}>
                The raw Floating pane.
              </p>
            </div>
            <Popover defaultOpen>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Popover
                </Button>
              </Popover.Trigger>
              <Popover.Content
                {...stay}
                size="xs"
                avoidCollisions={false}
                className={dark ? 'text-white/95' : 'text-text'}
              >
                <p className="text-body-sm">Free content.</p>
              </Popover.Content>
            </Popover>
            <DropdownMenu defaultOpen modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary" size="sm">
                  DropdownMenu
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                {...stay}
                avoidCollisions={false}
                className={menuText}
              >
                <DropdownMenu.Item icon={<Icon icon={Pencil} size="sm" />}>
                  Rename
                </DropdownMenu.Item>
                <DropdownMenu.Item icon={<Icon icon={Copy} size="sm" />}>
                  Duplicate
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <Zone dark={dark} title="ContextMenu" className="min-w-44" />
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText}>
                <ContextMenu.Item icon={<Icon icon={Pencil} size="sm" />}>
                  Rename
                </ContextMenu.Item>
                <ContextMenu.Item icon={<Icon icon={Copy} size="sm" />}>
                  Duplicate
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>
          </div>
        </section>

        {/* B — Objects: image · selected text · file · workspace. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Objects — image · selected text · file (nested) · workspace
            (checkbox/radio)
          </Head>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Image — actions + destructive. */}
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <div
                  data-zone="image"
                  className="flex min-h-36 flex-col items-center justify-end rounded-md bg-cover bg-center p-3"
                  style={{
                    backgroundImage: 'url(/backgrounds/capture-bg.jpg)',
                  }}
                >
                  <span className="rounded-sm bg-text/70 px-2 py-0.5 text-caption text-surface-raised">
                    progress-photo.jpg — right-click
                  </span>
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Content size="sm" className={menuText}>
                <ContextMenu.Label>Image</ContextMenu.Label>
                <ContextMenu.Item
                  icon={<Icon icon={ZoomIn} size="sm" />}
                  shortcut="Space"
                >
                  Preview
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<Icon icon={Crop} size="sm" />}
                  shortcut="⌘⇧C"
                >
                  Crop
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<Icon icon={RefreshCw} size="sm" />}
                  loading
                >
                  Regenerating…
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item
                  icon={<Icon icon={Trash2} size="sm" />}
                  shortcut="⌘⌫"
                  destructive
                >
                  Delete image
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>

            {/* Selected text — clipboard actions. */}
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <div
                  data-zone="text"
                  className={`flex min-h-36 items-center rounded-md border border-dashed p-4 text-left text-body-sm ${
                    dark
                      ? 'border-white/30 text-white/80'
                      : 'border-border-strong text-text-secondary'
                  }`}
                >
                  <p>
                    Your next session:{' '}
                    <mark className="rounded-sm bg-accent-subtle px-1 text-text">
                      5×5 back squat at RPE 8
                    </mark>{' '}
                    — right-click the selection.
                  </p>
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText}>
                <ContextMenu.Item
                  icon={<Icon icon={Scissors} size="sm" />}
                  shortcut="⌘X"
                >
                  Cut
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<Icon icon={Copy} size="sm" />}
                  shortcut="⌘C"
                >
                  Copy
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<Icon icon={Link2} size="sm" />}
                  disabled
                >
                  Copy link (soon)
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>

            {/* File — nested submenu. */}
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <Zone dark={dark} title="training-plan.pdf" data-zone="file">
                  <Icon
                    icon={FileText}
                    className={dark ? 'text-white/60' : 'text-text-tertiary'}
                    aria-hidden
                  />
                </Zone>
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText} data-zone-menu="file">
                <ContextMenu.Item
                  icon={<Icon icon={FolderOpen} size="sm" />}
                  shortcut="⌘O"
                >
                  Open
                </ContextMenu.Item>
                <ContextMenu.Sub>
                  <ContextMenu.SubTrigger
                    icon={<Icon icon={Download} size="sm" />}
                  >
                    Export as
                  </ContextMenu.SubTrigger>
                  <ContextMenu.SubContent className={menuText}>
                    <ContextMenu.Item shortcut="⌘E">PDF</ContextMenu.Item>
                    <ContextMenu.Item>CSV</ContextMenu.Item>
                    <ContextMenu.Item>PNG (2×)</ContextMenu.Item>
                  </ContextMenu.SubContent>
                </ContextMenu.Sub>
                <ContextMenu.Item icon={<Icon icon={Share2} size="sm" />}>
                  Share
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item
                  icon={<Icon icon={Trash2} size="sm" />}
                  destructive
                >
                  Move to trash
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>

            {/* Workspace — checkbox + radio + group labels. */}
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <Zone
                  dark={dark}
                  title="Workspace canvas"
                  data-zone="workspace"
                />
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText}>
                <ContextMenu.Label>View</ContextMenu.Label>
                <ContextMenu.CheckboxItem
                  checked={snap}
                  onCheckedChange={setSnap}
                  shortcut="⌘;"
                >
                  Snap to grid
                </ContextMenu.CheckboxItem>
                <ContextMenu.CheckboxItem
                  checked={rulers}
                  onCheckedChange={setRulers}
                  shortcut="⌘R"
                >
                  Show rulers
                </ContextMenu.CheckboxItem>
                <ContextMenu.Separator />
                <ContextMenu.Label>Zoom</ContextMenu.Label>
                <ContextMenu.RadioGroup value={zoom} onValueChange={setZoom}>
                  <ContextMenu.RadioItem value="fit">
                    Fit to screen
                  </ContextMenu.RadioItem>
                  <ContextMenu.RadioItem value="100">
                    100%
                  </ContextMenu.RadioItem>
                  <ContextMenu.RadioItem value="200">
                    200%
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.Content>
            </ContextMenu>
          </div>
        </section>

        {/* C — Long list + collision at the panel edge. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            Long menu (list) · collision at the right edge
          </Head>
          <div className="grid gap-4 md:grid-cols-2">
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <Zone dark={dark} title="Session list" data-zone="list" />
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText}>
                <ContextMenu.Label>Move to week…</ContextMenu.Label>
                {Array.from({ length: 24 }, (_, i) => (
                  <ContextMenu.Item key={i}>
                    Week {String(i + 1).padStart(2, '0')}
                  </ContextMenu.Item>
                ))}
              </ContextMenu.Content>
            </ContextMenu>
            <ContextMenu modal={false}>
              <ContextMenu.Trigger asChild>
                <Zone dark={dark} title="Edge object" data-zone="edge" />
              </ContextMenu.Trigger>
              <ContextMenu.Content className={menuText}>
                <ContextMenu.Item>Stays inside the viewport</ContextMenu.Item>
                <ContextMenu.Item>Shifted / flipped by Radix</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>
          </div>
        </section>

        {/* D — Button vs object vs takeover. */}
        <section className="flex flex-col gap-6">
          <Head dark={dark}>
            DropdownMenu (from a button) · ContextMenu (from an object) · Modal
            (takes over)
          </Head>
          <p className={cap}>
            Same frozen pane, same items. Only the trigger changes — a button, a
            right-click on an object, or (below, for contrast) the Immersive
            takeover:
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

export function ContextMenuScene({
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
        {dark ? 'Rich panel' : 'Capture background'} — ContextMenu (Floating ←
        DropdownMenu)
      </p>
      <Demo dark={dark} />
    </section>
  )
}
