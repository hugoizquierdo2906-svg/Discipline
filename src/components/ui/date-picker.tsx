'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Calendar } from 'lucide-react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/style.css'

import { cn } from '@/lib/cn'

import {
  ControlSurface,
  controlHostClass,
  controlStateClass,
} from './control-surface'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  /** Accessible label for the trigger. */
  label?: string
  disabled?: boolean
}

/**
 * DatePicker — accessible calendar (react-day-picker) inside a Radix Popover.
 * The trigger is a Control Surface (Grammar §2): it renders the shared Liquid
 * Glass optical layers as a recessed well, identical to Input, with the value +
 * calendar icon on the z-3 plane. The violet caustic rises while the popover is
 * open or the trigger is focused. The calendar panel stays a raised surface.
 */
export function DatePicker({
  value,
  onChange,
  placeholder = 'Select a date',
  label = 'Choose date',
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        aria-label={label}
        disabled={disabled}
        className={cn(
          controlHostClass,
          'w-full justify-between',
          'text-body text-text disabled:cursor-not-allowed',
          controlStateClass({ disabled }),
        )}
      >
        <ControlSurface />
        <span
          className={cn(
            'relative z-[3] truncate',
            !value && 'text-text-tertiary',
          )}
        >
          {value ? value.toLocaleDateString() : placeholder}
        </span>
        <Calendar size={18} className="relative z-[3] text-text-tertiary" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-dropdown rounded-md border border-border bg-surface-raised p-3 shadow-3"
          style={
            {
              '--rdp-accent-color': 'var(--ds-color-accent)',
              '--rdp-accent-background-color': 'var(--ds-color-accent-subtle)',
            } as React.CSSProperties
          }
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange?.(d)
              setOpen(false)
            }}
            className="text-body-sm text-text"
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
