import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassCard, type GlassCardProps } from './glass-card'

export type FloatingCardProps = GlassCardProps

/**
 * FloatingCard — an elevated Structural Surface. A DIRECT derivation of GlassCard:
 * it reuses the frozen `.ds-card` material verbatim (every optical layer unchanged)
 * and shifts exactly ONE optical axis — Depth. A deeper ambient cast shadow
 * (`shadow-4`, the `--ds-shadow-4` token) is added at the COMPONENT level — never in
 * `glass.css` — exactly the way the Button adds its violet halo. It layers over the
 * card's own cast shadow so the same glass reads as if it floats above the surface
 * instead of resting on it. The Grammar already sanctions this: Structural planes may
 * float — same role, more cast shadow (§2, Structural note).
 *
 * No new material, no new light hierarchy. Per Invariant A1
 * (`docs/DISCIPLINE_COMPONENT_ARCHITECTURE.md`), FloatingCard makes NO layout
 * decision either: radius / width / alignment / placement stay with the consumer.
 */
export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>(
  function FloatingCard({ className, ...props }, ref) {
    return (
      <GlassCard ref={ref} className={cn('shadow-4', className)} {...props} />
    )
  },
)
