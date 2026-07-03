'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { GlassSurface } from './glass-surface'
import { Label } from './label'
import { microControlInvalidClass } from './micro-control'

/**
 * Switch — an immediate on/off:
 *
 *   GlassSurface → Micro Surface (.ds-glass .ds-micro) → Switch
 *
 * Checkbox and Radio *appear* — a glyph drawn on a resting glass-budget-free
 * box. Switch *moves* — motion replaces the glyph, so the thumb is not a mark
 * on the material, it IS the material: a second, smaller glass object nested
 * inside the rail (the same nested-glass pattern already used for a Button
 * inside a Card). Track and thumb both compose the real, frozen
 * <GlassSurface/> stack — no invented layers. State reads from the rail
 * (a checked-only reveal of the existing violet-caustic layer + the existing
 * Primary halo recipe, both already used by Button) and from thumb position;
 * the thumb itself never changes between checked/unchecked. Geometry
 * (44×24 track, 18px thumb), invalid rim and the GLOBAL `:focus-visible` ring
 * are unchanged. On Radix Switch (Space/Enter, Tab, ARIA switch role). Switch
 * owns ONLY: checked/unchecked, disabled, readOnly, invalid, required, label
 * association + messages, keyboard.
 */

export interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> {
  label?: ReactNode
  /** Muted secondary line under the label. */
  description?: ReactNode
  /** Error message — implies `invalid`; announced via aria-describedby. */
  error?: string
  helperText?: string
  /** Error rim without a message. */
  invalid?: boolean
  /** Static: focusable, but never toggles. */
  readOnly?: boolean
  /** Which side of the track the text sits on. */
  labelPosition?: 'right' | 'left'
}

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch(
  {
    className,
    label,
    description,
    error,
    helperText,
    invalid,
    readOnly,
    labelPosition = 'right',
    required,
    disabled,
    id,
    onClick,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const descId = `${fieldId}-desc`
  const errorId = `${fieldId}-error`
  const helpId = `${fieldId}-help`
  const isInvalid = Boolean(invalid || error)
  const describedBy =
    cn(description && descId, error && errorId, helperText && helpId) ||
    undefined

  const track = (
    <SwitchPrimitive.Root
      ref={ref}
      id={fieldId}
      required={required}
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      aria-readonly={readOnly || undefined}
      aria-describedby={describedBy}
      data-readonly={readOnly ? '' : undefined}
      onClick={(e) => {
        // ReadOnly: swallow the toggle (Space/Enter trigger a click too).
        if (readOnly) e.preventDefault()
        onClick?.(e)
      }}
      className={cn(
        // Explicit px geometry — the DISCIPLINE spacing scale is non-linear
        // (w-11 would be 96px), so the track never trusts scale keys.
        'relative inline-flex h-[24px] w-[44px] shrink-0 items-center rounded-pill',
        'ds-glass ds-micro',
        'transition-[background-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none',
        // Checked = the Micro Surface's own "primary intent" light, reused
        // verbatim: the same violet-caustic layer + the same halo recipe as
        // Button Primary (rgba(139,124,255,…) is --ds-color-accent — no new
        // color). --ds-glass-capture is the SAME token behind that caustic;
        // used here as a translucent tint the existing backdrop-filter (blur
        // + saturate 1.7) catches and diffuses — light passing through the
        // unmodified glass, never a painted fill.
        'data-[state=checked]:bg-[var(--ds-glass-capture)]',
        'data-[state=checked]:shadow-[0_2px_18px_rgba(139,124,255,0.22)]',
        'data-[state=checked]:[&>.ds-glass__body>.ds-glass__violet]:opacity-100',
        isInvalid && cn('border', microControlInvalidClass),
        readOnly && 'cursor-default',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <GlassSurface />
      {/* The thumb — its own nested glass object, sliding. Consistent
          rendering on both states; only position + the rail communicate
          checked/unchecked. */}
      <SwitchPrimitive.Thumb
        className={cn(
          'ds-glass relative z-10 block h-[18px] w-[18px] rounded-pill',
          'transition-transform duration-fast ease-standard motion-reduce:transition-none',
          'translate-x-[2px] data-[state=checked]:translate-x-[22px]',
        )}
      >
        <GlassSurface />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )

  const text = (label || description) && (
    <span
      className={cn('flex min-w-0 flex-col gap-0.5', disabled && 'opacity-40')}
    >
      <Label htmlFor={fieldId} required={required} className="font-normal">
        {label}
      </Label>
      {description && (
        <span id={descId} className="text-caption text-text-tertiary">
          {description}
        </span>
      )}
    </span>
  )

  return (
    <span className="inline-flex flex-col gap-1">
      <span
        className={cn(
          'inline-flex items-start gap-3',
          labelPosition === 'left' && 'flex-row-reverse',
        )}
      >
        <span className="flex h-[24px] items-center">{track}</span>
        {text}
      </span>
      {error ? (
        <span id={errorId} className="text-body-sm text-error">
          {error}
        </span>
      ) : helperText ? (
        <span id={helpId} className="text-caption text-text-tertiary">
          {helperText}
        </span>
      ) : null}
    </span>
  )
})
