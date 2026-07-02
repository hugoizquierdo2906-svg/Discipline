'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import {
  ImmersiveSurface,
  immersiveContentClass,
  immersiveEnterClass,
  immersiveHostClass,
  immersiveScrimClass,
  immersiveScrimEnterClass,
} from './immersive-surface'

/**
 * Modal — the reusable Immersive Surface, promoted from the validated
 * /dev/modal reference (the frozen `.ds-immersive` pane over the frozen
 * `.ds-scrim`, both verbatim from glass.css):
 *
 *   GlassSurface → .ds-immersive → ImmersiveSurface → Modal
 *
 * Modal declares NO material — the pane is `immersiveHostClass` +
 * `<ImmersiveSurface/>`, the scrim is the frozen `.ds-scrim`, the entrance is
 * the shared Immersive base animation. On Radix Dialog, which supplies the
 * immersive behavior: portal, focus trap, scroll lock, Escape, outside-click
 * dismiss, inert background, focus return, ARIA (dialog · labelledby ·
 * describedby). Derived members (Command Palette · Dialog · Drawer) compose
 * Modal — never the primitives underneath.
 */

/** Root — `open` · `defaultOpen` · `onOpenChange`. Always modal (that is the
 * role): focus trap + scroll lock + inert background. */
const ModalRoot = DialogPrimitive.Root

/** Trigger — use `asChild` to wrap your own element. */
const ModalTrigger = DialogPrimitive.Trigger

/** Close — `asChild` wrapper that dismisses the modal. */
const ModalClose = DialogPrimitive.Close

const ModalTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function ModalTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-h3 font-semibold text-text', className)}
      {...props}
    />
  )
})

const ModalDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function ModalDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-body text-text-secondary', className)}
      {...props}
    />
  )
})

export interface ModalContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /** Geometry overrides for the PANE (`.ds-immersive` host) — e.g. `p-0` for
   * bespoke internal layouts. `className` targets the positioning shell. */
  paneClassName?: string
}

/** Content — scrim + centered Immersive pane. The outer shell owns placement
 * (Modal is the consumer deciding it, per A1); the inner pane carries the
 * frozen material + the shared entrance, so the entrance transform never
 * fights the centering transform. */
const ModalContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(function ModalContent({ className, paneClassName, children, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          immersiveScrimClass,
          immersiveScrimEnterClass,
          'fixed inset-0 z-overlay',
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-overlay w-[calc(100vw-2rem)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 outline-none',
          className,
        )}
        {...props}
      >
        <div
          className={cn(immersiveHostClass, immersiveEnterClass, paneClassName)}
        >
          <ImmersiveSurface />
          <div className={cn(immersiveContentClass, 'flex flex-col gap-4')}>
            {children}
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

/** `Modal` + `.Trigger` / `.Content` / `.Title` / `.Description` / `.Close`. */
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
})
