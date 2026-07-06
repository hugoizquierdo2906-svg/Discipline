'use client'

import { X } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Modal } from './modal'
import { Spinner } from './spinner'

/**
 * Fullscreen Overlay — DISCIPLINE's maximal immersive surface: a temporary
 * takeover of the ENTIRE viewport for a long, complex or focus-hungry task,
 * without leaving the current page. Not a bigger Drawer (a Drawer keeps the
 * page visible beside it as context — a Fullscreen Overlay deliberately
 * REMOVES that context so nothing competes for attention), not a fullscreen
 * Dialog (a Dialog is a bounded MOMENT sized to its content — a decision or
 * a small form; the overlay is an ENVIRONMENT with its own header, body,
 * footer, sidebars and toolbars, a place you inhabit for minutes, not
 * seconds), not a Bottom Sheet (a gesture-driven mobile surface resting at
 * detents; the overlay is always the whole screen and is keyboard/pointer
 * first). It exists because some tasks — building a program, creating a
 * client, an onboarding flow, an AI assistant session, a media viewer, a
 * fullscreen search or a side-by-side comparison — need the whole canvas and
 * zero distraction, yet must not become a routed page (they are transient,
 * dismissible, and return you exactly where you were).
 *
 * Why not each sibling: Dialog/AlertDialog interrupt for a decision (a
 * yes/no or a small confirm) — never a workspace; Drawer is an edge-anchored
 * companion that PRESERVES page context; Bottom Sheet is touch/gesture
 * physics; Command Palette is a search-to-jump surface; Popover/Tooltip are
 * anchored, non-blocking; Sidebar/Navigation Drawer are persistent layout
 * regions; a Wizard is a multi-step flow (which may LIVE inside a Fullscreen
 * Overlay, but is content, not the surface); a Page is a routed destination
 * with a URL — the overlay is not. When to use it: a task that fills the
 * screen and the mind (editor, builder, onboarding, assistant, viewer,
 * fullscreen search, comparison). When it is forbidden: a confirmation, a
 * short form, a menu, contextual info, anything the page can host inline —
 * and anything that deserves its own URL (that is a Page).
 *
 *   the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
 *   → Modal (the Dialog foundation) → Fullscreen Overlay
 *
 * Composes the Modal COMPONENT only — focus trap, restore focus, scroll
 * lock, Escape, overlay, portal, inert background and the Title/Description
 * ARIA wiring are inherited verbatim; this file contains ZERO focus /
 * overlay / portal / scroll-lock code. Fullscreen Overlay owns ONLY its
 * geometry (edge-to-edge, 100dvh, no radius), its slots (header · toolbar ·
 * breadcrumb · search · sidebar · body · inspector · footer · status bar)
 * and its layout: the header and footer are sticky (shrink-0), the body is
 * the only scroll region (flex-1, overflow-auto), and the VIEWPORT never
 * scrolls (Modal's scroll lock). The material and the open entrance are the
 * frozen Immersive ones, untouched.
 */

export interface FullscreenOverlayProps {
  /** Uncontrolled trigger (rendered via Modal.Trigger asChild). */
  trigger?: React.ReactElement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Modal (default) dims + traps + locks; non-modal leaves the page live. */
  modal?: boolean
  /** Overlay the body with the frozen Spinner while content loads. */
  loading?: boolean
  /** Blocks opening (an already-open overlay can still be closed). */
  disabled?: boolean
  showCloseButton?: boolean
  closeOnEscape?: boolean
  /** Fullscreen has no visible "outside", but a non-modal overlay's
   * pointer-outside can still be guarded. */
  closeOnOverlay?: boolean
  /** Return focus to the trigger on close (Modal default; false disables). */
  restoreFocus?: boolean
  title: string
  description?: string
  /** Replaces the default header entirely (title stays, visually hidden). */
  header?: React.ReactNode
  /** A breadcrumb row above the title in the default header. */
  breadcrumb?: React.ReactNode
  /** A search field placed in the default header's trailing area. */
  search?: React.ReactNode
  /** A toolbar row under the header (formatting, view switches…). */
  toolbar?: React.ReactNode
  /** A left column, edge-to-edge height, with its own scroll. */
  sidebar?: React.ReactNode
  /** A right column, edge-to-edge height, with its own scroll. */
  inspector?: React.ReactNode
  /** Sticky footer actions. */
  footer?: React.ReactNode
  /** A thin status strip pinned to the very bottom (counts, sync state…). */
  statusBar?: React.ReactNode
  children?: React.ReactNode
  className?: string
  'data-testid'?: string
}

