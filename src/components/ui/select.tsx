'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { forwardRef, useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlHostClass,
  controlStateClass,
} from './control-surface'
import { Icon } from './icon'
import { Label } from './label'
import { Spinner } from './spinner'

export interface SelectOption {
  value: string
  label: string
  icon?: ReactNode
  description?: string
  disabled?: boolean
}

export interface SelectItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  'value'
> {
  value: string
  /** Optional leading icon. */
  icon?: ReactNode
  /** Optional secondary line under the label. */
  description?: string
}

/**
 * Select.Item — a single option. Handles hover/highlight, selected checkmark,
 * disabled, optional leading icon + description, and long-label truncation. The
 * label text lives in Radix `ItemText` so the closed trigger mirrors it. Content
 * only — the field's glass comes from the Control Surface trigger.
 */
const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(function SelectItem(
  { className, children, icon, description, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-3 rounded-sm py-2.5 pl-8 pr-3 text-body-sm text-text outline-none',
        // Violet as a signature, not a fill — a whisper of captured light on the
        // highlighted/selected row (like the Button Primary halo), black text kept.
        'data-[highlighted]:bg-accent-subtle/45 data-[state=checked]:font-medium',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 inline-flex items-center">
        <SelectPrimitive.ItemIndicator>
          <Icon icon={Check} size="sm" className="text-accent-accessible" />
        </SelectPrimitive.ItemIndicator>
      </span>
      {icon != null && (
        <span className="inline-flex shrink-0 text-text-tertiary">{icon}</span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {description && (
          <span className="truncate text-caption text-text-tertiary">
            {description}
          </span>
        )}
      </span>
    </SelectPrimitive.Item>
  )
})

export interface SelectProps {
  label?: string
  description?: string
  placeholder?: string
  helperText?: string
  error?: string
  success?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  /** Swap the chevron for a spinner and block opening while options load. */
  loading?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Open the menu on mount (uncontrolled). */
  defaultOpen?: boolean
  name?: string
  /** Array-driven options (value/label/icon/description/disabled). Alternatively
   * pass `Select.Item` children. */
  options?: SelectOption[]
  children?: ReactNode
  /** className for the trigger (the field). */
  className?: string
  id?: string
  /** Accessible name when there is no visible `label`. */
  'aria-label'?: string
}

function MetaRow({
  error,
  success,
  helperText,
  errorId,
  helpId,
}: {
  error?: string
  success?: boolean
  helperText?: string
  errorId: string
  helpId: string
}) {
  if (!error && !success && !helperText) return null
  return (
    <div className="flex items-start justify-between gap-3">
      {error ? (
        <span id={errorId} className="text-body-sm text-error">
          {error}
        </span>
      ) : success ? (
        <span className="inline-flex items-center gap-1 text-body-sm text-success">
          <Icon icon={Check} size="sm" aria-hidden />
          {helperText}
        </span>
      ) : (
        <span id={helpId} className="text-caption text-text-tertiary">
          {helperText}
        </span>
      )}
    </div>
  )
}

/**
 * Select — the dropdown Control Surface. A SIBLING of Input (not derived from it):
 * both descend from GlassSurface → .ds-control → ControlSurface. The closed trigger
 * composes the SAME `controlHostClass` + `<ControlSurface/>` as Input, so a closed
 * Select is visually indistinguishable from an Input / Textarea / SearchInput —
 * same glass, blur, refraction, Fresnel, depth and the violet that rises on focus.
 * Select recreates NO material; it owns only interaction: open/close, selected
 * value, placeholder, options, keyboard navigation (Radix), states, accessibility,
 * and a chevron that rotates on open. The transient menu is a raised surface, not a
 * new glass.
 */
const SelectRoot = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label,
    description,
    placeholder = 'Select…',
    helperText,
    error,
    success = false,
    required,
    disabled,
    readOnly,
    loading = false,
    value,
    defaultValue,
    onValueChange,
    defaultOpen,
    name,
    options,
    children,
    className,
    id,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const descId = `${fieldId}-desc`
  const helpId = `${fieldId}-help`
  const errorId = `${fieldId}-error`
  const describedBy =
    cn(description && descId, helperText && helpId, error && errorId) ||
    undefined
  const isDisabled = disabled || loading

  const items =
    options?.map((o) => (
      <SelectItem
        key={o.value}
        value={o.value}
        icon={o.icon}
        description={o.description}
        disabled={o.disabled}
      >
        {o.label}
      </SelectItem>
    )) ?? children

  // ReadOnly — a static, full-opacity field that shows the value but never opens.
  if (readOnly) {
    const display = options?.find(
      (o) => o.value === (value ?? defaultValue),
    )?.label
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}
        {description && (
          <span id={descId} className="text-caption text-text-tertiary">
            {description}
          </span>
        )}
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          id={fieldId}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={describedBy}
          className={cn(
            controlHostClass,
            'w-full cursor-default justify-between',
            className,
          )}
        >
          <ControlSurface />
          <span
            className={cn(
              'relative z-[3] min-w-0 flex-1 truncate text-left text-body',
              display ? 'text-text' : 'text-text-tertiary',
            )}
          >
            {display ?? placeholder}
          </span>
          <Icon
            icon={ChevronDown}
            className="relative z-[3] shrink-0 text-text-tertiary"
          />
        </div>
        <MetaRow
          error={error}
          success={success}
          helperText={helperText}
          errorId={errorId}
          helpId={helpId}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      {description && (
        <span id={descId} className="text-caption text-text-tertiary">
          {description}
        </span>
      )}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        defaultOpen={defaultOpen}
        disabled={isDisabled}
        name={name}
        required={required}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={fieldId}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={describedBy}
          className={cn(
            controlHostClass,
            'group w-full justify-between text-body text-text',
            'data-[placeholder]:text-text-tertiary disabled:cursor-not-allowed',
            controlStateClass({ error: Boolean(error), disabled: isDisabled }),
            className,
          )}
        >
          <ControlSurface />
          <span className="relative z-[3] min-w-0 flex-1 truncate text-left">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <span className="relative z-[3] inline-flex shrink-0 items-center">
            {loading ? (
              <Spinner size="sm" label="Loading options" />
            ) : (
              <SelectPrimitive.Icon asChild>
                <Icon
                  icon={ChevronDown}
                  className="text-text-tertiary transition-transform duration-fast ease-standard group-data-[state=open]:rotate-180"
                />
              </SelectPrimitive.Icon>
            )}
          </span>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={8}
            className={cn(
              // Detail #1 — read the menu as a suspended, independent floating
              // sheet: not more blur, not more glass; a stronger elevation
              // shadow so the plane clearly hovers above the field.
              'z-dropdown overflow-hidden rounded-md border border-border bg-surface-raised shadow-4',
              'w-[var(--radix-select-trigger-width)]',
              'max-h-[min(var(--radix-select-content-available-height),20rem)]',
            )}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-text-tertiary">
              <Icon icon={ChevronUp} size="sm" aria-hidden />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1.5">
              {items}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-text-tertiary">
              <Icon icon={ChevronDown} size="sm" aria-hidden />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      <MetaRow
        error={error}
        success={success}
        helperText={helperText}
        errorId={errorId}
        helpId={helpId}
      />
    </div>
  )
})

SelectRoot.displayName = 'Select'

/** `Select` — the field. `Select.Item` — an option. `Select.Group` — a Radix group
 * passthrough for advanced composition. */
export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
  Group: SelectPrimitive.Group,
})

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

/** NativeSelect — token-styled native <select> as a Control Surface. The native
 * element sits transparent on the z-3 plane over the shared glass layers. */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, disabled, ...props }, ref) {
    return (
      <div
        className={cn(
          controlHostClass,
          'w-full',
          controlStateClass({ disabled }),
        )}
      >
        <ControlSurface />
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'relative z-[3] min-w-0 flex-1 appearance-none bg-transparent text-body text-text outline-none',
            'disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        />
        <Icon
          icon={ChevronDown}
          className="relative z-[3] shrink-0 text-text-tertiary"
        />
      </div>
    )
  },
)
