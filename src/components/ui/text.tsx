import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Text — a Typography primitive that answers exactly ONE question: "this is
 * textual content." It never decides a title, an action, a property, a
 * technical value, a field name or a navigation position — only the body of
 * the content. It holds no domain knowledge and no state.
 *
 * Not a bare `<span>`: a `<span>` carries no relationship to DISCIPLINE's
 * type tokens — every consumer would reach for its own ad-hoc font-size/
 * color/line-height, and the moment those tokens evolve, prose across the
 * product drifts out of sync one hand-written className at a time. Text is
 * the ONE place body copy is anchored to the canonical scale, so the whole
 * product's prose moves together. Not Heading (participates in the h1–h6
 * outline screen readers navigate by — a structural, one-per-title role;
 * Text is the un-numbered body that follows a title, any number of
 * instances, no outline entry). Not Label (names a form field via `htmlFor`
 * — an accessibility relationship to a control, not prose). Not Code (a
 * verbatim technical value, monospace, character-exact — never body copy).
 * Not Badge (a small property attached to a datum, its own tinted surface).
 * Not Paragraph (not a separate primitive here — `<Text as="p">`, the
 * default, covers it; a dedicated Paragraph would only duplicate Text with
 * a narrower `as`). Not Caption (a smaller, secondary annotation UNDER other
 * content, e.g. under an image — a distinct, smaller role Text does not
 * claim; a future sibling, never a `size` on Text). Not Link (interactive,
 * carries `href`, its own visited/hover/focus states — Text is inert, never
 * clickable). Not Button (interactive, triggers an action). Not HelperText
 * (instruction/description tied to a specific form field via
 * `aria-describedby`, with its own error/success tone semantics — a Forms
 * concern; Text carries no such wiring or state).
 *
 * `as` selects the SEMANTIC tag only — `p` (default), `span`, `div`,
 * `strong`, `em`, `small` — never the visual style: `strong`/`em`/`small`
 * keep their native browser meaning (importance / stress / side comment) via
 * real HTML semantics, not a custom weight or size token. Composes ONLY HTML
 * semantics and Typography tokens — no GlassSurface/Card/Badge/Icon/Tooltip,
 * no hover/focus/transition/animation, no margin or padding of its own. No
 * `variant`/`weight`/`size`/`color`/`gradient`/`shadow`/`uppercase`/
 * `tracking`/`align`/`responsive`/`animation`/`icon` prop: Text renders the
 * one canonical body style from tokens (`text-body text-text`); a consumer
 * needing a different token combination (a smaller size, a secondary tone)
 * reaches for `className`, exactly like every other DISCIPLINE primitive —
 * Text does not grow a second, redundant styling API on top of Tailwind's.
 */

type TextTag = 'p' | 'span' | 'div' | 'strong' | 'em' | 'small'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic tag — `p` (default), `span`, `div`, `strong`, `em`, `small`.
   * Changes meaning only; never the visual style. */
  as?: TextTag
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Tag = 'p', className, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref as never}
      className={cn('text-body text-text', className)}
      {...props}
    />
  )
})
