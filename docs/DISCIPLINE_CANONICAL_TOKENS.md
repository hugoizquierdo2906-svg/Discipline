# DISCIPLINE — CANONICAL DESIGN TOKENS

> ⛔ **RÈGLE D'ANNULATION — À LIRE EN PREMIER**
> **Ce document annule et remplace TOUTES les valeurs numériques (couleurs, tailles, durées, espacements, rayons, ombres, opacités, etc.) présentes dans n'importe quel autre document du projet.** Si une valeur de `DISCIPLINE_MASTER_CONTEXT.md`, `DISCIPLINE_DESIGN_TOKENS.md`, `DISCIPLINE_RULEBOOK.md`, `DISCIPLINE_COMPONENT_LIBRARY.md` ou `DISCIPLINE_PROMPT.md` diffère de celle-ci, **elle est caduque et doit être ignorée.** Ce fichier est la **seule référence numérique du projet**.

**Statut : source de vérité unique.** Ce document remplace et prime sur toute valeur de token présente dans `DISCIPLINE_DESIGN_TOKENS.md`, `DISCIPLINE_MASTER_CONTEXT.md`, `DISCIPLINE_RULEBOOK.md`, `DISCIPLINE_COMPONENT_LIBRARY.md` et `DISCIPLINE_PROMPT.md`. En cas de divergence, **c'est ce fichier qui gagne**, sans exception.

- Version : `1.1.0` — verrouille le mode du CTA primaire (§12.3).
- Périmètre : couleurs, typographie, espacements, rayons, ombres, flous, verre, motion, z-index, breakpoints, états, focus, cibles tactiles, **composants**.
- Contraintes verrouillées : **WCAG 2.2 AA non négociable**, budgets perf non négociables (LCP < 2,5s · INP < 200ms · CLS < 0,1 · Lighthouse ≥ 95).
- Convention de nommage : préfixe `--ds-` (DISCIPLINE design system). Les identifiants et valeurs sont en notation standard (anglais, hex, px, cubic-bezier) pour rester portables.
- Implémentation : la traduction en CSS variables / Tailwind / TS se fera à la phase d'implémentation. **Ce fichier est une spécification, pas du code applicatif.**

---

## 0. Principe directeur (rappel)

Neutres off-white + **un seul accent violet** (en rampe) + (rouge / ambre / vert **uniquement** pour les statuts fonctionnels). Verre = matériau d'identité. Motion calme et justifiée. Lisibilité et accessibilité avant l'esthétique. Aucune couleur décorative supplémentaire.

---

## 1. Couleurs

### 1.1 Fonds et surfaces

| Token | Valeur | Usage |
|---|---|---|
| `--ds-color-bg` | `#FAFAF8` | Fond global (canvas architectural off-white). |
| `--ds-color-surface` | `#F3F3F1` | Surface neutre légèrement surélevée (sections, plaques opaques sous texte). |
| `--ds-color-surface-raised` | `#FFFFFF` | Plaque blanche maximale (zones de lecture critiques sur média). |

### 1.2 Texte (toutes les valeurs validées AA sur `--ds-color-bg`)

| Token | Valeur | Ratio / `#FAFAF8` | Usage |
|---|---|---|---|
| `--ds-color-text` | `#111111` | ~17,9:1 (AAA) | Titres, texte principal, emphase. |
| `--ds-color-text-secondary` | `#5A5A5A` | ~6,6:1 (AA) | Corps de texte secondaire, descriptions. |
| `--ds-color-text-tertiary` | `#6E6E6E` | ~4,9:1 (AA) | Légendes, méta — **gris de texte le plus clair autorisé**. |
| `--ds-color-text-disabled` | `#9B9B9B` | ~2,7:1 (exempt) | Texte désactivé uniquement (non essentiel, exempté AA). |
| `--ds-color-text-on-accent` | `#FFFFFF` | voir §1.4 | Texte sur surface accent. |

> **Règle :** aucun token de texte ne descend sous `--ds-color-text-tertiary` pour du contenu lisible. `#8E8E8E` et plus clair sont **interdits pour le texte** (voir §1.6, usages non-textuels uniquement).

### 1.3 Accent violet (Brand Accent + Accessible Accent)

Le violet de marque est **unique et inchangé**. `Accessible Accent` n'est **pas** une seconde couleur de marque : c'est une **variante fonctionnelle** du même violet, employée **uniquement** là où WCAG l'exige (texte, labels, petits boutons, liens, surfaces portant du texte blanc).

