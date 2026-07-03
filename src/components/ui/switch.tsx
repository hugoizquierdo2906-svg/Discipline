'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef, useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Label } from './label'
import {
  microControlActiveClass,
  microControlBoxClass,
  microControlInvalidClass,
  microControlThumbClass,
} from './micro-control'

/**
 * Switch — an immediate on/off, on the FROZEN micro-control foundation:
 *
 *   GlassSurface → Micro Surface → micro-control → Switch
 *
 * EXACTLY the frozen Checkbox/Radio language — same token border, same accent
 * active fill, same motion, same disabled dim, same invalid rim, same GLOBAL
 * `:focus-visible` ring. Only the geometry changes: a 44×24 track and a
 * sliding 18px thumb — the thumb IS the dark glyph (the ✓/● philosophy, in
 * motion). Switch declares no material, shadow, blur, focus or motion of its
 * own (grep-proof). On Radix Switch (Space/Enter, Tab, ARIA switch role).
 * Switch owns ONLY: checked/unchecked, disabled, readOnly, invalid, required,
 * label association + messages, keyboard.
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
        'relative inline-flex h-[24px] w-[44px] items-center rounded-pill',
        microControlBoxClass,
        microControlActiveClass,
        isInvalid && microControlInvalidClass,
        readOnly && 'cursor-default',
        className,
      )}
      {...props}
    >
      {/* The thumb — the dark glyph, sliding. */}
      <SwitchPrimitive.Thumb
        className={cn(
          microControlThumbClass,
          'h-[18px] w-[18px] translate-x-[2px] data-[state=checked]:translate-x-[22px]',
        )}
      />
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
