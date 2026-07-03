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

import { ControlSurface, controlStateClass } from './control-surface'
import { Label } from './label'
import {
  MicroGlass,
  microControlColorMotionClass,
  microControlSelectedGlassClass,
} from './micro-control'

/**
 * SegmentedControl — an exclusive choice among 2–6 options, ALL visible at
 * once, optimized for instant comparison:
 *
 *   the frozen optical-layer stack → Control Surface → SegmentedControl
 *
 * Not RadioGroup: Radio is a form field (a label + description per option,
 * a long list, a vertical stack) read top to bottom. SegmentedControl is an
 * interface control (a toolbar/preference switch, a compact strip) read at
 * a glance. Not Tabs: Tabs own a content panel and change what the page
 * shows; SegmentedControl only changes a value — nothing else on the page
 * is implied to change. Not a Button Group: a button group is a cluster of
 * independent actions, each one fires something; a segment never fires
 * anything, it only marks "this one, not the others." Not a Toggle Group:
 * a toggle group's items are independently on/off (zero, one, or many can
 * be pressed); a segment is exclusive by construction — exactly one is ever
 * selected. Not Select: Select trades visibility for density (one option
 * shown, the rest hidden behind an open interaction) for long lists;
 * SegmentedControl trades density for visibility — 2 to 6 options, never
 * hidden.
 *
 * Same underlying interaction model as the frozen Radio (built on the same
 * Radix primitive: roving reachability, Arrow keys move AND select, ARIA
 * exclusive-choice semantics) — reused, not reinvented — but the material is
 * Control Surface, not Micro: the strip itself is the same recessed glass
 * well Input/Select already use (`<ControlSurface/>` inside
 * `.ds-glass .ds-control`). Every segment nests its own glass layers, kept
 * invisible at rest and revealed only once selected — the exact illuminated
 * accent already validated on the frozen Switch rail
 * (`microControlSelectedGlassClass`, imported by name — never redeclared).
 * SegmentedControl owns only geometry (size, orientation) and behavior
 * (value, readOnly, invalid); the ring is the one global rule.
 */

export type SegmentedControlSize = 'sm' | 'md' | 'lg'

const hostSizeClass: Record<SegmentedControlSize, string> = {
  sm: 'p-[3px] gap-[2px]',
  md: 'p-[4px] gap-[2px]',
  lg: 'p-[4px] gap-[3px]',
}

const itemSizeClass: Record<SegmentedControlSize, string> = {
  sm: 'h-[28px] px-[12px] text-body-sm',
  md: 'h-[34px] px-[16px] text-body-sm',
  lg: 'h-[40px] px-[20px] text-body',
}

interface SegmentedControlContextValue {
  size: SegmentedControlSize
}
const SegmentedControlContext = createContext<SegmentedControlContextValue>({
  size: 'md',
})

export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  label?: ReactNode
  description?: ReactNode
  /** Error message — implies `invalid`; announced via aria-describedby. */
  error?: string
  helperText?: string
  /** Error rim without a message. */
  invalid?: boolean
  /** Static: reachable, but the selection never changes. */
  readOnly?: boolean
  size?: SegmentedControlSize
}

const SegmentedControlRoot = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  SegmentedControlProps
>(function SegmentedControl(
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
    orientation = 'horizontal',
    size = 'md',
    value,
    defaultValue,
    onValueChange,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const labelId = `${fieldId}-label`
  const descId = `${fieldId}-desc`
  const errorId = `${fieldId}-error`
  const helpId = `${fieldId}-help`
  const isInvalid = Boolean(invalid || error)

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {label && (
        <Label id={labelId} htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      {description && (
        <p id={descId} className="text-caption text-text-tertiary">
          {description}
        </p>
      )}
      <RadioGroupPrimitive.Root
        ref={ref}
        id={fieldId}
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
        // ReadOnly: lock the value (controlled, no change handler) so
        // neither click nor arrow keys can move the selection — the same
        // pattern the frozen RadioGroup already uses.
        value={readOnly ? (value ?? defaultValue) : value}
        defaultValue={readOnly ? undefined : defaultValue}
        onValueChange={readOnly ? undefined : onValueChange}
        className={cn(
          'ds-glass ds-control relative inline-flex w-fit rounded-pill',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          hostSizeClass[size],
          controlStateClass({ error: isInvalid, disabled }),
          readOnly && 'cursor-default',
          className,
        )}
        {...props}
      >
        <ControlSurface />
        <SegmentedControlContext.Provider value={{ size }}>
          {children}
        </SegmentedControlContext.Provider>
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

export interface SegmentedControlItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  children: ReactNode
}

const SegmentedControlItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  SegmentedControlItemProps
>(function SegmentedControlItem({ className, children, ...props }, ref) {
  const { size } = useContext(SegmentedControlContext)

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // ds-micro (not inherited from the .ds-control host) so THIS item's
        // own nested glass reads with the exact frozen Switch tuning, not
        // the host's recessed Control Surface tuning.
        'ds-glass ds-micro relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-pill font-medium text-text-secondary outline-none',
        itemSizeClass[size],
        microControlColorMotionClass,
        microControlSelectedGlassClass,
        'data-[state=checked]:text-text',
        'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ds-color-accent-subtle)_45%,transparent)]',
        'data-[state=unchecked]:hover:text-text',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
        className,
      )}
      {...props}
    >
      <MicroGlass />
      <span className="relative z-10">{children}</span>
    </RadioGroupPrimitive.Item>
  )
})

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
})
