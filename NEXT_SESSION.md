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
- **GlassPanel** — composant Structural générique, dérivation directe de GlassCard
  (`.ds-card` verbatim ; conserve le rayon Structural par défaut). Il définit
  seulement un panneau Structural (largeur adaptable, padding par défaut
  `w-full px-6 py-12`, sémantique `<section>`) et n'impose AUCUNE décision de
  mise en page (rayon / alignement / full-bleed / position). Les spécialisations
  géométriques sont **déléguées aux composants dérivés** (Navbar, Footer, Sidebar,
  BottomNav, sections marketing) via className.
- **Invariant d'architecture GELÉ — A1 : un composant de base ne prend jamais de
  décision de layout.** Il définit seulement son rôle matériel, son comportement,
  sa sémantique et sa géométrie intrinsèque (largeur adaptable + rayon/padding par
  défaut). Placement / full-bleed / alignement / position / responsive =
  toujours délégués au consommateur. Source : `docs/DISCIPLINE_COMPONENT_ARCHITECTURE.md`
  (référencé depuis la Grammar §7 et `CLAUDE.md`). Audit du 2026-07-01 : tous les
  composants de base passent (aucune violation).
- **FloatingCard** — Structural élevé, dérivation directe de GlassCard
  (`.ds-card` verbatim ; seul l'axe Depth change : `shadow-4` ajouté au niveau
  composant, jamais dans glass.css). Aucun nouveau matériau, aucune décision de layout.
- **Navbar** — 1er composant de navigation, spécialisation directe de GlassPanel
  (aucun saut de hiérarchie). Matériau/lumière/optique/ombre = GlassPanel inchangé ;
  seule différence = géométrie (rangée de nav 56/64px, padding horizontal, flex,
  alignement, responsive ; `p-0` sur l'hôte → verre bord à bord). Rayon décidé par
  Navbar : flottant (rayon Structural) par défaut, ou `attached` (`rounded-none`) —
  les deux possibles, aucun imposé. Placement (sticky/fixed, scroll) délégué au
  consommateur (A1). API composable ouverte : `Navbar.Brand / .Content / .Actions`,
  sans hypothèse métier ; Content se replie sous `md`. Preuve : `/dev/navbar`
  (GlassPanel vs Navbar, fond clair + riche) — matériau identique, géométrie seule.

## EN COURS
- Phase 04 — généralisation de la librairie par dérivation des cinq rôles gelés.

## PROCHAINE SESSION

Continuer la famille Structural / navigation (dérivée de GlassCard / GlassPanel) :

1. Sidebar       (← GlassCard/Panel : rail vertical)
2. BottomNav     (← GlassPanel : bande basse mobile)
3. Footer        (← GlassPanel : bande basse pleine largeur)
4. StatCard / EmptyState / ErrorState / ChartWrapper (← GlassCard)

Note : `MobileMenu` reste à construire ; la Navbar est déjà prévue pour l'accueillir
(Content masqué sous `md`, Actions conserve la place du futur hamburger).

**Fond de capture standard (dès Sidebar).** Tous les proofs à venir utilisent le
fond `.proof-canvas` (classe dans `card.css`) → `public/backgrounds/capture-bg.jpg`,
une texture liquid-glass en niveaux de gris. Générateur reproductible :
`node scripts/capture-bg-generate.mjs` (le fichier peut être remplacé par une image
exacte à tout moment, même chemin). C'est un fond clair → texte foncé (comme
`.proof-light`).

**Règles :** aucun changement du matériau n'est autorisé. Seules des dérivations
des cinq rôles gelés sont permises (géométrie/interaction uniquement). Avant
chaque composant : déclarer de quel rôle il dérive, quelles couches optiques sont
réutilisées, quelles magnitudes changent.
