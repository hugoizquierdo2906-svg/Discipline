'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import { createContext, forwardRef, useContext } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './icon'

/**
 * Avatar — a foundational Data Display primitive: it answers ONE question,
 * "who is this object?", and never "what does it do?" or "how do I interact
 * with it?". It has NO domain knowledge — it does not know what DISCIPLINE, a
 * client, a coach, an AI or a guide is. It only displays a visual identity.
 *
 * Not an Image (a bare `<img>` can fail to nothing, has no constant size/shape
 * and no fallback — Avatar RESERVES a surface, crops with `object-fit: cover`,
 * and GUARANTEES a fallback so it is never empty), not a Badge (a short
 * property attached to a datum — it qualifies, it does not say WHO the datum
 * is), not an Icon (an abstract, generic symbol — it carries no individual
 * identity), not a UserCard / ProfileCard / Contact Card / List Item (richer,
 * higher-level components that CONTAIN an Avatar and add name, role, actions and
 * layout — Avatar has none of that), not a Guide Launcher (an INTERACTIVE entry
 * point with behaviour, states and a halo — Avatar is static, with no
 * interaction), not a Chat Bubble (a message in a conversation). It is a
 * Data Display primitive, exactly like Badge: it displays an identity, it never
 * modifies or acts on it.
 *
 * STRICTLY FORBIDDEN here (these belong to higher-level components): online
 * presence, notification/AI badges, halo, pulse/breathing, launcher behaviour,
 * an integrated tooltip/menu/dropdown, animation, and anything about a coach /
 * guide / chatbot.
 *
 * Composes ONLY Avatar (Radix), Icon and Typography tokens — no GlassSurface,
 * no Floating, no Drawer, no Overlay. Fallback order is strict: image →
 * initials → a generic user Icon (never empty). The image fills the surface,
 * is cropped (`object-cover`) and respects the shape exactly; if it fails,
 * Radix swaps to the Fallback automatically.
 *
 * Hierarchy: `Avatar` · `Avatar.Image` · `Avatar.Fallback` · `Avatar.Group`.
 */

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarShape = 'circle' | 'rounded' | 'square'

const AvatarContext = createContext<AvatarSize>('md')

// One token scale, monotonic in DISCIPLINE's spacing tokens (24·32·40·48·64px)
// — deliberately avoiding undefined steps like `h-16`, which would fall back to
// Tailwind's default and break the ordering.
const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-5 w-5 text-caption',
  sm: 'h-6 w-6 text-caption',
  md: 'h-7 w-7 text-body-sm',
  lg: 'h-8 w-8 text-body',
  xl: 'h-9 w-9 text-body-lg',
}

const shapeClasses: Record<AvatarShape, string> = {
  circle: 'rounded-pill',
  rounded: 'rounded-md',
  square: 'rounded-none',
}

// The generic user icon scales with the avatar; it stays clearly smaller than
// the surface so it reads as a placeholder, never as content.
const fallbackIconSize: Record<AvatarSize, 'sm' | 'md' | 'lg'> = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'md',
  xl: 'lg',
}

export interface AvatarProps extends React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> {
  size?: AvatarSize
  shape?: AvatarShape
}

const AvatarRoot = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar({ className, size = 'md', shape = 'circle', ...props }, ref) {
  return (
    <AvatarContext.Provider value={size}>
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden border border-border bg-surface font-medium text-text-secondary',
          sizeClasses[size],
          shapeClasses[shape],
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
})

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>

const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(function AvatarImage({ className, ...props }, ref) {
  // Fills the surface, cropped, respecting the shape (the Root clips it).
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
})

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback({ className, children, ...props }, ref) {
  const size = useContext(AvatarContext)
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
      {...props}
    >
      {children ?? (
        <Icon icon={User} size={fallbackIconSize[size]} aria-hidden />
      )}
    </AvatarPrimitive.Fallback>
  )
})

/**
 * Derive at most two uppercase initials from a name — "Hugo Izquierdo" → "HI",
 * "A" → "A". Never more than two letters (the sanctioned way to feed
 * `Avatar.Fallback`, so long names never overflow to three letters).
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase()
  return (
    parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)
  ).toUpperCase()
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show at most this many avatars; the rest collapse into a "+N" chip. */
  max?: number
  /** Overlap amount, from the spacing tokens. */
  spacing?: 'sm' | 'md'
}

const overlapClass: Record<'sm' | 'md', string> = {
  sm: '-ms-1.5',
  md: '-ms-3',
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { className, max, spacing = 'md', children, ...props },
    ref,
  ) {
    const items = (Array.isArray(children) ? children : [children]).filter(
      Boolean,
    )
    const shown = typeof max === 'number' ? items.slice(0, max) : items
    const overflow = items.length - shown.length
    const overlap = overlapClass[spacing]

    // Composition only — clean overlap via a logical negative margin (so it
    // flips under RTL), a token ring to separate neighbours, and a coherent
    // stacking order (earlier avatars sit on top).
    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        {shown.map((child, i) => (
          <span
            key={i}
            className={cn(
              'relative inline-flex rounded-pill ring-2 ring-surface-raised',
              i > 0 && overlap,
            )}
            style={{ zIndex: shown.length - i }}
          >
            {child}
          </span>
        ))}
        {overflow > 0 && (
          <span
            className={cn('relative inline-flex', overlap)}
            style={{ zIndex: 0 }}
          >
            <AvatarRoot aria-label={`${overflow} more`}>
              <AvatarFallback>{`+${overflow}`}</AvatarFallback>
            </AvatarRoot>
          </span>
        )}
      </div>
    )
  },
)

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
})
