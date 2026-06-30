# PHASE 01 — Document de préparation

> Document de cadrage **avant implémentation**. Aucun code n'est produit ici.
> L'implémentation ne démarre qu'après validation explicite.
> Source : `DISCIPLINE_BUILD_PLAN.md` → Phase 01 (Repository & Toolchain Bootstrap).

---

## 1. But exact de la Phase 01

Établir le dépôt du projet avec un environnement de développement **reproductible et déterministe** : chaque développeur et chaque runner CI doit produire une sortie **byte-identique** à partir de la même source.

Cette phase n'a **aucune valeur produit** (rien de visible pour l'utilisateur final), mais elle est le **prérequis absolu** de toutes les phases suivantes (02 → 44). Elle pose : le squelette du dépôt, le gestionnaire de paquets, la configuration TypeScript stricte, le linting, le formatage, les hooks pre-commit, la CI, le lien Vercel, et l'arborescence des dossiers.

---

## 2. Tous les fichiers qui seront créés

| Fichier | Rôle |
|---|---|
| `package.json` | Dépendances à versions exactes (pas de plages en production), scripts (`dev`, `build`, `lint`, `test`) |
| `pnpm-lock.yaml` | Verrou de dépendances committé (déterminisme) |
| `.nvmrc` (et/ou `.node-version`) | Version de Node figée |
| `.gitignore` | Exclut `.env*`, `node_modules`, `.next`, résultats Playwright, rapports de couverture |
| `.env.example` | Toutes les clés requises listées (valeurs vides / placeholders) |
| `tsconfig.json` | `strict: true`, alias `@/` → `src/`, interdiction de `any` |
| `next.config.ts` | Bundle analyzer, domaines d'images Cloudflare R2, en-têtes de sécurité |
| Config ESLint (`.eslintrc.*` ou `eslint.config.*`) | `eslint-config-next`, `@typescript-eslint/recommended`, `jsx-a11y`, `import`, règle interdisant les couleurs brutes hors des fichiers de tokens |
| Config Prettier (`.prettierrc*`) | Single quotes, pas de point-virgule, virgules finales |
| Config `lint-staged` | Lint + type-check sur les fichiers en staging |
| Hook Husky `pre-commit` (`.husky/pre-commit`) | Déclenche lint-staged au commit |
| Workflow CI (`.github/workflows/ci.yml`) | install → lint → type-check → build, sur chaque push et PR |
| `README.md` | Documente install, dev, build, tests |
| `CHANGELOG.md` | Initialisé |

> Note : `pnpm create next-app` génère aussi des fichiers de base (`src/app/layout.tsx`, `src/app/page.tsx`, `postcss.config`, etc.). Ils existeront mais seront retravaillés en Phase 02+.

---

## 3. Tous les dossiers concernés

**Arborescence `src/` (créée, vide mais correcte) :**

| Dossier | Rôle |
|---|---|
| `src/app/` | App Router Next.js |
| `src/components/ui/` | Primitives de niveau 1 |
| `src/components/shared/` | Composites de niveau 2 |
| `src/features/` | Tranches fonctionnelles (feature slices) |
| `src/lib/` | Utilitaires et adaptateurs |
| `src/styles/` | CSS global et fichiers de tokens |
| `src/types/` | Interfaces TypeScript partagées |
| `src/hooks/` | Hooks React partagés |
| `src/server/` | Code serveur uniquement (actions, services, db) |

**Arborescence `public/` (selon `DISCIPLINE_MEDIA_MAP.md`) :**

`public/brand/` · `public/images/` · `public/videos/` · `public/backgrounds/` · `public/textures/` · `public/mockups/` · `public/og/`

**Dossiers d'outillage :** `.husky/`, `.github/workflows/`

---

## 4. Toutes les dépendances qui seront installées

> Liste de cadrage. Les versions exactes seront figées dans `package.json` + `pnpm-lock.yaml` lors de l'implémentation.

**Runtime / framework (production)**
- `next` (15.x)
- `react`, `react-dom` (18 / 19+)

**Langage & types (dev)**
- `typescript`
- `@types/node`, `@types/react`, `@types/react-dom`

**Linting & formatage (dev)**
- `eslint`
- `eslint-config-next`
- `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-import`
- `prettier` (+ éventuellement `eslint-config-prettier`)

**Hooks Git & qualité (dev)**
- `husky`
- `lint-staged`

**Sécurité secrets (CI)**
- `gitleaks` ou `git-secrets` (scan dans la CI)

**Analyse de bundle (dev)**
- `@next/bundle-analyzer`

> Tailwind, Shadcn, Prisma, Stripe, Framer Motion, etc. ne sont **pas** installés en Phase 01 — ils appartiennent aux phases ultérieures. Le `create-next-app` peut toutefois amorcer Tailwind (utilisé en Phase 02).

---