| Token | Rôle | Valeur | Usage |
|---|---|---|---|
| `--ds-color-accent` | **Brand Accent** | `#8B7CFF` | Identité de marque. Fills décoratifs, glow, indicateurs actifs, **grands titres** (≥ 24px), éléments d'UI **non-textuels**. Jamais modifié. |
| `--ds-color-accent-accessible` | **Accessible Accent** | `#6C5CE7` | Variante fonctionnelle (même teinte, plus foncée). Utilisée **seulement quand WCAG l'impose** : labels de boutons, liens, texte violet à taille normale, surfaces accent avec texte blanc. |
| `--ds-color-accent-subtle` | Tint | `#F1EEFE` | Fond de survol / état sélectionné (wash violet très clair). |
| `--ds-color-accent-contrast` | Texte sur accent | `#FFFFFF` | Texte/icône sur `--ds-color-accent-accessible`. |

> **Règle d'emploi du violet.** Par défaut, tout est **Brand Accent `#8B7CFF`**. On bascule sur **Accessible Accent `#6C5CE7`** uniquement lorsque l'élément porte du texte devant respecter l'AA — parce que le blanc sur `#8B7CFF` ne fait que 3,27:1 et le `#8B7CFF` en texte sur fond clair 3,13:1 (échec AA pour texte normal ; OK ≥ 24px / UI). L'identité de marque reste donc strictement `#8B7CFF` ; `#6C5CE7` n'apparaît que comme exigence d'accessibilité, jamais comme choix esthétique.

### 1.4 Couleurs sémantiques (statuts fonctionnels)

Réservées aux états réels. Chacune doit **toujours** être accompagnée d'une icône + d'un texte (jamais la couleur seule — exigence WCAG). Les valeurs « solide » servent au texte/icône et sont AA sur fond clair ; la teinte sert au fond de bannière.

| Token | Solide (texte/icône) | Ratio / `#FAFAF8` | Teinte fond (bannière) | Bordure |
|---|---|---|---|---|
| `--ds-color-success` | `#15803D` | ~4,8:1 (AA) | `rgba(21,128,61,0.08)` | `rgba(21,128,61,0.20)` |
| `--ds-color-warning` | `#B45309` | ~4,7:1 (AA) | `rgba(180,83,9,0.08)` | `rgba(180,83,9,0.20)` |
| `--ds-color-error` | `#B91C1C` | ~6,1:1 (AA) | `rgba(185,28,28,0.08)` | `rgba(185,28,28,0.20)` |
| `--ds-color-info` | `#6C5CE7` | ~4,7:1 (AA) | `rgba(108,92,231,0.08)` | `rgba(108,92,231,0.20)` |

> `info` est mappé sur l'**Accessible Accent** `#6C5CE7` (et non sur un bleu) pour ne pas introduire de teinte parasite à côté du violet.

### 1.5 Bordures et séparateurs (alpha-noir)

| Token | Valeur | Usage |
|---|---|---|
| `--ds-color-border` | `rgba(17,17,17,0.08)` | Bordure subtile par défaut. |
| `--ds-color-divider` | `rgba(17,17,17,0.12)` | Séparateur plus marqué. |
| `--ds-color-border-strong` | `rgba(17,17,17,0.18)` | Contour appuyé (rare). |

### 1.6 Usages non-textuels du gris clair

| Token | Valeur | Usage (jamais du texte lisible) |
|---|---|---|
| `--ds-color-neutral-light` | `#8E8E8E` | Icônes décoratives désactivées, traits non porteurs d'information. |

### 1.7 États (overlays)

| Token | Valeur | Usage |
|---|---|---|
| `--ds-state-hover` | `rgba(17,17,17,0.04)` | Survol sur surface neutre. |
| `--ds-state-hover-accent` | `rgba(139,124,255,0.10)` | Survol sur élément accent. |
| `--ds-state-pressed` | `rgba(17,17,17,0.08)` | Pressé (combiné à `scale(0.98)`). |
| `--ds-state-selected` | `var(--ds-color-accent-subtle)` | Sélectionné / actif. |
| `--ds-opacity-disabled` | `0.40` | Opacité des éléments désactivés. |

### 1.8 Focus (accessibilité — non négociable)

| Token | Valeur | Usage |
|---|---|---|
| `--ds-focus-ring-color` | `#6C5CE7` | Anneau de focus (~4,6:1 sur fond clair, ≥ 3:1 requis). |
| `--ds-focus-ring-width` | `2px` | Épaisseur de l'anneau. |
| `--ds-focus-ring-offset` | `2px` | Décalage. |
| `--ds-focus-ring-halo` | `0 0 0 2px #FFFFFF` | Anneau blanc intermédiaire pour rester visible **sur le verre** comme sur le clair. |

> Le focus n'est jamais supprimé. Sur composant en verre : anneau blanc (`halo`) + anneau accent → double contour garantissant la visibilité quel que soit l'arrière-plan. Les états (actif, erreur, succès) ne reposent jamais sur la couleur seule.

---

## 2. Verre (Liquid Glass)

Trois paliers d'opacité pour réconcilier identité translucide et contraste de texte.

