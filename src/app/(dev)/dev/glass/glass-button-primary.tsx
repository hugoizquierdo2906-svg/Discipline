import './glass.css'

/**
 * GlassButtonPrimary — the single reference for the DISCIPLINE glass material.
 * Isolated dev reference (not part of the component library yet). Once validated
 * visually, this material becomes the absolute reference every primitive copies.
 */
export function GlassButtonPrimary({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button type="button" className="gbp">
      <span className="gbp__label">{children}</span>
    </button>
  )
}
