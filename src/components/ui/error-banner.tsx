'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Text } from './text'

/**
 * ErrorBanner — DISCIPLINE's PERSISTENT, IN-FLOW, NON-MODAL error: an
 * important failure about the CURRENT context, surfaced in the flow, that does
 * NOT warrant a modal interruption (couldn't publish, payment declined, sync
 * failed, import interrupted, save failed, quota exceeded). Exactly one
 * responsibility: durably inform of an error tied to the current context
 * WITHOUT interrupting the flow. It is NOT a floating notification and NOT a
 * blocking dialog.
 *
 * The third sibling of the Feedback banner family — SuccessBanner (frozen)
 * confirms a completed SUCCESS, WarningBanner (frozen) flags a pending RISK,
 * ErrorBanner reports an occurred FAILURE. Same in-flow banner behavior, a
 * graver polarity: error tokens instead of warning/success, and `role="alert"`
 * (aria-live assertive) instead of `role="status"` (polite) — an error
 * deserves an assertive announcement, completing the three-tier semantic
 * (success/warning are polite, error is assertive; green → amber → red). It
 * deliberately does NOT compose SuccessBanner or WarningBanner despite the
 * identical layout: distinct polarity (failure vs. risk vs. success), both are
 * frozen (coupling would block their evolution behind an ADR), and the brief
 * scopes composition to the primitives.
 *
 * Not an ErrorState (a CONTENT state that REPLACES a whole region that could
 * not load — it IS the view; ErrorBanner sits ALONGSIDE content that IS
 * present and working, reporting that one operation failed, and unlike the
 * surface-less ErrorState it OWNS its error-tinted surface), not a
 * WarningBanner (a RISK — nothing failed yet; ErrorBanner is an actual
 * failure), not a SuccessBanner (the opposite polarity), not a Toast/Snackbar
 * (a TRANSIENT, floating, auto-dismissing notification outside the document
 * flow — an error must not vanish on its own; ErrorBanner lives IN the flow
 * and persists until resolved or dismissed), not an Alert (the generic,
 * multi-variant message strip ABOUT the current view; ErrorBanner is the
 * single, error-only signal with its own error tokens and an optional recovery
 * action, and the brief scopes it to NOT compose or be an Alert), not an
 * AlertDialog/Dialog (an interruptive, blocking, modal moment demanding a
 * decision before anything else — ErrorBanner never blocks, never traps focus,
 * the error is important but NON-MODAL, the page keeps working around it), not
 * an OfflineState (a connectivity CONTENT state that REPLACES a region;
 * ErrorBanner reports an application failure alongside present content), not a
 * Spinner (in-flight activity — ErrorBanner is the terminal state AFTER the
 * attempt failed), not a Notification Center (a collected, historical list — a
 * single present error in situ).
 *
 * The variants — save failed, payment declined, publish failed, import failed,
 * sync failed, quota exceeded — are ONE responsibility (durably inform of a
 * contextual error without interrupting the flow) wearing different copy and
 * icons; they are content a consumer passes in, never separate components.
 *
 * A Feedback primitive that OWNS its surface — like its frozen banner siblings
 * and unlike the content-only states, a banner IS a surface element: an
 * error-tinted strip built ONLY from the design system's error tokens
 * (`bg-[var(--ds-color-error-tint)]`, `border-[var(--ds-color-error-border)]`,
 * `text-error` on the icon), a token radius and token spacing — never a
 * hard-coded color, never GlassSurface/blur/backdrop-filter/shadow, never
 * motion. It composes only the frozen Icon (the caller supplies the error
 * icon), the frozen Typography (Text), and the frozen IconButton for its
 * dismiss control — never Toast/Alert/Card/Dialog. `w-full` so it follows the
 * parent's width with no JS measuring; horizontal flex so the dismiss control
 * flips naturally under `dir="rtl"`. `role="alert"` (aria-live assertive) is
 * the appropriate role for a persistent, non-modal error — it is announced
 * assertively without seizing focus or blocking; the dismiss IconButton keeps
 * its own native button semantics — no auto-focus, no keyboard trap. Two
 * additive props beyond the brief's literal list, both justified: `align` (the
 * brief's own Alignement section requires left/center) and `onDismiss` (a
 * `dismissible` banner with no way to observe dismissal could not persist the
 * user's choice). Future consumers: Dashboard, Billing, Programs, Clients,
 * Calendar, Files, Gallery, Import, Export, Settings — any view that must
 * report a contextual failure without a modal interruption.
 */

export interface ErrorBannerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  /** Called after the user dismisses the banner (the banner also self-hides). */
  onDismiss?: () => void
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
}

const sizeConfig: Record<
  'sm' | 'md' | 'lg',
  {
    padding: string
    gap: string
    icon: string
    titleText: string
    description: string
  }
> = {
  sm: {
    padding: 'px-3 py-2',
    gap: 'gap-2',
    icon: '[&>svg]:h-4 [&>svg]:w-4',
    titleText: 'text-body-sm',
    description: 'text-body-sm',
  },
  md: {
    padding: 'px-4 py-3',
    gap: 'gap-3',
    icon: '[&>svg]:h-5 [&>svg]:w-5',
    titleText: 'text-body',
    description: 'text-body-sm',
  },
  lg: {
    padding: 'px-5 py-4',
    gap: 'gap-3',
    icon: '[&>svg]:h-6 [&>svg]:w-6',
    titleText: 'text-body-lg',
    description: 'text-body',
  },
}

export function ErrorBanner({
  title,
  description,
  icon,
  action,
  dismissible = false,
  onDismiss,
  size = 'md',
  align = 'left',
  className,
  ...props
}: ErrorBannerProps) {
  const [visible, setVisible] = useState(true)
  const config = sizeConfig[size]

  if (!visible) return null

  return (
    <div
      role="alert"
      className={cn(
        'flex w-full items-start rounded-lg border border-[var(--ds-color-error-border)] bg-[var(--ds-color-error-tint)]',
        config.padding,
        config.gap,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={cn('mt-0.5 shrink-0 text-error', config.icon)}>
          {icon}
        </span>
      )}
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-0.5',
          align === 'center' && 'items-center text-center',
        )}
      >
        <Text className={cn(config.titleText, 'font-semibold')}>{title}</Text>
        {description && (
          <Text className={cn(config.description, 'text-text-secondary')}>
            {description}
          </Text>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <IconButton
          icon={<Icon icon={X} size="sm" />}
          label="Dismiss"
          variant="ghost"
          size="sm"
          className="-mr-1 shrink-0"
          onClick={() => {
            setVisible(false)
            onDismiss?.()
          }}
        />
      )}
    </div>
  )
}