| Token | Valeur | Blur | Usage |
|---|---|---|---|
| `--ds-glass-thin` | `rgba(255,255,255,0.40)` | `24px` | Grands overlays héros, décoratif. **Aucun texte essentiel.** |
| `--ds-glass-regular` | `rgba(255,255,255,0.56)` | `32px` | Cartes / widgets standard. Texte autorisé **uniquement** au-dessus du canvas off-white, en `text` ou `text-secondary` (jamais `text-tertiary` sur verre). |
| `--ds-glass-thick` | `rgba(255,255,255,0.80)` | `32px` | Cartes riches en texte. AA atteint pour `text`/`text-secondary` au-dessus du canvas. |
| `--ds-glass-border` | `rgba(255,255,255,0.68)` | — | Bordure 1px du verre. |
| `--ds-glass-highlight` | `rgba(255,255,255,0.50)` | — | Liseré de lumière interne haut (1px inset) — bord « usiné ». |

**Recette de verre signature (composition des tokens) :**
`background: --ds-glass-regular` + `backdrop-filter: blur(--ds-blur-glass)` + `border: 1px solid --ds-glass-border` + `border-radius: --ds-radius-lg` + `box-shadow: --ds-shadow-2` + liseré `--ds-glass-highlight` en haut.

**Règles non négociables du verre :**
- Maximum **3 couches de verre** visibles simultanément.
- **Pas de texte de lecture sur verre nu** au-dessus d'une image/vidéo : poser le texte sur une plaque opaque (`--ds-color-surface` ou `--ds-color-surface-raised`) ou utiliser `--ds-glass-thick` au-dessus du canvas contrôlé.
- Valeurs de blur uniquement issues de l'échelle §5 (jamais de blur arbitraire).

---

## 3. Typographie

### 3.1 Familles et graisses

| Token | Valeur |
|---|---|
| `--ds-font-sans` | `"Geist", "Inter", system-ui, -apple-system, sans-serif` |
| `--ds-font-mono` | `"Geist Mono", ui-monospace, monospace` (chiffres tabulaires, métriques, timecode) |
| `--ds-font-weight-regular` | `400` |
| `--ds-font-weight-medium` | `500` |
| `--ds-font-weight-semibold` | `600` |

> Graisses limitées à 3 (contrainte perf : « minimize font families and weights »). Self-host via `next/font`, `font-display: swap`, préchargement de la primaire.

### 3.2 Échelle typographique

Échelle (desktop) : 120 / 96 / 72 / 56 / 48 / 40 / 32 / 24 / 18 / 16 / 14 / 12. Tracking négatif sur les grandes tailles (rythme éditorial), neutre sur le corps.

| Token | Size | Line-height | Tracking | Weight | Usage |
|---|---|---|---|---|---|
| `--ds-text-display-1` | `120px` | `1.00` | `-0.03em` | 600 | Héros desktop uniquement. |
| `--ds-text-display-2` | `96px` | `1.02` | `-0.03em` | 600 | Héros / ouverture de section. |
| `--ds-text-display-3` | `72px` | `1.04` | `-0.02em` | 600 | Grand titre éditorial. |
| `--ds-text-h1` | `56px` | `1.06` | `-0.02em` | 600 | Titre de page. |
| `--ds-text-h2` | `48px` | `1.10` | `-0.02em` | 600 | Titre de section. |
| `--ds-text-h3` | `40px` | `1.12` | `-0.01em` | 600 | Sous-section. |
| `--ds-text-h4` | `32px` | `1.18` | `-0.01em` | 500 | Titre de bloc. |
| `--ds-text-h5` | `24px` | `1.25` | `0` | 500 | Titre de carte / accent texte autorisé. |
| `--ds-text-body-lg` | `18px` | `1.55` | `0` | 400 | Intro, corps large. |
| `--ds-text-body` | `16px` | `1.55` | `0` | 400 | **Corps de référence (taille mini du corps).** |
| `--ds-text-body-sm` | `14px` | `1.50` | `0` | 400 | Texte secondaire. |
| `--ds-text-caption` | `12px` | `1.40` | `+0.01em` | 500 | Méta non essentielle (doit respecter le contraste). |

### 3.3 Responsive (ajouté — voir changelog)

Les tailles `display-*` et `h1`/`h2` ne s'appliquent pas telles quelles en mobile.

| Token | Desktop (≥ lg) | Tablet (md) | Mobile (< md) |
|---|---|---|---|
| `display-1` | 120 | 80 | 48 |
| `display-2` | 96 | 64 | 44 |
| `display-3` | 72 | 56 | 40 |
| `h1` | 56 | 44 | 32 |
| `h2` | 48 | 36 | 28 |
| `h3` | 40 | 32 | 24 |

