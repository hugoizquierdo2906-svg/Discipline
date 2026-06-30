# PHASE 02 — Document de préparation

> Document de cadrage **avant implémentation**. Aucun code n'est produit ici.
> L'implémentation ne démarre qu'après validation explicite.
> Sources lues pour cette phase (et uniquement celles-ci) :
> `DISCIPLINE_BUILD_PLAN.md` → Phase 02, et `DISCIPLINE_CANONICAL_TOKENS.md`
> (source de vérité numérique unique, v1.1.0).

---

## 0. Note d'outillage

Les outils « Graphify » et « Code Review Graph » demandés ne sont **pas disponibles**
dans cet environnement. Pour éviter de relire tout le projet, la préparation s'est
limitée aux deux seuls documents nécessaires (build plan §Phase 02 + tokens canoniques)
et à une inspection ciblée de l'état réel du dépôt (présence de Tailwind, de `next/font`).

---

## 1. Objectif de la phase

Traduire `DISCIPLINE_CANONICAL_TOKENS.md` en **infrastructure de style** du projet.
Chaque valeur visuelle de l'application (couleur, espacement, rayon, flou, ombre,
durée, easing, z-index, breakpoint) doit **dériver de cette couche de tokens** —
aucune valeur codée en dur n'est autorisée dans le code de composant.

Cette phase établit le **contrat de design** que toutes les phases suivantes (03→44)
respectent. À sa clôture, le système de tokens est opérationnel en CSS **et** en
TypeScript, mappé dans Tailwind, vérifié visuellement, et protégé par une règle de
lint contre les valeurs brutes.

---

## 2. Tous les fichiers qui seront créés / modifiés

### Créés

| Fichier | Rôle |
|---|---|
| `src/styles/tokens.css` | Variables CSS (`--ds-*`) pour **toutes** les catégories de tokens (couleurs, typo, espacements, rayons, flous, ombres, motion, z-index, breakpoints, états, focus, verre, cibles tactiles). En-tête pointant vers `DISCIPLINE_CANONICAL_TOKENS.md` comme source de vérité. |
| `src/styles/typography.css` | Défauts typographiques de base (famille Geist, antialiasing, line-heights, `--ds-measure`). |
| `src/lib/tokens.ts` | Constantes TypeScript miroir des valeurs de tokens, pour Framer Motion (styles inline) et GSAP, là où les variables CSS ne sont pas directement utilisables. |
| `tailwind.config.ts` | Mappe chaque token CSS vers un utilitaire Tailwind (couleurs, espacements, font-size, radius, blur, shadow, durée/easing, z-index, breakpoints). |
| `postcss.config.mjs` | Pipeline PostCSS requis par Tailwind. |
| `src/app/(dev)/dev/tokens/page.tsx` | Page de vérification visuelle de tous les tokens (dev uniquement), rendant une grille de l'ensemble des valeurs pour détecter toute référence cassée. |

### Modifiés

