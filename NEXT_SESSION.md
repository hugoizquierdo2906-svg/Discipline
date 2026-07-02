# NEXT_SESSION

> Reprise rapide. Détail complet dans `PROJECT_STATE.md`.
> **Roadmap complète de la librairie (statut de chaque composant) :
> `docs/DISCIPLINE_UI_ROADMAP.md`.**

## SESSION TERMINÉE

### VALIDÉ (figé — ne plus rouvrir sauf bug objectif)
- Micro Surface → Button
- Control Surface → **Input (GELÉ)** — rôle fixé par la Grammar §2/§5 (Control, PAS
  Micro) ; référence `/dev/input` validée. Famille Control généralisée :
  **Textarea (GELÉ)**, **SearchInput (GELÉ)**, **Select (GELÉ)**,
  **DatePicker (GELÉ)**, **FileInput (GELÉ)** — famille Control 100 % gelée.
- **Select — Control Surface, GELÉ (validé visuellement 2026-07-01).** Plus de
  redesign sauf bug objectif. Frère de Input (PAS dérivé de Input ; Input et Select
  sont frères) :

  ```text
  Select — FROZEN
  Role:        Control Surface
  Parent:      ControlSurface
  Inheritance: GlassSurface → .ds-control → ControlSurface → Select
  ```

  Le trigger fermé compose le même `controlHostClass` + `<ControlSurface/>` que Input
  → indiscernable de Input/Textarea/SearchInput fermé (aucun verre/blur/backdrop
  recréé). Sur Radix Select. API champ : label · description · placeholder ·
  helperText · error · success · required · disabled · readOnly · loading · value ·
  defaultValue · onValueChange · options[] (icône/description/disabled) ou enfants
  `Select.Item`. Chevron pivote à l'ouverture ; menu = surface raised token
  (pas de verre), feuille flottante suspendue (`shadow-4` + `sideOffset 8`), ligne
  sélectionnée quasi-blanche (✓ violet + `font-medium`). Preuve : `/dev/select`.
- **DatePicker — champ Control Surface + calendrier Floating Surface. GELÉ (validé
  visuellement 2026-07-01).** Plus de redesign sauf bug objectif. Deux rôles, deux
  matériaux, aucun mélange :

  ```text
  DatePicker — champ           Calendrier (overlay)
  Role:    Control Surface     Role:    Floating Surface
  Parent:  ControlSurface      Base:    FloatingSurface
  Hérit.:  GlassSurface        Hérit.:  GlassSurface
           → .ds-control                → .ds-floating
           → ControlSurface             → FloatingSurface
           → DatePicker
  ```

  Le champ fermé compose le même `controlHostClass` + `<ControlSurface/>` que
  Input/Select → indiscernable fermé (aucun verre/blur/backdrop recréé). Le calendrier
  = Radix Popover dont le contenu compose le NOUVEAU helper réutilisable
  **FloatingSurface** (`floating-surface.tsx`, miroir de ControlSurface) — 1er
  consommateur du verre Floating, base des futurs Popover/DropdownMenu/Command Palette.
  Grille/clavier/navigation/ARIA via react-day-picker 9 ; thème calendrier token-only
  scopé `.ds-datepicker-calendar` (aucun matériau). Entrée overlay 150ms opacity +
  translateY + léger scale, ease-out, sans rebond (respecte reduced-motion). API :
  label · description · placeholder · helperText · error · success · required ·
  disabled · readOnly · value · defaultValue · minDate · maxDate · locale · format ·
  onChange · name. Preuve : `/dev/date-picker`. À geler sur validation explicite.
- **FileInput — Control Surface, frère de Input. GELÉ (validé visuellement
  2026-07-02, desktop/tablette/mobile).** Plus de redesign sauf bug objectif.

  ```text
  FileInput
  Role:        Control Surface
  Parent:      ControlSurface
  Héritage:    GlassSurface → .ds-control → ControlSurface → FileInput
  ```

  Le puits compose le même `.ds-glass .ds-control` + `<ControlSurface/>` que la
  famille (précédent Textarea : même matériau, géométrie plus haute centrée) —
  aucun verre/blur/ombre/bordure/focus recréé, aucun CSS nouveau. Le drag-over
  réutilise l'expression `--focus` gelée (le violet monte) — aucun nouveau langage
  visuel. Ne possède QUE l'interaction : browse (input natif sr-only →
  `:focus-within`), drag & drop (compteur enter/leave anti-flicker), paste, Escape ;
  validation accept/maxSize/maxFiles → `onReject` + ligne de rejet + annonces
  sr-only aria-live ; aperçus (image object-URL, vidéo 1re frame avec repli icône,
  PDF/générique icônes) ; suppression via **IconButton** existant ; upload via la
  primitive **Progress** existante. Contrôlé (`files`) + non contrôlé
  (`defaultFiles`). Résumé de contraintes auto-dérivé (« PNG · up to 1.0 MB · max
  2 files ») — remplace l'ancien `hint` ; ancienne API `hint`/`onFiles` supprimée,
  2 consommateurs dev migrés. Preuve : `/dev/file-input`.
