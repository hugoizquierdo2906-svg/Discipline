'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Modal } from './modal'
import { Spinner } from './spinner'

/**
 * Drawer — an edge-anchored immersive panel: a secondary WORKSPACE that
 * slides in from one side of the screen, holds real content (a form, a
 * settings panel, an inspector, a navigation tree) and gives the screen
 * back exactly where the user left it. Not Dialog/Modal: a dialog is a
 * centered, self-contained MOMENT — one bounded task, sized to its content;
 * a drawer is an edge-attached SPACE — full-height (or full-width),
 * content-hungry, built for browsing and editing alongside the page it
 * covers. Not Alert Dialog: a blocking question with a binary answer —
 * zero content, maximum interruption; a drawer is the opposite (maximum
 * content, minimum ceremony, dismissible by overlay). Not Sheet: "Sheet"
 * is another library's name for this exact species; DISCIPLINE has one
 * canonical name — Drawer — and no duplicate sibling. Not Bottom Sheet: a
 * touch-native surface defined by DRAG — detents, snap points, swipe to
 * dismiss; Drawer's bottom side shares the placement but none of the
 * gesture physics (a future BottomSheet would own those). Not Popover
 * (anchored to a trigger, flow-preserving, collision-positioned — a
 * drawer is anchored to the VIEWPORT edge), not Tooltip/Hover Card
 * (hover, passive), not Dropdown/Context Menu (command lists), not
 * Navigation Menu (an always-visible bar exposing site structure — a
 * drawer may CONTAIN navigation but is a transient container, not the
 * nav), not Command Palette (the searchable command surface — same Modal
 * parent, different job), not Sidebar (a PERSISTENT layout region that
 * shares the screen; a drawer OVERLAYS and leaves — the moment it stays,
 * it has become a Sidebar), not Accordion/Collapsible (in-flow disclosure
 * that pushes content, never overlays), not Card (a static structural
 * container), not Form/Wizard (content KINDS a drawer may host, not
 * surfaces), not Overlay (the scrim primitive underneath — one organ, not
 * the organism), not Toast (transient, self-dismissing, informs — never
 * holds a workspace).
 *
 * WHEN A DRAWER INSTEAD OF A DIALOG: a dialog for a decision, a drawer
 * for a task. If the content is one question or one small bounded action
 * (confirm, rename, pick one thing) → Dialog: centered, focused, sized to
 * the words. If the content is a WORKSPACE — many fields, a list to
 * browse, details to inspect, settings to tweak — while keeping the page
 * visible as context → Drawer. Ergonomics: a drawer preserves spatial
 * context (the page stays visible at reduced emphasis beside it, so the
 * user never loses "where am I"); its edge anchoring gives it a natural
 * height for long scrolling content where a centered dialog would float
 * awkwardly; and it maps to the OS gesture vocabulary (panels sliding
 * from edges). Responsive: on desktop, side drawers (left/right) are the
 * natural inspectors/settings panels — a partial width keeps the page as
 * context; on mobile, the same drawer takes (nearly) the full width, and
 * bottom drawers become the more thumb-reachable choice; `size="full"`
 * turns any side into a full-screen surface. Every size is
 * viewport-clamped, so a 400px drawer on a 390px phone never overflows.
 *
 *   the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
 *   → Modal (the Dialog foundation) → Drawer
 *
 * (The Immersive family doc names Drawer as a member explicitly.) Drawer
 * composes the Modal COMPONENT only — never the primitives underneath,
 * Modal's own rule — so focus trap, restore focus, scroll lock, Escape,
 * overlay, portal, inert background and the Title/Description ARIA wiring
 * are all inherited verbatim, never reimplemented. Drawer adds ONLY
 * geometry and slots: edge placement per `side` (Modal's centered shell
 * repositioned via className — the consumer's layout decision, per
 * Invariant A1), a size scale per axis, the frozen CommandPalette pane
 * neutralization (`w-full max-w-none p-0`) with the pane's frozen radius
 * kept intact thanks to a small viewport gutter (the pane floats 8px off
 * the edges — no corner surgery, the material's silhouette stays
 * whole), a sticky header / scrollable body / sticky footer column, and
 * the frozen IconButton as the close affordance. The entrance is the
 * shared Immersive entrance, reused verbatim (the family declares ONE
 * entrance; components never write their own).
 */

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

/** Shell placement per side — overrides Modal's centered shell (Drawer is
 * the consumer making the placement decision, per Invariant A1). The 8px
 * gutter keeps the pane's frozen radius whole against the viewport edge. */
const sideShellClass: Record<DrawerSide, string> = {
  left: 'left-2 right-auto top-2 bottom-2 translate-x-0 translate-y-0',
  right: 'left-auto right-2 top-2 bottom-2 translate-x-0 translate-y-0',
  top: 'left-2 right-2 top-2 bottom-auto translate-x-0 translate-y-0 w-auto',
  bottom: 'left-2 right-2 top-auto bottom-2 translate-x-0 translate-y-0 w-auto',
}

