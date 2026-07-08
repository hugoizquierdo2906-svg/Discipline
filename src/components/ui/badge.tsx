import { cn } from '@/lib/cn'

/**
 * Badge — DISCIPLINE's Data Display primitive for a SMALL, STATIC piece of
 * information ATTACHED to a datum: a short property that qualifies existing
 * content (Active, Premium, Draft, Paid, Coach, Beginner, Hypertrophy,
 * "12 clients"). Exactly one responsibility: display a compact property tied to
 * a datum. It is purely informative, NEVER interactive, and never stands alone
 * as a primary element — it always accompanies a datum that is already present.
 *
 * Not a Chip (an INTERACTIVE element — selectable, removable, often a filter,
 * with focus/keyboard and a close affordance; Badge is never clickable, has no
 * tabindex, no focus, no role), not a Tag (usually an input Chip — typed
 * keywords the user can add/remove; Badge is not entered and not removed), not
 * a Pill (a SHAPE, not a responsibility — Badge offers `shape="pill"` but is
 * not defined by it), not a Label (a form-field caption — `<label for>` binding
 * a control; Badge describes a datum, not a field), not a StatusDot (a bare
 * colored dot with no text — Badge always carries a text label; color alone is
 * never the information, an accessibility requirement), not a Counter /
 * Notification badge (a number OVERLAID on an element — unread-count in the
 * corner of an icon; a numeric Badge shows a property of the datum inline, not
 * a floating overlay), not an Avatar (a person's image/initials), not a Button
 * (triggers an ACTION — Badge never acts), not Tabs / Stepper / Breadcrumb
 * (navigation / progression / position — Badge has no selection, order or
 * path), not a Progress (an evolving fraction — Badge is static, no track, no
 * value). The families — status, category, numeric, role, priority, version —
 * are ONE responsibility (a compact property of a datum) wearing different
 * copy/color/icon, content a consumer passes in, never separate components.
 *
 * A Data Display primitive (token system, no glass role) — composes only the
 * design system's typography tokens, a caller-supplied `icon` (typically the
 * frozen Icon), and color tokens (neutral/success/warning/error/info); never
 * Button/Card/Alert/Toast/Chip. Three orthogonal axes, all from tokens:
 * `variant` (the semantic color), `appearance` (soft tint / solid fill /
 * outline), and `shape` (rounded / pill / square). It draws NO glass/blur/
 * shadow, never a hard-coded color, and is entirely STATIC — no transition, no
 * animation, no focus (it is not focusable and must never be made clickable).
 * `inline-flex` keeps it on the text baseline of the datum it qualifies; the
 * optional icon sits before the label and flips naturally under `dir="rtl"` via
 * flex, with no directional code. A `<span>` with no interactive role or
 * tabindex — purely informative. Future consumers: Client Card, Program Card,
 * Exercise Card, Tables, Lists, Dashboard, Calendar, Search Results, Drawer,
 * Dialog — any surface that qualifies a datum with a compact label.
 */

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info'
type BadgeAppearance = 'soft' | 'solid' | 'outline'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'
type BadgeShape = 'rounded' | 'pill' | 'square'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  appearance?: BadgeAppearance
  size?: BadgeSize
  shape?: BadgeShape
  /** Optional decorative-free icon, rendered before the label. Never alone. */
  icon?: React.ReactNode
}

// Each cell is built ONLY from color tokens. `soft` = tint background + tinted
// text + token border; `solid` = solid token fill + on-color text; `outline` =
// transparent background + tinted text + token border. Every cell carries a
// border colour (transparent for solid) so the box height is identical across
// appearances.
const variantAppearance: Record<
  BadgeVariant,
  Record<BadgeAppearance, string>
> = {
  neutral: {
    soft: 'border-transparent bg-[var(--ds-color-border)] text-text-secondary',
    solid:
      'border-transparent bg-[var(--ds-color-text)] text-[var(--ds-color-surface-raised)]',
    outline: 'border-[var(--ds-color-border-strong)] text-text-secondary',
  },
  success: {
    soft: 'border-[var(--ds-color-success-border)] bg-[var(--ds-color-success-tint)] text-success',
    solid:
      'border-transparent bg-[var(--ds-color-success)] text-[var(--ds-color-text-on-accent)]',
    outline: 'border-[var(--ds-color-success-border)] text-success',
  },
  warning: {
    soft: 'border-[var(--ds-color-warning-border)] bg-[var(--ds-color-warning-tint)] text-warning',
    solid:
      'border-transparent bg-[var(--ds-color-warning)] text-[var(--ds-color-text-on-accent)]',
    outline: 'border-[var(--ds-color-warning-border)] text-warning',
  },
  error: {
    soft: 'border-[var(--ds-color-error-border)] bg-[var(--ds-color-error-tint)] text-error',
    solid:
      'border-transparent bg-[var(--ds-color-error)] text-[var(--ds-color-text-on-accent)]',
    outline: 'border-[var(--ds-color-error-border)] text-error',
  },
  info: {
    soft: 'border-[var(--ds-color-info-border)] bg-[var(--ds-color-info-tint)] text-info',
    solid:
      'border-transparent bg-[var(--ds-color-info)] text-[var(--ds-color-text-on-accent)]',
    outline: 'border-[var(--ds-color-info-border)] text-info',
  },
}

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'h-4 gap-0.5 px-1.5 text-caption [&>svg]:h-3 [&>svg]:w-3',
  sm: 'h-5 gap-1 px-2 text-caption [&>svg]:h-3 [&>svg]:w-3',
  md: 'h-6 gap-1 px-2.5 text-caption [&>svg]:h-3.5 [&>svg]:w-3.5',
  lg: 'h-7 gap-1.5 px-3 text-body-sm [&>svg]:h-4 [&>svg]:w-4',
}

const shapeClasses: Record<BadgeShape, string> = {
  rounded: 'rounded-md',
  pill: 'rounded-pill',
  square: 'rounded-none',
}

export function Badge({
  className,
  variant = 'neutral',
  appearance = 'soft',
  size = 'md',
  shape = 'pill',
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap border font-medium',
        variantAppearance[variant][appearance],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}
