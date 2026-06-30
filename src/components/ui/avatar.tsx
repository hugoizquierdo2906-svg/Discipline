import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

const avatarVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden rounded-pill border border-border bg-surface',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-caption',
        md: 'h-10 w-10 text-body-sm',
        lg: 'h-12 w-12 text-body',
        xl: 'h-16 w-16 text-body-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  /** Used for the image alt text and to derive fallback initials. */
  name: string
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase()
  return (
    parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)
  ).toUpperCase()
}

/**
 * Avatar — image with graceful initials fallback (Radix Avatar handles load
 * state). Canonical §12.10: circle, 1px border, sizes sm/md/lg/xl.
 */
export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar({ className, size, src, name, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={name}
        className="aspect-square h-full w-full object-cover"
      />
      <AvatarPrimitive.Fallback
        delayMs={src ? 300 : 0}
        className="flex h-full w-full items-center justify-center font-medium text-text-secondary"
      >
        {initials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
})
