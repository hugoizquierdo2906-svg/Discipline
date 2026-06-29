# DISCIPLINE — MEDIA MAP

> **Rôle.** Inventaire officiel des médias du produit. `DISCIPLINE_CANONICAL_TOKENS.md` est la référence **numérique** ; ce document est la référence **des assets**. Le code référence des **IDs d'asset** (`DISC-HERO-VID-001`), jamais des noms de fichiers en dur.
> **Principe clé.** La Landing se construit **contre les contrats** ci-dessous (ratio · dimensions · zone-safe · format), **pas** en attendant que les médias soient produits. Remplacer un placeholder conforme au contrat par l'asset final **ne casse aucune mise en page**. Production et intégration tournent **en parallèle**.

- Version : `0.1` (draft) · à valider avant production.
- Périmètre : Landing uniquement (les écrans Auth/Dashboard auront leur propre map ultérieurement).
- Statuts : ☐ à produire · ◐ en cours · ☑ livré. Tout est ☐ au départ.

---

## 0. Convention de nommage

```
DISC-{SECTION}-{TYPE}-{NNN}[-{VARIANT}]
```

- **SECTION** : `GLOBAL` · `HERO` · `PROOF` · `PLANS` · `TRANSFORM` · `METHOD` · `DASH` · `TESTI` · `CONTACT` · `FOOTER`
- **TYPE** : `VID` (vidéo) · `IMG` (photo) · `BG` (fond/ambiance) · `TEX` (texture/overlay) · `MOCK` (UI produit) · `LOGO` · `AVATAR` · `OG` · `FAVICON`
- **NNN** : `001`, `002`…
- **VARIANT** (optionnel) : `A`/`B` (paires before/after), `@2x` (densité), `MOBILE` (cadrage vertical dédié)

Exemple : `DISC-TRANSFORM-IMG-002-A`, `DISC-HERO-VID-001-MOBILE`.

---

## 1. Arborescence `public/`

```
public/
  brand/         # logos, favicon, OG
  images/        # photos éditoriales, stills hero
  videos/        # clips (mp4 + webm + poster)
  backgrounds/   # gradients / ambiances off-white
  textures/      # grain, overlays verre
  mockups/       # UI produit (dashboard preview)
  og/            # images Open Graph
```

---

## 2. Standards globaux (s'appliquent à tous les assets)

| Aspect | Standard |
|---|---|
| Formats image | **AVIF** + **WebP** (fallback), sRGB, qualité visuelle ≥ premium. PNG seulement si alpha requis (textures). |
| Formats vidéo | **MP4 (H.264)** + **WebM (VP9)** + **poster** (still 1er frame). |
| Densité | Cibles fournies à **@1x** ; produire en **@2x** (retina) puis downscaler. |
| Direction artistique | Cinématique, architectural, lumière premium, peau non sur-retouchée, fonds non chargés (réf. Volume 9). |
| Palette | Cohérente avec le canvas off-white (`#FAFAF8`) ; pas de couleurs criardes ; accent violet utilisé avec parcimonie. |
| Poids | Respecter les budgets perf (LCP < 2,5s). Hero still = candidat LCP → compression agressive sans perte visible. |

---

## 3. Inventaire par section

Colonnes : **ID** · **Type** · **Rôle** · **Contrat** (ratio · dimensions @1x · zone-safe / notes) · **Prio** · **Chemin**.

### 3.0 GLOBAL (assets partagés)

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-GLOBAL-LOGO-001` | LOGO | Wordmark principal | **SVG** vectoriel, variantes : foncé / clair / monochrome | P0 | `brand/logo.svg` |
| `DISC-GLOBAL-FAVICON-001` | FAVICON | Favicon + app icons | 32 / 180 / 512px, fond transparent | P0 | `brand/favicon/` |
| `DISC-GLOBAL-OG-001` | OG | Open Graph par défaut | **1200×630** (1.91:1), texte-safe centré | P0 | `og/default.png` |
| `DISC-GLOBAL-BG-001` | BG | Ambiance off-white + formes atmosphériques douces | 16:9 · 2560×1440 · sans détail dans le tiers central (texte par-dessus) | P0 | `backgrounds/ambient-01.webp` |
| `DISC-GLOBAL-TEX-001` | TEX | Grain fin premium | PNG alpha **tileable**, ~512×512, opacité faible | P1 | `textures/grain.png` |
| `DISC-GLOBAL-TEX-002` | TEX | Reflet / réfraction de bord (verre) | PNG alpha, subtil | P2 | `textures/glass-edge.png` |

### 3.1 HERO

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-HERO-VID-001` | VID | Fond cinématique en boucle | **16:9** · 1920×1080 · **muet** · boucle ≤ 8s · point focal centre · **zone-safe texte = tiers gauche** · pas de coupe brutale | P0 | `videos/hero.mp4` |
| `DISC-HERO-VID-001-MOBILE` | VID | Cadrage vertical mobile | **9:16** · 1080×1920 · même grade, recadré sujet centré | P1 | `videos/hero-mobile.mp4` |
| `DISC-HERO-IMG-001` | IMG | Poster + fallback (≈ LCP) | **16:9** · 1920×1080 · **cadrage identique** au 1er frame vidéo | P0 | `images/hero-poster.webp` |
| `DISC-HERO-BG-001` | BG | Ambiance derrière le verre si distincte de la vidéo | hérite `DISC-GLOBAL-BG-001` (réutilisable) | P2 | `backgrounds/ambient-01.webp` |

