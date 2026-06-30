# PHASE 03 — Document de préparation

> Document de cadrage **avant implémentation**. Aucun code n'est produit ici.
> L'implémentation ne démarre qu'après validation explicite.
> Sources lues pour cette phase (et uniquement celles-ci) :
> `DISCIPLINE_BUILD_PLAN.md` → Phase 03 · `DISCIPLINE_CANONICAL_TOKENS.md` §1/§12
> · `DISCIPLINE_COMPONENT_LIBRARY.md` (niveau 1) · `DISCIPLINE_RULEBOOK.md`
> (Vol.6-02 Buttons, Vol.6-03 Glass Cards, Micro-Interactions, Accessibility).

---

## 0. Note d'outillage (Graphify)

Le graphe **Graphify n'est pas disponible** dans cet environnement (aucun serveur
MCP de ce type connecté ; vérifié). La préparation s'est donc appuyée sur des
lectures ciblées des seuls documents nécessaires, pas sur un parcours complet du
projet.

---

## 1. Objectif détaillé de la phase

Construire les **primitives UI de niveau 1** : composants fondamentaux, **sans état
métier, sans data-fetching, sans effet de bord**. Ils reçoivent des props et rendent
une sortie déterministe. Ce sont les briques que tous les composants de niveau
supérieur (Phase 04+) et toutes les features composeront.

Exigences transverses, intégrées **dès ce niveau** (jamais rétro-ajoutées) :

- **Accessibilité native** (WCAG 2.2 AA) : navigation clavier, ARIA, focus visible.
- **Tokens exclusivement** : aucune valeur brute (couleur/px/ms) — garanti par la
  règle ESLint de la Phase 02.
- **Tous les états définis** par composant : default, hover, focus, active, disabled,
  loading (+ success/error pour les boutons). « Aucun état indéfini » (Rulebook).
- **Composant unique réutilisable** par primitive (pas de duplication) — exposé via
  des props typées.

À la clôture : une page de démonstration `/dev/components` présente chaque composant
dans tous ses états, le build passe sans erreur, et le scan axe-core ne relève
**aucune violation**.

---

## 2. Composants qui seront créés

Regroupés comme dans le Build Plan. Chacun livré avec : interface TypeScript, tous
les états, interaction clavier, attributs ARIA, comportement responsive, spécification
de motion.

### Boutons (`src/components/ui/`)
- `Button` — variantes : primary, secondary (glass), ghost, outline, destructive ; tailles sm/md/lg ; états incl. loading (largeur préservée), success, error.
- `IconButton` — variante carrée icône seule ; **tooltip obligatoire** (accessibilité).
- `LinkButton` — rendu `<a>` ; mêmes variantes visuelles que `Button`.

### Champs de formulaire
- `Input` — text/email/password/number ; label, erreur, helper, compteur de caractères, slots prefix/suffix.
- `Textarea` — multiligne, auto-resize optionnel.
- `Select` — variante native **et** custom (Radix).
- `Checkbox` — label + état indéterminé.
- `RadioGroup` — navigable au clavier (flèches).
- `Switch` — toggle + label.
- `Slider` — plage numérique.
- `DatePicker` — popover calendrier, clavier accessible.
- `FileInput` — zone drag-and-drop + clic pour parcourir.

### Affichage
- `Badge` — default/success/warning/error/info ; tailles sm/md.
- `Avatar` — image + fallback initiales ; sm/md/lg/xl ; état skeleton.
- `Icon` — wrapper Lucide (taille + couleur via tokens).
- `Spinner` — sm/md/lg.
- `Skeleton` — placeholder shimmer (rect / cercle / texte).
- `Separator` — horizontal et vertical.

### Typographie
- `Heading` — h1→h6 (prop `as`), mappé sur l'échelle de tokens.
- `Text` — paragraphe/span, props size & weight.
- `Label` — toujours associé à un input via `htmlFor`.
- `Code` — inline et bloc.

### Feedback
- `Alert` — 4 variantes sémantiques (icône + titre + description + dismiss).
- `Progress` — linéaire et circulaire, animé.
- `Tooltip` — accessible, déclenché au clavier, placement configurable.

> **Hors périmètre Phase 03** (rappel) : tout composant « verre » composite
> (GlassCard, Modal, Drawer, Navbar…) appartient à la **Phase 04**.

