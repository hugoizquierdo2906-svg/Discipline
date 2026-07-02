'use client'

import * as MenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight } from 'lucide-react'
import { forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import {
  FloatingSurface,
  floatingArrowClass,
  floatingContentClass,
  type FloatingSize,
} from './floating-surface'
import { Icon } from './icon'
import { popoverPaneClass } from './popover'
import { Spinner } from './spinner'

/**
 * DropdownMenu — a structured list of ACTIONS opened from a button. Derives
 * from the FROZEN Popover, never from FloatingSurface directly:
 *
 *   GlassSurface → .ds-floating → FloatingSurface → Popover → DropdownMenu
 *
 * The pane IS the frozen Popover pane (`popoverPaneClass`: same glass, same
 * lift, same entrance `ds-floating-enter`, same size scale) — DropdownMenu
 * declares NO material and NO animation of its own. On Radix DropdownMenu,
 * which supplies the behavioral layer Popover established (portal, positioning,
 * collision, dismiss, focus) plus menu semantics. DropdownMenu owns ONLY the
 * menu language: items (icon · shortcut · disabled · destructive · loading),
 * labels, groups, separators, checkbox/radio items, nested submenus (the
 * SubContent composes the SAME pane — material, animation, collision, arrow
 * inherited, zero duplication) and right-aligned shortcuts. Item geometry
 * mirrors the frozen Select menu (py-2.5 · gap-3 · a shared 32px indicator
 * column · whisper `bg-accent-subtle/45` highlight) so every menu in the
 * system reads as one family.
 */

/* ── The frozen menu language, exported for derivation ──────────────────────
 * PURE EXTRACTION (rendered output unchanged): ContextMenu — and later
 * UserMenu / CommandPalette — derive from DropdownMenu by composing these
 * exact classes onto their own Radix primitives. They never restart from
 * Popover or FloatingSurface. */

/** The frozen DropdownMenu pane — IS the frozen Popover pane (the chain
 * FloatingSurface → Popover → DropdownMenu, one definition). */
export const dropdownMenuPaneClass = popoverPaneClass

/** Plain action row. `pl-6` (32px: 8 + 16px indicator + 8) keeps the shared
 * indicator column so mixed menus (actions + checks) stay aligned.
 * (Objective-bug fix 2026-07-02: `pl-8` is 48px on the DISCIPLINE scale — with
 * a right-aligned shortcut at the xs width it crushed labels to 2 characters,
 * visible in the frozen proof itself. 32px is the intended column.) */
export const dropdownMenuItemClass = cn(
  'relative flex cursor-pointer select-none items-center gap-3 rounded-sm py-2.5 pl-6 pr-3 text-body-sm text-text outline-none',
  'data-[highlighted]:bg-accent-subtle/45',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
)
const itemClass = dropdownMenuItemClass

/** Section label row. */
export const dropdownMenuLabelClass =
  'px-3 py-1.5 text-caption font-medium text-text-tertiary'

/** Separator line (token, flat content — not pane material). */
export const dropdownMenuSeparatorClass = 'mx-1 my-1.5 h-px bg-border'

/** Menu viewport geometry (padding + scroll); each primitive appends its own
 * Radix available-height cap (the var name is primitive-specific and must be
 * a literal for the Tailwind scanner). */
export const menuViewportBaseClass = 'overflow-y-auto p-1.5'

/** Right-aligned keyboard shortcut — never hard-coded, always a prop. */
const DropdownMenuShortcut = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function DropdownMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        'ml-auto shrink-0 pl-4 text-caption tracking-wide text-text-tertiary',
        className,
      )}
      {...props}
    />
  )
})

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.Item
> {
  /** Optional leading icon. */
  icon?: ReactNode
  /** Right-aligned shortcut, e.g. "⌘K" or "Ctrl+Shift+P". */
  shortcut?: string
  /** Destructive action — error text, error-tinted highlight. */
  destructive?: boolean
  /** Swap the icon slot for a spinner and disable the row. */
  loading?: boolean
}

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem(
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
    <MenuPrimitive.Item
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        itemClass,
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
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </MenuPrimitive.Item>
  )
})

export interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.CheckboxItem
> {
  shortcut?: string
}

const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  { className, children, shortcut, ...props },
  ref,
) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(itemClass, className)}
      {...props}
    >
      <span className="absolute left-2 inline-flex items-center">
        <MenuPrimitive.ItemIndicator>
          <Icon icon={Check} size="sm" className="text-accent-accessible" />
        </MenuPrimitive.ItemIndicator>
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </MenuPrimitive.CheckboxItem>
  )
})

const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn(itemClass, className)}
      {...props}
    >
      <span className="absolute left-2 inline-flex w-4 items-center justify-center">
        <MenuPrimitive.ItemIndicator>
          <span className="block h-1.5 w-1.5 rounded-pill bg-accent-accessible" />
        </MenuPrimitive.ItemIndicator>
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </MenuPrimitive.RadioItem>
  )
})

const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Label
      ref={ref}
      className={cn(dropdownMenuLabelClass, className)}
      {...props}
    />
  )
})

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn(dropdownMenuSeparatorClass, className)}
      {...props}
    />
  )
})

export interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.SubTrigger
> {
  icon?: ReactNode
}

const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { className, children, icon, ...props },
  ref,
) {
  return (
    <MenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        itemClass,
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
    </MenuPrimitive.SubTrigger>
  )
})

/** Shared inner scroller — caps long menus to the popper's available height. */
const menuViewportClass = cn(
  menuViewportBaseClass,
  'max-h-[min(var(--radix-dropdown-menu-content-available-height),24rem)]',
)

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.Content
> {
  /** Shared Floating width scale; menus default to `xs`. */
  size?: FloatingSize
  /** Render the shared Floating arrow/tail. */
  arrow?: boolean
}

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    className,
    children,
    sideOffset = 10,
    collisionPadding = 8,
    size = 'xs',
    arrow = false,
    ...props
  },
  ref,
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(popoverPaneClass(size), 'p-0', className)}
        {...props}
      >
        <FloatingSurface />
        <div className={cn(floatingContentClass, menuViewportClass)}>
          {children}
        </div>
        {arrow && (
          <MenuPrimitive.Arrow asChild width={10} height={5}>
            <span className={floatingArrowClass} />
          </MenuPrimitive.Arrow>
        )}
      </MenuPrimitive.Content>
    </MenuPrimitive.Portal>
  )
})

export interface DropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.SubContent
> {
  size?: FloatingSize
}

/** Submenu pane — composes the SAME frozen Popover pane: material, entrance,
 * lift, collision all inherited. Zero duplication. */
const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent(
  { className, children, sideOffset = 6, size = 'xs', ...props },
  ref,
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(popoverPaneClass(size), 'p-0', className)}
        {...props}
      >
        <FloatingSurface />
        <div className={cn(floatingContentClass, menuViewportClass)}>
          {children}
        </div>
      </MenuPrimitive.SubContent>
    </MenuPrimitive.Portal>
  )
})

/** `DropdownMenu` (open · defaultOpen · onOpenChange · modal · dir) +
 * `.Trigger` (asChild) / `.Content` / `.Item` / `.Label` / `.Group` /
 * `.Separator` / `.CheckboxItem` / `.RadioGroup` / `.RadioItem` / `.Sub` /
 * `.SubTrigger` / `.SubContent` / `.Shortcut`. */
export const DropdownMenu = Object.assign(MenuPrimitive.Root, {
  Trigger: MenuPrimitive.Trigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Group: MenuPrimitive.Group,
  Separator: DropdownMenuSeparator,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: MenuPrimitive.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Sub: MenuPrimitive.Sub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Shortcut: DropdownMenuShortcut,
})
