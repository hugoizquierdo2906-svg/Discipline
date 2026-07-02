'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { Label } from './label'
import {
  microControlActiveClass,
  microControlBoxClass,
  microControlInvalidClass,
} from './micro-control'

/**
 * Checkbox — the canonical small Micro control:
 *
 *   GlassSurface → Micro Surface (Button reference) → Checkbox
 *
 * The Micro role's full glass lives on Button; at 20px the Glass Budget (§3)
 * leaves a small control almost no presence to spend, so Checkbox composes the
 * shared micro-control expression (micro-control.tsx: token box · accent
 * active fill · dark glyph · fast motion) and the GLOBAL `:focus-visible` ring
 * — it declares no material, shadow, blur, focus or motion of its own.
 * On Radix Checkbox (Space/keyboard, ARIA, indeterminate, label association).
 * Checkbox owns ONLY: checked / unchecked / indeterminate, disabled, readOnly,
 * required, invalid + messages, label/description association and position.
 * The single source of truth for CheckboxGroup, TreeView, permissions,
 * settings, filters, tables, forms and Command Palette options.
 */

interface CheckboxGroupContextValue {
  disabled?: boolean
  invalid?: boolean
}
const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({})

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: ReactNode
  /** Muted secondary line under the label. */
  description?: ReactNode
  /** Error message — implies `invalid`; announced via aria-describedby. */
  error?: string
  helperText?: string
  /** Error rim without a message (e.g. group-level error). */
  invalid?: boolean
  /** Static: visible and focusable, but never toggles. */
  readOnly?: boolean
  /** Which side of the box the text sits on. */
  labelPosition?: 'right' | 'left'
}

const CheckboxRoot = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
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
  const group = useContext(CheckboxGroupContext)
  const autoId = useId()
  const fieldId = id ?? autoId
  const descId = `${fieldId}-desc`
  const errorId = `${fieldId}-error`
  const helpId = `${fieldId}-help`
  const isDisabled = disabled || group.disabled
  const isInvalid = Boolean(invalid || error || group.invalid)
  const describedBy =
    cn(description && descId, error && errorId, helperText && helpId) ||
    undefined

  const box = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={fieldId}
      required={required}
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      aria-readonly={readOnly || undefined}
      aria-describedby={describedBy}
      data-readonly={readOnly ? '' : undefined}
      onClick={(e) => {
        // ReadOnly: swallow the toggle (Space triggers a click too).
        if (readOnly) e.preventDefault()
        onClick?.(e)
      }}
      className={cn(
        'group flex h-5 w-5 items-center justify-center rounded-xs',
        microControlBoxClass,
        microControlActiveClass,
        isInvalid && microControlInvalidClass,
        readOnly && 'cursor-default',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-text">
        {/* Icons driven by data-state (not the prop) so uncontrolled
            indeterminate renders correctly. */}
        <Check size={14} className="group-data-[state=indeterminate]:hidden" />
        <Minus
          size={14}
          className="hidden group-data-[state=indeterminate]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  const text = (label || description) && (
    <span
      className={cn(
        'flex min-w-0 flex-col gap-0.5',
        isDisabled && 'opacity-40',
      )}
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
          'inline-flex items-start gap-2',
          labelPosition === 'left' && 'flex-row-reverse',
        )}
      >
        <span className="flex h-5 items-center pt-px">{box}</span>
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

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: ReactNode
  description?: ReactNode
  error?: string
  helperText?: string
  required?: boolean
  /** Dim + lock every checkbox in the group. */
  disabled?: boolean
  /** Error rim on every checkbox in the group. */
  invalid?: boolean
}

/** CheckboxGroup — a fieldset of related checkboxes (single or multiple).
 * Propagates `disabled`/`invalid` via context; owns the shared label,
 * description, error and helper text. */
export const CheckboxGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxGroupProps
>(function CheckboxGroup(
  {
    className,
    children,
    label,
    description,
    error,
    helperText,
    required,
    disabled,
    invalid,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const errorId = `${autoId}-error`
  const helpId = `${autoId}-help`
  const isInvalid = Boolean(invalid || error)

  return (
    <fieldset
      ref={ref}
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      aria-describedby={cn(error && errorId, helperText && helpId) || undefined}
      className={cn('flex min-w-0 flex-col gap-3 border-0 p-0', className)}
      {...props}
    >
      {label && (
        <legend className="inline-flex items-center gap-1 p-0 text-body-sm font-medium text-text">
          {label}
          {required && (
            <span aria-hidden className="text-error">
              *
            </span>
          )}
        </legend>
      )}
      {description && (
        <p className="text-caption text-text-tertiary">{description}</p>
      )}
      <CheckboxGroupContext.Provider value={{ disabled, invalid: isInvalid }}>
        <div className="flex flex-col gap-3">{children}</div>
      </CheckboxGroupContext.Provider>
      {error ? (
        <p id={errorId} className="text-body-sm text-error">
          {error}
        </p>
      ) : helperText ? (
        <p id={helpId} className="text-caption text-text-tertiary">
          {helperText}
        </p>
      ) : null}
    </fieldset>
  )
})

/** `Checkbox` + `.Group`. Label/description/indicator are props (the house
 * pattern of the whole form family), not separate exports. */
export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})