> Corps (`body`, `body-sm`, `caption`) inchangé selon le breakpoint. Le corps ne descend jamais sous 16px ; `caption` 12px réservé au méta non essentiel.

### 3.4 Largeur de lecture

| Token | Valeur | Usage |
|---|---|---|
| `--ds-measure` | `68ch` | Largeur max d'un bloc de texte courant (pas de colonnes pleine largeur). |

---

## 4. Espacements

Base = **8px** (sous-pas unique autorisé : 4px). Aucune valeur hors échelle.

| Token | Valeur |
|---|---|
| `--ds-space-0` | `0` |
| `--ds-space-1` | `4px` |
| `--ds-space-2` | `8px` |
| `--ds-space-3` | `12px` |
| `--ds-space-4` | `16px` |
| `--ds-space-5` | `24px` |
| `--ds-space-6` | `32px` |
| `--ds-space-7` | `40px` |
| `--ds-space-8` | `48px` |
| `--ds-space-9` | `64px` |
| `--ds-space-10` | `80px` |
| `--ds-space-11` | `96px` |
| `--ds-space-12` | `128px` |

### 4.1 Espacements sémantiques (rythme éditorial, responsive)

| Token | Desktop (≥ lg) | Tablet (md) | Mobile (< md) | Usage |
|---|---|---|---|---|
| `--ds-space-section-y` | `160px` | `112px` | `80px` | Marge verticale entre sections. |
| `--ds-space-hero-y` | `220px` | `160px` | `120px` | Respiration du héros. |
| `--ds-space-grid-gutter` | `32px` | `24px` | `16px` | Gouttière de grille. |

> Les valeurs tablet/mobile sont **ajoutées** (la doc ne donnait que 160/220 desktop, inutilisables en mobile).

---

## 5. Rayons

| Token | Valeur | Usage |
|---|---|---|
| `--ds-radius-xs` | `8px` | Petits éléments (chips, tags). |
| `--ds-radius-sm` | `12px` | Inputs compacts, petits boutons. |
| `--ds-radius-md` | `20px` | Inputs, boutons secondaires, petites cartes. |
| `--ds-radius-lg` | `28px` | **Cartes / widgets en verre (signature).** |
| `--ds-radius-xl` | `36px` | Grands panneaux héros en verre. |
| `--ds-radius-pill` | `999px` | Capsules — **CTA primaire, pilules de navigation**. |

> Conflit résolu : carte/verre = **28px** (`radius-lg`). Le `32px` de l'écran Auth est aligné sur 28px (`lg`). Boutons primaires = capsule (`pill`) conformément à « rounded glass capsules ».

---

## 6. Ombres

Ombres douces uniquement, multi-couches, basse opacité (alpha-noir `#101010`). Aucune ombre dure/portée agressive.

| Token | Valeur | Usage |
|---|---|---|
| `--ds-shadow-1` | `0 1px 2px rgba(16,16,16,0.04), 0 1px 1px rgba(16,16,16,0.03)` | Carte au repos. |
| `--ds-shadow-2` | `0 4px 12px rgba(16,16,16,0.06), 0 1px 2px rgba(16,16,16,0.04)` | Widget en verre, élément flottant. |
| `--ds-shadow-3` | `0 12px 32px rgba(16,16,16,0.10), 0 2px 6px rgba(16,16,16,0.05)` | Popover, dropdown, survol surélevé. |
| `--ds-shadow-4` | `0 24px 64px rgba(16,16,16,0.14), 0 4px 12px rgba(16,16,16,0.06)` | Modale, dialogue. |
| `--ds-shadow-contact` | `0 1px 1px rgba(16,16,16,0.05)` | Ombre de contact fine (ancrage). |
| `--ds-shadow-ambient` | `0 32px 80px rgba(16,16,16,0.08)` | Halo ambiant large (verre héros). |
| `--ds-shadow-accent-glow` | `0 0 0 1px rgba(139,124,255,0.30), 0 8px 24px rgba(139,124,255,0.18)` | Glow violet **discret** (actif/survol) — jamais bruyant. |

> Valeurs **définies** ici : la doc nommait `shadow-1..4`, `shadow-contact`, `shadow-ambient` sans aucune valeur.

---

## 7. Flou (blur)

| Token | Valeur |
|---|---|
| `--ds-blur-0` | `0px` |
| `--ds-blur-1` | `8px` |
| `--ds-blur-2` | `16px` |
| `--ds-blur-3` | `24px` |
| `--ds-blur-glass` | `32px` |
| `--ds-blur-5` | `40px` |
| `--ds-blur-6` | `48px` |

> `--ds-blur-glass` (32px) est le flou de référence du verre.

---

## 8. Motion

Une **seule** échelle (les 4 échelles divergentes des docs sont fusionnées). Easing canonique unique.

### 8.1 Durées

