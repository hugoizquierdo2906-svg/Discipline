import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlAdornmentClass,
  controlFieldClass,
  controlHostClass,
  controlStateClass,
} from './control-surface'
import { Label } from './label'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> {
  label?: string
  required?: boolean
  /** Error message — sets aria-invalid and links via aria-describedby. */
  error?: string
  helperText?: string
  /** Show a "current/max" character counter (requires maxLength). */
  showCount?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

/**
 * Input — text/email/password/number field. Control Surface (Grammar §2): it
 * renders the shared Liquid Glass optical layers as a recessed, high-transmission
 * well (the validated /dev/input reference), with content on the z-3 plane. The
 * violet caustic rises only on focus — brand light caught inside the material.
 * 16px text avoids iOS zoom; error never relies on color alone (message + rim).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    label,
    required,
    error,
    helperText,
    showCount,
    prefix,
    suffix,
    id,
    value,
    maxLength,
    disabled,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const helpId = `${inputId}-help`
  const errorId = `${inputId}-error`
  const count = typeof value === 'string' ? value.length : 0

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <div
        className={cn(
          controlHostClass,
          controlStateClass({ error: Boolean(error), disabled }),
        )}
      >
        <ControlSurface />
        {prefix && <span className={controlAdornmentClass}>{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cn(error && errorId, helperText && helpId) || undefined
          }
          className={cn(controlFieldClass, className)}
          {...props}
        />
        {suffix && <span className={controlAdornmentClass}>{suffix}</span>}
      </div>
      <div className="flex items-center justify-between gap-2">
        {error ? (
          <span id={errorId} className="text-body-sm text-error">
            {error}
          </span>
        ) : helperText ? (
          <span id={helpId} className="text-caption text-text-tertiary">
            {helperText}
          </span>
        ) : (
          <span />
        )}
        {showCount && maxLength != null && (
          <span className="text-caption text-text-tertiary tabular-nums">
            {count}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
})
