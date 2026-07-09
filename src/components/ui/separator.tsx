import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Separator — a Layout primitive that answers exactly ONE question: "these
 * two groups of content are visually distinct." It creates no spacing, no
 * section, no surface, and manages no layout of its own — it only
 * materializes a boundary. It holds no domain knowledge and no state, and
 * has no content: it can never carry children, a label or an icon.
 *
 * Why not a bare `<hr>`: `<hr>` is block-only (no vertical orientation), and
 * per the HTML5 spec it carries an implicit "thematic break" meaning — a
 * shift in topic within prose — which misdescribes a UI-level divider
 * between, say, two toolbar icons or a sidebar and its content. It also
 * ships default browser margin/border styling that every consumer would
 * have to reset by hand. Separator is a single primitive for both
 * orientations, ships with zero margin by construction, and exposes the
 * WAI-ARIA Separator pattern properly (`role="separator"` +
 * `aria-orientation`, present only when it is semantically meaningful — see
 * `decorative` below) — a contract `<hr>` does not give you.
 *
 * Not Divider (the name used elsewhere, e.g. Material Design 3 — DISCIPLINE
 * names this component after the ARIA/WAI-APG term its role implements,
 * `separator`, so the component and the accessibility contract share one
 * name). Not Border (a CSS property applied to an existing element's own
 * edge — part of that element's material, not a standalone piece of content
 * with its own accessibility role). Not Spacer (creates space with NO visible
 * mark — the opposite responsibility: Spacer is invisible, Separator is a
 * visible, if extremely quiet, boundary). Not Card/GlassCard (a structural
 * SURFACE that contains content, with padding and a background — Separator
 * has zero surface, zero padding, zero content). Not Section (a structural,
 * landmark grouping of content, typically with children — Separator is a
 * content-less leaf, never a container). Not Stack (a layout primitive that
 * arranges children via `gap` — a Stack may place Separators between its
 * children as a convenience, but Stack's own responsibility is arrangement,
 * never materializing the boundary itself). Not Grid (pure column/row
 * layout, no semantic boundary meaning). Not Heading (a typographic
 * hierarchy signal about IMPORTANCE — Separator carries no content and no
 * meaning about importance, only adjacency).
 *
 * Composes ONLY Radix Separator (which supplies the WAI-ARIA Separator
 * pattern: `role="separator"` + `aria-orientation` when `decorative={false}`,
 * and — per the APG's own guidance that a purely decorative divider should
 * carry no semantics — `role="none"` when `decorative` is true, the default,
 * explicitly stripping any implicit role rather than merely omitting one)
 * plus DISCIPLINE's colour and hairline-
 * thickness tokens. No GlassSurface/Card/Badge/Button/Tooltip/Popover, no
 * shadow/blur/gradient/glow, no transition or animation, no icon, no label
 * or text, no children of any kind, no JS logic. `orientation` supports
 * `horizontal` (default, a full-width hairline) and `vertical` (a full-height
 * hairline) — the height/width in the cross axis is intentionally the
 * consumer's layout to size (e.g. `h-5` inside a toolbar), never a
 * `size` prop on Separator itself.
 */

export type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
>

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  { className, orientation = 'horizontal', decorative = true, ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-divider',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
})