## 5. Versions des outils choisies et pourquoi

| Outil | Choix | Raison |
|---|---|---|
| **Node.js** | LTS, figé via `.nvmrc` | Reproductibilité ; une seule version partagée entre devs et CI évite les écarts de build |
| **pnpm** | Gestionnaire de paquets | Installations déterministes, store global efficace, lockfile strict ; imposé par le plan |
| **Next.js** | 15.x | Version cible du projet (App Router, Server Actions, Metadata API) |
| **React** | 18 / 19+ | Aligné sur Next 15 ; Server Components |
| **TypeScript** | strict | `strict: true` + interdiction de `any` : sécurité de typage exigée sur tout le projet |
| **ESLint** | next + ts + jsx-a11y + import | Qualité, accessibilité dès le départ, ordre des imports cohérent |
| **Prettier** | single quotes, no semicolons, trailing commas | Style figé pour un diff propre et homogène |
| **Husky + lint-staged** | pre-commit | Empêche le code non conforme d'être committé |

**Décision de fond sur le versioning :** dépendances de production **épinglées à des versions exactes** (pas de `^`/`~`) pour garantir des builds identiques.

---

## 6. Décisions techniques figées durant cette phase

Ces choix deviennent contraignants pour toutes les phases suivantes :

1. **Gestionnaire de paquets : pnpm** (lockfile committé, déterminisme).
2. **Version de Node figée** via `.nvmrc` + matrice CI.
3. **TypeScript strict** : `strict: true`, `any` interdit.
4. **Alias de chemin** : `@/` → `src/`.
5. **Architecture de dossiers** : séparation `components/ui` (L1) · `components/shared` (L2) · `features/*` · `server/` (serveur uniquement) · `lib/` · `styles/` · `types/` · `hooks/`.
6. **Conventions de style** : single quotes, pas de point-virgule, virgules finales.
7. **Versions de production épinglées** (pas de plages).
8. **`--no-verify` interdit** sur les commits (les hooks ne se contournent pas).
9. **CI obligatoire** : install → lint → type-check → build sur chaque push/PR.
10. **Vercel** comme plateforme de déploiement, previews activées sur toutes les branches.
11. **Secrets jamais committés** : `.gitignore` + scan CI.
12. **Structure `public/`** alignée sur `DISCIPLINE_MEDIA_MAP.md`.

---

## 7. Risques potentiels

| Risque | Mitigation |
|---|---|
| Conflits de versions entre Next.js 15 / React 19 et paquets communautaires | Épingler toutes les dépendances ; tester le build avant de committer le lockfile |
| Versions de Node incohérentes entre environnements | `.nvmrc` + matrice CI ; nvm ou Volta |
| Hooks pre-commit contournés via `--no-verify` | Interdire `--no-verify` (documenté) ; la CI rattrape ce qui passe |
| Secrets `.env` committés par accident | Entrée `.gitignore` + scan `gitleaks`/`git-secrets` en CI |

**Risques additionnels à surveiller (cadrage) :**
- Erreurs de configuration du projet Vercel (variables, racine du projet) → vérifier le premier preview.
- Divergence entre `.env.example` et les clés réellement consommées plus tard → maintenir `.env.example` à jour à chaque phase.

---

## 8. Critères de validation (Phase 01 terminée)

La Phase 01 est considérée comme **terminée** uniquement si **tous** ces critères passent :

- [ ] `pnpm install` depuis un clone propre se termine sans erreur.
- [ ] `pnpm dev` démarre le serveur de dev sur le port 3000 sans erreur.
- [ ] `pnpm build` se termine avec **zéro** erreur TypeScript et **zéro** erreur ESLint.
- [ ] `pnpm lint` sort avec le code 0.
- [ ] Un commit de test déclenche le workflow CI et celui-ci passe au **vert**.
- [ ] Le déploiement preview Vercel est **en ligne** pour le commit initial.
- [ ] **Aucun** fichier `.env` contenant de vrais secrets n'est committé.

---

## Ordre d'implémentation prévu (rappel, non exécuté)

1. Initialiser le dépôt avec `pnpm create next-app` (Next 15, TypeScript, App Router)
2. Figer la version de Node (`.nvmrc`)
3. Configurer TypeScript strict + alias de chemin
4. Installer et configurer ESLint + Prettier
5. Installer et configurer Husky + lint-staged
6. Créer le squelette `src/`
7. Créer le squelette `public/` selon la media map
8. Écrire `.env.example` avec toutes les clés
9. Configurer `next.config.ts` (en-têtes de sécurité)
10. Écrire le workflow GitHub Actions
11. Lier Vercel et tester le premier preview
12. Écrire le README et initialiser le CHANGELOG
13. Commit + push — confirmer CI verte et preview Vercel en ligne

---

> **En attente de validation explicite avant tout démarrage de l'implémentation.**