export function FullscreenOverlay({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  modal = true,
  loading = false,
  disabled = false,
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlay = true,
  restoreFocus = true,
  title,
  description,
  header,
  breadcrumb,
  search,
  toolbar,
  sidebar,
  inspector,
  footer,
  statusBar,
  children,
  className,
  'data-testid': dataTestId,
}: FullscreenOverlayProps) {
  const autoId = useId()
  const titleId = `${autoId}-title`
  const descId = `${autoId}-desc`

  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const isOpen = isControlled ? open : internalOpen

  function setOpenState(next: boolean) {
    if (next && disabled) return
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const tid = (suffix: string) =>
    dataTestId ? `${dataTestId}-${suffix}` : undefined

  return (
    <Modal open={isOpen} onOpenChange={setOpenState} modal={modal}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        data-testid={dataTestId}
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) e.preventDefault()
        }}
        onInteractOutside={(e) => {
          if (!closeOnOverlay || !modal) e.preventDefault()
        }}
        onCloseAutoFocus={(e) => {
          if (!restoreFocus) e.preventDefault()
        }}
        // Geometry: edge-to-edge, full viewport, no centering, no radius.
        className={cn(
          'inset-0 left-0 top-0 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0',
          className,
        )}
        paneClassName="h-full w-full max-w-none rounded-none p-0"
        contentClassName="flex h-full min-h-0 flex-col gap-0"
      >
        {/* Header (sticky, row 1). */}
        {header ? (
          <>
            <Modal.Title id={titleId} className="sr-only">
              {title}
            </Modal.Title>
            {description && (
              <Modal.Description id={descId} className="sr-only">
                {description}
              </Modal.Description>
            )}
            <div className="shrink-0">{header}</div>
          </>
        ) : (
          <div
            data-testid={tid('header')}
            className="flex shrink-0 flex-col gap-1 border-b border-border px-6 py-4"
          >
            {breadcrumb && (
              <div className="text-caption text-text-tertiary">
                {breadcrumb}
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Modal.Title id={titleId} className="truncate text-h4">
                  {title}
                </Modal.Title>
                {description && (
                  <Modal.Description
                    id={descId}
                    className="truncate text-body-sm"
                  >
                    {description}
                  </Modal.Description>
                )}
              </div>
              {search && <div className="shrink-0">{search}</div>}
              {showCloseButton && (
                <Modal.Close asChild>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    label="Close"
                    data-testid={tid('close')}
                    icon={<Icon icon={X} aria-hidden />}
                  />
                </Modal.Close>
              )}
            </div>
          </div>
        )}

        {/* Toolbar (sticky). */}
        {toolbar && (
          <div
            data-testid={tid('toolbar')}
            className="flex shrink-0 items-center gap-2 border-b border-border px-6 py-2"
          >
            {toolbar}
          </div>
        )}

        {/* Middle band (the only growing region): sidebar · body · inspector.
            It is the flex-1 row; each column scrolls independently, the
            viewport never does. */}
        <div className="flex min-h-0 flex-1">
          {sidebar && (
            <aside
              data-testid={tid('sidebar')}
              className="min-h-0 w-64 shrink-0 overflow-y-auto border-r border-border p-4"
            >
              {sidebar}
            </aside>
          )}

          <div
            data-testid={tid('body')}
            className="min-h-0 min-w-0 flex-1 overflow-y-auto px-6 py-6"
          >
            {loading ? (
              <div className="flex h-full min-h-40 items-center justify-center">
                <Spinner size="lg" label="Loading" />
              </div>
            ) : (
              children
            )}
          </div>

          {inspector && (
            <aside
              data-testid={tid('inspector')}
              className="min-h-0 w-80 shrink-0 overflow-y-auto border-l border-border p-4"
            >
              {inspector}
            </aside>
          )}
        </div>

        {/* Footer actions (sticky). */}
        {footer && (
          <div
            data-testid={tid('footer')}
            className="flex shrink-0 items-center justify-end gap-3 border-t border-border px-6 py-4"
          >
            {footer}
          </div>
        )}

        {/* Status bar (sticky, very bottom). */}
        {statusBar && (
          <div
            data-testid={tid('status')}
            className="flex shrink-0 items-center gap-3 border-t border-border px-6 py-2 text-caption text-text-tertiary"
          >
            {statusBar}
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

/** Re-exported so consumers can close from custom headers/footers. */
FullscreenOverlay.Close = Modal.Close
