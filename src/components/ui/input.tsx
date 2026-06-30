import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

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
 * Input — text/email/password/number field. Canonical §12.5: 44px height,
 * radius-sm, body (16px) to avoid iOS zoom, accent-accessible focus border +
 * the global focus ring. Error never relies on color alone (message + icon-ready).
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
          'flex h-11 items-center gap-2 rounded-sm border bg-surface px-4',
          'focus-within:border-accent-accessible',
          error ? 'border-error' : 'border-border',
        )}
      >
        {prefix && <span className="text-text-tertiary">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cn(error && errorId, helperText && helpId) || undefined
          }
          className={cn(
            'min-w-0 flex-1 bg-transparent text-body text-text outline-none',
            'placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:opacity-40',
            className,
          )}
          {...props}
        />
        {suffix && <span className="text-text-tertiary">{suffix}</span>}
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
