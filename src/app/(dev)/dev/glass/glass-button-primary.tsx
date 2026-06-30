import './glass.css'

/**
 * GlassButtonPrimary — the single reference for the DISCIPLINE glass material.
 *
 * Rebuilt from scratch as a STACK OF OPTICAL LAYERS (not effects piled on one
 * element). Each child is one physical layer of the material, per
 * docs/DISCIPLINE_GLASS_MATERIAL.md. Back → front:
 *
 *   gb__shadow      — ombre portée (cast shadow, sits behind the glass)
 *   gb__glass       — réfraction (the refractive body that bends the background)
 *     gb__volume      — volume interne (glass thickness, lit top → shaded bottom)
 *     gb__incident    — lumière incidente (light hitting the top face)
 *     gb__reflection  — réflexion interne (the violet light captured in the volume)
 *     gb__specular    — reflet spéculaire (sharp glint)
 *   gb__edge        — bord de verre (luminous machined rim)
 *   gb__label       — content
 *
 * Isolated dev reference; no library component is involved.
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
        <span className="gb__volume" />
        <span className="gb__incident" />
        <span className="gb__reflection" />
        <span className="gb__specular" />
      </span>
      <span className="gb__edge" aria-hidden />
      <span className="gb__label">{children}</span>
    </button>
  )
}
