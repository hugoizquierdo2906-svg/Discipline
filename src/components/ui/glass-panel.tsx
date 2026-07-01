import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassCard, type GlassCardProps } from './glass-card'

export type GlassPanelProps = GlassCardProps

/**
 * GlassPanel — a full-width Structural Surface band used to frame / separate page
 * sections. A DIRECT derivation of GlassCard: it reuses the exact frozen `.ds-card`
 * material (every optical layer unchanged) and only differs by GEOMETRY — full
 * width, full-bleed (square) corners and a generous vertical rhythm. No new glass
 * recipe, no new light hierarchy; same Structural role as the Card, at panel scale.
 * Renders as a <section> by default. Override the geometry via className for an
 * inset (rounded) panel.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel({ className, as = 'section', ...props }, ref) {
    return (
      <GlassCard
        ref={ref}
        as={as}
        className={cn('w-full rounded-none px-6 py-12', className)}
        {...props}
      />
    )
  },
)