- **HoverCard — Floating Surface, DÉRIVE DU POPOVER GELÉ. GELÉ (validé
  visuellement 2026-07-02).** Plus aucune évolution — bug objectif uniquement.

  ```text
  Floating
  FloatingSurface → Popover (FROZEN) → HoverCard (FROZEN)
  ```

  Une PREVIEW contextuelle (user · exercice · livre · workout) — jamais un menu.
  Panneau = panneau Popover gelé VERBATIM (`popoverPaneClass` +
  `popoverPanePaddingClass`, nouvelle extraction pure du `px-4 py-5` — sortie
  Popover inchangée + flèche partagée + `ds-floating-enter` + échelle de tailles).
  Grep : aucun matériau/animation/transition dans hover-card.tsx. Ne possède QUE
  l'ouverture : intention de survol (`openDelay` 200 ms · `closeDelay` 150 ms par
  défaut), pont de pointeur indulgent (zone de grâce Radix : Trigger→Content ne
  ferme jamais ; contenu hover-interactif). Tactile : le trigger reste un lien
  normal. Preuve : `/dev/hover-card`.
- **ContextMenu — Floating Surface, DÉRIVE DU DROPDOWNMENU GELÉ. GELÉ (validé
  visuellement 2026-07-02).** Plus aucune évolution — bug objectif uniquement.

  ```text
  Floating
  FloatingSurface → Popover (FROZEN) → DropdownMenu (FROZEN) → ContextMenu (FROZEN)
  ```

  PAS un nouveau composant : le langage DropdownMenu avec un autre déclencheur.
  Compose verbatim le langage menu gelé exporté (`dropdownMenuPaneClass` ·
  `dropdownMenuItemClass` · label/separator/viewport · composant `Shortcut`
  réutilisé tel quel) sur les primitives Radix ContextMenu. Ne possède QUE le
  déclenchement : clic droit, touche menu / Shift+F10, long-press tactile,
  positionné au curseur (menu natif supprimé uniquement sur la zone). Contraintes
  Radix documentées : Root sans open/defaultOpen ; Content sans side/sideOffset
  (ancré au curseur). Preuve : `/dev/context-menu`.
  **Fix de bug objectif appliqué au DropdownMenu GELÉ (clause de gel)** : colonne
  d'indicateur `pl-8` = 48px sur l'échelle DISCIPLINE (pas 32) → labels écrasés à
  2 caractères à côté des shortcuts en xs (visible dans la preuve gelée) →
  `pl-6` (32px) + shortcut `pl-4` ; panneaux menus en `p-0` (le padding hôte
  `.ds-floating` doublait celui du viewport). Preuves recapturées, aucune autre
  régression — les classes partagées corrigent DropdownMenu et ContextMenu à la
  fois.
- **DropdownMenu — Floating Surface, DÉRIVE DU POPOVER GELÉ. GELÉ (validé
  visuellement 2026-07-02).** Plus aucune évolution fonctionnelle/visuelle/
  architecturale — bug objectif uniquement.

  ```text
  Floating Surface
  FloatingSurface → Popover (FROZEN) → DropdownMenu (FROZEN)
  ```

  Ne repart jamais de FloatingSurface : le panneau EST le panneau Popover gelé via
  `popoverPaneClass` (extraction pure de PopoverContent, sortie inchangée — même
  verre, même lift, même entrée `ds-floating-enter`, même échelle ; menus = `xs`).
  Grep : aucun GlassSurface/ds-floating/blur(/backdrop-filter/box-shadow/rgba/glass.
  Sur Radix DropdownMenu. Ne possède QUE le langage menu : Item (icône · shortcut
  aligné à droite jamais codé en dur · disabled · destructive · loading), Label,
  Group, Separator, CheckboxItem, RadioGroup/RadioItem, Sub/SubTrigger/SubContent
  (le sous-menu compose le MÊME panneau — matériau/animation/collision/flèche
  hérités), Shortcut. Géométrie d'item = menu Select gelé verbatim (py-2.5 · gap-3 ·
  colonne pl-8 · surbrillance `bg-accent-subtle/45`). Menus longs plafonnés à la
  hauteur popper dispo + scroll. Preuve : `/dev/dropdown-menu`.