| Fichier | Modification |
|---|---|
| `src/app/globals.css` | Importe `tokens.css` + `typography.css` + directives Tailwind + resets de base. Remplace le placeholder de Phase 01. |
| `src/app/layout.tsx` | Charge la police **Geist** (et Geist Mono) via `next/font` avec `display: swap` + préchargement, applique la variable de police au `<html>`. |
| `package.json` / `pnpm-lock.yaml` | Ajout des dépendances de la phase (voir §5). |
| `eslint.config.mjs` | Ajout de la règle interdisant les valeurs brutes (couleurs d'abord ; voir item reporté de Phase 01). |
| `PROJECT_STATE.md` | Mise à jour de fin de phase. |
| `.prettierignore` (si besoin) | Exclure les fichiers générés éventuels. |

> **Décisions à trancher avant implémentation (voir §6).** La version de Tailwind
> (v3 config-file vs v4 CSS-first) conditionne la présence exacte de `tailwind.config.ts`
> et de `postcss.config.mjs`.

---

## 3. Composants concernés

La Phase 02 ne construit **aucun composant React** (ils arrivent en Phase 03+).
Elle prépare néanmoins les **spécifications de composants** figées au §12 des tokens,
qui seront consommées plus tard. Les valeurs des composants suivants sont
intégralement couvertes par les tokens produits ici :

- Navbar (§12.1), Hero (§12.2), Buttons (§12.3), Glass Card (§12.4),
  Input/Field (§12.5), Sidebar/Nav Rail (§12.6), Top Bar (§12.7),
  Modal/Dialog (§12.8), Badge (§12.9), Avatar (§12.10), Tooltip (§12.11).

Seul artefact « visuel » de la phase : la **page de démonstration `/dev/tokens`**,
non destinée à la production, servant de preuve de rendu.

---

## 4. Design Tokens utilisés (intégralité de la spec canonique)

Tous les groupes de `DISCIPLINE_CANONICAL_TOKENS.md` sont matérialisés :

| Groupe | Contenu (résumé) | Réf. |
|---|---|---|
| **Couleurs — fonds/surfaces** | `--ds-color-bg #FAFAF8`, `surface #F3F3F1`, `surface-raised #FFFFFF` | §1.1 |
| **Couleurs — texte** | `text #111111`, `text-secondary #5A5A5A`, `text-tertiary #6E6E6E`, `text-disabled #9B9B9B`, `text-on-accent #FFF` | §1.2 |
| **Accent violet** | `accent #8B7CFF` (Brand), `accent-accessible #6C5CE7`, `accent-subtle #F1EEFE`, `accent-contrast #FFF` | §1.3 |
| **Sémantiques** | `success #15803D`, `warning #B45309`, `error #B91C1C`, `info #6C5CE7` (+ teintes/bordures) | §1.4 |
| **Bordures** | `border .08`, `divider .12`, `border-strong .18` (alpha-noir) | §1.5 |
| **Gris non-textuel** | `neutral-light #8E8E8E` | §1.6 |
| **États** | `hover`, `hover-accent`, `pressed`, `selected`, `opacity-disabled .40` | §1.7 |
| **Focus** | `focus-ring-color #6C5CE7`, width `2px`, offset `2px`, halo blanc | §1.8 |
| **Verre** | `glass-thin .40`, `glass-regular .56`, `glass-thick .80`, `glass-border .68`, `glass-highlight .50` | §2 |
| **Typographie** | familles (Geist/Geist Mono), 3 graisses (400/500/600), échelle 120→12, responsive (§3.3), `measure 68ch` | §3 |
| **Espacements** | échelle 0→128 (base 8, sous-pas 4) + sémantiques responsive (`section-y`, `hero-y`, `grid-gutter`) | §4 |
| **Rayons** | `xs 8`, `sm 12`, `md 20`, `lg 28`, `xl 36`, `pill 999` | §5 |
| **Ombres** | `shadow-1..4`, `contact`, `ambient`, `accent-glow` | §6 |
| **Flous** | `blur-0..6`, `blur-glass 32` | §7 |
| **Motion — durées** | `instant 100`, `fast 160`, `standard 240`, `slow 320`, `page 480`, `scene 720`, `hero 1200` | §8.1 |
| **Motion — easings** | `standard cubic-bezier(.22,1,.36,1)`, `out`, `in`, `in-out` (+ spring réf.) | §8.2/8.3 |
| **Z-index** | `base 0` → `tooltip 120` (11 niveaux) | §9 |
| **Breakpoints/grille** | `sm 390`, `md 768`, `lg 1024`, `xl 1440`, `2xl 1920`, `container-max 1600`, colonnes 4/8/12 | §10 |
| **Cibles tactiles** | `target-min 44px`, `border-hairline 1px` | §11 |

> Contraintes verrouillées portées par la phase : **WCAG 2.2 AA** (matrice §13),
> CTA primaire = Brand `#8B7CFF` + label `#111` (§12.3), règle d'emploi du violet
> Brand vs Accessible (§1.3), max 3 couches de verre (§2), `prefers-reduced-motion` (§8.4).

---

## 5. Dépendances (avec les autres phases et les paquets)

### Dépendances de phases

- **Amont — Phase 01 (terminée).** Fournit le squelette `src/`, TypeScript strict,
  ESLint flat config, le dossier `src/styles/`.
  - ⚠️ **Écart constaté :** le plan supposait Tailwind « déjà installé par create-next-app ».
    **Ce n'est pas le cas** — la Phase 01 a été bâtie manuellement. **L'installation de
    Tailwind + PostCSS est donc intégrée à la Phase 02.**
- **Aval — toutes les phases UI (03→16, 22→29).** Consomment ces tokens ; aucun
  composant ne doit réintroduire de valeur littérale.
- **Item reporté de Phase 01 (premier de cette phase).** Créer d'abord les fichiers
  de tokens, **puis** la règle ESLint interdisant les valeurs de couleur brutes hors
  de ces fichiers (la règle a alors une cible de whitelist valide).

### Dépendances de paquets (à installer)

| Paquet | Rôle | Remarque |
|---|---|---|
| `tailwindcss` (v3.4) | Framework utilitaire | **Décision validée** |
| `postcss` | Pipeline CSS | Requis par Tailwind v3 |
| `autoprefixer` | Préfixes vendeurs | Requis par Tailwind v3 |
| `geist` | Police Geist + Geist Mono optimisée pour `next/font` | **Décision validée** — paquet officiel Vercel |

Toutes les versions seront **épinglées exactement** (règle Phase 01, `save-exact`).

---

## 6. Risques

| Risque | Mitigation |
|---|---|
| **Choix Tailwind v3 vs v4.** Le plan nomme explicitement `tailwind.config.ts` (approche v3). Tailwind v4 est CSS-first (`@theme`, pas de config TS par défaut). | **Décision à valider (§ ci-dessous).** Par défaut je recommande **Tailwind v3.4** pour rester fidèle au livrable `tailwind.config.ts` du plan et garder un mapping explicite token→utilitaire. |
| JIT Tailwind ne capte pas les références `var(--ds-*)` | Pattern `extend` standard ; vérifier chaque utilitaire sur `/dev/tokens` |
| Geist indisponible via `next/font` | Utiliser le paquet officiel `geist` (self-host) ; fallback `Inter`/system-ui déjà prévu dans la spec |
| Dérive entre `tokens.css` et `lib/tokens.ts` (deux sources) | Script de validation au build asserant l'égalité des valeurs ; `tokens.css` reste la référence |
| Valeurs responsive (typo §3.3, espacements §4.1) non appliquées au bon breakpoint | Tester explicitement 390/768/1024/1440/1920 sur `/dev/tokens` |
| FOUT (flash de police) au chargement | `display: swap` + préchargement de la primaire + `size-adjust` si nécessaire |
| `backdrop-filter` (verre) non rendu sur certains navigateurs | Hors périmètre strict des tokens, mais prévoir `@supports` ; validé en Phase 04 |
| Règle ESLint « valeurs brutes » trop agressive (faux positifs sur les fichiers de tokens eux-mêmes) | Whitelister `tokens.css` et `tailwind.config.ts` ; commencer par les couleurs, étendre ensuite |

### Décisions tranchées (validées)

1. **Version de Tailwind → `tailwindcss` v3.4** (config-file, `tailwind.config.ts`
   avec mapping token→utilitaire explicite). Implique `postcss` + `autoprefixer`
   (et **non** `@tailwindcss/postcss`).
2. **Source de la police Geist → paquet officiel `geist`** (self-host, Geist +
   Geist Mono via `next/font`, zéro requête externe).

---

## 7. Critères de validation (Phase 02 terminée)

La phase est **terminée** uniquement si **tous** ces critères passent :

- [ ] Chaque couleur, espacement, rayon, flou, ombre, z-index et valeur de motion
      remonte à un token (aucune valeur littérale hors fichiers de tokens).
- [ ] `pnpm build` passe avec **zéro** erreur.
- [ ] `pnpm lint`, `pnpm type-check`, `pnpm format:check` passent.
- [ ] La page de dev `/dev/tokens` rend la grille complète des tokens sans
      référence cassée.
- [ ] Tailwind IntelliSense suggère tous les utilitaires personnalisés.
- [ ] **Aucun** code hex brut, valeur px d'espacement brute, ou valeur ms brute
      n'existe hors de `tokens.css` et `tailwind.config.ts` (vérifié par la règle ESLint
      + recherche manuelle).
