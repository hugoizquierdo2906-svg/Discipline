'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, useId, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Label } from './label'
import {
  MicroGlass,
  microControlActiveGlassClass,
  microControlInvalidClass,
  microControlThumbMotionClass,
} from './micro-control'

/**
 * Slider — a continuous value manipulated by direct position:
 *
 *   the frozen optical-layer stack → Micro Surface (.ds-glass .ds-micro) →
 *   micro-control → Slider
 *
 * Not Switch: Switch is binary (a choice, two discrete states). Slider has no
 * state at all, only a value. Not Progress: Progress is system-driven and
 * read-only; Slider is user-driven, read-write, and IS the thing you drag.
 * Not a Range Slider: a single value only — two thumbs is a separate,
 * later primitive. Not a Scrollbar: a viewport position is not a business
 * value.
 *
 * Same family as Checkbox/Radio/Switch — Track and Thumb each nest the real,
 * frozen glass stack via `<MicroGlass/>` (micro-control.tsx never named
 * here directly). The Range is Slider's "activated glass": the exact
 * illuminated accent already validated on the frozen Switch rail, spent
 * unconditionally since Range has no on/off state — only more or less of the
 * track is filled. Motion is the shared sliding-thumb recipe; the ring is
 * the one global rule, never redeclared. Slider owns only geometry (size,
 * orientation) and behavior (value, readOnly, invalid).
 */

export type SliderSize = 'sm' | 'md' | 'lg'

const trackSizeClass: Record<
  SliderSize,
  { horizontal: string; vertical: string }
> = {
  sm: { horizontal: 'h-[4px] w-full', vertical: 'w-[4px] h-full' },
  md: { horizontal: 'h-[6px] w-full', vertical: 'w-[6px] h-full' },
  lg: { horizontal: 'h-[8px] w-full', vertical: 'w-[8px] h-full' },
}

const thumbSizeClass: Record<SliderSize, string> = {
  sm: 'h-[16px] w-[16px]',
  md: 'h-[18px] w-[18px]',
  lg: 'h-[22px] w-[22px]',
}

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange' | 'dir'
> {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  label?: ReactNode
  description?: ReactNode
  /** Error message — implies `invalid`; announced via aria-describedby. */
  error?: string
  helperText?: string
  /** Error rim without a message. */
  invalid?: boolean
  /** Radix Slider has no native `required` — surfaced here for the label
   * marker and `aria-required` (form validation reads the ARIA attribute). */
  required?: boolean
  /** Static: reachable by keyboard, but never changes value. */
  readOnly?: boolean
  size?: SliderSize
}

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    className,
    label,
    description,
    error,
    helperText,
    invalid,
    readOnly,
    size = 'md',
    value,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    required,
    id,
    orientation = 'horizontal',
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

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? [min])
  const currentValue = isControlled ? value : internalValue

  function handleValueChange(next: number[]) {
    // ReadOnly: swallow the change (drag/arrow keys stay inert).
    if (readOnly) return
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  const track = (
    <SliderPrimitive.Root
      ref={ref}
      id={fieldId}
      value={currentValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      orientation={orientation}
      aria-invalid={isInvalid || undefined}
      aria-readonly={readOnly || undefined}
      aria-required={required || undefined}
      data-readonly={readOnly ? '' : undefined}
      aria-describedby={describedBy}
      className={cn(
        'relative flex touch-none select-none items-center',
        orientation === 'horizontal' ? 'w-full' : 'h-full w-fit flex-col',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40',
        readOnly && 'cursor-default',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          'ds-glass ds-micro relative grow overflow-hidden rounded-pill',
          trackSizeClass[size][orientation],
          isInvalid && cn('border', microControlInvalidClass),
        )}
      >
        <MicroGlass />
        <SliderPrimitive.Range
          className={cn(
            'ds-glass absolute rounded-pill',
            orientation === 'horizontal' ? 'h-full' : 'w-full',
            microControlActiveGlassClass,
          )}
        >
          <MicroGlass />
        </SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'ds-glass relative z-10 block rounded-pill',
          thumbSizeClass[size],
          microControlThumbMotionClass,
        )}
      >
        <MicroGlass />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
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
    <div className="flex flex-col gap-2">
      {text}
      {track}
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
})
