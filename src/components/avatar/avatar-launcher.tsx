'use client'

import { Compass } from 'lucide-react'
import { forwardRef } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { Spinner } from '@/components/ui/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * AvatarLauncher — the SINGLE, calm entry point to the DISCIPLINE Guide. It is
 * the door, never the room: this component opens nothing itself (no Drawer, no
 * conversation, no AI) — it is only the persistent presence a member reaches
 * for. It belongs to the Avatar module, NOT the Design System.
 *
 * It is NOT a Floating Action Button (which triggers a screen's primary
 * ACTION and changes per screen — the Launcher is a stable PRESENCE, identical
 * everywhere, inviting calm, not execution), not a bare IconButton (a generic
 * DS primitive with no identity and no product states — the Launcher composes
 * IconButton but adds the DISCIPLINE identity, the state machine and the
 * Guide's semantics), not a Speed Dial (a fan of several actions — the Guide
 * has exactly one entry point), not a Help / Support button (a peripheral
 * utility / an incident channel — the Guide embodies the philosophy and
 * prepares the coach's work), not a Chat Launcher / Assistant Bubble (a
 * Messenger bubble with an aggressive unread count, urgency and attention
 * animations — the Launcher refuses the bubble/urgency aesthetic entirely),
 * not a Notification FAB (an alert-coloured count pushing the member to click —
 * the Launcher signals attention DISCREETLY, via a neutral Badge, never an
 * alarm). Exactly one responsibility: the single, calm, permanent door to the
 * Guide.
 *
 * Composes ONLY existing primitives and tokens — it creates NO new material,
 * surface or animation: the frozen IconButton (its own glass material), the
 * frozen Icon (a compass — to orient / guide, never a chat bubble), the frozen
 * Spinner (loading), the frozen Badge (discreet unread, neutral), the frozen
 * Avatar (the coach's presence), and the frozen Tooltip (a calm hint).
 *
 * State model — a single `state` (the source of truth) plus `unread` and the
 * native `disabled`: hover / pressed / keyboard-focus are native (IconButton's
 * own glass); `disabled` is native; `loading` / `active` (a conversation is
 * open) / `coach` (the human coach has joined) / `unavailable` (the Guide is
 * down) are the `state` enum; "waiting" — a discreet call for attention — is
 * expressed by `unread`, never a colour-only dot (the frozen Badge forbids
 * colour without text). Priority, most-severe first: `unavailable` → disabled +
 * explanatory hint; `loading` → Spinner, aria-busy, non-interactive; `coach` →
 * engaged halo + the coach's presence; `active` → engaged halo + aria-expanded;
 * `idle` → the calm default. Placement (a layout decision, so the CONSUMER
 * owns it, per Invariant A1): a single fixed anchor in one consistent
 * peripheral corner, its margins from the spacing tokens and its offset
 * respecting `env(safe-area-inset-*)`; it never occludes primary content and
 * retreats only during full-screen focused work.
 */

export type AvatarLauncherState =
  'idle' | 'loading' | 'active' | 'coach' | 'unavailable'

export interface AvatarLauncherProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  /** The Guide's status. Interaction states (hover/press/focus) are native. */
  state?: AvatarLauncherState
  /** Discreet unread count — the calm "the Guide is waiting for you" signal. */
  unread?: number
  /** The coach's identity, shown as a presence marker while `state="coach"`. */
  coach?: { name: string; src?: string }
  /** Overrides the computed accessible name. */
  label?: string
}

// The Launcher has ONE considered size — a single entry point deserves a
// single, consistent, thumb-friendly target (identity over API surface, and it
// sidesteps IconButton's non-monotonic size scale). Responsiveness is a matter
// of PLACEMENT (margins / safe-area), never of shrinking the target: the
// Launcher stays the same reachable size on desktop, tablet and mobile.

// The accessible name (aria-label) — full and descriptive, per state.
function accessibleName(
  state: AvatarLauncherState,
  unreadText: string | null,
): string {
  switch (state) {
    case 'loading':
      return 'The DISCIPLINE Guide is preparing'
    case 'active':
      return 'Close the DISCIPLINE Guide'
    case 'coach':
      return 'Open the DISCIPLINE Guide, your coach has joined'
    case 'unavailable':
      return 'The DISCIPLINE Guide is unavailable'
    default:
      return unreadText
        ? `Open the DISCIPLINE Guide, ${unreadText} unread`
        : 'Open the DISCIPLINE Guide'
  }
}

// The visible tooltip hint — short and calm.
function hint(state: AvatarLauncherState): string {
  switch (state) {
    case 'loading':
      return 'One moment…'
    case 'active':
      return 'Close'
    case 'coach':
      return 'Your coach is here'
    case 'unavailable':
      return 'Unavailable right now'
    default:
      return 'Ask the Guide'
  }
}

export const AvatarLauncher = forwardRef<
  HTMLButtonElement,
  AvatarLauncherProps
>(function AvatarLauncher(
  { state = 'idle', unread = 0, coach, label, className, disabled, ...props },
  ref,
) {
  const unreadText = unread > 0 ? (unread > 99 ? '99+' : String(unread)) : null
  const isDisabled = disabled || state === 'unavailable' || state === 'loading'
  // The halo signals an engaged Guide (a conversation open, or the coach in).
  const variant =
    state === 'active' || state === 'coach' ? 'primary' : 'secondary'

  // A discreet corner marker: the coach's presence takes precedence over the
  // unread count; neither shows while unavailable or loading.
  const showCoach = state === 'coach' && coach
  const showUnread =
    !showCoach &&
    unreadText !== null &&
    state !== 'unavailable' &&
    state !== 'loading'

  return (
    <TooltipProvider delayDuration={400}>
      <span className="relative inline-flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton
              ref={ref}
              variant={variant}
              size="lg"
              label={label ?? accessibleName(state, unreadText)}
              icon={
                state === 'loading' ? (
                  <Spinner size="lg" label="Loading" />
                ) : (
                  <Icon icon={Compass} size="lg" />
                )
              }
              data-state={state}
              disabled={isDisabled}
              aria-haspopup="dialog"
              aria-expanded={state === 'active'}
              aria-busy={state === 'loading' || undefined}
              className={className}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent>{hint(state)}</TooltipContent>
        </Tooltip>

        {showCoach && (
          <Avatar
            name={coach.name}
            src={coach.src}
            size="sm"
            aria-hidden
            className="pointer-events-none absolute -top-0.5 -end-0.5 h-6 w-6 border-surface-raised"
          />
        )}
        {showUnread && (
          <Badge
            variant="neutral"
            size="sm"
            aria-hidden
            className="pointer-events-none absolute -top-1 -end-1"
          >
            {unreadText}
          </Badge>
        )}
      </span>
    </TooltipProvider>
  )
})
