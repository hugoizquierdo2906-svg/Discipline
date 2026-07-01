import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassCard, type GlassCardProps } from './glass-card'

export type GlassPanelProps = GlassCardProps

/**
 * GlassPanel — the generic large Structural Surface, exactly like GlassCard but
 * at panel scale. A DIRECT derivation of GlassCard: it reuses the frozen `.ds-card`
 * material verbatim (every optical layer unchanged) and keeps the Structural
 * default radius. It defines ONLY a Structural panel — adaptable width, a default
 * panel padding, `<section>` semantics — and imposes NO layout decision: it never
 * decides its radius, alignment, full-bleed mode or position. Derived components
 * (Navbar, Footer, Sidebar, BottomNav, marketing sections…) choose their own
 * geometry via className (e.g. `rounded-none`, `rounded-t-none`, `rounded-2xl`).
 * No new glass recipe, no new light hierarchy.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel({ className, as = 'section', ...props }, ref) {
    return (
      <GlassCard
        ref={ref}
        as={as}
        className={cn('w-full px-6 py-12', className)}
        {...props}
      />
    )
  },
)
