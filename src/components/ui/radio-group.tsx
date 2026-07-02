'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
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
 * Radio — mutually exclusive selection, on the FROZEN micro-control foundation:
 *
 *   GlassSurface → Micro Surface → micro-control → Radio
 *
 * EXACTLY the frozen Checkbox language — same 20px box, same token border, same
 * accent active fill with the dark glyph, same motion, same disabled dim, same
 * invalid rim, same GLOBAL `:focus-visible` ring. The ONLY visual difference:
 * the box is a circle (○) and the glyph is a dot (●) instead of ✓/−. Radio
 * declares no material, shadow, blur, focus or motion of its own (grep-proof).
 * On Radix RadioGroup: roving focus, Arrow keys with loop, Home/End, Space,
 * full ARIA. Radio owns ONLY: selected/unselected, disabled, readOnly,
 * invalid, required, keyboard, aria, group behaviour.
 */

interface RadioGroupContextValue {
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
}
const RadioGroupContext = createContext<RadioGroupContextValue>({})

export interface RadioProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  label?: ReactNode
  /** Muted secondary line under the label. */
  description?: ReactNode
  /** Error rim on this item alone (group-level `invalid` covers all). */
  invalid?: boolean
  /** Which side of the circle the text sits on. */
  labelPosition?: 'right' | 'left'
}

const Radio = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(function Radio(
  {
    className,
    label,
    description,
    invalid,
    labelPosition = 'right',
    disabled,
    id,
    ...props
  },
  ref,
) {
  const group = useContext(RadioGroupContext)
  const autoId = useId()
  const itemId = id ?? autoId
  const descId = `${itemId}-desc`
  const isDisabled = disabled || group.disabled
  const isInvalid = Boolean(invalid || group.invalid)

  return (
    <span
      className={cn(
        'inline-flex items-start gap-2',
        labelPosition === 'left' && 'flex-row-reverse',
      )}
    >
      <span className="flex h-5 items-center pt-px">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          disabled={isDisabled}
          aria-describedby={description ? descId : undefined}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-pill',
            microControlBoxClass,
            microControlActiveClass,
            isInvalid && microControlInvalidClass,
            group.readOnly && 'cursor-default',
            className,
          )}
          {...props}
        >
          {/* The dot — the dark glyph of the frozen fill language (●). */}
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-text">
            <span className="block h-2 w-2 rounded-pill bg-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      </span>
      {(label || description) && (
        <span
          className={cn(
            'flex min-w-0 flex-col gap-0.5',
            isDisabled && 'opacity-40',
          )}
        >
          <Label htmlFor={itemId} className="font-normal">
            {label}
          </Label>
          {description && (
            <span id={descId} className="text-caption text-text-tertiary">
              {description}
            </span>
          )}
        </span>
      )}
    </span>
  )
})

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  label?: ReactNode
  description?: ReactNode
  error?: string
  helperText?: string
  /** Error rim on every radio in the group. */
  invalid?: boolean
  /** Static: focusable, but the selection never changes. */
  readOnly?: boolean
  /** Layout + arrow-key axis. */
  orientation?: 'vertical' | 'horizontal'
}

/** RadioGroup — the exclusive-choice fieldset. Owns the shared label,
 * description, error and helper text; propagates disabled/invalid/readOnly.
 * Arrow keys move AND select (loop); Home/End jump; Space selects. */
const RadioGroupRoot = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup(
  {
    className,
    children,
    label,
    description,
    error,
    helperText,
    invalid,
    readOnly,
    required,
    disabled,
    orientation = 'vertical',
    value,
    defaultValue,
    onValueChange,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const labelId = `${autoId}-label`
  const descId = `${autoId}-desc`
  const errorId = `${autoId}-error`
  const helpId = `${autoId}-help`
  const isInvalid = Boolean(invalid || error)

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {label && (
        <span
          id={labelId}
          className="inline-flex items-center gap-1 text-body-sm font-medium text-text"
        >
          {label}
          {required && (
            <span aria-hidden className="text-error">
              *
            </span>
          )}
        </span>
      )}
      {description && (
        <p id={descId} className="text-caption text-text-tertiary">
          {description}
        </p>
      )}
      <RadioGroupPrimitive.Root
        ref={ref}
        required={required}
        disabled={disabled}
        orientation={orientation}
        loop
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={
          cn(description && descId, error && errorId, helperText && helpId) ||
          undefined
        }
        aria-invalid={isInvalid || undefined}
        aria-readonly={readOnly || undefined}
        // ReadOnly: lock the value (controlled, no change handler) so neither
        // click nor arrow keys can move the selection.
        value={readOnly ? (value ?? defaultValue) : value}
        defaultValue={readOnly ? undefined : defaultValue}
        onValueChange={readOnly ? undefined : onValueChange}
        className={cn(
          'flex gap-3',
          orientation === 'horizontal'
            ? 'flex-row flex-wrap gap-x-6'
            : 'flex-col',
          className,
        )}
        {...props}
      >
        <RadioGroupContext.Provider
          value={{ disabled, invalid: isInvalid, readOnly }}
        >
          {children}
        </RadioGroupContext.Provider>
      </RadioGroupPrimitive.Root>
      {error ? (
        <p id={errorId} className="text-body-sm text-error">
          {error}
        </p>
      ) : helperText ? (
        <p id={helpId} className="text-caption text-text-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  )
})

/** `RadioGroup` + `RadioGroup.Item` (= `Radio`). Label/description/indicator
 * are props — the house pattern of the whole form family. */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: Radio,
})

export { Radio }

/** Back-compat alias for the pre-audit API. */
export const RadioItem = Radio
