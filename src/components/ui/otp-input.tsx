'use client'

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from 'react'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlCellClass,
  controlFieldClass,
  controlStateClass,
} from './control-surface'
import { Label } from './label'

/**
 * OTP Input — a specialized field for entering a code made of several
 * independent characters that together represent exactly ONE logical value
 * (a verification/one-time-passcode). Several visual cells, one logical
 * string.
 *
 *   the frozen optical-layer stack → Control Surface → OTP Input
 *
 * Not Input: Input carries one character stream in one box; OTP Input's box
 * COUNT is the whole point (each digit needs its own legible cell so a
 * 6-digit code can be read and corrected at a glance) — a single `<Input
 * maxLength={6}>` cannot do smart per-position Backspace, per-position arrow
 * navigation, or auto-advance. Not Autocomplete / Combobox / Select /
 * MultiSelect: all four resolve typed or chosen text against a set of
 * candidate strings; an OTP code is never matched against options, it is
 * simply received. Not Search Input: nothing is filtered — the code is the
 * value itself, not a query. Not Password Input: a password is ONE opaque
 * string in ONE field, revealed/hidden as a whole; an OTP code is legible by
 * construction (the user needs to visually verify what they typed matches
 * what they received) and is split across boxes precisely so each character
 * can be independently confirmed. Not Pin Display / Code Viewer: those
 * PRESENT a code that already exists, read-only, to be copied or watched —
 * this component's whole job is to accept typed/pasted INPUT and produce a
 * value. Not Verification Card: a Verification Card is a page-level
 * composition (heading, instructions, resend action, submit button) built
 * AROUND a field like this one — a layout concern that belongs to a
 * consumer, not to the field. Not Form Group: a Form Group only lays out
 * several independent fields together; here there is exactly ONE field, one
 * logical value — the cells are not independent fields, they are one
 * value's own internal geometry.
 *
 * Composition: each cell is the exact Control Surface well
 * (`.ds-glass .ds-control` + `<ControlSurface/>`) Input itself renders,
 * compacted into a square via the new `controlCellClass` (additive, `Input`
 * untouched) — never a second glass recipe. A real `<input maxLength={1}>`
 * sits in every cell (not a styled `<div>` showing a character) so native
 * text selection, IME composition, screen readers, and mobile numeric
 * keyboards all keep working for free. Typing advances focus to the next
 * empty cell; Backspace on an empty cell moves back and clears the previous
 * cell; Arrow Left/Right/Home/End move between cells; pasting a full code
 * anywhere splits it across the remaining cells from that point on.
 */

export type OtpInputSize = 'sm' | 'md' | 'lg'

const cellSizeClass: Record<OtpInputSize, string> = {
  sm: 'h-8 w-7 text-body-sm',
  md: 'h-10 w-8 text-body',
  lg: 'h-11 w-9 text-body-lg',
}

