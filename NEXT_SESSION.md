# NEXT_SESSION

> Reprise rapide. Détail complet dans `PROJECT_STATE.md`.

## SESSION TERMINÉE

### VALIDÉ (figé — ne plus rouvrir sauf bug objectif)
- Micro Surface → Button
- Control Surface → Input (famille généralisée)
- Structural Surface → Card
- Floating Surface → Tooltip
- Immersive Surface → Modal
- Calibration transversale (les 5 rôles = une seule famille cohérente)
- **Button OFFICIELLEMENT GELÉ** — source de vérité unique : `docs/DISCIPLINE_BUTTON_REFERENCE.md`
  (silhouette lens `h-[34/40/48px]` · `px-4/5/6` · `rounded-[17/20/24px]` = ½ hauteur ;
  matériau `.ds-micro` = verre transmissif qui capte la scène ; Primary = verre
  neutre + halo violet diffus, aucun aplat)
- Promotion des rôles dans `glass.css` (`.ds-card`, `.ds-floating`, `.ds-immersive` + `.ds-scrim` ; `.ds-control` et `.ds-micro` déjà partagés) — extraction pure, scoping leak-free
- GlassCard (1er consommateur de `.ds-card`)
- **GlassPanel** — bande Structural pleine largeur, dérivation directe de GlassCard
  (`.ds-card` verbatim ; seule la géométrie change : `w-full rounded-none py-12`)

## EN COURS
- Phase 04 — généralisation de la librairie par dérivation des cinq rôles gelés.

## PROCHAINE SESSION

Continuer la famille Structural (dérivée de GlassCard / GlassPanel) :

1. FloatingCard  (← GlassCard : carte élevée, plus d'ombre/float)
2. Navbar        (← GlassPanel : bande haute + transition de scroll)
3. Sidebar       (← GlassCard/Panel : rail vertical)
4. BottomNav     (← GlassPanel : bande basse mobile)
5. StatCard / EmptyState / ErrorState / ChartWrapper (← GlassCard)

**Règles :** aucun changement du matériau n'est autorisé. Seules des dérivations
des cinq rôles gelés sont permises (géométrie/interaction uniquement). Avant
chaque composant : déclarer de quel rôle il dérive, quelles couches optiques sont
réutilisées, quelles magnitudes changent.