| Token | Valeur | Usage |
|---|---|---|
| `--ds-dur-instant` | `100ms` | Feedback micro (pression bouton). |
| `--ds-dur-fast` | `160ms` | Survol, petites UI. **Plafond de survol.** |
| `--ds-dur-standard` | `240ms` | Transition par défaut. |
| `--ds-dur-slow` | `320ms` | Transitions UI plus larges (accordéon, drawer). |
| `--ds-dur-page` | `480ms` | Transition de route (fade + blur léger + scale 0.98→1). |
| `--ds-dur-scene` | `720ms` | Révélation cinématique de section. |
| `--ds-dur-hero` | `1200ms` | Séquence d'intro héros. |

> Les animations de survol ne dépassent jamais `--ds-dur-fast` (160ms).

### 8.2 Easings

| Token | Valeur | Usage |
|---|---|---|
| `--ds-ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | **Easing principal** (entrées, transitions UI). |
| `--ds-ease-out` | `cubic-bezier(0.00, 0.00, 0.20, 1)` | Entrées simples. |
| `--ds-ease-in` | `cubic-bezier(0.40, 0.00, 1.00, 1)` | Sorties. |
| `--ds-ease-in-out` | `cubic-bezier(0.45, 0.00, 0.55, 1)` | Boucles courtes symétriques. |

### 8.3 Spring (référence Framer)

| Token | Valeur | Usage |
|---|---|---|
| `--ds-spring-ui` | `{ stiffness: 260, damping: 32 }` | Boutons magnétiques / drag — réglé **sans dépassement (no bounce)**. |

> Par défaut, préférer un `tween` + `--ds-ease-standard`. Le spring est quasi-critique : **aucun rebond** (interdiction « bounce » de la direction créative).

### 8.4 Règles motion (non négociables)

- Animer uniquement `opacity`, `transform`, et `filter` (avec parcimonie). Jamais de propriétés déclenchant un layout.
- `will-change` uniquement pendant l'animation active. Cible 60 FPS.
- **`prefers-reduced-motion`** : parallaxe, grandes transitions et animations continues désactivées ; feedback essentiel réduit à de l'`opacity` ≤ 120ms. Obligatoire.

---

## 9. Z-index

| Token | Valeur |
|---|---|
| `--ds-z-base` | `0` |
| `--ds-z-media` | `10` |
| `--ds-z-glass` | `20` |
| `--ds-z-floating` | `30` |
| `--ds-z-controls` | `40` |
| `--ds-z-nav` | `50` |
| `--ds-z-dropdown` | `60` |
| `--ds-z-overlay` | `90` |
| `--ds-z-modal` | `100` |
| `--ds-z-toast` | `110` |
| `--ds-z-tooltip` | `120` |

> Ancres conservées de la doc (0/10/20/30/40/50/100) ; `dropdown`, `overlay`, `toast`, `tooltip` **ajoutés** pour combler les niveaux manquants.

---

## 10. Breakpoints, grille et conteneur

| Token | Valeur | Colonnes |
|---|---|---|
| (min supporté) | `360px` | 4 |
| `--ds-bp-sm` | `390px` | 4 |
| `--ds-bp-md` | `768px` | 8 |
| `--ds-bp-lg` | `1024px` | 12 |
| `--ds-bp-xl` | `1440px` | 12 |
| `--ds-bp-2xl` | `1920px` | 12 |

| Token | Valeur | Usage |
|---|---|---|
| `--ds-container-max` | `1600px` | Largeur max de contenu (app / dashboard). |
| `--ds-grid-columns-desktop` | `12` | Grille desktop. |
| `--ds-grid-columns-tablet` | `8` | Grille tablet. |
| `--ds-grid-columns-mobile` | `4` | Grille mobile. |

> Breakpoints alignés sur les largeurs de test de la Production Checklist (360/390/768/1024/1440/1920).

---

## 11. Cibles tactiles et tailles minimales

| Token | Valeur | Usage |
|---|---|---|
| `--ds-target-min` | `44px` | Cible tactile minimale (accessibilité). |
| `--ds-border-hairline` | `1px` | Épaisseur de bordure standard. |

---

## 12. Composants (valeurs officielles)

Valeurs composées à partir des primitives ci-dessus. Aucune valeur littérale ne doit être réintroduite : chaque composant référence des tokens. Les composants métier (`WorkoutCard`, `MealCard`, `ProgressCard`, `SubscriptionCard`, `CoachCard`, etc.) **héritent de `Glass Card` + des primitives** et n'ont pas de valeurs propres tant qu'aucun besoin spécifique n'émerge (auquel cas : ajouter ici).

### 12.1 Navbar (barre flottante en verre)

| Propriété | Valeur |
|---|---|
| Height | `64px` desktop / `56px` mobile |
| Offset top (flottant) | `24px` desktop / `16px` mobile |
| Max-width interne | `1280px` |
| Padding X | `--ds-space-5` (24) / mobile `--ds-space-4` (16) |
| Gap liens | `--ds-space-5` (24) |
| Radius | `--ds-radius-pill` |
| Background | `--ds-glass-regular` (0.56) |
| Blur | `--ds-blur-glass` (32) |
| Border | 1px `--ds-glass-border` |
| Shadow | `--ds-shadow-2` |
| Liens | `--ds-text-body-sm` (14) / 500 · couleur `--ds-color-text-secondary`, actif `--ds-color-text` |
| Cible tactile liens | ≥ `--ds-target-min` (44px) |
| Z-index | `--ds-z-nav` |

### 12.2 Hero

| Propriété | Valeur |
|---|---|
| Padding Y | `--ds-space-hero-y` (220 / 160 / 120) |
| Max-width contenu | `1280px` · mesure texte `--ds-measure` (68ch) |
| Gap titre → sous-titre | `--ds-space-5` (24) |
| Gap bloc → CTA | `--ds-space-7` (40) |
| Titre | `--ds-text-display-2` → responsive (§3.3) |
| Sous-titre | `--ds-text-body-lg` (18) · `--ds-color-text-secondary` |
| CTA | Button taille `lg` (§12.3) |
| Media ratio (vidéo plein écran) | `16:9` (cover) · bande large optionnelle `21:9` |
| KPI cards flottantes | `Glass Card` regular · `--ds-radius-lg` · `--ds-shadow-2` · gap `--ds-space-4` |

### 12.3 Buttons (capsules en verre)

Tailles :

| Taille | Height | Padding X | Typo |
|---|---|---|---|
| `sm` | `36px` | `--ds-space-4` (16) | `--ds-text-body-sm` (14) / 500 — zone tactile ≥ 44px via marge |
| `md` | `44px` | `--ds-space-5` (24) | `--ds-text-body` (16) / 600 |
| `lg` | `56px` | `--ds-space-6` (32) | `--ds-text-body-lg` (18) / 600 |

Radius : `--ds-radius-pill` (toutes tailles).

Variantes :

| Variante | Fond | Label | Bordure |
|---|---|---|---|
| **Primary** | `--ds-color-accent` (#8B7CFF — Brand) | `--ds-color-text` (#111111) | — |
| Secondary (glass) | `--ds-glass-regular` | `--ds-color-text` | 1px `--ds-glass-border` |
| Ghost | transparent | `--ds-color-accent-accessible` | — |
| Outline | transparent | `--ds-color-text` | 1px `--ds-color-border-strong` |
| Destructive | `--ds-color-error` | `#FFFFFF` | — |