export interface OtpInputProps {
  /** Number of characters the code is made of. */
  length?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Fires once every cell holds a character. */
  onComplete?: (value: string) => void
  /** Restrict input to digits and show a numeric keyboard on mobile. */
  numeric?: boolean
  label?: string
  description?: string
  helperText?: string
  error?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  size?: OtpInputSize
  className?: string
  id?: string
  /** Renders a hidden field carrying the joined value for native form
   * submission. */
  name?: string
  'aria-label'?: string
  'data-testid'?: string
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  function OtpInput(
    {
      length = 6,
      value,
      defaultValue,
      onValueChange,
      onComplete,
      numeric = true,
      label,
      description,
      helperText,
      error,
      invalid,
      required,
      disabled,
      readOnly,
      autoFocus,
      size = 'md',
      className,
      id,
      name,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
    },
    ref,
  ) {
    const autoId = useId()
    const groupId = id ?? autoId
    const descId = `${groupId}-desc`
    const helpId = `${groupId}-help`
    const errorId = `${groupId}-error`
    const isInvalid = Boolean(invalid || error)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = isControlled ? value : internalValue
    const chars = Array.from({ length }, (_, i) => currentValue[i] ?? '')
    const cellRefs = useRef<(HTMLInputElement | null)[]>([])
    // Set right before any focus move WE trigger (auto-advance, arrow
    // keys, paste), so the resulting focus event can be told apart from a
    // genuine user click/tab — see handleFocus.
    const programmaticFocusRef = useRef(false)

    function setValue(next: string) {
      const trimmed = next.slice(0, length)
      if (!isControlled) setInternalValue(trimmed)
      onValueChange?.(trimmed)
      if (trimmed.length === length) onComplete?.(trimmed)
    }

    function focusCell(index: number) {
      programmaticFocusRef.current = true
      cellRefs.current[index]?.focus()
    }

    function handleChange(index: number, raw: string) {
      if (disabled || readOnly) return
      const digit = (numeric ? raw.replace(/[^0-9]/g, '') : raw).slice(-1)
      const next = [...chars]
      next[index] = digit
      setValue(next.join(''))
      if (digit && index < length - 1) focusCell(index + 1)
    }

    // A plain joined string can only represent a CONTIGUOUS run of filled
    // cells (an interior blank has no way to keep its position once
    // re-split from the string). Rather than inventing a padding
    // character that would leak into the public string value, a cell
    // focused directly by the USER past an earlier empty one redirects to
    // that earlier cell instead — gaps become structurally impossible, so
    // the join/split round-trip is always safe. Clicking an already-filled
    // cell (to correct a digit) is unaffected: there is no earlier empty
    // cell to redirect to. Focus moves WE trigger ourselves
    // (auto-advance/arrows/paste) are exempt via `programmaticFocusRef`,
    // since they land mid-render on a still-stale `chars` closure and must
    // never be second-guessed.
    function handleFocus(index: number, e: FocusEvent<HTMLInputElement>) {
      if (programmaticFocusRef.current) {
        programmaticFocusRef.current = false
        e.target.select()
        return
      }
      const firstEmpty = chars.findIndex((c) => c === '')
      if (firstEmpty !== -1 && firstEmpty < index) {
        focusCell(firstEmpty)
        return
      }
      e.target.select()
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
      if (disabled || readOnly) return
      if (e.key === 'Backspace' && chars[index] === '' && index > 0) {
        e.preventDefault()
        const next = [...chars]
        next[index - 1] = ''
        setValue(next.join(''))
        focusCell(index - 1)
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault()
        focusCell(index - 1)
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault()
        focusCell(index + 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        focusCell(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        focusCell(length - 1)
      }
    }

    function handlePaste(index: number, e: ClipboardEvent<HTMLInputElement>) {
      if (disabled || readOnly) return
      e.preventDefault()
      const text = e.clipboardData.getData('text')
      const filtered = numeric ? text.replace(/[^0-9]/g, '') : text
      if (!filtered) return
      const incoming = filtered.slice(0, length - index).split('')
      const next = [...chars]
      incoming.forEach((char, offset) => {
        next[index + offset] = char
      })
      setValue(next.join(''))
      focusCell(Math.min(index + incoming.length, length - 1))
    }

    return (
      <div ref={ref} className="flex flex-col gap-2">
        {label && (
          <Label htmlFor={`${groupId}-0`} required={required}>
            {label}
          </Label>
        )}
        {description && (
          <span id={descId} className="text-caption text-text-tertiary">
            {description}
          </span>
        )}
        <div
          role="group"
          aria-label={label ?? ariaLabel}
          aria-describedby={
            cn(description && descId, error && errorId, helperText && helpId) ||
            undefined
          }
          className={cn('flex gap-1.5', className)}
        >
          {chars.map((char, index) => (
            <div
              key={index}
              className={cn(
                controlCellClass,
                cellSizeClass[size],
                controlStateClass({ error: isInvalid, disabled }),
              )}
            >
              <ControlSurface />
              <input
                ref={(el) => {
                  cellRefs.current[index] = el
                }}
                id={`${groupId}-${index}`}
                data-testid={dataTestId ? `${dataTestId}-${index}` : undefined}
                type="text"
                inputMode={numeric ? 'numeric' : 'text'}
                pattern={numeric ? '[0-9]*' : undefined}
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={char}
                disabled={disabled}
                readOnly={readOnly}
                // The consumer opts in explicitly per field (e.g. a
                // verification screen focusing its one OTP field on
                // mount) — never on by default.
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus && index === 0}
                aria-label={`Digit ${index + 1} of ${length}`}
                aria-invalid={isInvalid || undefined}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                onFocus={(e) => handleFocus(index, e)}
                className={cn(
                  controlFieldClass,
                  'w-full text-center tabular-nums',
                )}
              />
            </div>
          ))}
        </div>
        {name && <input type="hidden" name={name} value={currentValue} />}
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
        </div>
      </div>
    )
  },
)
