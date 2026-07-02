'use client'

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { Check, ChevronRight } from 'lucide-react'
import { forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import {
  DropdownMenu,
  dropdownMenuItemClass,
  dropdownMenuLabelClass,
  dropdownMenuPaneClass,
  dropdownMenuSeparatorClass,
  menuViewportBaseClass,
} from './dropdown-menu'
import { FloatingSurface, type FloatingSize } from './floating-surface'
import { Icon } from './icon'
import { Spinner } from './spinner'

/**
 * ContextMenu — the DropdownMenu language opened from an OBJECT instead of a
 * button: right-click, keyboard menu key / Shift+F10, or touch long-press,
 * positioned at the cursor. It is NOT a new component — it derives from the
 * FROZEN DropdownMenu and never restarts from Popover or FloatingSurface:
 *
 *   GlassSurface → .ds-floating → FloatingSurface → Popover → DropdownMenu
 *                                                                 ↓
 *                                                            ContextMenu
 *
 * The pane IS the frozen DropdownMenu pane (`dropdownMenuPaneClass` — itself
 * the frozen Popover pane): same glass, same lift, same `ds-floating-enter`
 * entrance, same size scale, same item/label/separator classes, same viewport
 * geometry. ContextMenu declares NO material, NO animation, NO padding, NO
 * radius of its own. It owns ONLY the trigger: right-click / menu-key /
 * long-press opening, cursor positioning (Radix anchors to the pointer — the
 * native context menu is suppressed only on the trigger zone), and contextual
 * open state. Everything else is inherited.
 *
 * Note (Radix): the Root is not open-controllable (`open`/`defaultOpen` do not
 * exist — a context menu needs pointer coordinates) and Content has no
 * side/sideOffset/align (it anchors to the click point); collision handling,
 * alignOffset, loop etc. are fully supported.
 */

/** Shared inner scroller — same geometry as DropdownMenu; only the Radix
 * available-height var is primitive-specific. */
const viewportClass = cn(
  menuViewportBaseClass,
  'max-h-[min(var(--radix-context-menu-content-available-height),24rem)]',
)

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Item
> {
  /** Optional leading icon. */
  icon?: ReactNode
  /** Right-aligned shortcut, e.g. "⌘C" — never hard-coded. */
  shortcut?: string
  /** Destructive action — error text, error-tinted highlight. */
  destructive?: boolean
  /** Swap the icon slot for a spinner and disable the row. */
  loading?: boolean
}

const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(function ContextMenuItem(
  {
    className,
    children,
    icon,
    shortcut,
    destructive,
    loading,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        dropdownMenuItemClass,
        destructive && 'text-error data-[highlighted]:bg-error/10',
        className,
      )}
      {...props}
    >
      {(icon != null || loading) && (
        <span
          className={cn(
            'inline-flex shrink-0',
            destructive ? 'text-error' : 'text-text-tertiary',
          )}
        >
          {loading ? <Spinner size="sm" label="Loading" /> : icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <DropdownMenu.Shortcut>{shortcut}</DropdownMenu.Shortcut>}
    </ContextMenuPrimitive.Item>
  )
})

export interface ContextMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
> {
  shortcut?: string
}

const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem(
  { className, children, shortcut, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(dropdownMenuItemClass, className)}
      {...props}
    >
      <span className="absolute left-2 inline-flex items-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Icon icon={Check} size="sm" className="text-accent-accessible" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <DropdownMenu.Shortcut>{shortcut}</DropdownMenu.Shortcut>}
    </ContextMenuPrimitive.CheckboxItem>
  )
})

const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(function ContextMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(dropdownMenuItemClass, className)}
      {...props}
    >
      <span className="absolute left-2 inline-flex w-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <span className="block h-1.5 w-1.5 rounded-pill bg-accent-accessible" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </ContextMenuPrimitive.RadioItem>
  )
})

const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(function ContextMenuLabel({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(dropdownMenuLabelClass, className)}
      {...props}
    />
  )
})

const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn(dropdownMenuSeparatorClass, className)}
      {...props}
    />
  )
})

export interface ContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> {
  icon?: ReactNode
}

const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger({ className, children, icon, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        dropdownMenuItemClass,
        'data-[state=open]:bg-accent-subtle/45',
        className,
      )}
      {...props}
    >
      {icon != null && (
        <span className="inline-flex shrink-0 text-text-tertiary">{icon}</span>
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <Icon
        icon={ChevronRight}
        size="sm"
        className="ml-auto shrink-0 text-text-tertiary"
        aria-hidden
      />
    </ContextMenuPrimitive.SubTrigger>
  )
})

export interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Content
> {
  /** Shared Floating width scale; menus default to `xs`. */
  size?: FloatingSize
}

/** Content — the frozen DropdownMenu pane, anchored at the cursor. */
const ContextMenuContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(function ContextMenuContent(
  { className, children, collisionPadding = 8, size = 'xs', ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        collisionPadding={collisionPadding}
        className={cn(dropdownMenuPaneClass(size), 'p-0', className)}
        {...props}
      >
        <FloatingSurface />
        <div className={cn('relative z-[3]', viewportClass)}>{children}</div>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  )
})

export interface ContextMenuSubContentProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
> {
  size?: FloatingSize
}

/** Submenu pane — the SAME frozen pane; material, entrance, lift, collision
 * all inherited. Zero duplication. */
const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(function ContextMenuSubContent(
  { className, children, sideOffset = 6, size = 'xs', ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(dropdownMenuPaneClass(size), 'p-0', className)}
        {...props}
      >
        <FloatingSurface />
        <div className={cn('relative z-[3]', viewportClass)}>{children}</div>
      </ContextMenuPrimitive.SubContent>
    </ContextMenuPrimitive.Portal>
  )
})

/** `ContextMenu` (onOpenChange · modal · dir) + `.Trigger` (asChild ·
 * disabled — the zone that owns the right-click / menu-key / long-press) /
 * `.Content` / `.Item` / `.Label` / `.Group` / `.Separator` / `.CheckboxItem`
 * / `.RadioGroup` / `.RadioItem` / `.Sub` / `.SubTrigger` / `.SubContent` /
 * `.Shortcut` (the DropdownMenu one, reused as-is). */
export const ContextMenu = Object.assign(ContextMenuPrimitive.Root, {
  Trigger: ContextMenuPrimitive.Trigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Label: ContextMenuLabel,
  Group: ContextMenuPrimitive.Group,
  Separator: ContextMenuSeparator,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuPrimitive.RadioGroup,
  RadioItem: ContextMenuRadioItem,
  Sub: ContextMenuPrimitive.Sub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Shortcut: DropdownMenu.Shortcut,
})
