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
   devient la fondation partagée gelée des petits membres Micro. **Radio : GELÉ (validé visuellement 2026-07-02)** — micro-control compte deux
   consommateurs gelés (Checkbox · Radio). **Switch : GELÉ (validé visuellement
   2026-07-03)**, après une passe de correction visuelle dédiée (3 itérations :
   restauration du verre réel `<GlassSurface/>` sur rail + pouce, teinte lavande
   `color-mix(in_srgb, var(--ds-color-accent) 42%, transparent)` derrière le
   backdrop-filter existant, densité optique augmentée pour la lisibilité ON/OFF).
   Métaphore corrigée : Checkbox/Radio *apparaissent* (un glyphe) ; Switch
   *bouge* — le pouce hérite du matériau (un second objet de verre imbriqué
   dans le rail), il n'imite plus le glyphe. Divergence architecturale
   assumée : Switch compose `<GlassSurface/>` directement (`.ds-glass
   .ds-micro`) plutôt que la recette plate de `micro-control.tsx`, car son rail
   44×24 peut dépenser davantage du Glass Budget Micro (§3) qu'un glyphe de
   20px — `micro-control.tsx` lui-même reste intact (seul `microControlInvalidClass`
   encore importé). Bug objectif d'origine (rail 44×24 explicite) :
   l'ancien `h-6 w-11` faisait 32×96 px sur l'échelle DISCIPLINE et le pouce
   n'atteignait jamais le bord. **Prochaine étape : Slider — dernier membre
   majeur de la famille Micro, clôture de la fondation Micro.** Nouveau helper `micro-control.tsx` (expression partagée
   des petits contrôles Micro — box token · fill accent · rim invalid ; focus =
   ring global) ; fix objectif : icône indéterminée pilotée par la prop (cassée
   en non-contrôlé) → data-state. API complète (description/error/helper/invalid/
   readOnly/required/labelPosition) + CheckboxGroup (fieldset, contexte
   disabled/invalid). Radio a composé micro-control.tsx verbatim à son audit ;
   Switch, lui, s'en est écarté volontairement (voir plus haut) pour porter le
   verre réel sur son rail 44×24. **Slider : GELÉ (validé visuellement
   2026-07-03)** — dernier membre majeur du Micro. **La famille Micro est
   désormais officiellement complète et 100 % gelée : Button · IconButton ·
   LinkButton · Checkbox · Radio · Switch · Slider.** Track + Thumb imbriquent
   le vrai verre ; le Range réutilise verbatim la recette du rail Switch
   coché, généralisée en classe inconditionnelle
   (`microControlActiveGlassClass`, additive dans micro-control.tsx) puisque
   le Range n'a pas d'état on/off. slider.tsx grep zéro GlassSurface/
   backdrop-filter/blur/box-shadow/rgba/transition/animation/focus — tout
   vient de micro-control.tsx par le nom. Checkbox/Radio/Switch intacts
   (grep) ; `microControlThumbClass`, mort (zéro consommateur depuis la
   correction visuelle de Switch), supprimé au passage. readOnly vérifié
   programmatiquement (flèches + drag inertes). **SegmentedControl : GELÉ
   (validé visuellement 2026-07-03)** — premier membre Control construit
   au-dessus de la fondation Micro désormais entièrement gelée. **La famille
   Selection Controls est désormais officiellement complète et gelée :
   Checkbox · Radio · Switch · Slider · SegmentedControl.** Choix exclusif
   entre 2 et 6 options
   toutes visibles ; pas RadioGroup (champ de formulaire, liste longue), pas
   Tabs (pilote un panneau de contenu), pas Button Group (actions
   indépendantes), pas Toggle Group (items indépendamment on/off), pas
   Select (échange visibilité contre densité). Bâti sur le même primitif
   Radix que Radio gelé (`@radix-ui/react-radio-group`) composé directement
   (pas de nesting du composant `<Radio>` — géométrie totalement
   différente). Le conteneur est le même verre Control Surface qu'Input/
   Select (`<ControlSurface/>` dans `.ds-glass .ds-control`) ; chaque
   segment imbrique son propre verre en `.ds-micro` (pas hérité du parent
   `.ds-control`, pour lire à l'identique du rail Switch gelé), invisible au
   repos, révélé uniquement sélectionné via le nouveau
   `microControlSelectedGlassClass` (additif, sibling gated-par-data-state
   du `microControlActiveGlassClass` de Slider). segmented-control.tsx grep
   zéro GlassSurface/blur/backdrop-filter/rgba/shadow/transition/animation/
   focus. Checkbox/Radio/Switch/Slider intacts (grep). Invalid réutilise le
   rim `.ds-control--error` gelé (pas le langage Micro) — cohérent avec son
   rôle Control. readOnly vérifié programmatiquement (clic + flèches
   inertes). **MultiSelect : GELÉ (validé visuellement 2026-07-03)** — liste
   de valeurs, plusieurs
   sélectionnables à la fois, ouvre/sélectionne/désélectionne/ferme en
   gardant le contexte. Pas Select (une seule valeur, ferme au choix), pas
   Dropdown Menu (un menu = des commandes ; MultiSelect est un champ de
   formulaire), pas Command Palette (surface globale vs champ scopé), pas
   Checkbox Group (toujours visible, aucun compromis de densité), pas Tag
   Input (tokens texte libres créables), pas Combobox (filtre + role=option
   — MultiSelect ne filtre jamais et garde role=checkbox). Le trigger est le
   même puits `.ds-glass .ds-control` qu'Input/Select ; le panneau ouvert
   réutilise verbatim la recette du menu Select gelé (3 nouveaux exports
   additifs dans `control-surface.tsx` : `controlPanelClass`,
   `controlPanelPaddingClass`, `controlChevronMotionClass`, extraits sans
   toucher Select) ; chaque ligne est le composant `<Checkbox/>` gelé
   lui-même, pas ses classes recréées. multiselect.tsx grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition/animation.
   Exception transparente assumée : `focus` apparaît 3 fois (2 appels DOM
   natifs `.focus()` + la prop Radix `onOpenAutoFocus`) car un Popover brut
   n'a aucune reachability roving intégrée (contrairement à RadioGroup/
   Slider) — Arrow Up/Down/Home/End sont écrits à la main en JS pur, zéro
   CSS, zéro matière, le ring `:focus-visible` global reste inchangé.
   Select/Checkbox/Radio/Switch/Slider/SegmentedControl intacts (grep).
   **Les Selection Controls sont désormais officiellement complets et gelés :
   Checkbox · Radio · Switch · Slider · SegmentedControl · MultiSelect.**
   **Combobox : GELÉ (validé visuellement 2026-07-03)** — valeur unique trouvée par recherche dans
   une très grande liste. Pas Select (liste courte, entièrement lisible, pas
   besoin de recherche), pas MultiSelect (plusieurs valeurs, reste ouvert),
   pas Command Palette (surface globale vs champ scopé), pas Search Input
   (filtre le contenu de la page — ici le texte tapé n'est jamais la
   valeur), pas Autocomplete (suggère des complétions qui restent du texte
   libre ; la valeur finale de Combobox est toujours exactement une option),
   pas Dropdown Menu/Menu (des commandes, pas un champ), pas Listbox (aucune
   recherche — exactement le problème que Combobox résout). Le trigger est
   Input lui-même (le composant, pas ses classes recréées — label/
   description/error/helperText hérités). Le panneau réutilise verbatim la
   recette du panneau Control Surface déjà validée (Select/MultiSelect). Les
   lignes réutilisent le langage Select gelé (3 nouveaux exports additifs
   dans `control-surface.tsx` : `controlOptionRowClass`,
   `controlOptionHighlightClass`, `controlOptionDisabledClass`, extraits
   sans toucher Select). combobox.tsx grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation. Exception transparente :
   `focus` apparaît 2 fois (`onFocus` + `onOpenAutoFocus` Radix, empêché) —
   zéro appel `.focus()` littéral, plus propre que MultiSelect, car les
   flèches déplacent un pointeur `aria-activedescendant` pur, jamais le
   focus DOM réel (vérifié programmatiquement : le focus reste sur l'input
   du début à la fin). Select/Input/Checkbox/Radio/Switch/Slider/
   SegmentedControl/MultiSelect intacts (grep). Recherche instantanée, case-
   et accent-insensible (`String.normalize('NFD')` standard, aucune
   dépendance nouvelle) — vérifié programmatiquement ("ger" → seulement
   Germany). Limite connue et documentée : le rim rouge d'Input nécessite un
   vrai message d'erreur (même contrainte que Select) ; `invalid` seul pose
   `aria-invalid` correctement mais n'a pas d'effet visuel de rim en
   composant Input gelé tel quel. **Autocomplete : Built, non gelé** — texte
   libre assisté, jamais contraint, par des suggestions. Pas Combobox (la
   valeur finale de Combobox est toujours exactement une option d'un
   ensemble fermé ; Autocomplete accepte n'importe quel texte tapé), pas
   Search Input (filtre la page, pas le champ lui-même), pas Command
   Palette, pas Select/MultiSelect (ensemble fermé), pas Tag Input (crée des
   tokens discrets ; Autocomplete porte une seule chaîne continue), pas
   Dropdown Menu/Menu/Listbox. Même composition physique que Combobox gelé
   — **zéro nouvel export nécessaire nulle part** : tout ce dont
   Autocomplete a besoin dans `control-surface.tsx` était déjà extrait pour
   Combobox ; `control-surface.tsx` montre un diff VIDE — le résultat
   architectural le plus propre de la famille Control jusqu'ici, pure
   réutilisation. Seule divergence comportementale délibérée : la frappe ne
   met jamais en surbrillance automatique une suggestion (`activeIndex`
   reste -1 tant que l'utilisateur n'appuie pas explicitement sur une
   flèche), donc Enter garde toujours exactement ce qui a été tapé par
   défaut — vérifié programmatiquement ("Pa" + Enter sans flèche garde
   "Pa" ; "Pa" + ArrowDown + Enter accepte "Paris"). Escape/interaction
   extérieure ferment SANS revenir en arrière (contrairement à Combobox)
   puisque tout texte tapé est déjà une valeur valide ; aucun concept
   "aucun résultat = erreur" — vérifié programmatiquement qu'un texte non
   trouvé ("Nowhereville") se valide normalement sans panneau vide forcé.
   autocomplete.tsx grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/
   transition/animation ; `focus` seulement `onFocus` + `onOpenAutoFocus`
   Radix (empêché), zéro `.focus()` littéral. Select/Input/Checkbox/Radio/
   Switch/Slider/SegmentedControl/MultiSelect/Combobox intacts (grep).
   **Autocomplete : GELÉ (validé visuellement 2026-07-03).**
   **OTP Input : GELÉ (validé visuellement 2026-07-03, après recalibrage de
   la géométrie des cases).** Champ spécialisé pour un code composé
   de plusieurs caractères indépendants représentant une seule valeur
   logique. Pas Input (le nombre de cases EST le sujet — auto-advance,
   Backspace par position, flèches par position sont impossibles sur un
   seul champ), pas Autocomplete/Combobox/Select/MultiSelect (tous résolvent
   un texte contre des options ; un code n'est jamais comparé, seulement
   reçu), pas Search Input (rien n'est filtré), pas Password Input (une
   chaîne opaque vs un code lisible, chaque caractère devant être vérifié
   individuellement), pas Pin Display/Code Viewer (présentation en lecture
   seule vs la saisie ici), pas Verification Card (composition de page
   construite AUTOUR d'un champ comme celui-ci), pas Form Group (un seul
   champ, une seule valeur logique, pas plusieurs champs indépendants).
   Chaque case est exactement le puits Control Surface d'Input, compacté en
   carré via le nouvel export additif `controlCellClass` dans
   `control-surface.tsx` (Input intact). Un vrai `<input maxLength={1}>`
   par case. La frappe avance automatiquement ; Backspace sur une case vide
   recule et efface la case précédente ; les flèches naviguent ; coller un
   code complet le répartit sur les cases restantes. Les trous sont
   structurellement impossibles : si l'utilisateur fait le focus sur une
   case au-delà d'une case vide antérieure, le focus est redirigé vers
   cette case antérieure — vérifié programmatiquement (bug découvert et
   corrigé pendant le build : une simple concaténation de chaîne perdait la
   position des cases vides intermédiaires). otp-input.tsx grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition/animation ;
   `focus` apparaît seulement via le helper `focusCell` (un seul appel
   littéral `.focus()`, irréductible — la gestion automatique du focus
   entre cases était une exigence explicite) + `autoFocus`/`onFocus`
   natifs. Input/Select/Checkbox/Radio/Switch/Slider/SegmentedControl/
   MultiSelect/Combobox/Autocomplete intacts (grep). Recalibrage visuel
   post-validation : cases trop grandes (lisibles comme des mini Cards) →
   largeur/hauteur réduites et resserrées (`cellSizeClass` : sm 40×40 →
   32×28, md 48×48 → 40×32, lg 56×56 → 44×36 ; gap `gap-2` → `gap-1.5`),
   même matière, mêmes comportements, aucune logique modifiée.
   **Time Picker : GELÉ (validé visuellement 2026-07-03).** Sélectionner une heure (et
   éventuellement les minutes) représentant une seule valeur ponctuelle.
   Pas Date Picker (grille jour/mois/année vs deux petits nombres bornés),
   pas Calendar (aucune notion de grille), pas Select (liste arbitraire vs
   grammaire numérique 0-23/0-59 avec champ saisissable), pas Combobox/
   Autocomplete (ni l'un ni l'autre ne résout du texte libre contre une
   grammaire numérique bornée avec progression heure→minute), pas Input
   (ajoute le parsing 24h + popup PAR-DESSUS Input, ne le remplace pas),
   pas Number Input (pas de format, pas de deux-points, pas de structure en
   deux parties), pas Clock (affichage lecture seule, n'accepte jamais de
   valeur), pas Duration Picker (durée écoulée sans origine fixe vs heure
   ancrée dans un cycle de 24h), pas Scheduler (composition de page
   construite AUTOUR de champs comme celui-ci), pas Time Range Picker (deux
   Time Pickers + invariant début<fin, un problème du consommateur). Le
   trigger est Input lui-même ; le panneau est le vrai composant gelé
   `<Popover/>` (matière Floating) — contrairement à Combobox/MultiSelect/
   Autocomplete qui réutilisent la recette de panneau Control Surface
   extraite de Select, le panneau de Time Picker est une surface
   véritablement distincte, donc réutiliser le vrai Popover gelé est le
   choix le plus honnête. Les lignes réutilisent le langage Select gelé
   (`controlOptionRowClass`/`controlOptionHighlightClass`/
   `controlOptionDisabledClass`, zéro nouvel export). Valeur canonique
   toujours "HH:mm" 24h ; un futur mode d'affichage 12h/AM-PM ne serait
   qu'une couche de formatage sur la même valeur. time-picker.tsx grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition ; `focus`
   apparaît via 7 appels littéraux `.focus()` (navigation par focus
   manuelle entre les listes heure/minute, même schéma justifié que
   MultiSelect) + `onFocus`/`onOpenAutoFocus` natifs ;
   `requestAnimationFrame`/`cancelAnimationFrame` (API de planification du
   navigateur, pas un effet de mouvement décoratif) sont les seules
   occurrences du mot `animation`, nécessaires car les refs des lignes ne
   s'attachent qu'une frame après que Radix a monté son contenu piloté par
   Presence — bug réel découvert et corrigé pendant le build (le scroll
   initial vers la valeur validée ne faisait rien au premier ouverture).
   Input/Select/Checkbox/Radio/Switch/Slider/SegmentedControl/MultiSelect/
   Combobox/Autocomplete/OtpInput/Popover intacts (grep) ; diff vide sur
   tous les fichiers partagés.
   **Date Range Picker : GELÉ (validé visuellement 2026-07-03).** Un début et une fin
   représentant UNE valeur logique : une période continue. Pas Date Picker
   (un seul jour, ferme — une période est un autre type de valeur : deux
   ancres ordonnées + tout ce qui est entre, avec état partiel, inversion
   et bande de sélection), pas Calendar (la grille de jours à laquelle un
   picker délègue), pas Time Picker (heures dans une journée), pas
   DateTime Picker (un instant vs un intervalle de jours), pas Range
   Slider (deux nombres sur un axe, aucune structure calendaire), pas Time
   Range Picker (deux heures dans une journée), pas Month/Year Picker (une
   unité plus grossière, toujours une seule ancre), pas MultiSelect
   (valeurs indépendantes non ordonnées vs deux ancres ordonnées — on ne
   peut pas désélectionner le milieu), pas Combobox (rien n'est cherché),
   pas Scheduler/Booking/Availability Calendar (compositions de page
   construites AUTOUR d'un champ comme celui-ci), pas Timeline/Gantt
   (visualisations en lecture de plusieurs intervalles), pas Form Group
   (un seul champ, une seule valeur). Trigger = Input lui-même (période
   formatée, jamais saisie libre — convention du DatePicker gelé) ;
   panneau = le langage calendrier du DatePicker gelé en `mode="range"`
   (FloatingSurface + ds-datepicker-content/-calendar, même moteur
   react-day-picker, même clavier, même ARIA). UNE règle strictement
   additive dans `date-picker.css` (`.rdp-range_middle` — le surlignage
   accent-subtle déjà utilisé partout, comme bande de période ; insertion
   pure, le DatePicker gelé rend à l'identique). Grammaire pilotée par
   l'état + le jour cliqué (bug réel trouvé et corrigé : rdp v9 renvoie
   `{from: jour, to: jour}` dès le PREMIER clic, ce qui validait
   instantanément une période d'un jour) : premier clic ancre le début
   (reste ouvert, "Jul 10, 2026 – …"), second clic ancre la fin et ferme,
   une fin antérieure au début s'inverse en place, un clic sur une période
   complète en démarre une nouvelle. Le focus entre dans la grille à
   l'ouverture et revient au champ à la fermeture (UN `.focus()` littéral
   irréductible dans `onCloseAutoFocus` — aucun Trigger Radix pour le
   restaurer, l'ancre est Input). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation. Tous les composants
   gelés intacts.
   **Color Picker : Built, non gelé** — un champ validant UNE valeur de
   couleur, choisie visuellement dans une palette ou saisie en hex. Pas
   Input (aucun aperçu/palette/popup/grammaire couleur — Color Picker
   ajoute exactement cela PAR-DESSUS Input, le trigger EST un Input), pas
   Select (des lignes de texte étiquetées vs une couleur choisie en la
   VOYANT ; la saisie hex libre = domaine ouvert), pas Combobox/
   Autocomplete (le hex est un FORMAT fixe, pas une requête), pas Radio
   Group/Segmented Control (petits ensembles fermés toujours visibles ;
   la palette n'est qu'un raccourci dans un espace ouvert), pas Palette/
   Swatch Grid (les structures d'affichage composées à l'intérieur — pas
   de champ/popup/valeur seules), pas Theme Selector (un MODE applicatif,
   un paquet nommé de tokens, vs une couleur littérale dans un champ), pas
   Gradient Editor (plusieurs couleurs + stops + direction — un autre type
   de valeur construit AU-DESSUS de celui-ci), pas Opacity Slider (l'alpha
   est un CANAL d'une couleur, pas une couleur), pas RGB/HSL Editor (des
   formats de saisie alternatifs qu'une extension future ajouterait DANS
   ce même panneau, jamais des frères), pas Hex Input (un organe interne
   de ce composant), pas Eyedropper (un OUTIL de capture d'écran, pas un
   champ), pas Canvas Editor/Image Picker, pas MultiSelect (UNE couleur,
   jamais une collection), pas Form Group. Trigger = Input lui-même
   (pastille de la couleur courante dans le slot prefix, hex validé comme
   texte, jamais de saisie libre — convention DatePicker/DateRangePicker) ;
   panneau = le vrai `<Popover/>` gelé contenant une grille de pastilles
   `role="listbox"` (coche = sélection, contraste auto), le vrai `<Input>`
   gelé pour le hex, le vrai `<IconButton>` gelé pour la copie. Palette ↔
   hex synchronisés dans les deux sens (vérifié programmatiquement) ; le
   panneau reste ouvert entre les choix (choix itératif, précédent
   MultiSelect). Valeur canonique `#RRGGBB` majuscule ; l'alpha est
   volontairement différé (extension pure `#RRGGBBAA` + une ligne Slider
   gelé dans ce même panneau, rien ne casse plus tard). Les fonds des
   pastilles sont des DONNÉES de palette, jamais de la matière ; la
   palette par défaut (24 entrées) est l'unique exception documentée et
   circonscrite à la règle Phase-02 interdisant les littéraux de couleur
   (domaine de valeurs = data, la règle protège la MATIÈRE). grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition ;
   `requestAnimationFrame` est la seule occurrence du mot `animation` ;
   3 appels `.focus()` littéraux irréductibles (navigation de grille,
   atterrissage initial, retour au champ). ZÉRO fichier modifié hors du
   nouveau composant — Input/Popover/IconButton/Icon/Label/Spinner
   fournissaient déjà tout. À geler sur validation visuelle explicite.
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
