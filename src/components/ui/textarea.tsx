import { forwardRef, useId } from 'react'

import { cn } from '@/lib/cn'

import { ControlSurface, controlStateClass } from './control-surface'
import { Label } from './label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

/**
 * Textarea — multiline Control Surface. Same material language as Input: it
 * renders the shared Liquid Glass optical layers as a recessed well, with the
 * text plane on z-3. Geometry is the only difference (taller, top-aligned,
 * vertical resize). Violet rises on focus; error turns the machined rim.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, label, required, error, helperText, id, disabled, ...props },
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
        <div
          className={cn(
            'ds-glass ds-control relative flex rounded-md p-4',
            controlStateClass({ error: Boolean(error), disabled }),
          )}
        >
          <ControlSurface />
          <textarea
            ref={ref}
            id={fieldId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              cn(error && errorId, helperText && helpId) || undefined
            }
            className={cn(
              'relative z-[3] min-h-24 w-full resize-y bg-transparent text-body text-text outline-none',
              'placeholder:text-text-tertiary disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>
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
