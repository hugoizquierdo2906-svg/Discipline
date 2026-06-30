/**
 * GlassSurface — the shared DISCIPLINE Liquid Glass material, rendered as the
 * frozen stack of optical layers from the Primary reference button (the
 * "optical layers" reference). Components place this as the first child of their
 * interactive element (which carries `.ds-glass` + optional data-glass-variant /
 * data-glass-intent), then render their own content on top. The material is
 * never redefined per component (Construction rule).
 *
 * Layers (back → front): cast shadow · refractive body · internal volume ·
 * incident light · violet caustic (reflection) · specular · machined edge.
 * Decorative only: aria-hidden.
 */
export function GlassSurface() {
  return (
    <>
      <span className="ds-glass__shadow" aria-hidden />
      <span className="ds-glass__body" aria-hidden>
        <span className="ds-glass__volume" />
        <span className="ds-glass__incident" />
        <span className="ds-glass__violet" />
        <span className="ds-glass__specular" />
      </span>
      <span className="ds-glass__edge" aria-hidden />
    </>
  )
}

/** Kept for compatibility (root layout). The optical-layers material does not
 * use a displacement filter, so this renders an inert, harmless definition. */
export function GlassFilter() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <filter
        id="ds-glass-refract"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
      </filter>
    </svg>
  )
}