- [ ] La police Geist se charge sans FOUT sur simulation réseau lent.
- [ ] La règle ESLint « valeurs de couleur brutes » est active et échoue sur une
      couleur brute introduite volontairement (test négatif).
- [ ] `PROJECT_STATE.md` mis à jour (Phase 02 ✅, Phase 03 non démarrée).

---

## 8. Preuves produites à la fin (format objectif et vérifiable)

Conformément à la règle de reporting (effective dès la Phase 02), chaque
affirmation sera accompagnée de sa preuve : commande + exit code (+ durée pour le build).

- **Lint**
  ```
  ✓ pnpm lint
  Exit code: 0
  ```
- **Type-check**
  ```
  ✓ pnpm type-check
  Exit code: 0
  ```
- **Format**
  ```
  ✓ pnpm format:check
  Exit code: 0
  ```
- **Build**
  ```
  ✓ pnpm build
  Exit code: 0
  Duration: <mesurée> s
  ```
- **Preuve de la règle ESLint (test négatif)** : sortie montrant l'échec attendu
  lorsqu'une couleur brute est introduite, puis succès après retrait.
- **Preuve visuelle** : confirmation du rendu de `/dev/tokens` (capture ou
  description du rendu de la grille de tokens, sans valeur cassée).
- **Empreinte git** : hash du commit de fin de phase + confirmation `push origin main`
  et arbre propre.

---

> **En attente de validation explicite avant tout démarrage de l'implémentation.**
> Décisions techniques **tranchées** : Tailwind **v3.4** + paquet **`geist`** (§6).
