import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Code — a Data Display primitive for exactly ONE thing: "this run of text is
 * a technical value, not prose" (a command, a variable name, an endpoint, an
 * HTTP method, a CSS token, a shortcut) — rendered verbatim, monospace,
 * character-for-character, exactly as a machine would read it. It holds no
 * domain knowledge and no state; it does not know what a client, a program or
 * DISCIPLINE is.
 *
 * Not Text/Heading (proportional prose — no monospace, no `<code>` semantics,
 * so a screen reader or a "block distracting fonts" browser setting never
 * learns this is code, and kerning/glyph width are not preserved verbatim).
 * Not Badge (a small property ATTACHED to a datum, e.g. "Active" — it
 * QUALIFIES; Code IS the value itself, with no colour-coded meaning and no
 * surface of its own). Not Label (names a FORM FIELD via `htmlFor` — an
 * accessibility relationship, an entirely different axis). Not Link/Button
 * (interactive, own hover/focus/active states and `href`/`onClick`; Code is
 * inert — no affordance, nothing to activate). Not Tooltip (a transient
 * contextual popup, not a persistent inline value). Not a dedicated
 * Keyboard-Shortcut/Kbd primitive: per the HTML spec `<code>` is "a fragment
 * of computer code" and `<kbd>` is "user input, typically keyboard" — two
 * different semantics for two different kinds of value. Code does not fork
 * itself over this; it defaults to `<code>` and exposes `asChild` so a caller
 * renders the identical, discreet material on a `<kbd>` instead when the
 * content is something to TYPE rather than a value to READ (see the Keyboard
 * Shortcut demo). Not CodeBlock/Terminal/Monaco/CodeMirror (multi-line,
 * scrollable, often syntax-highlighted or editable SURFACES for many lines of
 * source — a larger, different responsibility; Code is exactly one line: no
 * `language`, no line numbers, no editing, no block mode — a CodeBlock is a
 * legitimate future sibling, never a variant of this component). Not Markdown
 * (a whole-document renderer that may itself USE Code for its own inline
 * spans — an ingredient, never a competitor).
 *
 * Composes ONLY Typography tokens — no GlassSurface/Card/Badge/Tooltip/
 * Popover/Dropdown/Button/Link, no hover/active/focus styling, no transition
 * or animation, no icon, no copy button, no syntax highlighting, no language
 * selector. No `size`/`variant`/`color`/`weight` prop: Code sets no font-size
 * of its own (the browser default of `font-size: inherit` is kept), so it
 * always matches whatever text context it sits inside — a large sentence, a
 * caption, a bare paragraph — instead of imposing a fixed size that would
 * clash with it. `asChild` (Radix Slot) is the only escape hatch, for the
 * `<kbd>` case above and for polymorphic composition — never a copy/edit/
 * language mode.
 */

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders the child element (Radix Slot) instead of the default `<code>` —
   * e.g. `<Code asChild><kbd>⌘K</kbd></Code>` when the content is user input
   * to type, not a value to read. */
  asChild?: boolean
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { asChild = false, className, ...props },
  ref,
) {
  const codeClassName = cn(
    'break-words rounded-xs bg-surface px-1 py-0.5 font-mono text-text',
    className,
  )

  if (asChild) {
    return <Slot ref={ref} className={codeClassName} {...props} />
  }

  return <code ref={ref as never} className={codeClassName} {...props} />
})