---

## 3. Fichiers créés ou modifiés

### Créés
| Chemin | Rôle |
|---|---|
| `src/components/ui/<composant>.tsx` | Un fichier par primitive ci-dessus (~28 fichiers). |
| `src/components/ui/index.ts` | Barrel d'export des primitives. |
| `src/lib/cn.ts` | Utilitaire de fusion de classes (`clsx` + `tailwind-merge`). |
| `src/app/(dev)/dev/components/page.tsx` | Page de démonstration (dev only) — tous les composants × tous les états. |
| `components.json` | Configuration du générateur de primitives (si Shadcn CLI retenu, §10). |
| `scripts/a11y-scan.mjs` | Script de scan axe-core sur la page `/dev/components`. |
| `scripts/screenshots.mjs` | Script Playwright : captures 1440 / 1024 / 390 px. |
| `docs/PHASE_03_DESIGN_REVIEW.md` | Design Review de fin de phase (captures + responsive + a11y + justification Rulebook). |

### Modifiés
| Chemin | Modification |
|---|---|
| `package.json` / `pnpm-lock.yaml` | Dépendances de la phase (voir §4). |
| `PROJECT_STATE.md` | Mise à jour de fin de phase. |
| `CHANGELOG.md` | Entrée Phase 03. |
| `tailwind.config.ts` | **Si nécessaire seulement** : ajout d'un éventuel keyframe (shimmer skeleton, spinner) via tokens. À confirmer ; aucune valeur brute. |

> **Phase Lock** : Phases 01–02 verrouillées. La seule retouche envisageable hors
> Phase 03 serait l'ajout d'un keyframe d'animation dans `tailwind.config.ts`
> (fichier de tokens, Phase 02) — considéré comme **extension de tokens**, pas
> modification fonctionnelle. Sera signalé explicitement si réalisé.

---

## 4. Dépendances avec les phases précédentes (et paquets)

### Dépendances de phases
- **Phase 01 (verrouillée)** : toolchain, TypeScript strict, ESLint flat config, structure `src/components/ui/`.
- **Phase 02 (verrouillée)** : système de tokens (CSS + Tailwind + TS), police Geist, règle anti-valeurs-brutes, anneau focus global, `prefers-reduced-motion`. **Tous les composants consomment ces tokens.**
- **Aval** : Phase 04 (composites verre) compose ces primitives ; Phases 19+, 22+ les réutilisent.

### Paquets à installer (versions épinglées exactes, règle Phase 01)
| Paquet | Rôle |
|---|---|
| `@radix-ui/react-*` (select, checkbox, radio-group, switch, slider, tooltip, progress, separator, label, avatar, slot) | Primitives headless accessibles. |
| `lucide-react` | Icônes (exigé par le Rulebook : « Lucide React only »). |
| `class-variance-authority` | Variantes typées (pattern recommandé). |
| `clsx` + `tailwind-merge` | Utilitaire `cn()` de fusion de classes. |
| `react-day-picker` | Base du `DatePicker` (calendrier accessible). |
| `@axe-core/playwright` (dev) | Scan d'accessibilité automatisé. |

> Playwright + Chromium sont **déjà préinstallés** dans l'environnement (captures
> et scan a11y), donc pas de téléchargement de navigateur.

---

## 5. Design Tokens utilisés

Aucune valeur brute : tout via les tokens de la Phase 02. Principaux groupes mobilisés
(réf. `DISCIPLINE_CANONICAL_TOKENS.md`) :

