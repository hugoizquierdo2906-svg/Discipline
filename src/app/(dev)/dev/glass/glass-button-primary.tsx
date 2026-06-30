import './glass.css'

/**
 * GlassButtonPrimary — the single reference for the DISCIPLINE glass material.
 *
 * Built per docs/DISCIPLINE_GLASS_CONSTRUCTION.md as a stack of optical layers
 * that model light crossing a thick glass capsule (Micro Surface role,
 * Grammar §2; Budget: ★★★★★ Fresnel · ★★★★ Specular · concentrated violet).
 *
 * Layers (back → front): cast shadow · refractive body (displacement) ·
 * core transmission · bottom face + TIR line · top convex face · violet caustic ·
 * crisp specular · Fresnel edge · label. The displacement refraction filter
 * (#gb-refract) is defined once on the page.
 */
export function GlassButtonPrimary({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button type="button" className="gb">
      <span className="gb__shadow" aria-hidden />
      <span className="gb__glass" aria-hidden>
        <span className="gb__core" />
        <span className="gb__bottomface" />
        <span className="gb__topface" />
        <span className="gb__violet" />
        <span className="gb__tir" />
        <span className="gb__specular" />
      </span>
      <span className="gb__edge" aria-hidden />
      <span className="gb__label">{children}</span>
    </button>
  )
}
