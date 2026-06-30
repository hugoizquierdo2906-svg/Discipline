import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Any Lucide icon component. */
  icon: LucideIcon
  /** Token-aligned size. Defaults to `md` (20px). */
  size?: keyof typeof sizeMap
  /**
   * When the icon conveys meaning, pass a label (sets role="img" + aria-label).
   * Decorative icons stay aria-hidden (the default).
   */
  label?: string
}

/**
 * Thin wrapper around Lucide icons. Size comes from tokens; color is inherited
 * via `currentColor`, so callers tint with a text color utility.
 */
export function Icon({
  icon: LucideComp,
  size = 'md',
  label,
  className,
  ...props
}: IconProps) {
  return (
    <LucideComp
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={cn('shrink-0', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      {...props}
    />
  )
}
