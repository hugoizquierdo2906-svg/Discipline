'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Calendar } from 'lucide-react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/style.css'

import { cn } from '@/lib/cn'

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
 * The trigger matches the Input field language; the calendar accent is mapped
 * to the Brand accent token via react-day-picker's CSS variables.
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
          'flex h-11 w-full items-center justify-between gap-2 rounded-sm border border-border bg-surface px-4',
          'text-body text-text focus:border-accent-accessible disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <span className={cn(!value && 'text-text-tertiary')}>
          {value ? value.toLocaleDateString() : placeholder}
        </span>
        <Calendar size={18} className="text-text-tertiary" />
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