| Domaine | Tokens |
|---|---|
| Couleurs texte | `text`, `text-secondary`, `text-tertiary`, `text-disabled` (§1.2) |
| Accent | `accent` (#8B7CFF Brand), `accent-accessible` (#6C5CE7), `accent-subtle`, `accent-contrast` (§1.3) |
| Sémantiques | `success`/`warning`/`error`/`info` + teintes/bordures (§1.4) |
| Surfaces/bordures | `surface`, `surface-raised`, `border`, `border-strong`, `divider` (§1.1/§1.5) |
| Verre (boutons secondary, à la marge) | `glass-regular`, `glass-border` (§2) |
| États | `state-hover`, `state-pressed`, `opacity-disabled` (§1.7) |
| Focus | `focus-ring-color/width/offset/halo` (§1.8) |
| Typo | échelle `display-1`→`caption`, graisses 400/500/600 (§3) |
| Espacements | échelle 0→12, cibles tactiles `target-min` 44px (§4/§11) |
| Rayons | `sm`/`md`/`lg`/`pill` (§5) |
| Ombres | `shadow-1..4`, `accent-glow` (§6) |
| Motion | `dur-instant/fast/standard`, `ease-standard` (§8) |
| Specs composant | Button §12.3, Input §12.5, Badge §12.9, Avatar §12.10, Tooltip §12.11 |

### ⚠️ Conflits Rulebook ↔ Tokens canoniques — résolution
Le Rulebook (Vol.6-02) contient des valeurs numériques **caduques** au regard de la
règle d'annulation des tokens canoniques. **Les tokens canoniques priment** :

| Sujet | Rulebook (caduc) | Token canonique (appliqué) |
|---|---|---|
| Label du bouton Primary | « White » | **`#111111` (dark)** + fond Brand `#8B7CFF` (§12.3, verrouillé v1.1.0) |
| Tailles boutons | 36/48/56/64 | **sm 36 / md 44 / lg 56** (§12.3) |
| Radius boutons | 14/20/28 | **`pill`** (§12.3) |
| Hover lift | « 3px » | **`translateY(-1px)`** (§12.3) |
| Active scale | « 0.97 » | **`scale(0.98)`** (§12.3) |
| Verre secondary | `rgba(255,255,255,.55)` / blur 24 | **`glass-regular` (.56) / blur 32** (§2) |

Le Rulebook reste la référence pour le **qualitatif** (cf. §6).

---

## 6. Règles du Rulebook concernées

| Règle (Rulebook) | Application Phase 03 |
|---|---|
| **Buttons — principes** (Vol.6-02) : clear, tactile, elegant, accessible ; « every interaction should feel physical » | Hover/active tactiles via transform + glow, durée ≤ `dur-fast` (160ms). |
| **States** : default/hover/active/focus/disabled/loading/success/error — « no undefined state » | Tous les états implémentés sur `Button`. |
| **Loading** : spinner remplace le label, **largeur préservée**, clics désactivés | Comportement `Button` en loading. |
| **Error** : shake une fois, bordure rouge, message lisible, **jamais la couleur seule** | `Button` erreur + champs en erreur (icône + texte). |
| **Focus** : anneau visible 2px accent, **jamais supprimé** | Anneau global Phase 02 + `focus-visible` par composant. |
| **Icon buttons** : leading/trailing/icon-only, espacement 12px, **Lucide only** | `IconButton` + slots d'icônes ; `lucide-react`. |
| **Magnetic effect** : desktop only, 4–8px, désactivé au tactile | **Préparé** mais l'effet magnétique relève surtout des CTA (Phase 04/06) ; au niveau primitive, hooks prêts, non imposé. |
| **Typography** : weight 600 sur boutons, sentence case dashboard | Appliqué via tokens typo. |
| **Glass Cards — Focus/Typography/Accessibility** (Vol.6-03) | Informe `Tooltip`/`Badge` ; cartes verre = Phase 04. |
| **Micro-Interactions / Motion QA** | Anime uniquement `transform`/`opacity`/`filter` ; respect `prefers-reduced-motion`. |
| **Accessibility** (Rulebook + Vol.5) : contraste AA, clavier, focus, labels SR, désactivés identifiables | Critère bloquant (axe-core 0 violation). |

---

## 7. Risques techniques

| Risque | Mitigation |
|---|---|
| Le générateur (Shadcn) produit des couleurs Tailwind en dur | Réécriture immédiate en utilitaires token ; la règle ESLint **bloque** tout hex/rgb/px/ms résiduel. |
| Quirks d'accessibilité de Radix selon versions | Versions épinglées ; test clavier manuel + axe-core. |
| Anneau de focus écrasé par le reset Tailwind preflight | Anneau `focus-visible` global déjà défini en Phase 02 ; vérifié par composant. |
| Initiales d'`Avatar` qui débordent | Test avec noms longs / mono-caractère. |
| `DatePicker` lourd (bundle) ou peu accessible | `react-day-picker` (accessible) ; import dynamique si nécessaire. |
| Introduction de Playwright/axe avant la Phase 39 (tests) | Utilisés ici **uniquement** comme scripts de validation/captures, pas comme suite de tests CI complète (qui reste Phase 39-40). |
| Conflit numérique Rulebook ↔ tokens | Résolu §5 : tokens canoniques prioritaires, documenté. |
| Keyframes (shimmer/spinner) introduisant des valeurs brutes | Définis via tokens/utilitaires ; pas de ms/px brut hors fichiers de tokens. |

---

## 8. Critères de validation (Phase 03 terminée)

- [ ] Chaque composant rend sans erreur TypeScript.
- [ ] Chaque composant interactif est navigable au clavier (Tab/Enter/Espace/flèches selon le cas).
- [ ] Chaque composant respecte WCAG 2.2 AA (contraste).
- [ ] Chaque composant a un `focus-visible` explicite (jamais `outline:none` sans remplacement).
- [ ] Chaque composant de texte utilise des tokens de l'échelle typographique.
- [ ] Chaque couleur remonte à un token (règle ESLint verte).
- [ ] La page `/dev/components` présente tous les composants et leurs états.
- [ ] `pnpm build`, `pnpm lint`, `pnpm type-check`, `pnpm format:check` passent.
- [ ] Le scan **axe-core** de `/dev/components` montre **0 violation**.
- [ ] `/dev/components` est **inaccessible en production** (404, comme `/dev/tokens`).
- [ ] **Design Review** complet fourni (captures + responsive + a11y + justification Rulebook).
- [ ] `PROJECT_STATE.md` et `CHANGELOG.md` mis à jour.

---

## 9. Preuves fournies à la fin (format objectif)

Conformément à la règle de reporting (commande + exit code + durée) :

```
✓ pnpm lint          Exit code: 0
✓ pnpm type-check    Exit code: 0
✓ pnpm format:check  Exit code: 0
✓ pnpm build         Exit code: 0    Duration: <mesurée> s
```
- **axe-core** : sortie du scan `/dev/components` → `0 violations` (résumé chiffré).
- **Production guard** : `GET /dev/components` (prod) → `HTTP 404` ; `GET /` → `200`.
- **Tests négatifs tokens** (rappel) : la règle ESLint bloque hex/rgb/px/ms.
- **Empreinte git** : hash du commit de fin de phase + `push origin main` + arbre propre.

---

## 10. Captures & démonstrations visuelles (Design Review)

Produites en fin d'implémentation et regroupées dans `docs/PHASE_03_DESIGN_REVIEW.md` :

1. **Capture desktop — 1440 px** de `/dev/components`.
2. **Capture tablette — 1024 px**.
3. **Capture mobile — 390 px**.
   > Générées via Playwright (Chromium préinstallé), full-page, en mode light.
4. **Vérification responsive** : tableau d'observations aux 3 largeurs (+ contrôle 768 px),
   absence de débordement horizontal, cibles tactiles ≥ 44px en mobile.
5. **Vérification accessibilité** : résultat axe-core (0 violation) + check manuel
   clavier (parcours Tab, activation Entrée/Espace, navigation flèches sur Radio/Select/Slider)
   + visibilité du focus sur fond clair et verre.
6. **Justification des choix visuels vs `DISCIPLINE_RULEBOOK.md`** : pour Button,
   IconButton, champs, Badge, Tooltip — mapping « règle Rulebook → décision »,
   en explicitant les résolutions de conflits (§5) où les tokens canoniques priment.

### Décisions tranchées (validées)
1. **Approche primitives → Radix + `class-variance-authority` + `cn()`** (pattern
   Shadcn, **authored sur nos tokens**, sans couleurs brutes). Pas de Shadcn CLI brut.
2. **DatePicker → `react-day-picker`** (calendrier accessible, stylé via tokens).
3. **Outillage captures/a11y → Playwright (préinstallé) + `@axe-core/playwright`**,
   utilisés uniquement comme scripts de validation (la suite de tests complète reste
   en Phase 39-40).

---

> **En attente de validation explicite avant tout démarrage de l'implémentation.**
> Décisions techniques **tranchées** (§10) : Radix + cva + cn() · react-day-picker ·
> Playwright + @axe-core/playwright.
