'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Text } from './text'

/**
 * WarningBanner — DISCIPLINE's PERSISTENT, IN-FLOW warning: a situation that
 * needs the user's ATTENTION without immediately blocking their work (a
 * subscription about to expire, an incomplete profile, storage almost full, a
 * payment renewing soon, an unpublished program, partially synced data).
 * Exactly one responsibility: warn of a RISK or a recommended action, in the
 * flow, without blocking. It is NOT a failure and NOT a floating notification.
 *
 * The frozen sibling of SuccessBanner — same Feedback family, same in-flow
 * banner behavior, opposite polarity: SuccessBanner confirms a completed
 * SUCCESS (a settled "this is done"), WarningBanner flags a pending RISK (a
 * standing "this needs your attention"). It deliberately does NOT compose
 * SuccessBanner despite the identical layout: distinct responsibilities
 * (success vs. risk), SuccessBanner is frozen (coupling would block its
 * evolution behind an ADR), and the brief scopes composition to the
 * primitives.
 *
 * Not a Toast/Snackbar (a TRANSIENT, floating, auto-dismissing notification
 * stacked in a corner, outside the document flow — WarningBanner lives IN the
 * flow, pushes surrounding content down, and stays until the risk is resolved
 * or the user dismisses it), not an Alert (the generic, multi-variant message
 * strip ABOUT the current view; WarningBanner is the single, warning-only
 * signal with its own warning tokens and an optional recommended action, and
 * the brief scopes it to NOT compose or be an Alert), not an Error Banner /
 * ErrorState (a FAILURE — something went wrong, often blocking or retryable;
 * WarningBanner is the opposite: nothing failed, the work continues, this is a
 * heads-up), not an Info Banner (a neutral note with no notion of risk or
 * recommended action — WarningBanner carries the amber "attention" charge and
 * usually a next step), not a Dialog (an interruptive, blocking, modal moment
 * demanding a decision before anything else — WarningBanner never blocks,
 * never traps focus, the page keeps working around it), not an OfflineState
 * (a CONTENT state that REPLACES a region that could not load — WarningBanner
 * sits ALONGSIDE content that IS present), not a Spinner (in-flight activity —
 * WarningBanner is a stable condition, not a transition), not an EmptyState (a
 * meaningful absence of content — WarningBanner accompanies content that is
 * present), not a Notification Center (a collected, historical list — a single
 * present warning in situ).
 *
 * The variants — subscription expiring, storage almost full, profile
 * incomplete, email unverified, partial sync, program unpublished — are ONE
 * responsibility (warn of a risk / recommended action without blocking)
 * wearing different copy and icons; they are content a consumer passes in,
 * never separate components.
 *
 * A Feedback primitive that OWNS its surface — like the frozen SuccessBanner
 * and unlike the content-only states, a banner IS a surface element: a
 * warning-tinted strip built ONLY from the design system's warning tokens
 * (`bg-[var(--ds-color-warning-tint)]`, `border-[var(--ds-color-warning-border)]`,
 * `text-warning` on the icon), a token radius and token spacing — never a
 * hard-coded color, never GlassSurface/blur/backdrop-filter/shadow, never
 * motion. It composes only the frozen Icon (the caller supplies the warning
 * icon), the frozen Typography (Text), and the frozen IconButton for its
 * dismiss control — never Alert/Toast/Card/Dialog. `w-full` so it follows the
 * parent's width with no JS measuring; horizontal flex so the dismiss control
 * flips naturally under `dir="rtl"`. `role="status"` (aria-live polite)
 * surfaces the warning without the interrupting urgency of `role="alert"`,
 * matching its non-blocking nature; the dismiss IconButton keeps its own
 * native button semantics — no auto-focus, no keyboard trap. Two additive
 * props beyond the brief's literal list, both justified: `align` (the brief's
 * own Alignement section requires left/center) and `onDismiss` (a
 * `dismissible` banner with no way to observe dismissal could not persist the
 * user's choice). Future consumers: Dashboard, Billing, Client page, Program
 * editor, Settings, Storage, Files, Calendar — any view that must flag a risk
 * without blocking.
 */

export interface WarningBannerProps extends Omit<
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

export function WarningBanner({
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
}: WarningBannerProps) {
  const [visible, setVisible] = useState(true)
  const config = sizeConfig[size]

  if (!visible) return null

  return (
    <div
      role="status"
      className={cn(
        'flex w-full items-start rounded-lg border border-[var(--ds-color-warning-border)] bg-[var(--ds-color-warning-tint)]',
        config.padding,
        config.gap,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={cn('mt-0.5 shrink-0 text-warning', config.icon)}>
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