- **Popover — Floating Surface, 1er membre Floating généralisé. GELÉ (validé
  visuellement 2026-07-02, après la passe craft 98/100).** Plus de redesign sauf
  bug objectif.

  ```text
  Floating
  GlassSurface → .ds-floating → FloatingSurface → Popover
  Status: FROZEN
  ```

  API composée headless sur Radix : `Popover` (open/defaultOpen/onOpenChange/modal)
  + `.Trigger` (asChild) / `.Anchor` / `.Content` / `.Close` / `.Arrow`. AUCUN
  matériau déclaré (grep : pas de backdrop-filter/blur/box-shadow/rgba/ds-glass/
  ds-floating dans popover.tsx) : panneau = `floatingHostClass` + `<FloatingSurface/>` ;
  entrée = animation de base Floating partagée (`ds-floating-enter`, 150 ms opacity +
  translateY + léger scale, ease-out système) ; flèche = queue Floating partagée
  (`ds-floating-arrow`, promue VERBATIM de la référence Tooltip dans
  `floating-surface.css`). Popover ne possède que le comportement : portail,
  side/align/offsets, collision (flip+shift), sticky, hideWhenDetached, modal
  (focus trap + scroll lock), Escape/outside dismiss, retour focus, clavier/ARIA
  complets. **Passe craft (2026-07-02, revue 98/100 — géométrie seule)** :
  suspension +≈10 % (`ds-floating-lift`, un halo inférieur ajouté, ombre gelée
  intouchée + `sideOffset` 8→10), flèche 2px→1px (queue de goutte), padding
  vertical +4 px (`px-4 py-5`), et **échelle de tailles Floating partagée**
  (`size` xs·224 / sm·288 défaut / md·320 / lg·384 via `floatingSizeClass`) pour
  les futurs UserMenu/Notifications/CommandPalette/Calendar/Emoji picker.
  Matériau/blur/animation/collision/API intouchés. Preuve : `/dev/popover`
  (placements · flèche · collision · conteneur scrollable · modal/non-modal ·
  imbriqué · contenu long/interactif · échelle de tailles · hiérarchie
  Tooltip/Popover/Modal ; desktop/tablette/mobile).
- **Textarea — Control Surface, GELÉ (validé visuellement 2026-07-01).** Plus de
  redesign sauf bug objectif. Frère de Input (même parent `ControlSurface`, matériau verbatim ; aucun
  verre/blur/ombre/Fresnel recréé). Diffère seulement par la géométrie (multiligne,
  resize) + interaction. API : label · description · helperText · error · success
  (check sémantique, pas de changement de verre) · required · maxLength ·
  showCharacterCount · autoResize (minRows/maxRows → grandit puis scrolle) ·
  disabled · readOnly. Focus = `.ds-control:focus-within`. Preuve : `/dev/textarea`.
- **SearchInput — Control Surface, spécialisation de Input. GELÉ (validé visuellement
  2026-07-01).** Plus de redesign sauf bug objectif.
  Contrairement à Textarea (frère de Input), SearchInput dérive
  DE Input : GlassSurface → .ds-control → ControlSurface → Input → SearchInput. Rend
  `<Input>` + affordances de recherche seulement (loupe en prefix, cluster
  clear/loading/shortcut en suffix). Aucun verre recréé. API : label · description ·
  helperText · error · success · clearable · loading · shortcut (⌘K) · debounce
  (callback seul, texte jamais retardé) · onSearch · onClear · disabled · readOnly ;
  Escape efface ; `role="search"`. Preuve : `/dev/search-input`. À geler sur
  validation explicite du owner.
