import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

import { Label } from './label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

/**
 * Textarea — multiline field. Same field language as Input (canonical §12.5).
 * Vertical resize only; min height keeps a comfortable target.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, label, required, error, helperText, id, ...props },
    ref,
  ) {
    const autoId = useId()
    const fieldId = id ?? autoId
    const helpId = `${fieldId}-help`
    const errorId = `${fieldId}-error`

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cn(error && errorId, helperText && helpId) || undefined
          }
          className={cn(
            'min-h-24 resize-y rounded-sm border bg-surface px-4 py-3 text-body text-text outline-none',
            'placeholder:text-text-tertiary focus:border-accent-accessible',
            'disabled:cursor-not-allowed disabled:opacity-40',
            error ? 'border-error' : 'border-border',
            className,
          )}
          {...props}
        />
        {error ? (
          <span id={errorId} className="text-body-sm text-error">
            {error}
          </span>
        ) : helperText ? (
          <span id={helpId} className="text-caption text-text-tertiary">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)
