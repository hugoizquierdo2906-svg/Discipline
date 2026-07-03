'use client'

import { useRef, useState } from 'react'

import { Button } from './button'
import { Modal } from './modal'

/**
 * Alert Dialog — an interrupting confirmation: the app stops and asks ONE
 * question ("Delete this program?") that must be answered — confirm or
 * cancel — before anything else can happen. Not Dialog/Modal: a Modal is
 * the generic immersive container (any content, dismissible by outside
 * click); an Alert Dialog is a specialized MESSAGE + BINARY CHOICE on top
 * of it — `role="alertdialog"`, outside click never dismisses (an
 * interruption demands an explicit answer), initial focus lands on the
 * LEAST destructive action. Not Popover: anchored, flow-preserving,
 * non-blocking. Not Tooltip: a hover label, never interactive. Not Hover
 * Card: passive preview on hover. Not Toast: transient, self-dismissing,
 * never blocks — a toast informs, an alert dialog interrogates. Not
 * Banner/Alert: inline, persistent, page-level information with no
 * required answer. Not Notification: news about something that already
 * happened vs. a question about what is ABOUT to happen. Not Confirm
 * Dialog: the same species — "Confirm Dialog" is this component's neutral
 * variant, not a sibling. Not Sheet/Drawer: edge-anchored surfaces for
 * secondary CONTENT, not a blocking question. Not Dropdown/Context Menu:
 * command lists, not a question. Not Command Palette: a global searchable
 * command surface (the other Immersive member — same Modal parent,
 * different job). Not Form: an Alert Dialog carries NO fields — the moment
 * it needs input it has become a form Dialog. Not Wizard: multiple steps
 * vs. one question. Not Card: a static structural container. Not Message
 * Box: an OS-level primitive (window.alert/confirm) — this is its
 * design-system-native replacement.
 *
 *   the frozen optical-layer stack → .ds-immersive → ImmersiveSurface
 *   → Modal (the Dialog foundation) → Alert Dialog
 *
 * Composes the Modal component ONLY (never the primitives underneath —
 * Modal's own rule): scrim, pane material, entrance, focus trap, scroll
 * lock, Escape, inert background, portal, focus return and the
 * Title/Description ARIA wiring all come from Modal verbatim. Alert Dialog
 * adds exactly the alert semantics: `role="alertdialog"`, outside-click
 * dismissal disabled, initial focus on Cancel (WAI-ARIA: the least
 * destructive action), and the two frozen `<Button>`s — Cancel is always
 * `secondary`; Confirm is `primary` (neutral variant) or `destructive`
 * (destructive variant), both existing frozen Button variants, no new
 * recipe. `loading` is the frozen Button's own loading state on Confirm,
 * and while an action is in flight EVERY dismissal path is locked (Escape
 * prevented, Cancel disabled) — an in-flight destructive action must not
 * be abandonable halfway.
 *
 * Uncontrolled (with `trigger`): confirm and cancel both close by
 * themselves. Controlled (`open`/`onOpenChange`): closing after confirm
 * belongs to the consumer — that is precisely what enables async flows
 * (set `loading`, await the action, then close).
 */

export type AlertDialogVariant = 'neutral' | 'destructive'
export type AlertDialogSize = 'sm' | 'md' | 'lg'

/** Pane width per size — geometry only (AlertDialog is the consumer making
 * the layout decision, per Invariant A1). `md` is Modal's own frozen
 * intrinsic width, untouched. */
const sizeClass: Record<AlertDialogSize, string | undefined> = {
  sm: 'max-w-[360px]',
  md: undefined,
  lg: 'max-w-[560px]',
}

export interface AlertDialogProps {
  /** Uncontrolled trigger element (rendered via Modal.Trigger asChild). */
  trigger?: React.ReactElement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  /** Optional leading icon (e.g. `<Icon icon={Trash2} className="text-error"/>`). */
  icon?: React.ReactNode
  /** `neutral` (default) confirms with the primary Button; `destructive`
   * confirms with the destructive Button. */
  variant?: AlertDialogVariant
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  /** The frozen Button's loading state on Confirm; locks every dismissal
   * path while true. */
  loading?: boolean
  /** Disables the Confirm action only — Cancel always stays available. */
  disabled?: boolean
  size?: AlertDialogSize
  'data-testid'?: string
}

export function AlertDialog({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  icon,
  variant = 'neutral',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  disabled,
  size = 'md',
  'data-testid': dataTestId,
}: AlertDialogProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const isOpen = isControlled ? open : internalOpen
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  function setOpenState(next: boolean) {
    if (!next && loading) return
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  function handleCancel() {
    onCancel?.()
    setOpenState(false)
  }

  function handleConfirm() {
    onConfirm?.()
    // Controlled consumers close themselves (async/loading flows);
    // uncontrolled usage closes right away.
    if (!isControlled) setInternalOpen(false)
  }

  return (
    <Modal open={isOpen} onOpenChange={setOpenState}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        role="alertdialog"
        aria-modal="true"
        data-testid={dataTestId}
        className={sizeClass[size]}
        onOpenAutoFocus={(e) => {
          // WAI-ARIA alertdialog: initial focus belongs on the least
          // destructive action.
          e.preventDefault()
          cancelRef.current?.focus()
        }}
        onInteractOutside={(e) => {
          // An interruption demands an explicit answer — clicking away is
          // never one (the defining difference from Modal).
          e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (loading) e.preventDefault()
        }}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <span aria-hidden className="mt-1 shrink-0">
              {icon}
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-2">
            <Modal.Title>{title}</Modal.Title>
            {description && (
              <Modal.Description>{description}</Modal.Description>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            ref={cancelRef}
            variant="secondary"
            disabled={loading}
            data-testid={dataTestId ? `${dataTestId}-cancel` : undefined}
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'primary'}
            loading={loading}
            disabled={disabled}
            data-testid={dataTestId ? `${dataTestId}-confirm` : undefined}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}
