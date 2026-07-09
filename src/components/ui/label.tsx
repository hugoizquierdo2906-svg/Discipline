import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

/**
 * Label — a Forms ACCESSIBILITY primitive, not a presentation one. It answers
 * exactly ONE question: "what is the name of this field?" — never "what is its
 * value?", "is it valid?", or "how do I use it?". It holds no domain knowledge
 * (it does not know a client, a coach, a program or DISCIPLINE) and no state.
 *
 * Why not Text/Typography: those render a `<p>`/`<span>` — styled text with NO
 * label semantics, so a screen reader announces no name for the control. Label
 * renders a real `<label>` bound to the control via `htmlFor`/`id`: clicking the
 * text focuses the field and the name is announced. The difference is SEMANTIC,
 * not stylistic. Why not a Placeholder: it disappears on input and is not a
 * reliable accessible name (it fails WCAG 1.3.1 / 3.3.2 / 4.1.2). Label is the
 * mechanism that satisfies "Labels or Instructions", "Name/Role/Value" and
 * "Info & Relationships". Not a Caption (a secondary legend of content, no
 * `htmlFor`), not a HelperText (instructions/description linked by
 * `aria-describedby`, not `for` — it says HOW, not the NAME), not a Legend (the
 * title of a GROUP inside a `<fieldset>`, e.g. a radio set), not a Fieldset (the
 * grouping container itself).
 *
 * What it NEVER does: validate, show an error, show success, show help, manage
 * state, know the value, or know the form. Those belong to other components
 * (`Field`, `HelperText`, `ErrorMessage`, …).
 *
 * Composes only Typography tokens — NO Card/GlassSurface/Tooltip/Badge/Spinner/
 * Avatar, and NO Icon: a label's one job is to NAME accessibly; an icon adds
 * noise, competes with the field's own affordances and would need `aria-hidden`
 * (a parasite announcement otherwise), so the icon variant is deliberately
 * rejected. Built on Radix Label (a real `<label>`); `htmlFor` binds it to the
 * control (native passthrough). The `required` marker is discreet, token-driven,
 * NEVER red (red would signal an error before any error exists) and NEVER
 * animated — it is `aria-hidden` because the required SEMANTICS live on the
 * control (`required`/`aria-required`), not on the visual asterisk. The label is
 * plain inline so long text and multiline wrap naturally and the marker stays
 * attached to the end of the text under `dir="rtl"` too (a logical margin).
 * `disabled` reflects the control's disabled state (dimmed, never invisible);
 * the existing `peer-disabled` support is kept for the common wrapped pattern.
 */

export interface LabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> {
  /** Renders a subtle, token-driven required marker after the text (never red). */
  required?: boolean
  /** Reflects the control's disabled state — dimmed, but never invisible. */
  disabled?: boolean
}

export const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(function Label({ className, children, required, disabled, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-disabled={disabled || undefined}
      className={cn(
        'text-body-sm font-medium text-text',
        disabled && 'cursor-not-allowed opacity-40',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden className="ms-0.5 text-text-tertiary">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  )
})