/** Horizontal drawers scale by WIDTH… */
const sideWidthClass: Record<DrawerSize, string> = {
  xs: 'w-[280px]',
  sm: 'w-[320px]',
  md: 'w-[400px]',
  lg: 'w-[480px]',
  xl: 'w-[600px]',
  full: 'w-[calc(100vw-16px)]',
}

/** …vertical drawers by HEIGHT. */
const sideHeightClass: Record<DrawerSize, string> = {
  xs: 'h-[200px]',
  sm: 'h-[280px]',
  md: 'h-[360px]',
  lg: 'h-[460px]',
  xl: 'h-[580px]',
  full: 'h-[calc(100vh-16px)]',
}

export interface DrawerProps {
  /** Uncontrolled trigger element (rendered via Modal.Trigger asChild). */
  trigger?: React.ReactElement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: DrawerSide
  size?: DrawerSize
  /** Modal (default): scrim + focus trap + scroll lock + inert background.
   * Non-modal: no scrim, the page stays interactive (Radix Dialog's own
   * mode — inherited, not reimplemented). */
  modal?: boolean
  closeOnEscape?: boolean
  /** Close when the scrim / outside is clicked (modal mode). */
  closeOnOverlay?: boolean
  /** Keep the drawer mounted while closed (CSS-driven visibility). */
  forceMount?: true
  /** Replaces the body with the frozen Spinner while content loads. */
  loading?: boolean
  /** Blocks opening (the drawer can still be closed if already open). */
  disabled?: boolean
  /** Accessible name — always required (rendered in the default header, or
   * visually hidden under a custom `header`). */
  title: string
  description?: string
  /** Optional leading icon in the default header. */
  icon?: React.ReactNode
  /** Replaces the default header entirely (title stays, visually hidden,
   * for ARIA). The default close affordance is not rendered — bring your
   * own via `Drawer.Close`-style `Modal.Close` or `onOpenChange`. */
  header?: React.ReactNode
  /** Sticky footer content (actions row, summary…). */
  footer?: React.ReactNode
  children?: React.ReactNode
  'data-testid'?: string
}

function DrawerRoot({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  side = 'right',
  size = 'md',
  modal = true,
  closeOnEscape = true,
  closeOnOverlay = true,
  forceMount,
  loading = false,
  disabled,
  title,
  description,
  icon,
  header,
  footer,
  children,
  'data-testid': dataTestId,
}: DrawerProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const isOpen = isControlled ? open : internalOpen

  function setOpenState(next: boolean) {
    if (next && disabled) return
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const horizontal = side === 'left' || side === 'right'

  return (
    <Modal open={isOpen} onOpenChange={setOpenState} modal={modal}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        data-testid={dataTestId}
        forceMount={forceMount}
        aria-modal={modal || undefined}
        // Without a description, strip Radix's auto aria-describedby (it
        // would point at a non-existent node); with one, keep the wiring.
        {...(description ? {} : { 'aria-describedby': undefined })}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) e.preventDefault()
        }}
        onInteractOutside={(e) => {
          if (!closeOnOverlay || !modal) e.preventDefault()
        }}
        className={cn(
          sideShellClass[side],
          horizontal
            ? cn(sideWidthClass[size], 'max-w-[calc(100vw-16px)]')
            : cn(
                sideHeightClass[size],
                'max-h-[calc(100vh-16px)]',
                'max-w-none',
              ),
        )}
        // The frozen CommandPalette pane neutralization, verbatim; h-full so
        // the pane fills the edge-anchored shell.
        paneClassName="h-full w-full max-w-none p-0"
        contentClassName="h-full min-h-0 gap-0"
      >
        {/* Sticky header. */}
        {header ? (
          <>
            <Modal.Title className="sr-only">{title}</Modal.Title>
            <div className="shrink-0">{header}</div>
          </>
        ) : (
          <div className="flex shrink-0 items-start gap-3 border-b border-border px-6 py-5">
            {icon && (
              <span aria-hidden className="mt-0.5 shrink-0">
                {icon}
              </span>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Modal.Title className="text-h4">{title}</Modal.Title>
              {description && (
                <Modal.Description className="text-body-sm">
                  {description}
                </Modal.Description>
              )}
            </div>
            <Modal.Close asChild>
              <IconButton
                size="sm"
                variant="ghost"
                label="Close"
                data-testid={dataTestId ? `${dataTestId}-close` : undefined}
                icon={<Icon icon={X} aria-hidden />}
              />
            </Modal.Close>
          </div>
        )}

        {/* Scrollable body. */}
        <div
          data-testid={dataTestId ? `${dataTestId}-body` : undefined}
          className="min-h-0 flex-1 overflow-y-auto px-6 py-5"
        >
          {loading ? (
            <div className="flex h-full min-h-24 items-center justify-center">
              <Spinner size="md" label="Loading" />
            </div>
          ) : (
            children
          )}
        </div>

        {/* Sticky footer. */}
        {footer && (
          <div
            data-testid={dataTestId ? `${dataTestId}-footer` : undefined}
            className="shrink-0 border-t border-border px-6 py-4"
          >
            {footer}
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

/** `Drawer` + `.Close` (re-exported so custom headers/footers can close
 * without reaching for Modal directly). */
export const Drawer = Object.assign(DrawerRoot, { Close: Modal.Close })
