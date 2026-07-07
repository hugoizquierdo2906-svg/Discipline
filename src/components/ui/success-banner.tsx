'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'
import { IconButton } from './icon-button'
import { Text } from './text'

/**
 * SuccessBanner — DISCIPLINE's PERSISTENT, IN-FLOW confirmation that an
 * operation succeeded and deserves to stay visible (a program published, a
 * session saved, a client created, a payment confirmed, a profile updated).
 * Exactly one responsibility: a persistent success confirmation that lives
 * in the page. It is NOT a floating notification.
 *
 * Not a Toast (a TRANSIENT, floating, auto-dismissing notification stacked
 * in a corner, outside the document flow — SuccessBanner lives IN the flow,
 * pushes surrounding content down, and stays until the user dismisses it or
 * the state changes; a Toast is a momentary "by the way," a SuccessBanner is
 * a standing "this is done"), not an Alert (the generic, multi-variant
 * message strip — usually error/warning/info ABOUT the current view;
 * SuccessBanner is the single, positive, success-only confirmation OF an
 * action the user just took, with its own success tokens and an optional
 * primary action, and the brief scopes it to NOT compose or be an Alert),
 * not a Dialog (an interruptive, blocking, modal moment demanding a decision
 * before anything else — SuccessBanner never blocks, never traps focus, and
 * the page keeps working around it), not an EmptyState/ErrorState/
 * OfflineState (CONTENT states that REPLACE a region that could not show its
 * content — a SuccessBanner sits ALONGSIDE content that IS present and
 * confirms a change to it), not a Progress/Spinner (in-flight activity —
 * SuccessBanner is the terminal, positive outcome AFTER the work finished),
 * not an inline success message / Snackbar (a Snackbar is Material's
 * transient bottom toast; an inline message is a bare line of text —
 * SuccessBanner is a full, dismissible, optionally-actionable banner element
 * that occupies its own width in the flow), not a Notification Center (a
 * collected, historical list of past events — SuccessBanner is a single,
 * present confirmation in situ).
 *
 * The variants — save succeeded, publish succeeded, import completed, sync
 * succeeded, payment confirmed — are ONE responsibility (a persistent
 * confirmation of success) wearing different copy and icons; they are
 * content a consumer passes in, never separate components.
 *
 * A Feedback primitive that OWNS its surface — unlike the content-only
 * states (EmptyState/ErrorState/OfflineState draw nothing and inherit their
 * parent's Liquid Glass), a banner IS a surface element: a success-tinted
 * strip built ONLY from the design system's success tokens
 * (`bg-[var(--ds-color-success-tint)]`, `border-[var(--ds-color-success-border)]`,
 * `text-success` on the icon), a token radius and token spacing — never a
 * hard-coded color, never GlassSurface/blur/backdrop-filter/shadow, never
 * motion. It composes only the frozen Icon (the caller supplies the check
 * icon), the frozen Typography (Heading + Text), and the frozen IconButton
 * for its dismiss control — never Toast/Alert/Card/Dialog. `w-full` so it
 * follows the parent's width with no JS measuring; horizontal flex so the
 * dismiss control flips naturally under `dir="rtl"`. `role="status"`
 * (aria-live polite) announces the success without the urgency of an alert;
 * the dismiss IconButton keeps its own native button semantics — no
 * auto-focus, no keyboard trap. Two additive props beyond the brief's
 * literal list, both justified: `align` (the brief's own Alignement section
 * requires left/center) and `onDismiss` (a `dismissible` banner with no way
 * to observe dismissal could not persist the user's choice). Future
 * consumers: Dashboard, Client page, Program editor, Calendar, Settings,
 * Billing, Files, Gallery — any view that confirms a completed action.
 */

export interface SuccessBannerProps extends Omit<
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
    titleText: 'body-sm' | 'body' | 'body-lg'
    description: 'body-sm' | 'body'
  }
> = {
  sm: {
    padding: 'px-3 py-2',
    gap: 'gap-2',
    icon: '[&>svg]:h-4 [&>svg]:w-4',
    titleText: 'body-sm',
    description: 'body-sm',
  },
  md: {
    padding: 'px-4 py-3',
    gap: 'gap-3',
    icon: '[&>svg]:h-5 [&>svg]:w-5',
    titleText: 'body',
    description: 'body-sm',
  },
  lg: {
    padding: 'px-5 py-4',
    gap: 'gap-3',
    icon: '[&>svg]:h-6 [&>svg]:w-6',
    titleText: 'body-lg',
    description: 'body',
  },
}

export function SuccessBanner({
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
}: SuccessBannerProps) {
  const [visible, setVisible] = useState(true)
  const config = sizeConfig[size]

  if (!visible) return null

  return (
    <div
      role="status"
      className={cn(
        'flex w-full items-start rounded-lg border border-[var(--ds-color-success-border)] bg-[var(--ds-color-success-tint)]',
        config.padding,
        config.gap,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={cn('mt-0.5 shrink-0 text-success', config.icon)}>
          {icon}
        </span>
      )}
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-0.5',
          align === 'center' && 'items-center text-center',
        )}
      >
        <Text size={config.titleText} weight="semibold">
          {title}
        </Text>
        {description && (
          <Text size={config.description} tone="secondary">
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
