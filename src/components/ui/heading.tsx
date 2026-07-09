import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Heading — a Typography primitive that answers exactly ONE question: "this
 * information is a title." It never decides a layout, a section, a business
 * hierarchy, a navigation position or an action — only a typographic
 * importance. It holds no domain knowledge and no state.
 *
 * Not a bigger Text: Text is prose with no place in the document outline —
 * any size, any number of instances, no heading semantics. A Heading
 * participates in the h1–h6 outline that screen readers and browsers use to
 * navigate a page (a "Headings" list in a screen reader, `Cmd/Ctrl+.`-style
 * jump lists); rendering a title as a styled `<p>`/`<span>` erases that
 * structure entirely — the difference is SEMANTIC, not merely visual size.
 * Not Label (names a form field via `htmlFor` — an accessibility relationship
 * to a control, not a title). Not Code (a verbatim technical value, monospace
 * — never a title). Not Badge (a small property attached to a datum). Not
 * Button (interactive, triggers an action — a Heading is inert, nothing to
 * activate). Not CardHeader (a LAYOUT region of a Card — padding, a border,
 * an optional action slot — that USES a Heading for its title; a region is
 * not typography). Not PageHeader (a page-level layout composite — title +
 * breadcrumb + actions + tabs — business composition that also USES a
 * Heading as one ingredient). Not Hero (a marketing layout section with a
 * background, a CTA and full-bleed/alignment decisions — Invariant A1 forbids
 * a base component from ever making those layout calls). Not "Title" (an
 * ambiguous term elsewhere for a document/browser-tab title or used loosely
 * as a synonym — DISCIPLINE names the typographic primitive Heading and
 * nothing else). Not Caption (the smallest, secondary annotation under
 * content — outside the heading hierarchy, usually no heading semantics at
 * all).
 *
 * `level` (1–6) is the VISUAL importance, from the canonical type scale only.
 * `as` is the SEMANTIC tag — decoupled from `level` (as Primer's `Heading`
 * and Atlassian's `@atlaskit/heading` both do), so a page can render, say, a
 * visually small `h2` inside a component that must still nest under an `h1`
 * without breaking the true document outline: `<Heading as="div" level={2}>`
 * keeps the visual size while opting out of heading semantics entirely, and
 * `<Heading as="h3" level={2}>` keeps the correct outline position with a
 * different visual size. Composes ONLY HTML semantics and Typography tokens —
 * no GlassSurface/Card/Badge/Icon/Tooltip, no hover/focus/transition/
 * animation, no internal margin (`margin-top`/`margin-bottom` are always
 * zero — spacing between a Heading and its neighbours is the CONSUMER's
 * layout decision, per Invariant A1). No `variant`/`weight`/`size`/`color`/
 * `gradient`/`animated`/`icon`/`align`/`uppercase`/`tracking`/`shadow`/
 * `underline`/`responsive` prop — every one of those is either a layout
 * decision (delegate to the consumer) or already fully determined by `level`
 * from the frozen type scale.
 *
 * DISCIPLINE's canonical type scale (`docs/DISCIPLINE_CANONICAL_TOKENS.md`)
 * defines five heading sizes (`--ds-text-h1`…`h5`) — there is no `h6` token,
 * by design, matching how reference systems (Material Design 3's five-role
 * Headline/Title scale, Carbon's Heading tokens) do not keep inventing an
 * ever-smaller visual step per nesting level. A `level={6}` heading is a real,
 * if rare, document-outline need (very deep nesting), so it reuses the
 * smallest defined visual size (`h5`) rather than inventing a new token
 * outside the frozen, now-locked type scale — a token gap, reported rather
 * than silently patched.
 */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const levelClassName: Record<HeadingLevel, string> = {
  1: 'text-h1 font-semibold',
  2: 'text-h2 font-semibold',
  3: 'text-h3 font-semibold',
  4: 'text-h4 font-medium',
  5: 'text-h5 font-medium',
  6: 'text-h5 font-medium',
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual importance (1–6), from the canonical type scale only. */
  level?: HeadingLevel
  /** Semantic tag — decoupled from `level` so document order stays correct
   * independently of visual size. Defaults to `h${level}`. A non-heading
   * element (e.g. `"div"`) opts out of heading semantics entirely while
   * keeping the visual size. */
  as?: HeadingTag | React.ElementType
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 2, as, className, ...props }, ref) {
    const Tag = as ?? (`h${level}` as HeadingTag)
    return (
      <Tag
        ref={ref as never}
        className={cn('text-text', levelClassName[level], className)}
        {...props}
      />
    )
  },
)
