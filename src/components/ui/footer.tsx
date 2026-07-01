import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

import { GlassPanel, type GlassPanelProps } from './glass-panel'

type FooterVariant = 'floating' | 'attached' | 'inset'

// Radius geometry ONLY — never touches the Structural material.
const footerRadius: Record<FooterVariant, string> = {
  floating: '', // keep the Structural default radius (a rounded plane)
  attached: 'rounded-none', // flush to a viewport edge (all corners square)
  inset: 'rounded-b-none', // rises from the page bottom (rounded top, square bottom)
}

export interface FooterProps extends GlassPanelProps {
  /**
   * Radius geometry only. `floating` (default) keeps the Structural radius;
   * `attached` squares every corner (flush to the viewport edge); `inset` rounds
   * only the top (the plane rises from the page bottom). None of these change the
   * material. Placement (sticky/fixed) stays with the consumer (Invariant A1).
   */
  variant?: FooterVariant
}

/**
 * Footer — the final Structural plane of the page. A DIRECT specialization of
 * GlassPanel (GlassSurface → .ds-card → GlassCard → GlassPanel → Footer; no
 * hierarchy jump, never composes GlassSurface directly, never recreates a glass
 * layer). The material — transmission, refraction, blur, Fresnel, internal
 * reflections, incident light, specular and edge, plus the shadow model — is
 * inherited from GlassPanel UNCHANGED. A Footer looks identical to a GlassPanel;
 * only geometry differs: a calm, full-width vertical layout (brand, navigation
 * columns, legal, copyright, optional newsletter/social) with generous breathing
 * space, and a radius variant. No new glass recipe, no new shadow, no optical
 * change — Footer is simply another Structural consumer.
 *
 * The host carries the material and spans full width with its padding neutralized
 * (`p-0`); the inner column owns the footer layout and breathing space.
 *
 * Open compound API, no business assumptions: `Footer.Brand` · `Footer.Columns` ·
 * `Footer.Column` · `Footer.Bottom` are generic layout clusters that stack
 * responsively.
 */
const FooterRoot = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { className, variant = 'floating', as = 'footer', children, ...props },
  ref,
) {
  return (
    <GlassPanel
      ref={ref}
      as={as}
      className={cn('w-full p-0', footerRadius[variant], className)}
      {...props}
    >
      <div className="flex w-full flex-col gap-10 px-6 py-12 md:px-8 md:py-16 lg:px-12">
        {children}
      </div>
    </GlassPanel>
  )
})

/** Brand cluster — logo / wordmark + optional tagline. */
const FooterBrand = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function FooterBrand({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
})

/** Responsive grid of navigation column groups (2 cols → 3 → 4). */
const FooterColumns = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function FooterColumns({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4',
        className,
      )}
      {...props}
    />
  )
})

/** A single navigation column — heading + stacked links. */
const FooterColumn = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function FooterColumn({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
})

/** Bottom bar — copyright + legal/social. A row on desktop, stacked on mobile. */
const FooterBottom = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function FooterBottom({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    />
  )
})

FooterRoot.displayName = 'Footer'
FooterBrand.displayName = 'Footer.Brand'
FooterColumns.displayName = 'Footer.Columns'
FooterColumn.displayName = 'Footer.Column'
FooterBottom.displayName = 'Footer.Bottom'

export const Footer = Object.assign(FooterRoot, {
  Brand: FooterBrand,
  Columns: FooterColumns,
  Column: FooterColumn,
  Bottom: FooterBottom,
})
