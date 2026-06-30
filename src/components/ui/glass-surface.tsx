/**
 * GlassSurface — the shared DISCIPLINE Liquid Glass material, rendered as the
 * frozen stack of optical layers from the Primary reference button. Components
 * place this as the first child of their interactive element (which carries the
 * `.ds-glass` class + optional data-glass-variant / data-glass-intent), then
 * render their own content on top. The material is never redefined per
 * component — every glass primitive composes THIS (Construction rule).
 *
 * Decorative only: aria-hidden. The displacement filter (#ds-glass-refract) is
 * defined once in the root layout.
 */
export function GlassSurface() {
  return (
    <>
      <span className="ds-glass__shadow" aria-hidden />
      <span className="ds-glass__body" aria-hidden>
        <span className="ds-glass__core" />
        <span className="ds-glass__bottomface" />
        <span className="ds-glass__topface" />
        <span className="ds-glass__violet" />
        <span className="ds-glass__tir" />
        <span className="ds-glass__specular" />
      </span>
      <span className="ds-glass__edge" aria-hidden />
    </>
  )
}

/** The refraction displacement filter — render once at the app root. */
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
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.02"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={8}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
