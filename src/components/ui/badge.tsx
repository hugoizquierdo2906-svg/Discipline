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
 * A Data Display primitive cut from DISCIPLINE's Liquid Glass — NOT a flat
 * Bootstrap fill. It reads as a MICRO-FRAGMENT of the same material as the
 * Drawers/Banners: a translucent, faintly-lit surface with a hairline machined
 * edge and a whisper of depth, carrying its colour mostly in the text/icon and
 * an extremely light tint, never an aggressive fill. The material lives ONCE in
 * `src/styles/badge.css` (the Construction rule, exactly like `.ds-glass` /
 * `.ds-micro`); the component only carries the `ds-badge` class plus
 * `data-variant` (the semantic colour) and `data-appearance` (soft tint / solid
 * fill / outline), and sets its own geometry (size, shape) from tokens. It
 * never draws glass/blur/shadow/rgba in this file, never a hard-coded colour,
 * and is entirely STATIC — no transition, no animation, no focus (it is not
 * focusable and must never be made clickable). `soft` keeps the surface
 * near-neutral and lets the text/icon speak; `outline` is lighter still;
 * `solid` is the single strong voice — a deep, confident fill (GitHub / Linear
 * / Apple), never flashy. `inline-flex` keeps it on the text baseline of the
 * datum it qualifies; the optional icon sits before the label and flips
 * naturally under `dir="rtl"` via flex, with no directional code. A `<span>`
 * with no interactive role or tabindex — purely informative. Future consumers:
 * Client Card, Program Card, Exercise Card, Tables, Lists, Dashboard, Calendar,
 * Search Results, Drawer, Dialog — any surface that qualifies a datum with a
 * compact label.
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

// Geometry only — the material (fill / edge / tint / colour) is delegated to
// `.ds-badge` in badge.css. Sizes give the fragment room to breathe (a taller
// box, more horizontal padding) and set the type scale/weight for presence; the
// height increases strictly xs<sm<md<lg. The icon tracks the label size.
const sizeClasses: Record<BadgeSize, string> = {
  xs: 'h-5 gap-1 px-2 text-caption [&>svg]:h-3 [&>svg]:w-3',
  sm: 'h-6 gap-1 px-2.5 text-caption [&>svg]:h-3.5 [&>svg]:w-3.5',
  md: 'h-7 gap-1.5 px-3 text-body-sm [&>svg]:h-4 [&>svg]:w-4',
  lg: 'h-8 gap-1.5 px-3.5 text-body-sm [&>svg]:h-4 [&>svg]:w-4',
}

// Crisp, machined radii — `rounded` is a tight 8px (never the "candy" 20px),
// `pill` a full capsule, `square` a hard corner.
const shapeClasses: Record<BadgeShape, string> = {
  rounded: 'rounded-xs',
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
      data-variant={variant}
      data-appearance={appearance}
      className={cn(
        'ds-badge inline-flex items-center whitespace-nowrap font-semibold leading-none',
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