> **Primary — décision verrouillée (v1.1.0).** Le CTA principal utilise le **Brand Accent `#8B7CFF`** en fond avec un **label foncé `#111111`** (~5,8:1, conforme AA). Choix délibéré : le texte sombre sur violet pastel est plus distinctif et plus premium que le classique « violet + texte blanc », tout en restant conforme. L'`accent-accessible` n'est **pas** utilisé sur le bouton primaire ; il reste réservé au texte violet à taille normale, aux liens violets, et à toute surface violette devant porter du texte **blanc**. Le bouton **Secondary** reste en verre (`--ds-glass-regular`) avec texte foncé.

États : hover `translateY(-1px)` + `--ds-shadow-accent-glow` (primary) ou `--ds-state-hover` · pressed `scale(0.98)` + `--ds-state-pressed` · disabled `--ds-opacity-disabled` · focus §1.8. Transitions `--ds-dur-fast` / `--ds-ease-standard` (survol ≤ `--ds-dur-fast`).

### 12.4 Glass Card

| Propriété | Valeur |
|---|---|
| Radius | `--ds-radius-lg` (28) |
| Background | `--ds-glass-regular` (texte léger) / `--ds-glass-thick` (texte dense) |
| Border | 1px `--ds-glass-border` |
| Blur | `--ds-blur-glass` (32) |
| Highlight | `--ds-glass-highlight` (liseré haut 1px) |
| Shadow | `--ds-shadow-2` (repos) → `--ds-shadow-3` (hover) |
| Padding | `--ds-space-5` (24) défaut / `--ds-space-6` (32) large |
| Hover | `translateY(-4px)` · bordure plus claire · `--ds-dur-standard` / `--ds-ease-standard` |

### 12.5 Input / Field