> Les **KPI cards flottantes** du Hero sont du **verre + données** (pas de média) — aucun asset image requis.

### 3.2 PROOF (social proof)

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-PROOF-LOGO-001..00n` | LOGO | Logos presse / partenaires (si applicable) | **SVG** monochrome / grayscale, hauteur normalisée | P2 | `brand/proof/` |

> Si pas de logos partenaires au lancement : section en **preuve chiffrée** (clients, résultats) → **aucun média**. À trancher selon la réalité.

### 3.3 PLANS (coaching plans)

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-PLANS-BG-001` | BG | Fond de section optionnel (ambiance douce) | hérite GLOBAL-BG ou variante | P2 | `backgrounds/ambient-02.webp` |

> Cartes plans = **verre + texte** (réf. §12.4 tokens). Pas de média obligatoire.

### 3.4 TRANSFORM (before / after)  ⚠️ intégrité

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-TRANSFORM-IMG-001-A/B` | IMG | Paire avant/après #1 | **4:5** · 1080×1350 · **cadrage, distance et lumière identiques** entre A et B · fond neutre | P1 | `images/transform-01-a.webp` … |
| `DISC-TRANSFORM-IMG-002-A/B` | IMG | Paire #2 | idem | P1 | `images/transform-02-*.webp` |
| `DISC-TRANSFORM-IMG-003-A/B` | IMG | Paire #3 | idem | P1 | `images/transform-03-*.webp` |

> ⚠️ **Intégrité (à lire) :** transformations = **personnes réelles + consentement écrit**. Ne **pas** générer de fausses transformations (trompeur, risque légal et réputationnel). Sans clients réels au lancement : retarder la section, ou la remplacer par une section « méthode/process » jusqu'à disposer de cas réels et consentis.

### 3.5 METHOD (services / piliers)

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-METHOD-IMG-001..005` | IMG | Image éditoriale par pilier (coaching, nutrition, habitudes, performance, éducation) | **3:2** · 1600×1066 · cinématique, cohérente entre piliers | P2 | `images/method-0n.webp` |

> Alternative : piliers **icône-led** (Lucide, déjà au design system) → médias METHOD optionnels.

### 3.6 DASH (dashboard preview)  ⚠️ dépendance

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-DASH-MOCK-001` | MOCK | Aperçu UI du produit | **16:10** · 2560×1600 · retina · cohérent à 100% avec le dashboard réel | P1 | `mockups/dashboard.webp` |
| `DISC-DASH-MOCK-001-MOBILE` | MOCK | Aperçu mobile (device frame) | 9:19.5 · cadre device | P2 | `mockups/dashboard-mobile.webp` |

> ⚠️ **Dépendance :** ce mockup doit refléter le **vrai** dashboard (phase ultérieure). Produit **après** le design dashboard, ou via un mockup dédié validé. Ne pas inventer une UI qui divergera du produit final.

### 3.7 TESTI (testimonials)  ⚠️ intégrité

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-TESTI-AVATAR-001..00n` | AVATAR | Portraits clients | **1:1** · 512×512 · traitement homogène, lumière premium | P1 | `images/testi/avatar-0n.webp` |

> ⚠️ **Intégrité :** vraies personnes + consentement. Pas de portraits générés présentés comme de vrais clients.

### 3.8 FAQ

Aucun média (accordéons en verre).

### 3.9 CONTACT

| ID | Type | Rôle | Contrat | Prio | Chemin |
|---|---|---|---|---|---|
| `DISC-CONTACT-BG-001` | BG | Ambiance de section (optionnel) | hérite GLOBAL-BG | P2 | `backgrounds/ambient-03.webp` |

### 3.10 FOOTER

Logo partagé (`DISC-GLOBAL-LOGO-001`). Aucun média propre.

---

## 4. Priorités — produire progressivement

| Tier | Quoi | Pourquoi |
|---|---|---|
| **P0 — d'abord** | Hero (`VID-001`, `IMG-001`), GLOBAL (`LOGO`, `BG-001`, `OG`, `FAVICON`) | C'est l'above-the-fold qui convertit et l'identité minimale. Suffisant pour une Landing crédible. |
| **P1 — ensuite** | Transformations, Testimonials, Dashboard mockup, cadrages mobile hero | Forte valeur de conversion, mais dépendances réelles (clients/consentement, design dashboard). |
| **P2 — au fil de l'eau** | Logos proof, imagerie Method, backgrounds de section, textures secondaires | Optionnels / décoratifs. La Landing fonctionne sans eux. |

> Recommandation : produire **P0**, lancer la construction de la Landing en parallèle, brancher P1/P2 dès que disponibles.

---

## 5. Drapeaux & dépendances (synthèse)

1. **Contrats figés** → la Landing se construit contre eux ; aucun relayout au remplacement des placeholders.
2. **Transformations / Testimonials** → vraies personnes + consentement écrit ; jamais de faux.
3. **Dashboard mockup** → dépend du design dashboard (phase ultérieure).
4. **Proof / Method** → médias conditionnels selon la réalité (logos existants ? piliers icône-led ?).
5. Tout asset référencé dans le code l'est par **ID**, résolu vers son chemin `public/` au build.

---

## 6. Suite

Une fois cet inventaire validé : l'**Asset Production Bible** spécifiera, pour chaque ID, **comment** le produire (direction visuelle détaillée, grade, specs techniques, et — selon la voie choisie — prompts de génération ou brief de tournage). Cette étape dépend de la **voie de production** retenue.