- Structural Surface → Card
- Structural (généralisés) → GlassCard · GlassPanel · FloatingCard · **Navbar (GELÉ)** · **Footer (GELÉ)** · **Sidebar (GELÉ)** · **BottomNav (GELÉ)**
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
- **Navbar — GELÉ (référence Structural Navigation officielle)** — comme Button /
  FloatingCard : plus de redesign, modification seulement pour un bug objectif.
  1er composant de navigation, spécialisation directe de GlassPanel
  (aucun saut de hiérarchie). Matériau/lumière/optique/ombre = GlassPanel inchangé ;
  seule différence = géométrie (rangée de nav 56/64px, padding horizontal, flex,
  alignement, responsive ; `p-0` sur l'hôte → verre bord à bord). Rayon décidé par
  Navbar : flottant (rayon Structural) par défaut, ou `attached` (`rounded-none`) —
  les deux possibles, aucun imposé. Placement (sticky/fixed, scroll) délégué au
  consommateur (A1). API composable ouverte : `Navbar.Brand / .Content / .Actions`,
  sans hypothèse métier ; Content se replie sous `md`. Preuve : `/dev/navbar`
  (GlassPanel vs Navbar, fond clair + riche) — matériau identique, géométrie seule.
- **Footer — GELÉ (footer Structural officiel)** — validation visuelle finale PASS
  (matériau identique à GlassPanel sur fond clair + riche ; responsive cohérent
  desktop/tablet/mobile). Plus de redesign sauf bug objectif. 2e grand conteneur de
  page (après Navbar), spécialisation directe de
  GlassPanel (aucun saut de hiérarchie ; ne compose jamais GlassSurface). Matériau
  100% hérité (transmission/réfraction/blur/Fresnel/reflets/incident/specular/edge/
  ombre inchangés). Footer = layout seul : colonne verticale calme pleine largeur
  (brand, colonnes de nav, legal, copyright, newsletter/social optionnels), padding
  hôte neutralisé (`p-0`) → verre bord à bord, padding responsive sur la colonne
  interne. Rayon via `variant` géométrique : `floating` (défaut) / `attached`
  (`rounded-none`) / `inset` (`rounded-b-none`). API composable : `Footer.Brand /
  .Columns / .Column / .Bottom`. Preuve : `/dev/footer`.
- **Sidebar — GELÉ (rail de navigation Structural officiel)** — production-ready :
  géométrie / matériau / héritage / responsive / mode compact / hiérarchie tous
  validés. Rôle : Structural. Parent : GlassPanel. Héritage : GlassSurface →
  .ds-card → GlassCard → GlassPanel → Sidebar. Plus de redesign sauf bug objectif.
  Équivalent vertical de Navbar, spécialisation directe de GlassPanel
  (aucun saut de hiérarchie). Matériau 100% hérité, inchangé. Sidebar = géométrie
  seule : largeur propre (**264px déplié / 64px replié** via `collapsed`, qui pose
  aussi `data-collapsed`), hauteur adaptable (`h-full`, le consommateur décide la
  hauteur de page — A1), pile verticale interne, zone de nav scrollable, `variant`
  géométrique `floating` (défaut) / `attached`. API composable : `Sidebar.Header /
  .Content / .Section / .Footer`. Preuve : `/dev/sidebar`.
  **Bug objectif trouvé et corrigé (Phase 4) :** le wrapper de contenu de
  GlassCard (`<div class="relative z-[3]">`) n'a pas de hauteur explicite, donc une
  chaîne `h-full` en pourcentage à l'intérieur était inerte — le contenu haut du
  Sidebar débordait de la boîte de verre visible au lieu de scroller. Corrigé via un
  sélecteur `[&>div]:flex [&>div]:h-full [&>div]:min-h-0 [&>div]:flex-col` scopé au
  className de Sidebar (géométrie seule ; GlassCard/GlassPanel/glass.css intacts).
  **Confirmé visuellement** sur fond de capture + fond riche (matériau identique à
  GlassPanel des deux côtés).
  **Raffinement géométrique (2026-07-01, "rail de navigation, pas une Card
  verticale") :** aucun changement de matériau/architecture. Largeurs resserrées
  (272→264 / 72→64), insets horizontaux plus légers (`px-2`/`px-1.5`, était `px-3`),
  rythme vertical plus généreux (`gap-8`, était `gap-6`) séparant clairement
  Header/Content/Footer, le Header porte son propre espace en pied (`pb-2`) pour
  devenir un vrai point d'ancrage, groupes de sections plus aérés (`gap-7`, était
  `gap-6`), items de nav plus confortables (`gap-1.5`, était `gap-1`). Validé
  visuellement : ne se lit plus comme une Card, hiérarchie Header→Main→Progress→
  Footer évidente, mode compact élégant.

## EN COURS
- Phase 04 — généralisation de la librairie par dérivation des cinq rôles gelés.

## PROCHAINE SESSION

1. Toast est GELÉ — **la famille Floating est complète et 100 % gelée**
   (Tooltip · Popover · DropdownMenu · ContextMenu · HoverCard · Toast).
   **Checkbox : GELÉ (validé visuellement 2026-07-02)** — `micro-control.tsx`
   devient la fondation partagée gelée des petits membres Micro. **Radio : audité + rebuild sur la fondation micro-control gelée, Built non
   gelé — à geler sur validation visuelle explicite** (langage Checkbox exact,
   seule la forme change ○/● ; ancien état sélectionné re-aligné sur le fill
   gelé ; readOnly = valeur verrouillée ; alias RadioItem conservé). Ensuite :
   **Switch** (même fondation), puis Dialog (← Modal), UserMenu. Nouveau helper `micro-control.tsx` (expression partagée
   des petits contrôles Micro — box token · fill accent · rim invalid ; focus =
   ring global) ; fix objectif : icône indéterminée pilotée par la prop (cassée
   en non-contrôlé) → data-state. API complète (description/error/helper/invalid/
   readOnly/required/labelPosition) + CheckboxGroup (fieldset, contexte
   disabled/invalid). Radio et Switch composeront micro-control.tsx à leur audit.
   CommandPalette est GELÉE (Modal reste Built — sera gelé avec sa première
   validation dédiée, ex. Dialog). Ensuite : Dialog/ConfirmationDialog (← Modal),
   UserMenu (← DropdownMenu + Avatar). Le rôle Immersive est fondé : **ImmersiveSurface** (base) +
   **Modal** (Radix Dialog, promu de la référence `/dev/modal`) + **CommandPalette**
   (compose Modal + SearchInput gelé + langage menu gelé ; ⌘K, filtrage, clavier
   complet, groupes, états). Bugs objectifs corrigés en route : `-translate-y-0`
   invalide (échelle `--ds-space-0` sans unité → transform entier perdu) et les
   modificateurs alpha (`bg-accent-subtle/45`, `bg-error/10`) JAMAIS générés
   (couleurs var() sans `<alpha-value>`) → surbrillance des menus gelés
   transparente depuis le début ; corrigé via `color-mix` token-only, preuves
   recapturées. Puis : Dialog/ConfirmationDialog (← Modal), UserMenu, Toast.
2. Continuer la famille Structural (dérivée de GlassCard / GlassPanel) :
   StatCard / EmptyState / ErrorState / ChartWrapper (← GlassCard)

- **BottomNav** — contrepartie mobile de Navbar, spécialisation directe de GlassPanel
  (aucun saut de hiérarchie ; ne compose jamais GlassSurface). Matériau 100% hérité,
  inchangé. BottomNav = géométrie + interaction seules : bande basse (`h-16`, items
  répartis équitablement, `px-2`), safe-area (`pb-[env(safe-area-inset-bottom)]`),
  `variant` géométrique `floating` (défaut) / `attached` (`rounded-none`) / `inset`
  (`rounded-t-none`), logique d'état actif. Padding hôte neutralisé (`p-0`) →
  verre bord à bord ; placement (`fixed bottom-0`) délégué au consommateur (A1). API
  composable : `BottomNav.Item` (icône + label optionnel + badge, `active` →
  `aria-current`, `asChild`, cible tactile ≥44px, `focus-visible`, `truncate`) et
  `BottomNav.Group`. Preuve : `/dev/bottom-nav`. Géométrie validée, matériau hérité,
  responsive validé, safe-area supporté, production-ready. **Validation visuelle
  PASS (2026-07-01)** sur fond de capture + fond riche : matériau identique à
  GlassPanel des deux côtés ; variants floating/attached/inset ne diffèrent que par
  le rayon ; état actif (violet), items inactifs, équilibre icône+label, badge,
  troncature des longs labels, desktop/tablet/mobile — tout lit correctement ; se
  lit comme la navigation (contrepartie mobile de Navbar), pas une Card/Toolbar/CTA/
  widget flottant. **GELÉ (2026-07-01)** — comme Navbar/Footer/Sidebar : plus de
  redesign ; aucune modif géométrie/spacing/hauteur/radius/matériau ; évolution
  seulement pour un bug objectif.

Sidebar est officiellement GELÉ (comme Button/Navbar/Footer/FloatingCard).

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