| Propriété | Valeur |
|---|---|
| Height | `44px` défaut / `52px` large |
| Radius | `--ds-radius-sm` (12) |
| Padding X | `--ds-space-4` (16) |
| Typo | `--ds-text-body` (16) — évite le zoom iOS |
| Background | `--ds-color-surface` (#F3F3F1) · bordure 1px `--ds-color-border` |
| Placeholder | `--ds-color-text-tertiary` |
| Focus | bordure `--ds-color-accent-accessible` + anneau §1.8 |
| Erreur | bordure `--ds-color-error` + message `--ds-text-body-sm` en `--ds-color-error` |
| Label | `--ds-text-body-sm` (14) / 500 en `--ds-color-text` |
| Helper | `--ds-text-caption` (12) en `--ds-color-text-tertiary` |

### 12.6 Sidebar / Nav Rail (dashboard)

| Propriété | Valeur |
|---|---|
| Width | `280px` étendu / `88px` réduit (rail icônes) |
| Container | radius `--ds-radius-lg` · flottant marge `--ds-space-4` · `--ds-glass-regular` · blur 32 · bordure `--ds-glass-border` · `--ds-shadow-2` |
| Item height | `44px` · radius `--ds-radius-md` (20) |
| Item actif | fond `--ds-color-accent-subtle` · indicateur `--ds-color-accent` · glow `--ds-shadow-accent-glow` (discret) |
| Icônes | Lucide · 22px · stroke 1.75–2 |
| Gap items | `--ds-space-2` (8) |
| Z-index | `--ds-z-nav` |

### 12.7 Top Bar (dashboard)

| Propriété | Valeur |
|---|---|
| Height | `64px` · sticky |
| Padding X | `--ds-space-5` (24) |
| Background | `--ds-glass-regular` · blur 32 · bordure basse `--ds-color-border` |
| Z-index | `--ds-z-nav` |

### 12.8 Modal / Dialog

| Propriété | Valeur |
|---|---|
| Max-width | `sm 420px` / `md 560px` / `lg 720px` |
| Radius | `--ds-radius-lg` (28) |
| Background | `--ds-color-surface-raised` (ou `--ds-glass-thick`) |
| Padding | `--ds-space-6` (32) |
| Shadow | `--ds-shadow-4` |
| Scrim | `rgba(16,16,16,0.40)` · z `--ds-z-overlay` ; modale z `--ds-z-modal` |
| Entrée | fade + `scale(0.98→1)` + blur fond · `--ds-dur-standard` / `--ds-ease-standard` · focus trap |

### 12.9 Badge

| Propriété | Valeur |
|---|---|
| Height | `24px` · radius `--ds-radius-pill` · padding X `--ds-space-3` (12) |
| Typo | `--ds-text-caption` (12) / 500 |
| Variantes | neutre (`surface` + `text-secondary`) · accent (`accent-subtle` + `accent-accessible`) · sémantiques (teinte + solide) |

### 12.10 Avatar

| Propriété | Valeur |
|---|---|
| Tailles | `sm 32` / `md 40` / `lg 48` / `xl 64` |
| Radius | `--ds-radius-pill` (cercle) |
| Bordure | 1px `--ds-color-border` |

### 12.11 Tooltip

| Propriété | Valeur |
|---|---|
| Background | `--ds-color-text` (#111111, inversé) · texte `#FFFFFF` |
| Radius | `--ds-radius-sm` (12) · padding `--ds-space-2` / `--ds-space-3` (8/12) |
| Typo | `--ds-text-caption` (12) |
| Shadow | `--ds-shadow-3` · z `--ds-z-tooltip` |
| Apparition | délai `--ds-dur-fast` |

---

## 13. Matrice de contraste (preuve AA)

Tous les couples texte/fond ci-dessous sont vérifiés sur `--ds-color-bg` (`#FAFAF8`). Seuils : texte normal ≥ 4,5:1 · grand texte (≥ 24px, ou ≥ 18,66px gras) et UI ≥ 3:1.

| Avant-plan | Fond | Ratio | Texte normal | Grand texte / UI |
|---|---|---|---|---|
| `text #111111` | `#FAFAF8` | ~17,9:1 | ✅ AAA | ✅ |
| `text-secondary #5A5A5A` | `#FAFAF8` | ~6,6:1 | ✅ AA | ✅ |
| `text-tertiary #6E6E6E` | `#FAFAF8` | ~4,9:1 | ✅ AA | ✅ |
| `text-disabled #9B9B9B` | `#FAFAF8` | ~2,7:1 | ⛔ (exempt : désactivé) | ⛔ |
| `accent #8B7CFF` (texte) | `#FAFAF8` | ~3,1:1 | ⛔ | ✅ |
| `accent-accessible #6C5CE7` (texte) | `#FAFAF8` | ~4,6:1 | ✅ AA | ✅ |
| `white` | `accent #8B7CFF` | ~3,3:1 | ⛔ | ✅ |
| `white` | `accent-accessible #6C5CE7` | ~4,9:1 | ✅ AA | ✅ |
| `success #15803D` | `#FAFAF8` | ~4,8:1 | ✅ AA | ✅ |
| `warning #B45309` | `#FAFAF8` | ~4,7:1 | ✅ AA | ✅ |
| `error #B91C1C` | `#FAFAF8` | ~6,1:1 | ✅ AA | ✅ |
| `focus ring #6C5CE7` | `#FAFAF8` | ~4,6:1 | — | ✅ (≥ 3:1) |

**Conséquences directes pour l'implémentation :**
- **CTA primaire** : fond Brand `accent` + label foncé `#111` (~5,8:1, conforme). Tout **autre** label **blanc** sur surface violette utilise `accent-accessible` (jamais `accent`).
- Du texte violet à taille normale utilise **`accent-accessible`** ; `accent` (Brand) n'est admis en texte qu'à partir de 24px.
- Le texte sur verre suit la règle §2 (plaque opaque ou `glass-thick` sur canvas).

---

## 14. Conformité et changelog (ce qui change et pourquoi)

Toute valeur de token des autres documents qui diffère de ce tableau est **caduque**.

| Groupe | Ancienne(s) valeur(s) dans la doc | Valeur canonique | Décision |
|---|---|---|---|
| Fond | `#F8F8F6` (tokens) / `#FAFAF8` (écrans) | `#FAFAF8` | Aligné sur toutes les specs d'écran. |
| Surface | `#F3F3F1` (V1) / absente (tokens) | `#F3F3F1` | Conservée, manquait au fichier tokens. |
| Texte primaire | `#111111` / `#101010` | `#111111` | Différence imperceptible ; valeur ronde retenue. |
| Texte secondaire | `#5F5F5F` / `#666666` | `#5A5A5A` | Légèrement assombri pour marge AA confortable. |
| Texte muted | `#8E8E8E` | **Retiré du texte** → `text-tertiary #6E6E6E` | `#8E8E8E` ≈ 3:1 = échec AA. Survit en non-textuel (§1.6). |
| Accent | `#8B7CFF` / « Pastel Violet » (sans hex) | Brand `#8B7CFF` + Accessible `#6C5CE7` | Brand Accent figé et **inchangé** ; Accessible Accent = variante fonctionnelle WCAG (pas une 2ᵉ couleur de marque). |
| Sémantiques | absentes | success/warning/error/info définies | **Ajoutées** (exigées par la doc accessibilité, jamais spécifiées). |
| Verre — fill | `.56` (tokens, V9-13) / `.58` (V1, Components, Dashboard) | `.56` + paliers thin/regular/thick | Valeur des docs spécialistes du verre ; paliers ajoutés pour l'AA. |
| Verre — bordure | `.68` (tokens, V9-13) / `.60` (Components) | `.68` | Valeur des docs spécialistes du verre. |
| Rayon carte | `28px` (majorité) / `32px` (Auth) | `28px` | Outlier Auth aligné. |
| Ombres | `shadow-1..4`, `contact`, `ambient` (sans valeurs) | valeurs définies (§6) | **Définies.** |
| Motion — durées | 140/220/320 · 120–180/220–320/450–700/800–1400 · 150–400 · 200–500 | échelle unique (§8.1) | 4 échelles fusionnées en une. |
| Motion — easing | `cubic-bezier(.22,1,.36,1)` (cohérent) | identique + easings complémentaires | Conservé comme easing principal. |
| Espacement section/héros | `160` / `220` (desktop seul) | + valeurs tablet/mobile (§4.1) | **Responsive ajouté.** |
| Typo responsive | absente | échelle mobile/tablet (§3.3) | **Ajoutée.** |
| Z-index | 0/10/20/30/40/50/100 | + dropdown/overlay/toast/tooltip | Niveaux manquants **ajoutés.** |
| Breakpoints | implicites (largeurs de test) | sm/md/lg/xl/2xl (§10) | Formalisés. |

### Éléments **ajoutés** (hors source — droit de veto)
`accent-subtle`, `accent-accessible`, couleurs sémantiques + teintes, paliers de verre `thin/thick` + `glass-highlight`, valeurs d'ombres, easings complémentaires + spring, espacements responsive, typo responsive, `font-mono`, `measure`, niveaux z-index supplémentaires, tokens de focus/halo, `surface-raised`, **toute la section Composants (§12)**.

---

## 15. Gouvernance

1. Ce fichier est l'unique source de vérité des tokens. Les composants et autres documents **doivent s'y conformer**.
2. Toute évolution se fait **ici d'abord**, puis se propage ; incrément de version (`MAJEUR.MINEUR.PATCH`).
3. Aucune valeur littérale (hex, px, ms) ne doit être codée en dur dans l'implémentation : tout passe par un token de ce document.
4. Une valeur qui n'existe pas ici n'existe pas dans le produit. En cas de besoin nouveau, ajouter un token (ne pas improviser une valeur ponctuelle).
