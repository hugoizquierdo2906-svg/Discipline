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
   **Color Picker : GELÉ (validé visuellement 2026-07-03).** Un champ validant UNE valeur de
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
   fournissaient déjà tout.
   **Alert Dialog : GELÉ (validé visuellement 2026-07-03).** Une confirmation interruptive :
   l'app s'arrête et pose UNE question à laquelle il faut répondre —
   confirmer ou annuler — avant toute autre chose. Pas Dialog/Modal (le
   conteneur immersif générique, tout contenu, fermable au clic extérieur ;
   Alert Dialog est un MESSAGE + CHOIX BINAIRE spécialisé par-dessus :
   `role="alertdialog"`, le clic extérieur ne ferme jamais, focus initial
   sur l'action la moins destructive), pas Popover (ancré, non bloquant),
   pas Tooltip (étiquette au survol, jamais interactive), pas Hover Card
   (aperçu passif), pas Toast (transitoire, se ferme seul, n'interrompt
   jamais — un toast informe, un alert dialog interroge), pas Banner/Alert
   (information de page persistante sans réponse exigée), pas Notification
   (nouvelle de ce qui s'est déjà passé vs question sur ce qui VA se
   passer), pas Confirm Dialog (la même espèce — c'est la variante neutre
   de ce composant, pas un frère), pas Sheet/Drawer (surfaces de bord pour
   du CONTENU secondaire), pas Dropdown/Context Menu (des commandes), pas
   Command Palette (l'autre membre Immersive — même parent Modal, autre
   métier), pas Form (AUCUN champ — dès qu'il faut saisir, c'est un Dialog
   de formulaire), pas Wizard (plusieurs étapes vs une question), pas Card
   (conteneur structurel statique), pas Message Box (la primitive OS
   `window.confirm` — ceci est son remplaçant natif du design system).
   Compose le COMPOSANT Modal uniquement (jamais les primitives dessous —
   la règle de Modal) : scrim, matière du panneau (`.ds-immersive`/
   `.ds-scrim` gelés), entrée, focus trap, scroll lock, Escape, fond
   inerte, portal, retour du focus et le câblage ARIA Title/Description
   hérités verbatim. Ajoute exactement la sémantique d'alerte :
   `role="alertdialog"` + `aria-modal`, fermeture au clic extérieur
   désactivée, focus initial sur Cancel, et les deux `<Button>` gelés —
   Cancel toujours `secondary`, Confirm `primary` (neutre) ou
   `destructive` (variante destructive ; le remplissage erreur gelé sous
   l'arête de verre, zéro nouvelle recette). `loading` = l'état loading du
   Button gelé sur Confirm, avec TOUTES les voies de fermeture
   verrouillées pendant l'action (Escape empêché, Cancel désactivé — une
   action destructive en cours ne doit pas être abandonnable à
   mi-chemin). Non contrôlé (avec `trigger`) : confirm/cancel ferment
   seuls ; contrôlé : la fermeture après confirm appartient au
   consommateur (flux async). `size` sm/md/lg = géométrie de largeur du
   panneau uniquement (md EST la largeur intrinsèque gelée de Modal,
   intacte — Invariant A1). grep zéro GlassSurface/blur/backdrop-filter/
   rgba/shadow/transition/animation ; `focus` = UN seul `.focus()`
   littéral (focus initial sur Cancel — exigence WAI-ARIA alertdialog,
   irréductible) + le nom de prop Radix `onOpenAutoFocus`. ZÉRO fichier
   modifié hors du nouveau composant — Modal et Button fournissaient
   tout.
   **Drawer : GELÉ (validé visuellement 2026-07-03, après la passe de
   freeze : documentation complète dans le fichier — philosophie, Drawer
   vs Dialog vs Command Palette, quand NE PAS l'utiliser, six invariants
   gelés — et `/dev/drawer` promu page de référence officielle avec neuf
   cas ajoutés : data table, timeline, markdown, graph, tabs via le
   SegmentedControl gelé, accordion via disclosure natif, upload via le
   FileInput gelé, erreurs de validation, très long formulaire).** Un
   panneau immersif ancré au bord : un
   espace de travail secondaire qui glisse depuis un côté de l'écran,
   porte du vrai contenu (formulaire, réglages, inspecteur, navigation)
   et rend l'écran là où l'utilisateur l'a laissé. Un dialog pour une
   décision, un drawer pour une tâche. Pas Dialog/Modal (un MOMENT centré
   et borné, dimensionné à son contenu vs un ESPACE attaché au bord,
   pleine hauteur, fait pour parcourir/éditer à côté de la page), pas
   Alert Dialog (question bloquante, zéro contenu, interruption maximale
   — l'exact opposé), pas Sheet (le nom qu'une autre librairie donne à la
   même espèce ; DISCIPLINE a UN nom canonique, pas de frère doublon),
   pas Bottom Sheet (défini par le GESTE — detents, snap points, swipe ;
   le côté bottom du Drawer partage le placement, aucune physique de
   geste), pas Popover (ancré à un déclencheur vs au bord du viewport),
   pas Tooltip/Hover Card (survol, passif), pas Dropdown/Context Menu
   (commandes), pas Navigation Menu (barre toujours visible — un drawer
   peut CONTENIR de la navigation, transitoirement), pas Command Palette
   (l'autre membre Immersive), pas Sidebar (région de layout PERSISTANTE
   qui partage l'écran ; un drawer RECOUVRE et repart — s'il reste, c'est
   devenu une Sidebar), pas Accordion/Collapsible (divulgation dans le
   flux qui pousse le contenu), pas Card, pas Form/Wizard (des GENRES de
   contenu qu'il héberge), pas Overlay (l'organe scrim en dessous), pas
   Toast. Ergonomie : conserve le contexte spatial (la page reste visible
   à côté), l'ancrage au bord donne une hauteur naturelle aux contenus
   longs, vocabulaire gestuel OS. Responsive : desktop → panneaux
   latéraux partiels (inspecteur/réglages) ; mobile → quasi pleine
   largeur, bottom plus accessible au pouce ; chaque taille est bornée au
   viewport ; `size="full"` = surface plein écran. Compose le COMPOSANT
   Modal uniquement : focus trap, restore focus, scroll lock, Escape,
   overlay, portal, fond inerte et ARIA hérités VERBATIM — drawer.tsx ne
   contient AUCUN code de focus. Ajoute seulement géométrie + slots :
   side left/right/top/bottom, tailles xs→full par axe, la
   neutralisation de panneau du CommandPalette gelé verbatim (`w-full
   max-w-none p-0`) avec le radius gelé intact grâce à une gouttière de
   8px (aucune chirurgie d'angle), header sticky (icône + Title +
   Description + IconButton gelé) / corps scrollable (Spinner gelé en
   loading) / footer sticky, slots header/footer custom, modal/non-modal,
   closeOnEscape/closeOnOverlay, forceMount, drawers imbriqués par simple
   composition (Escape ferme couche par couche, vérifié). DEUX extensions
   strictement additives dans modal.tsx (transfert `forceMount` au Portal
   + `contentClassName` — sortie identique à l'octet près quand les props
   sont absentes ; indispensables et documentées). grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition/animation et
   zéro `focus` d'aucune sorte — le grep le plus propre de la session.
   **Bottom Sheet : Built, non gelé** — la surface immersive tactile de
   DISCIPLINE : un panneau qui monte depuis le bord bas, piloté par le
   GESTE (drag/swipe/flick), s'arrêtant à des detents et rejeté par un jet
   vers le bas. Là où le Drawer gelé est un ESPACE DE TRAVAIL (deux
   positions, fermé par bouton/overlay), le Bottom Sheet est une
   INTERACTION : le doigt le possède. Comportements exclusifs, interdits
   dans Drawer : drag/swipe/flick, dismissal par vélocité, snap points &
   detents, rubber-band, coordination du scroll (la liste scrolle jusqu'en
   haut, puis le sheet prend le drag), settle inertiel, keyboard avoidance,
   safe-area. Pas Dialog/Modal (centré, sans geste), pas AlertDialog
   (question bloquante), pas Popover (ancré à un trigger), pas Command
   Palette, pas Navigation Drawer/Sidebar (cas d'usage Drawer / région
   persistante), pas Action Sheet iOS (liste de choix figée — un pattern
   de contenu qu'il héberge), pas Material Bottom Sheet/vaul (c'est CETTE
   espèce — la version native token-only de DISCIPLINE ; vaul seulement
   référence technique du drag, jamais visuelle). Compose le COMPOSANT
   Modal uniquement — portal, focus trap, scroll lock, Escape, overlay,
   fond inerte, ARIA hérités verbatim ; bottom-sheet.tsx ne contient AUCUN
   code focus/overlay/portal/scroll-lock (grep). Ne gère que la physique :
   panneau ancré en bas dont la HAUTEUR est le detent (header/footer
   sticky fixes, corps scrollable entre) ; en drag la hauteur suit le doigt
   1:1, rubber-band au-delà du detent le plus haut, un dépassement sous le
   detent le plus bas glisse vers le dismissal, un flick rapide vers le bas
   rejette sinon snap au detent le plus proche. Le settle (glissé transform
   + height) vit dans `bottom-sheet.css` token-only (reduced-motion),
   désactivé pendant le drag via une classe — donc le .tsx ne porte aucun
   mot `transition`/`animation` ni `requestAnimationFrame`. Detents
   content/small/medium/large/full/custom %, bornés au viewport ; `content`
   lit la hauteur naturelle. Responsive : pleine largeur mobile, largeur
   plafonnée centrée desktop, sans media query ; keyboard avoidance
   (VisualViewport) ; safe-area. modal/non-modal, dismissible/
   closeOnOverlay/closeOnEscape gardent les voies de fermeture (un
   `BottomSheet.Close` explicite ferme toujours, même non-dismissible) ;
   imbriqués par simple composition (Escape couche par couche). ZÉRO
   fichier modifié hors des deux nouveaux fichiers du composant — même les
   extensions additives de Modal n'ont pas été nécessaires
   (`contentClassName`/`forceMount` du Drawer existaient déjà). Carte de
   décision UX documentée : oui/non → AlertDialog · une action → Dialog ·
   info ancrée → Popover · commande → Command Palette · espace de travail
   → Drawer · surface mobile gestuelle → Bottom Sheet. À geler sur
   validation visuelle explicite.
   **Fullscreen Overlay : GELÉ (validé visuellement 2026-07-06).** Plus de
   redesign sauf bug objectif — la surface immersive maximale
   de DISCIPLINE : une prise de contrôle temporaire du viewport ENTIER pour
   une tâche longue, complexe ou exigeant toute l'attention, sans quitter la
   page courante. Pas un Drawer agrandi (le Drawer garde la page visible à
   côté comme contexte ; l'overlay RETIRE délibérément ce contexte pour que
   rien ne dispute l'attention), pas un Dialog plein écran (un Dialog est un
   MOMENT borné dimensionné à son contenu — une décision, un petit
   formulaire ; l'overlay est un ENVIRONNEMENT avec son propre header, corps,
   footer, barres latérales et toolbars, habité des minutes, pas des
   secondes), pas un Bottom Sheet (physique gestuelle mobile aux detents ;
   l'overlay est toujours l'écran entier, clavier/pointeur d'abord), pas une
   Command Palette (surface de recherche-pour-sauter), pas une Sidebar/
   Navigation Drawer (régions de layout persistantes), pas un Popover (ancré,
   non bloquant), pas un Wizard (un flux multi-étapes — du contenu qui peut
   VIVRE dans un overlay, pas la surface elle-même), pas une Page (une
   destination routée avec URL — l'overlay est transitoire et te ramène
   exactement où tu étais). Existe parce que certaines tâches — construire un
   programme, créer un client, un onboarding, une session d'assistant IA, un
   visualiseur de média, une recherche plein écran, une comparaison côte à
   côte — exigent tout le canevas et zéro distraction, sans pour autant
   devenir une page routée. Interdit pour : une confirmation, un court
   formulaire, un menu, une info contextuelle, tout ce que la page peut
   héberger inline, et tout ce qui mérite sa propre URL (c'est une Page).
   GlassSurface → .ds-immersive → ImmersiveSurface → Modal →
   **FullscreenOverlay** : compose le COMPOSANT Modal uniquement — focus
   trap, restore focus, scroll lock, Escape, overlay, portal, fond inerte et
   le câblage ARIA Title/Description hérités verbatim ; fullscreen-overlay.tsx
   ne contient AUCUN code focus/overlay/portal/scroll-lock. Ne possède que sa
   géométrie (bord à bord, 100dvh, aucun rayon, aucun centrage —
   `inset-0`/`w-screen`/`max-w-none`/`translate-0`), ses slots (header ·
   breadcrumb · search · toolbar · sidebar · body · inspector · status bar) et
   sa mise en page : une colonne flex où header/toolbar/footer/status bar sont
   sticky (shrink-0), la bande centrale (flex-1, min-h-0) porte une sidebar
   gauche optionnelle + le corps + un inspector droit optionnel, le corps est
   la SEULE zone de scroll, et le viewport ne scrolle jamais (scroll lock de
   Modal). `loading` recouvre le corps du Spinner gelé ; `disabled` bloque
   l'ouverture (un overlay déjà ouvert se ferme quand même) ; modal/non-modal,
   closeOnEscape/closeOnOverlay/restoreFocus gardent les voies de fermeture ;
   un slot `header` custom remplace la barre par défaut (le Title reste,
   masqué visuellement, ARIA intact) ; imbriqués par simple composition
   (Escape couche par couche, vérifié). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation ; zéro code focus/portal/
   scroll-lock. ZÉRO fichier modifié hors des nouveaux fichiers du composant —
   Modal/ImmersiveSurface/IconButton/Icon/Spinner réutilisés tels quels (même
   les props additives de Modal n'ont pas été nécessaires).
   **Sheet : REJETÉ (ADR 2026-07-03, aucun code écrit).** Analyse
   documentée contre Radix (aucune primitive Sheet/Drawer/Bottom Sheet —
   Dialog seulement), Ariakit (idem — Dialog/Popover/Hovercard), shadcn
   (son `Sheet` « étend le composant Dialog pour afficher du contenu qui
   complète le contenu principal de l'écran », prop `side`
   top/right/bottom/left + slots header/footer — soit EXACTEMENT notre
   Drawer gelé, fonctionnalité pour fonctionnalité, sur la même fondation
   Dialog) et Material (pas de « Sheet » : des *side sheets* ≡ Drawer et
   des *bottom sheets* définis par le geste). « Sheet » ne nomme aucune
   capacité manquante : c'est le Drawer sous le nom d'une autre
   librairie → rejeté (un problème, un composant). La surface réellement
   distincte est le **Bottom Sheet** (physique de drag, detents, snap
   points, safe-area, tactile d'abord) — futur composant séparé, déjà
   réservé nommément dans la doc du Drawer gelé ; ses comportements de
   geste restent interdits dans Drawer.
   **Spotlight : REJETÉ (ADR 2026-07-06, aucun code écrit).** Analyse
   documentée contre Apple Spotlight/HIG, Raycast, VS Code, Linear,
   Notion, Arc, Material Design et Radix. Spotlight (Apple) est une
   surface de recherche universelle au niveau de l'OS, à travers des
   domaines hétérogènes (apps, fichiers, contacts, mails, définitions,
   calculs, conversions, le web), invocable DEPUIS N'IMPORTE OÙ, hors de
   toute application — une portée sans équivalent produit à l'intérieur
   d'une seule application web : DISCIPLINE n'est pas un système
   d'exploitation, et la CommandPalette gelée est déjà invocable
   globalement (⌘K) depuis n'importe où dans l'app, soit toute la portée
   qu'un produit web peut offrir. Chaque produit réel étudié converge vers
   UNE seule palette unifiée, jamais deux : le Command Menu de Linear
   unifie navigation (« sauter à n'importe quelle section ») et exécution
   de commandes dans une seule surface Cmd+K ; Raycast se présente
   littéralement comme « Spotlight sous stéroïdes — la même idée de
   base », regroupant launcher + recherche de fichiers + calculatrice +
   presse-papier + extensions dans une seule barre ; le Quick Find de
   Notion (Cmd+P/Cmd+K) est sa seule surface de saut-et-recherche, sans
   concept « Spotlight » séparé ; la Command Bar d'Arc (⌘T) fusionne
   Navigation + Organisation + Outils + Split View + Réglages — plus de
   60 actions — dans une seule entrée cherchable (confirmé sur la propre
   documentation d'Arc). Le seul produit à deux points d'entrée, VS Code
   (Quick Open ⌘P pour les fichiers, Command Palette ⇧⌘P pour les
   commandes), documente les deux comme partageant LE MÊME champ : Quick
   Open accepte un préfixe `?` pour faire apparaître des suggestions de
   commandes à l'intérieur (confirmé sur la documentation officielle de VS
   Code) — un seul widget, changement de mode par caractère préfixe, pas
   deux composants. Même le Spotlight actuel d'Apple converge vers
   l'intérieur : les versions récentes laissent les apps enregistrer des
   actions exécutables directement dans Spotlight via App Intents,
   brouillant la frontière chercher/agir depuis l'autre sens aussi.
   Material Design n'a aucun concept « Spotlight » : son pattern Search
   (persistant ou extensible — un champ texte + des cartes de résultats)
   est un filtre de contenu scopé à la page, déjà le métier du SearchInput
   gelé, jamais une prise de contrôle globale. Radix ne fournit aucune
   primitive Search/Spotlight/Command (Dialog seulement — les mêmes
   parties Root/Trigger/Portal/Overlay/Content/Close/Title/Description que
   Modal compose déjà) — confirmant, comme pour le rejet de Sheet, que
   toute surface nommée au-dessus de Dialog est une composition
   applicative, jamais une primitive manquante. En parcourant les quatre
   questions obligatoires : Spotlight existe pour localiser une entité ou
   une réponse calculée à travers un domaine de données hétérogène à
   l'échelle de l'OS que l'utilisateur ne peut pas parcourir autrement —
   un problème de PORTÉE qui se réduit à « chercher dans les données de
   cette app » à l'intérieur d'un seul produit ; rien de ce qui reste
   n'est comportementalement exclusif (contenu de ligne hétérogène,
   lignes-réponses calculées, classement plus intelligent des récents sont
   des préoccupations de gabarit de ligne/de données, jamais un nouveau
   comportement focus/portal/scroll-lock/fermeture), donc rien ne serait
   interdit dans la Command Palette non plus. Classé ni comme un
   composant, ni comme un alias de renommage strict (contrairement à
   Sheet≡Drawer), mais comme un CAS D'USAGE / PATTERN DE DONNÉES de la
   CommandPalette déjà gelée : une configuration `groups` de « recherche
   globale d'entités » (un groupe Clients/Programmes/Exercices aux côtés
   des groupes existants Recent/Navigation/Actions/Settings/AI),
   entièrement couverte par son API `groups` déjà pilotée par la donnée et
   explicitement conçue pour évoluer (« async/streaming/AI plus tard sans
   rien casser »), sans aucun changement de composant. Command Menu
   (Linear) et Command Bar (Arc) sont, à l'inverse, de purs alias de nom
   d'éditeur pour cette même espèce déjà gelée. Aucun code écrit.
   **Breadcrumb : GELÉ (validé visuellement 2026-07-06, après la passe de
   craft ci-dessous).** Plus de redesign sauf bug objectif — indicateur de
   position hiérarchique
   officiel de DISCIPLINE : le chemin d'ancêtres depuis la racine de l'app
   jusqu'à la vue actuelle, répondant exactement à une question : « où
   suis-je ? ». Pas une navigation principale (un menu qu'on explore
   DEPUIS, jamais un rapport d'où on est DÉJÀ), pas Tabs (des frères au
   MÊME niveau, chacun possédant un panneau), pas un Stepper (une
   PROGRESSION linéaire dans une tâche en cours — Carbon : « pour un
   processus multi-étapes, utiliser un indicateur de progression »), pas
   Pagination (une séquence numérotée plate dans une seule collection),
   pas une Tree View (toute la structure, chaque branche, en permanence),
   pas l'historique/un bouton retour (l'ORDRE des pages visitées, un seul
   geste réversible — Apple HIG : « le bouton retour effectue toujours une
   seule action » ; Breadcrumb reflète toujours la position STRUCTURELLE
   fixe de la page actuelle, peu importe comment l'utilisateur y est
   arrivé), pas un chemin de système de fichiers (une chaîne statique —
   chaque ancêtre ici est une destination cliquable indépendante), pas un
   Menubar/Dropdown Menu/Command Palette (des commandes, jamais un rapport
   de position). Interdit sur une app à structure plate (GOV.UK : « ne pas
   utiliser... sur des sites à structure plate »), pour la progression
   d'un processus linéaire, comme substitut à la navigation principale
   réelle (Carbon : « toujours traité comme secondaire... ne doit jamais
   remplacer entièrement la navigation principale »), et pour l'historique
   de session du navigateur. Le HIG d'Apple recommande explicitement de NE
   PAS utiliser de chemins breadcrumb multi-segments dans les barres de
   navigation iOS — confirmant que Breadcrumb est un pattern WEB/DESKTOP
   hiérarchique, pas un pattern natif à pile.
   Un primitif PLAT, uniquement tokens : ne porte AUCUN rôle matériel
   (zéro GlassSurface, zéro `.ds-micro`/`.ds-control`/`.ds-card`/
   `.ds-floating`/`.ds-immersive`) et ne dépense ZÉRO budget de mouvement.
   Compose uniquement l'Icon gelé (jamais LinkButton — un Button portant
   du verre) et le Skeleton gelé (placeholders de chargement seulement).
   Pattern WAI-ARIA Breadcrumb complet : `nav aria-label="Breadcrumb"`, une
   liste ordonnée, `aria-current="page"` sur la page actuelle (jamais un
   lien), un séparateur purement décoratif exclu de l'arbre
   d'accessibilité (`role="presentation"` + `aria-hidden`). Aucun modèle de
   roving-tabindex/flèches nécessaire (le pattern APG est une simple liste
   de liens, pas un widget composite) — l'ordre Tab natif est le modèle
   clavier complet, zéro appel `.focus()` littéral nulle part. Radix ne
   fournit aucune primitive Breadcrumb (confirmé via leur propre demande de
   fonctionnalité ouverte, issue GitHub #2050) — HTML sémantique pur,
   aucune primitive d'interaction à hériter. Deux modes de composition,
   miroir du Select gelé : un tableau `items` piloté par la donnée (rend
   automatiquement List/Item/Link/Page/Separator, réutilisant LES MÊMES
   parts exportées que la composition manuelle) ou une composition
   manuelle complète via les sous-parts exportées
   (`Breadcrumb.List`/`.Item`/`.Link`/`.Page`/`.Separator`/`.Ellipsis`).
   Le collapse (`maxItems`) préserve le premier élément + une série finale
   (convention documentée d'IBM Carbon) et révèle le reste via un vrai
   bouton `Ellipsis` focusable qui déplie le chemin sur place (simple état
   de liste, aucune couche flottante, aucune nouvelle matière). Une couche
   `responsive` séparée, CSS pure (activée par défaut), réduit les
   éléments du milieu sous le breakpoint `md` sans aucune mesure JS
   (précédent « collapse-on-mobile » de GOV.UK), volontairement conçue
   pour s'effacer sur le chemin déjà collapsé par `maxItems`, afin que le
   bouton Ellipsis interactif ne soit jamais caché par la même règle qui
   cache les éléments simples. RTL : la ligne flex s'inverse nativement ;
   le séparateur chevron optionnel se retourne via `rtl:rotate-180`.
   La troncature plafonne les longs libellés avec une infobulle native
   `title`. grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/
   transition/animation en dehors de la prose des commentaires. Deux bugs
   réels trouvés et corrigés pendant le build : (1) l'état Loading
   imbriquait `Breadcrumb.Separator` (son propre `<li>`) À L'INTÉRIEUR de
   `Breadcrumb.Item` (aussi un `<li>`) — imbrication `<li><li>` invalide,
   causant un vrai décalage d'hydratation (corrigé en les poussant comme
   frères, comme le chemin de rendu principal le fait déjà) ; (2) la règle
   CSS `responsive` masquant les éléments du milieu masquait AUSSI le
   bouton Ellipsis du collapse JS (structurellement un élément « du
   milieu » lui aussi), rendant les éléments cachés inaccessibles sur
   mobile dès que `maxItems` était également actif — corrigé en limitant
   la règle CSS au chemin non-collapsé, vérifié par une assertion mobile
   dédiée. ZÉRO fichier modifié hors des nouveaux fichiers du composant.
   Preuve : `/dev/breadcrumb` — minimal · longue hiérarchie · collapsed ·
   icônes · éléments désactivés · loading · responsive mobile · très longs
   libellés · RTL · séparateurs custom/slash/chevron/dot · icône home ;
   desktop/tablet/mobile + captures RTL ; assertions programmatiques pour
   le landmark nav/ARIA/dernier-élément-jamais-un-lien/exclusion du
   séparateur de l'arbre d'accessibilité/ordre clavier Tab/collapse-expand/
   disabled/loading/breakpoint responsive/accessibilité de l'Ellipsis sur
   mobile.
   **Passe de craft (2026-07-06, retour visuel du owner — 90-95 %,
   géométrie/contraste seulement, aucun changement architectural) :** les
   séparateurs se lisaient comme des blocs séparés plutôt qu'une seule
   phrase — un `gap-x-1` explicite fixe désormais un rythme serré et
   déterministe (était implicite/ambigu) ; l'ellipsis passe d'une icône
   `MoreHorizontal` au vrai caractère Unicode `…` (largeur de contenu,
   jamais un carré fixe, jamais trois points) ; le contraste du séparateur/
   ellipsis monte d'un cran (`text-text-tertiary` → `text-text-secondary`)
   avec `leading-none` pour que la boîte de ligne du glyphe n'ajoute pas de
   faux espace vertical ; chaque espace icône-libellé resserré (`gap-1.5` →
   `gap-1`, rapprochant l'icône Home de son texte) ; le texte du chemin
   passe à `body` (16px, était `body-sm` 14px fixe) sous le breakpoint
   `md` pour la lisibilité mobile, puis redescend à `body-sm` à partir de
   `md` — deux tokens d'échelle typographique nommés, jamais un littéral
   inventé. Ajout comportemental : `maxItems` a désormais pour défaut 4
   (le défaut documenté d'Adobe Spectrum, déjà cité dans la recherche
   d'origine) afin qu'une longue hiérarchie se collapse automatiquement au
   lieu de croître en un paragraphe multi-lignes non borné par accident ;
   `collapse={false}` reste l'échappatoire documentée pour le cas rare où
   chaque niveau doit rester visible (wrap toujours possible). **GELÉ
   (2026-07-06)** — plus de redesign, changements seulement pour un bug
   objectif désormais.
   **Pagination : GELÉ (validé visuellement 2026-07-06).** Plus de
   redesign sauf bug objectif — navigation à accès aléatoire dans une
   collection PLATE et ordonnée découpée en pages de taille fixe : sauter
   directement à la page 47 sur 900 sans parcourir les 46 précédentes. Pas
   une List (le contenu paginé lui-même, jamais le contrôle qui déplace
   entre pages), pas un DataTable (le contenu que Pagination COMPOSE en
   pied de page, pas un substitut), pas un Infinite Scroll (un flux continu
   sans concept de « page N sur M » ni accès direct — impossible de sauter
   à l'élément 4700 sans tout charger avant), pas une Virtual List (une
   OPTIMISATION de rendu invisible pour l'utilisateur, toujours un seul
   scroll continu), pas un Stepper (une PROGRESSION linéaire à travers des
   étapes sémantiquement DIFFÉRENTES d'une tâche, souvent bloquante tant
   que l'étape n'est pas validée — Carbon : « ne pas l'utiliser pour des
   parcours linéaires, par exemple une progression de formulaire » ; les
   pages de Pagination sont des subdivisions STRUCTURELLEMENT IDENTIQUES,
   librement accessibles dans n'importe quel ordre), pas Tabs (un petit
   ensemble toujours visible de panneaux sémantiquement DISTINCTS), pas un
   Segmented Control (gelé, plafonné à « 2-6 options toujours visibles » —
   Pagination doit gérer un nombre de pages ARBITRAIREMENT GRAND, exactement
   le problème d'échelle que Segmented Control refuse par construction),
   pas une Navigation Menu (les destinations PRINCIPALES de l'app, pas des
   pages numérotées d'une même collection), pas une simple suite de Buttons
   (aucun landmark `nav` partagé, aucun `aria-current`, aucune relation
   ordinale, et surtout aucun algorithme de collapse RÉUTILISABLE — chaque
   consommateur réinventerait le calcul siblings/boundary/ellipsis à partir
   de zéro).
   Un primitif PLAT, uniquement tokens — le frère de Breadcrumb gelé, PAS
   un membre Control Surface. Un choix architectural délibéré : les
   contrôles de page SONT des boutons avec une valeur contrôlée
   (`page` + `onPageChange`), ce qui ressemble superficiellement au
   value+onChange de Slider/SegmentedControl — mais l'API contrôlée n'est
   qu'une convention ergonomique (comme le Pagination de MUI, lui aussi
   contrôlé uniquement — aucun `defaultPage` non contrôlé, délibérément
   absent ici aussi, car l'état de pagination appartient presque toujours
   à l'extérieur du composant, lié au routage/fetch de données). Le vrai
   signal est le précédent de classification : MUI range lui-même
   Pagination sous « Navigation » (à côté de Breadcrumbs, Drawer, Link,
   Menu, Tabs), jamais sous « Inputs » (Slider, Switch) ; le balisage
   recommandé par WAI-ARIA est `nav` + liste + `aria-current` —
   structurellement identique au Breadcrumb gelé, pas à un membre Control
   Surface ; et envelopper potentiellement des milliers de numéros de page
   dans des pastilles de verre individuelles (comme le fait Segmented
   Control pour ses 2-6 options plafonnées) serait un non-sens visuel et
   de performance à l'échelle de Pagination. Compose uniquement l'Icon gelé
   (chevrons) et le Spinner gelé (`loading` seulement) — jamais
   GlassSurface, jamais LinkButton. Radix ne fournit aucune primitive
   Pagination (confirmé via leurs propres demandes de fonctionnalité
   ouvertes et non résolues — issues #1856, #886, discussion #831, l'une
   affirmant que la pagination est « tough and quite opinionated »).
   Contrairement au Breadcrumb gelé (mode `items` piloté par la donnée ET
   composition manuelle complète), Pagination est délibérément un
   composant UNIQUE, autonome, non composé — aucun sous-composant exporté
   `.Item`/`.Ellipsis`, conformément à la consigne explicite « une API très
   simple » (l'API composée de shadcn/ui — Root/Content/Ellipsis/Item/Link/
   Next/Previous — n'a délibérément pas été le modèle ici).
   Algorithme de collapse identique à la sémantique publiée de MUI
   `siblingCount`/`boundaryCount` (défaut 1 chacun) : toujours montrer
   `boundaryCount` pages à chaque extrémité, toujours montrer
   `siblingCount` pages de chaque côté de la page actuelle, condenser tout
   le reste en un seul ellipsis — jamais pour un écart d'exactement une
   page (IBM Carbon : « ne jamais placer le bouton ellipsis au début ou à
   la fin d'une série » ; une seule page cachée est montrée directement
   plutôt que de gaspiller un ellipsis dessus). Contrairement à l'ellipsis
   de Carbon (un bouton interactif ouvrant un menu), l'ellipsis de
   DISCIPLINE est purement décoratif : Prev/Next garantissent déjà que
   chaque page reste atteignable (contrairement au Breadcrumb gelé, où un
   ancêtre caché n'a AUCUN autre chemin pour y accéder — exactement
   pourquoi l'Ellipsis de Breadcrumb EST un bouton) — un menu interactif
   ici composerait la machinerie Floating Surface pour une commodité, pas
   une nécessité démontrée, contredisant « une API très simple ». Deux
   interrupteurs indépendants et superposés, miroir du `responsive` de
   Breadcrumb : `compact` (override explicite — force la lecture
   « ‹ 7 / 24 › », par ex. pour un widget de barre latérale étroit sur un
   viewport large) et `responsive` (activé par défaut ; quand `compact`
   n'est pas défini, rend LES DEUX balisages et laisse une règle CSS au
   breakpoint `md` choisir — zéro mesure JS, même technique que le
   collapse mobile de Breadcrumb). RTL : flexbox s'inverse nativement ; les
   chevrons se retournent via `rtl:rotate-180` pour que Prev/Next pointent
   toujours dans la direction de lecture sémantiquement correcte — vérifié
   visuellement : les numéros de page montent de 1 à 24 dans l'ordre de
   lecture naturel droite-à-gauche, et les icônes retournées atterrissent
   du bon côté sémantique. Aucun modèle de roving-tabindex/flèches
   nécessaire (une simple liste de boutons indépendants, pas un widget ARIA
   composite, contrairement à RadioGroup/Slider/Tablist) — l'ordre Tab
   natif est le modèle clavier complet, zéro appel `.focus()` littéral nulle
   part. ZÉRO fichier modifié hors des nouveaux fichiers du composant. API :
   `page` · `totalPages` · `onPageChange` · `disabled` · `loading` · `size`
   · `siblingCount` · `boundaryCount` · `showFirst` · `showLast` ·
   `showPrev` · `showNext` · `compact` · `responsive` (les deux derniers
   sont additifs au-delà de la liste littérale de la consigne, justifiés
   par ses propres exigences explicites de démo « Compact » et
   « Responsive »). Délibérément NON ajouté : un `defaultPage` non
   contrôlé (comme le précédent contrôlé-seulement de MUI). Preuve :
   `/dev/pagination`. **GELÉ (2026-07-06)** — plus de redesign, changements
   seulement pour un bug objectif désormais.
   **Tabs : GELÉ (validé visuellement 2026-07-06, après une passe de
   revue Frozen).** Une extraction morte trouvée et supprimée :
   `orientation` était déstructuré puis repassé sans changement — le
   style lit le `data-orientation` d'exécution de Radix via CSS, pas
   cette variable JS ; passe désormais par `{...props}` comme toute autre
   prop native, zéro changement comportemental (re-vérifié : proof
   entièrement vert, build inchangé à 10 kB). Plus de redesign ni de
   changement d'API sans ADR — bascule entre un petit ensemble nommé et
   toujours visible de vues de contenu alternatives pour LE MÊME
   enregistrement, sans quitter la page : « quelle facette de CECI je
   regarde » — jamais « où suis-je dans la hiérarchie » (Breadcrumb),
   jamais « quelle page de CETTE liste » (Pagination). Pas un Accordion
   (empile des sections VERTICALEMENT dans une page qui coule, plusieurs
   ouvertes à la fois, hauteur croissante — Tabs montre EXACTEMENT un
   panneau, remplaçant totalement le précédent, hauteur constante), pas
   une Navigation Menu (destinations PRINCIPALES de l'app, souvent un
   vrai changement de page/routage — Tabs bascule un contenu LOCAL sur la
   même vue), pas un Segmented Control (gelé : change une valeur
   EXTERNE que le consommateur interprète, ne possède aucun panneau — pas
   de `role="tabpanel"`, pas de `aria-controls`/`aria-labelledby`
   intégré ; Tabs POSSÈDE structurellement le panneau via `TabsContent`,
   exactement la distinction déjà actée dans la doc de FullscreenOverlay :
   « Tabs... owns a content panel »), pas une Sidebar (région de LAYOUT
   persistante, souvent multi-niveaux — Tabs est une bande compacte,
   locale à un bloc de contenu), pas un Breadcrumb (rapporte une position
   STRUCTURELLE parmi des ancêtres, jamais des panneaux), pas un Stepper
   (une progression SÉQUENTIELLE, généralement validée — chaque onglet
   est librement atteignable à tout moment, dans n'importe quel ordre),
   pas Pagination (pages STRUCTURELLEMENT IDENTIQUES d'une séquence
   souvent énorme, collapsible — Tabs est un petit ensemble fixe,
   toujours entièrement visible, de vues SÉMANTIQUEMENT DIFFÉRENTES,
   jamais collapsé), pas un Select (une valeur d'une liste fermée mais
   souvent LONGUE, cachée derrière un menu — Tabs garde chaque option
   visible en permanence, ce qui ne passe à l'échelle que pour une
   poignée), pas un Dropdown Menu (commandes transitoires, jamais un
   ensemble lié à un panneau en permanence visible), pas une Command
   Palette (surface de recherche-et-action globale, orthogonale), pas un
   Carousel (une SÉQUENCE de slides/médias PARCOURUS dans l'ordre, souvent
   auto-défilants/swipés/bouclés, sans identité nommée persistante par
   slide — Tabs est choisi EXPLICITEMENT par son nom, jamais défilé).
   Un primitif PLAT, sans rôle matériel (zéro GlassSurface, zéro budget
   de mouvement) — mais architecturalement une famille DIFFÉRENTE du
   Breadcrumb/Pagination gelés (listes simples de contrôles indépendants,
   ordre Tab natif, aucun roving tabindex). Tabs est un WIDGET ARIA
   COMPOSITE : le pattern WAI-ARIA Tabs impose un roving tabindex entre
   les triggers avec navigation Flèches/Home/End — LE MÊME modèle clavier
   que RadioGroup/Segmented Control gelés. Malgré ce modèle clavier
   partagé, Tabs NE dérive PAS de Control Surface / ne réutilise PAS le
   verre de Segmented Control : son identité visuelle universelle, la
   plus précédentée (Material Design 3 et son propre « tab indicator »,
   MUI, GitHub, Linear), est un libellé texte plus une fine barre
   indicatrice, jamais une pastille de verre ; habiller chaque trigger de
   verre Micro-tuned comme le fait Segmented Control trahirait un pattern
   dont tout le langage visuel est délibérément discret. L'indicateur est
   un changement de couleur de bordure instantané sur le trigger actif
   (`data-state=active`) — jamais une barre glissante animée, puisque ce
   fichier ne porte aucun transition/animation.
   Compose `@radix-ui/react-tabs` DIRECTEMENT — le premier composant de
   cette session pour lequel Radix fournit réellement une primitive
   (Sheet/Spotlight/Breadcrumb/Pagination n'en avaient aucune) — héritant
   tout son contrat comportemental verbatim : état contrôlé/non contrôlé,
   `role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`,
   `aria-controls`, `aria-labelledby`, roving tabindex sensible à
   l'orientation, direction des flèches sensible à `dir` (se retourne
   correctement en RTL), et un tabpanel focusable. Ce fichier n'ajoute
   QUE géométrie, espacement et style d'état actif piloté par tokens —
   zéro code comportemental, zéro appel `.focus()` littéral nulle part.
   Une divergence délibérée du défaut brut de Radix : `activationMode`
   vaut par défaut `"manual"` ici, pas `"automatic"` de Radix — le
   WAI-ARIA APG lui-même : « Authors should consider implementing
   automatic activation of tabs only in circumstances where panels can
   be displayed instantly... Otherwise, automatic activation slows focus
   movement ». En tant que primitif générique et réutilisable,
   DISCIPLINE ne peut pas garantir un contenu de panneau sans latence
   pour de futurs consommateurs — manual est le défaut universellement
   sûr ; automatic reste à une prop de distance. RTL : la prop `dir` de
   Radix retourne la sémantique des flèches pour correspondre au sens de
   lecture ; flexbox inverse la ligne nativement — vérifié visuellement
   (ordre DOM/logique préservé : le premier onglet, Overview, se rend le
   plus à droite dans un conteneur `dir="rtl"`).
   Dépendance additive : `@radix-ui/react-tabs@1.1.17` (épinglée
   exactement, conforme à la convention de dépendances de ce dépôt) —
   authentiquement nécessaire puisque Radix ne fournit aucun substitut
   Tabs ; le premier nouveau paquet ajouté cette session. grep zéro
   GlassSurface/blur/backdrop-filter/rgba/shadow/transition/animation en
   dehors de la prose des commentaires. ZÉRO fichier gelé modifié.
   Preuve : `/dev/tabs` — basic · controlled · uncontrolled · horizontal
   · vertical · activation automatique/manuelle · trigger disabled ·
   force mount · longs libellés · responsive · RTL · clavier ;
   desktop/tablet/mobile + captures RTL ; assertions programmatiques pour
   structure tablist/tab/tabpanel, changement d'onglet, liaison
   aria-selected/aria-controls/aria-labelledby, activation automatique vs
   manuelle (Enter requis en manuel), Home/End, boucle des flèches,
   Flèches Haut/Bas en vertical, trigger disabled sauté au clavier, panel
   forceMount présent-mais-caché dans le DOM, et direction des flèches en
   RTL. **GELÉ (2026-07-06)** — API publique verrouillée
   (`Tabs`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content` + leurs props Radix
   natives) ; plus de redesign ni de changement d'API sans ADR.

   **Stepper : GELÉ (validé visuellement 2026-07-07, après une passe de
   Frozen-review).** Plus de changement fonctionnel, visuel ou
   architectural sauf bug objectif ; changement d'API impossible sans ADR.
   Constat de la Frozen-review (un vrai bug de layout, pas cosmétique) :
   la ligne de connecteurs horizontale imbriquait le label COMPLET (pas
   seulement l'indicateur) comme frère flex des deux connecteurs
   `flex-1` — avec un label long et multi-lignes, sa largeur de contenu
   dominait la ligne et écrasait les deux connecteurs à ~3px quelle que
   soit la largeur réelle de la colonne d'étape (mesuré via
   `getBoundingClientRect` : 0–4px avant le correctif, 85px après, dans
   la démo « Long labels » à 1280px). Corrigé en restructurant la ligne
   pour n'entourer QUE l'indicateur, le label étant rendu séparément sur
   une ligne pleine largeur juste en dessous, à l'intérieur du même
   bouton/span. Revérifié visuellement (capture + mesure) et via une
   preuve complète repassée au vert, build inchangé à 5,49 kB. La
   conception de l'état `loading` a aussi été relue et sa justification
   consignée dans le commentaire du composant : avancer depuis l'étape
   actuelle est presque toujours conditionné à un appel asynchrone que le
   Stepper ne possède jamais (c'est le Wizard consommateur qui l'a), donc
   `loading` gèle TOUTES les étapes — pas seulement l'actuelle, car sauter
   vers une étape déjà complétée en pleine soumission serait aussi faux
   que sauter en avant — tout en plaçant le retour visuel de transition
   en cours sur le cercle de l'étape actuelle elle-même via le Spinner
   gelé, reprenant le `loading` de Pagination gelé (désactive tous les
   contrôles pendant une transition de page) adapté à la forme du
   Stepper. Progression à travers une séquence
   ordonnée d'étapes sémantiquement DIFFÉRENTES d'UNE seule tâche en cours
   (Account → Profile → Payment → Review) — jamais quelle facette du même
   enregistrement (Tabs), jamais une hiérarchie de navigation (Breadcrumb),
   jamais une page d'une collection de données (Pagination). Pas Tabs (vues
   interchangeables, librement accessibles dans n'importe quel ordre,
   aucune séquence requise, aucun état complété/en attente — le Stepper
   existe précisément pour l'ORDRE + la PROGRESSION), pas un Breadcrumb
   (une hiérarchie d'ancêtres, jamais un état de complétion), pas
   Pagination (des pages structurellement identiques, aucune sémantique
   « terminé », aucun nombre fixe restreint), pas Progress/Progress Ring
   (une quantité continue unique 0–100 %, aucune étape nommée discrète),
   pas une Timeline (un historique chronologique en LECTURE SEULE,
   souvent non borné, d'événements PASSÉS — le Stepper est un petit
   ensemble fixe, tourné vers l'avenir, d'étapes d'une tâche en cours
   MAINTENANT), pas un Navigation Menu (destinations primaires
   indépendantes, aucun ordre ni complétion), pas des Tabs verticaux
   (l'orientation ne change jamais ce qu'EST un composant — ce qui
   distingue le Stepper, c'est l'ordre et la machine à états
   complété/actuel/en attente, pas son axe), pas un Wizard (une
   composition de niveau supérieur qui POSSÈDE le contenu des
   étapes/la validation/le flux de navigation — le Stepper n'est que
   l'indicateur qu'un Wizard composerait au-dessus de ce contenu), pas un
   `<ol>` brut (aucune sémantique de progression, aucun
   `aria-current="step"`, aucun état complété/en attente, aucun
   connecteur — un ingrédient que le Stepper utilise en interne). Un
   primitif PLAT sans Rôle Matériel — frère du Breadcrumb/Pagination
   gelés, pas de Tabs : MUI lui-même classe Stepper sous « Navigation »
   (le même signal de précédent déjà utilisé pour Breadcrumb/Pagination/
   Tabs) ; contrairement à Tabs (widget ARIA composite, `aria-selected`),
   Stepper suit structurellement la sous-famille liste-plate de
   Breadcrumb/Pagination — les étapes cliquables sont des boutons
   indépendants à ordre Tab natif, et exactement un élément porte
   `aria-current="step"`, la valeur que la spec ARIA définit précisément
   pour « l'étape actuelle dans un processus », explicitement distincte
   de `aria-selected`. Aucun pattern WAI-ARIA APG n'existe pour
   « Stepper » (contrairement à Tabs/Breadcrumb) — cette structure est
   propre à DISCIPLINE, fondée directement sur la sémantique définie de
   `aria-current`. États exprimés uniquement par la typographie, les
   bordures, l'Icon gelée (une coche qui gagne toujours sur une étape
   complétée, prioritaire sur toute icône personnalisée par étape) et le
   Spinner gelé (`loading` uniquement) — jamais de GlassSurface, jamais de
   connecteur glissant/animé (zéro transition/animation). Un composant
   unique, autonome, non composé (aucune sous-partie exportée), comme
   Pagination (« une API très simple »). Suivant la recommandation
   explicite de Material Design pour le mobile (« préférer les steppers
   verticaux... les steppers horizontaux introduisent typiquement un
   défilement horizontal »), la couche `responsive` (activée par défaut,
   CSS pur, aucune mesure JS) bascule automatiquement l'horizontal vers le
   vertical sous le breakpoint `md` en rendant les deux structures avec
   des espaces de noms d'id distincts (pour qu'`aria-describedby` ne
   collide jamais) et en laissant CSS choisir ; `orientation="vertical"`
   explicite saute cette couche. Deux props additives au-delà de la
   liste littérale du brief, toutes deux indispensables : `onStepClick`
   (un Stepper `clickable` sans moyen d'observer un clic ne serait pas
   navigable) et `responsive` (exigence d'adaptation mobile du brief
   lui-même). Les segments de connecteur sont calculés à partir de la
   frontière PARTAGÉE entre deux étapes (jamais du statut propre de
   chaque étape) pour que les deux moitiés d'une même ligne soient
   toujours cohérentes — corrigé en auto-relecture après qu'une première
   ébauche laissait chaque côté calculer sa propre couleur, risquant un
   désaccord visuel à une frontière complétée→actuelle. `forwardRef`
   ajouté (manquant initialement) ; `isInteractive` ne dépend plus que de
   `clickable`, jamais de `disabled`, conformément à la convention
   Pagination/Tabs gelée où `disabled` ne change jamais le TYPE
   d'élément. grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/
   transition/animation en dehors de la prose des commentaires ; zéro
   appel `.focus()` littéral. API : `currentStep` · `steps` (`id` ·
   `label` · `description?` · `icon?` · `disabled?`) · `onStepClick` ·
   `orientation` · `clickable` · `completed` · `loading` · `disabled` ·
   `responsive` · `className`. ZÉRO fichier gelé modifié. Preuve :
   `/dev/stepper` — basic · étape actuelle · étapes complétées · cliquable
   · étape désactivée · vertical · horizontal · longs libellés ·
   descriptions · icônes · loading · responsive · RTL ; captures desktop/
   tablet/mobile + RTL ; assertions programmatiques pour la structure
   nav/liste ordonnée, exactement un `aria-current="step"`, le compte de
   coches complétées, le saut au clic, l'étape désactivée (`disabled`
   natif + `aria-disabled`, toujours un vrai bouton), le Spinner de
   chargement, le `flex-direction` horizontal/vertical, l'activation
   clavier Tab+Enter native, le changement de breakpoint responsive, et
   le wrapper RTL. **GELÉ (2026-07-07)** — API publique verrouillée
   (`currentStep`/`steps`/`onStepClick`/`orientation`/`clickable`/
   `completed`/`loading`/`disabled`/`responsive`/`className`) ; plus de
   redesign ni de changement d'API sans ADR.

   **Progress : Built, non gelé.** Reconstruit à partir d'une implémentation
   pré-méthodologie (jamais documentée individuellement, noyée dans la ligne
   fourre-tout des primitifs plats) vers le processus complet d'analyse/
   construction/preuve. La fraction CONNUE de complétion (0 → max) d'UNE
   opération continue et unidimensionnelle en cours — jamais des étapes
   nommées (Stepper), jamais un placeholder de contenu inconnu (Skeleton),
   jamais une attente purement indéterminée sans aucune fraction (Spinner),
   jamais une présentation circulaire (Progress Ring — la même sémantique en
   SVG, un choix de géométrie, pas ce composant : MUI/Chakra/Radix livrent
   Linear et Circular comme deux composants SÉPARÉS, jamais un `variant`,
   car leur géométrie — largeur vs stroke-dasharray — est du code
   fondamentalement différent ; Progress Ring sera un futur frère séparé,
   jamais un mode ici), pas une Timeline (un historique en lecture seule
   d'événements PASSÉS qui ne progresse pas lui-même), pas un Badge (une
   étiquette statique, aucune piste, aucune valeur qui évolue), pas un
   Counter/Gauge/Meter/Chart/Status (un chiffre brut sans piste ; une
   lecture analogique/à seuils permanente sans début-fin ; un état actuel
   borné affiché indéfiniment ; une visualisation multi-points/multi-
   dimensionnelle ; une pastille d'état discret instantané — aucun ne
   représente une fraction continue, terminale et mesurée). Compose
   `@radix-ui/react-progress` DIRECTEMENT (déjà une dépendance exact-pinned) :
   `role="progressbar"`, `aria-valuemin`/`aria-valuemax`, `aria-valuenow`
   défini pour une valeur numérique et OMIS entièrement pour `indeterminate`
   (convention propre à Radix, vérifiée : `aria-valuenow` est absent du DOM
   en mode indéterminé), `getValueLabel` défini par défaut ici pour calculer
   `aria-valuetext` en cohérence avec la légende visible. Les changements de
   valeur déterminée sont un changement de `width` INSTANTANÉ — zéro
   transition/animation ; `indeterminate` reprend tel quel le
   `animate-pulse motion-reduce:animate-none` du Skeleton gelé (l'unique
   exception non décorative et fonctionnellement nécessaire — signaler
   « activité en cours, durée inconnue », le même raisonnement qui couvre
   déjà le `animate-spin` du Spinner gelé), gelé (aucune animation) quand
   `disabled` (vérifié : `animation-name: none`). La piste est une ligne
   `flex` dont l'indicateur, dimensionné par `width`, est un simple élément
   flex — jamais un div positionné/transformé — pour qu'il s'ancre au bord
   INLINE-START, que flexbox inverse nativement sous `dir="rtl"` (vérifié :
   le bord droit du remplissage touche le bord droit de la piste en RTL, en
   s'étendant vers la gauche). `disabled` n'a aucune surface interactive à
   désactiver (Progress est en lecture seule, rien n'est focalisable) — il
   ne fait qu'assombrir la piste/légende, geler le pulse indéterminé, et
   poser `aria-disabled`. La légende optionnelle (`label` personnalisé, ou
   le `{percent}%` automatique via `showLabel`) n'ajoute un `<div>`
   enveloppant QUE lorsqu'une légende est réellement rendue — sans légende
   (l'usage exact déjà existant du Toast gelé et du FileInput gelé : `value`/
   `aria-label`/`className` seulement), le DOM reste identique en profondeur
   à l'ancien, donc `className` continue d'atterrir sur la piste elle-même
   (le `h-1` du Toast, le `flex-1` du FileInput, tous deux vérifiés
   inchangés). Un seul fichier non gelé modifié en conséquence directe de
   l'abandon du mode `variant="circular"` : la page de galerie générique
   (`src/app/(dev)/dev/components/showcase.tsx`, pas un composant tracké/
   gelé) a perdu sa ligne de démo circulaire. grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition en dehors de la prose des
   commentaires ; l'unique occurrence `animate-pulse` est l'exception
   documentée et déjà précédentée ; zéro appel `.focus()` littéral. API :
   `value` · `max` · `indeterminate` · `size` (sm/md/lg) · `showLabel` ·
   `label` · `color` (accent/success/warning/error/info) · `disabled` ·
   `className`. ZÉRO fichier gelé modifié. Preuve : `/dev/progress` — basic
   · determinate · indeterminate · custom max · small/medium/large · label
   · percentage · disabled · loading screen · responsive · RTL ; captures
   desktop/tablet/mobile + RTL ; assertions programmatiques pour role/
   aria-valuemin/aria-valuemax/aria-valuenow/aria-valuetext, l'absence
   d'aria-valuenow en indéterminé, le max personnalisé, les hauteurs de
   taille strictement croissantes, la légende personnalisée vs le
   pourcentage automatique, le `aria-disabled` + pulse gelé en disabled, la
   largeur responsive suivant le conteneur, et l'ancrage RTL du
   remplissage. **Built, non gelé** — aucun freeze automatique ; en attente
   d'une validation visuelle explicite avant toute phase de Freeze.

   **CircularProgress : Built, non gelé.** La même fraction connue de
   complétion que Progress, sous forme d'anneau — réservé aux espaces
   compacts/circulaires (un avatar en cours d'upload, une tuile de sync, un
   KPI de dashboard) où une barre linéaire n'a pas de place naturelle. Un
   choix de GÉOMÉTRIE, pas un problème UX différent : le calcul stroke-
   dasharray/circonférence est du code fondamentalement différent d'un
   `width`, exactement pourquoi MUI/Chakra/Radix livrent Linear et Circular
   comme deux composants SÉPARÉS, jamais un `variant` — le même raisonnement
   déjà consigné lors de l'abandon de l'ancien mode circulaire de Progress.
   Pas Progress (a besoin d'une largeur horizontale), pas un Spinner
   (purement indéterminé, aucune fraction réelle), pas un Skeleton (un
   placeholder de mise en page), pas un Gauge (une lecture analogique
   permanente sans début-fin), pas un Meter (un état actuel borné affiché
   indéfiniment), pas un Chart (visualisation multi-points/multi-
   dimensionnelle), pas un Badge (une étiquette statique), pas un Stepper
   (des étapes nommées discrètes vs une quantité continue unique), pas une
   Timeline (un historique en lecture seule d'événements passés), pas un
   Counter (un chiffre brut, aucune piste), pas un Toast (une surface de
   notification entière qui PEUT composer ceci en interne, jamais un
   indicateur concurrent), pas un anneau de progression Avatar (un cas
   d'usage « anneau autour d'un avatar » compose ce composant AUTOUR d'un
   Avatar existant — jamais une fonctionnalité qu'Avatar possède lui-même),
   pas un Donut Chart (plusieurs valeurs de catégories comparées avec une
   légende — un sujet de dataviz). Compose `@radix-ui/react-progress`
   DIRECTEMENT pour le même contrat ARIA que Progress : `role="progressbar"`,
   `aria-valuemin`/`aria-valuemax`, `aria-valuenow` défini pour une valeur
   numérique et OMIS entièrement pour `indeterminate` (vérifié : absent du
   DOM), `getValueLabel` défini par défaut sur le pourcentage visible. Deux
   `<circle>` SVG (piste + indicateur) sont le seul nouveau code visuel —
   aucune dépendance Icon/Spinner. Les changements de valeur déterminée sont
   un changement de `strokeDashoffset` INSTANTANÉ — zéro transition/
   animation ; `indeterminate` reprend tel quel le `animate-spin` du
   Spinner gelé (pas l'arc à deux keyframes de Material, bespoke), faisant
   tourner un arc de longueur constante via une enveloppe autour du SVG (le
   `-rotate-90` statique du SVG lui-même entrerait en conflit avec une
   animation ciblant la même propriété `transform` sur le même élément),
   gelé quand `disabled` (vérifié : `animation-name: none`). `label` est un
   booléen simple (contrairement au couple `label`/`showLabel` de Progress)
   — un `{percent}%` centré dans l'anneau, supprimé automatiquement en
   indéterminé. `disabled` n'a aucune surface interactive à désactiver — il
   ne fait qu'assombrir l'anneau/le label, geler la rotation, et poser
   `aria-disabled`. Zéro prop additive au-delà de la liste littérale du
   brief. grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/transition
   en dehors de la prose des commentaires ; l'unique occurrence
   `animate-spin` est l'exception documentée et déjà précédentée ; zéro
   appel `.focus()` littéral ; zéro TODO/FIXME/`console.*`/import inutilisé.
   API : `value` · `max` · `indeterminate` · `size` (sm/md/lg) · `color`
   (accent/success/warning/error/info/neutral) · `label` · `disabled` ·
   `className`. ZÉRO fichier gelé modifié. Preuve : `/dev/circular-progress`
   — basic · determinate · indeterminate · sizes · colors · percentage ·
   custom max · 0%/100% · disabled · loading · responsive · RTL · long
   values ; captures desktop/tablet/mobile + RTL ; assertions
   programmatiques pour role/aria-valuemin/aria-valuemax/aria-valuenow/
   aria-valuetext, l'absence d'aria-valuenow en indéterminé, le max
   personnalisé, les bords 0%/100%, les diamètres de taille strictement
   croissants, 6 couleurs de trait distinctes, le `aria-disabled` + spin
   gelé en disabled, la taille intrinsèque indépendante du viewport, et le
   calcul de pourcentage sur de grands nombres. **Built, non gelé** — aucun
   freeze automatique ; en attente d'une validation visuelle explicite
   avant toute phase de Freeze.

   **Spinner : Built, non gelé.** Reconstruit à partir d'une implémentation
   pré-méthodologie vers le processus complet d'analyse/construction/preuve.
   L'indicateur d'activité PUREMENT indéterminé — « quelque chose se passe,
   de durée inconnue » — jamais « combien reste-t-il ». Sa seule promesse
   est qu'un travail est en cours ; il n'a jamais, et n'aura jamais, de
   valeur. Pas Progress/CircularProgress (une fraction CONNUE, `max`,
   `role="progressbar"`, `aria-valuenow` présent dès qu'une fraction est
   déterminée — même leur propre `indeterminate` garde ce contrat en forme
   de progressbar, seulement sans `aria-valuenow` ; Spinner n'a jamais eu ce
   contrat), pas un Skeleton (un placeholder de mise en page, jamais une
   icône d'activité), pas un Loading Overlay (un motif qui affiche un
   Spinner en son centre, jamais le Spinner lui-même), pas FullscreenOverlay/
   Toast/Drawer/CommandPalette (chacun compose déjà Spinner en interne — un
   ingrédient, jamais un concurrent), pas Alert/Badge/Timeline/Gauge/Meter
   (un message permanent, une étiquette statique, un historique du passé,
   une lecture permanente d'une valeur réelle), pas Stepper (compose Spinner
   sur son étape actuelle, mais Spinner n'a aucune notion de « quelle
   étape »), pas le mode indéterminé de CircularProgress (visuellement
   proche mais sémantiquement disjoint — reste un candidat `progressbar` à
   devenir déterminé ; Spinner ne l'est jamais), pas l'état loading de
   Button (Button compose Spinner, ne réinvente jamais sa propre icône —
   exactement comme aujourd'hui). Déjà l'affordance de chargement interne de
   18 consommateurs avant cette reconstruction, plusieurs gelés (Button,
   Pagination, Drawer, Toast, DropdownMenu, ContextMenu, Select,
   FullscreenOverlay, Stepper, CommandPalette, et d'autres) — la contrainte
   dominante de cette reconstruction était ZÉRO régression visuelle sur
   chacun d'eux. Ne compose rien — c'est la feuille que chaque autre
   primitif Feedback de cette bibliothèque cite comme précédent pour sa
   propre exception de mouvement non décorative (`indeterminate` de
   Progress, `indeterminate` de CircularProgress, le shimmer de Skeleton
   pointent tous vers le `animate-spin` de Spinner, jamais l'inverse).
   `role="status"` + `aria-live="polite"`, JAMAIS `role="progressbar"`,
   JAMAIS un attribut `aria-value*`. La couleur de l'anneau utilise par
   défaut `border-current` (hérite de la couleur de texte ambiante) plutôt
   qu'une couleur de marque fixe — porteur pour les 18 consommateurs
   existants ; la nouvelle prop `color` est donc OPTIONNELLE sans valeur
   par défaut — omise (comme le fait chaque consommateur existant), elle
   rend un résultat identique à l'octet près (vérifié : omettre `color`
   produit une couleur de bordure qui correspond à la couleur de texte
   ambiante) ; seule une `color` explicite outrepasse `currentColor`.
   `sm`/`md`/`lg` sont inchangés à l'octet près (les mêmes chaînes de
   classes Tailwind exactement) ; `xs`/`xl` sont purement additifs, aux deux
   extrémités de l'échelle de tailles propre à ce projet (12px/16px/24px/
   32px/48px — les tokens de ce projet, pas l'échelle d'espacement par
   défaut de Tailwind, vérifié via le style calculé). `disabled` est
   purement visuel (assombrit l'anneau, gèle la rotation — vérifié :
   `animation-name: none`) — `role="status"` est un rôle de région live et
   ne supporte pas `aria-disabled` (confirmé via `role-supports-aria-props`
   d'eslint-plugin-jsx-a11y), contrairement au `role="progressbar"` de
   Progress/CircularProgress qui le supporte. `motion-reduce:animate-none`
   ajouté (Skeleton/Progress/CircularProgress l'ont déjà tous ; son absence
   ici précédait cette convention). `forwardRef` ajouté (auparavant un
   simple composant fonction). Zéro régression visuelle vérifiée : le build
   de production complet réussit sur les 51 routes, et la capture `loading`
   de Stepper (Spinner `sm`, couleur accent héritée via `border-current`)
   rend un résultat identique au pixel près à sa capture gelée antérieure.
   grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/transition ;
   l'unique occurrence `animate-spin` est l'unique exception documentée et
   autorisée ; zéro appel `.focus()` littéral ; zéro TODO/FIXME/
   `console.*`/import inutilisé. API : `size` (xs/sm/md/lg/xl) · `color`
   (accent/neutral/success/warning/error/info, optionnelle, sans défaut) ·
   `label` · `disabled` · `className`. ZÉRO fichier gelé modifié (Spinner
   lui-même n'est pas gelé ; les fichiers sources de ses 18 consommateurs
   sont restés intouchés). Preuve : `/dev/spinner` — basic · sizes ·
   colors · inline · centered · with/without label · disabled · responsive
   · RTL · inside Button/Card/Drawer/FullscreenOverlay ; captures desktop/
   tablet/mobile + RTL ; assertions programmatiques pour role="status"/
   aria-live="polite", l'absence de role="progressbar"/aria-valuenow, les
   tailles strictement croissantes, 6 couleurs distinctes plus le défaut
   currentColor, le label personnalisé vs par défaut, l'assombrissement +
   le gel de rotation en disabled, la taille intrinsèque indépendante du
   viewport, et le wrapper RTL. **Built, non gelé** — aucun freeze
   automatique ; en attente d'une validation visuelle explicite avant toute
   phase de Freeze.

   **Skeleton : GELÉ (validé visuellement 2026-07-07, après une passe de
   Frozen-review).** Plus de changement fonctionnel, visuel ou
   architectural sauf bug objectif ; changement d'API impossible sans ADR.
   Constat de la Frozen-review : la branche `circle` et la branche
   ligne-unique étaient deux retours `<div>` quasi identiques ne différant
   que par le width/height résolu — une vraie duplication. Fusionnées en
   un seul retour de barre unique (le multi-lignes reste sa propre
   branche) ; comportement identique à l'octet près (revérifié : preuve
   complète au vert, build inchangé à 3,05 kB). Reconstruit à partir d'une
   implémentation
   pré-méthodologie vers le processus complet d'analyse/construction/preuve.
   Un placeholder de MISE EN PAGE silencieux : réserve l'espace exact que le
   vrai contenu occupera pendant son chargement, pour que la structure de la
   page soit visible immédiatement et que rien ne bouge à l'arrivée des
   données — ne signale jamais une activité (Spinner), jamais une fraction
   connue (Progress/CircularProgress). Pas Spinner (activité pure, ne
   réserve aucun espace), pas Progress/CircularProgress (une fraction
   connue d'une tâche), pas le loading de FullscreenOverlay/Drawer (tous
   deux composent Spinner, jamais Skeleton, puisque leur contenu `children`
   est arbitraire — Skeleton doit connaître la mise en page finale à
   l'avance), pas un Loading Overlay (assombrit une zone et affiche un
   Spinner en son centre — l'OPPOSÉ de Skeleton, qui révèle la structure),
   pas un texte factice/« Lorem ipsum » (un texte lisible pouvant être pris
   pour du vrai contenu — Skeleton est délibérément abstrait, jamais un mot
   lisible), pas une Card vide/Empty State (une absence PERMANENTE et
   résolue de données — Skeleton signale une attente TRANSITOIRE), pas
   Alert/Toast (un message permanent / une notification transiente), pas un
   Shimmer Loader (un motif explicitement EXCLU — un gradient glissant est
   un mouvement décoratif, jamais fonctionnellement nécessaire), pas un
   Pulse Loader (une variante de spinner signalant une activité, à ne pas
   confondre avec le `animate-pulse` de ce fichier), pas un Blur/Image
   Placeholder (une technique spécifique aux images nécessitant une
   miniature préexistante — plus étroite que Skeleton). Ne compose RIEN —
   aucun Radix, aucun autre composant : un `div`, du CSS, et des tokens
   uniquement, le primitif le plus simple de cette bibliothèque. `circle`
   force un arrondi complet/pill quel que soit `radius` ; `lines > 1` empile
   autant de barres de ligne de texte avec la DERNIÈRE ligne à 60% de
   largeur (vérifié : largeur uniforme pour toutes sauf la dernière, ~60%
   pour la dernière) — la convention quasi universelle du texte skeleton.
   `width`/`height` acceptent un nombre (px) ou toute chaîne de longueur
   CSS ; omis, ils utilisent par défaut une forme de ligne de texte pleine
   largeur (`100%` × `var(--ds-space-4)`, 16px) ou un carré
   `var(--ds-space-7)` (40px) quand `circle` est activé sans dimension
   fournie — jamais un littéral brut (la règle ESLint `no-restricted-syntax`
   a détecté et fait corriger deux valeurs par défaut en px brut lors de la
   validation). `animated` vaut `true` par défaut (`animate-pulse
   motion-reduce:animate-none`, la SEULE animation autorisée — vérifié :
   `animation-name` vaut `pulse` quand animé, `none` sinon) ; aucun
   shimmer, aucun gradient, aucun keyframe personnalisé. Marqué
   `aria-hidden`, aucun rôle, aucun tabindex (vérifié) — représente un
   contenu absent, jamais focalisable, n'annonce jamais de progression. Un
   seul site d'appel d'un fichier gelé mis à jour en conséquence directe,
   mécanique et sans différence visuelle du nouveau remplacement de
   l'ancien enum `shape` : le `<Skeleton shape="text" className="h-4
   w-16" />` de Breadcrumb (64×16px, `rounded-sm`) est devenu `<Skeleton
   width={64} height={16} radius="sm" />` (exactement les mêmes pixels
   calculés — vérifié via une comparaison visuelle au pixel près de la
   capture `loading` de Breadcrumb, avant et après). Un fichier non gelé
   (`showcase.tsx`, la galerie générique de composants dev) mis à jour pour
   la même raison. grep zéro GlassSurface/blur/backdrop-filter/rgba/
   shadow/transition ; l'unique occurrence `animate-pulse` est l'unique
   exception autorisée ; zéro appel `.focus()` littéral ; zéro TODO/FIXME/
   `console.*`/import inutilisé. API : `width` · `height` · `radius`
   (none/sm/md/lg/full) · `circle` · `lines` · `animated` · `className`.
   ZÉRO autre fichier gelé modifié. Preuve : `/dev/skeleton` — basic ·
   rectangle · circle · text · multiple lines · avatar · card · table ·
   list · dashboard · article · image · responsive · RTL · animated ·
   static ; captures desktop/tablet/mobile + RTL ; assertions
   programmatiques pour aria-hidden/aucun rôle/aucun tabindex, largeur/
   hauteur exactes, cercle aux dimensions égales + arrondi complet, 4
   valeurs de radius distinctes, le compte multi-lignes + la règle des 60%
   sur la dernière ligne, `animation-name` animé vs statique, la largeur
   responsive suivant le conteneur à tout viewport, et le wrapper RTL.
   **GELÉ (2026-07-07)** — API publique verrouillée (`width`/`height`/
   `radius`/`circle`/`lines`/`animated`/`className`) ; plus de redesign ni
   de changement d'API sans ADR.

   **EmptyState : GELÉ (validé visuellement 2026-07-07, après une passe de
   Frozen-review).** Plus de changement fonctionnel, visuel ou
   architectural sauf bug objectif ; changement d'API impossible sans ADR.
   Constat de la Frozen-review : la description centrée portait à la fois
   `items-center` (sur le parent flex-col) et un `mx-auto` redondant sur le
   `<p>` — deux mécanismes centrant le même bloc. `mx-auto` retiré ;
   comportement identique à l'octet près (vérifié : description centrée à
   0,008px près, preuve complète au vert, build inchangé à 6,84 kB). Une
   absence SIGNIFICATIVE de contenu
   ou de résultat, qui oriente aussi l'utilisateur vers la prochaine
   action : « il n'y a délibérément rien ici (encore), et voici quoi
   faire ». JAMAIS un chargement, une erreur bloquante, une notification,
   ou une progression. Pas un Alert (un message SUR du contenu existant —
   une bande posée sur une vue peuplée ; EmptyState EST la vue quand il n'y
   a pas de contenu), pas un Toast (une notification transiente
   auto-disparaissante — EmptyState est permanent tant que la zone reste
   vide), pas un Skeleton (un placeholder pour du contenu qui ARRIVE, à
   quelques millisecondes — EmptyState est la réponse finale et résolue que
   rien n'est là), pas un Spinner/Progress/CircularProgress (activité / une
   fraction connue en cours — EmptyState est l'inverse : la tâche est
   terminée et son résultat est vide), pas un ErrorState (un ÉCHEC, souvent
   réessayable — EmptyState est un SUCCÈS dont le résultat est vide, ou un
   premier lancement vierge), pas un OfflineState (un échec de
   connectivité, un type d'ErrorState), pas un NoPermission (un BLOCAGE
   d'autorisation — le contenu existe mais tu n'as pas le droit de le
   voir), pas une Card (un conteneur pour du contenu existant — EmptyState
   est ce qu'une Card affiche À LA PLACE du contenu), pas un Table/List/
   Dashboard/Search vide (ce sont les CONTEXTES qui rendent un EmptyState
   dans leur branche vide — EmptyState est le corps réutilisable qu'ils
   partagent), pas un texte factice (du remplissage — EmptyState est une
   copie honnête et intentionnelle). Les nombreuses familles (aucun
   résultat, aucune donnée, aucun client, aucune séance, aucun programme,
   aucune notification, aucune conversation, premier usage) sont UNE seule
   responsabilité portant des copies/icônes différentes — des variations de
   contenu passées par le consommateur, jamais des composants séparés. Ne
   compose PAS Modal/Drawer/Card/Alert (c'est du contenu que ceux-ci
   peuvent contenir, jamais l'inverse). Compose uniquement les Heading et
   Text gelés ; rend un `icon` et un `action` fournis par l'appelant
   (typiquement l'Icon et le Button gelés) tels quels — aucune logique
   d'icône/bouton propre. Purement informatif et STATIQUE : aucun rôle sur
   le conteneur (le Button `action` optionnel garde sa propre sémantique),
   zéro mouvement, zéro glass, zéro transition/animation. `align` utilise le
   `start` logique pour qu'un état left suive `dir="rtl"` naturellement sans
   code directionnel (vérifié : `direction: rtl` calculé, l'icône
   left-alignée colle au bord de départ). Les tailles sm/md/lg mettent à
   l'échelle l'icône, le niveau de titre (h5/h4/h3), la taille de
   description et le padding ensemble (vérifié : la taille de police du
   titre croît strictement). Responsive : `w-full`, le contenu se recentre
   sans mesure JS (vérifié : l'icône centrée reste à moins de 2px du centre
   du conteneur à 1280px et 390px). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation/animate-/`.focus()` ;
   zéro TODO/FIXME/`console.*`/import inutilisé. API : `title` ·
   `description` · `icon` · `action` · `size` (sm/md/lg) · `align`
   (center/left) · `className` (+ attributs natifs du div). ZÉRO fichier
   gelé modifié. Preuve : `/dev/empty-state` — basic · icon · with/without
   action · sm/md/lg · centered/left · inside table · inside list · no
   results · no sessions · no programs · gallery · first use · RTL ;
   captures desktop/tablet/mobile + RTL ; assertions programmatiques pour
   le rendu titre/description, icône présente/absente, action présente/
   absente, tailles de titre strictement croissantes, alignement center vs
   start logique, recentrage responsive à deux viewports, direction RTL, et
   la garantie statique (aucune animation). **GELÉ (2026-07-07)** — API
   publique verrouillée (`title`/`description`/`icon`/`action`/`size`/
   `align`/`className`) ; plus de redesign ni de changement d'API sans ADR.

   **ErrorState : GELÉ (validé visuellement 2026-07-07, après une passe de
   Frozen-review et le refactor contenu-only / vraies surfaces glass).**
   Plus de changement fonctionnel, visuel ou architectural sauf bug
   objectif ; changement d'API impossible sans ADR. Frozen-review : zéro
   code mort, zéro import/prop inutilisé, aucune duplication interne (la
   forme de `sizeConfig` partagée avec l'EmptyState gelé est une
   similarité inter-composants, non extractible sans ADR) ; le composant
   était déjà contenu-only, le gel le verrouille tel quel. Une vue ou une
   opération qui a ÉCHOUÉ
   au chargement — l'utilisateur ne peut momentanément pas poursuivre, et
   voici comment récupérer (typiquement Retry). JAMAIS une absence de
   données, un chargement, une progression, une confirmation, une
   notification, une permission refusée, ou une perte de connexion. Pas un
   EmptyState (un SUCCÈS dont le résultat est vide, ou un premier lancement
   vierge — aucun échec ; ErrorState est un ÉCHEC, la récupération consiste
   généralement à réessayer, pas à créer), pas un Alert (un message posé
   SUR une vue peuplée ; ErrorState EST la vue quand la vue elle-même a
   échoué), pas un Toast (une notification transiente auto-disparaissante ;
   ErrorState est permanent jusqu'au retry/à la navigation), pas un
   Spinner/Skeleton/Progress/CircularProgress (activité / placeholder /
   fraction PENDANT le chargement — ErrorState est l'état terminal APRÈS
   l'échec), pas un OfflineState (un frère plus étroit, réseau seulement),
   pas un NoPermission (un BLOCAGE d'autorisation — la requête a réussi,
   tu n'as juste pas le droit de voir), pas un MaintenanceState (un arrêt
   planifié de toute l'app avec un ETA — ErrorState est non planifié,
   local, réessayable), pas un Dashboard/Card/Search vide (ceux-ci
   montrent un EmptyState dans leur branche vide — ErrorState est leur
   branche ÉCHOUÉE). Les familles — erreur serveur (5xx), échec de
   chargement, introuvable (404), erreur réseau temporaire, erreur
   inconnue — sont UNE seule responsabilité (le contenu attendu n'a pas pu
   être chargé + un moyen de récupérer) portant des copies/icônes
   différentes, jamais des composants séparés. **Un primitif de CONTENU,
   PAS une surface : ErrorState ne dessine AUCUNE surface propre — aucun
   fond, aucune ombre, aucun radius, aucune bordure, aucun verre, aucune
   matière. Ce n'est pas une Card. Toute la matière visuelle provient
   exclusivement de la surface parente qu'il occupe (GlassCard/GlassPanel/
   Drawer/Modal/FullscreenOverlay/Page). Dans DISCIPLINE, les surfaces
   sont un niveau ARCHITECTURAL (la matière Liquid Glass) et les états
   (EmptyState/ErrorState/OfflineState/NoPermission…) un niveau de
   CONTENU — donner une surface propre à un état dupliquerait la matière
   et affaiblirait l'identité. La racine est une colonne flex transparente
   (tokens d'espacement/alignement uniquement, jamais `bg-*`/`shadow`/
   `rounded`/`border`). Les démos le placent dans de VRAIES surfaces
   Liquid Glass (GlassCard/GlassPanel/un vrai Drawer/un vrai
   FullscreenOverlay) sur le fond d'écran de capture partagé, jamais une
   carte opaque dédiée — le verre et le wallpaper qui transparaît à
   travers produisent le rendu « incrusté sur un vrai écran ».** Ne
   compose PAS Modal/Drawer/Alert/Toast, et délibérément NE compose PAS
   l'EmptyState gelé
   malgré la mise en page voisine : responsabilités distinctes (échec vs
   vide), EmptyState est gelé (le coupler bloquerait l'évolution propre
   d'ErrorState derrière une ADR), et le brief scope la composition aux
   primitifs directement. Compose uniquement les Heading et Text gelés ;
   rend un `icon` et une `action` Retry fournis par l'appelant
   (typiquement l'Icon et le Button gelés) tels quels. Son UNIQUE
   distinction sémantique vis-à-vis d'EmptyState : l'icône est teintée
   `text-error` (le signal universel « échec », lisible au premier coup
   d'œil) plutôt que le tertiaire neutre d'un état vide — un token
   signifiant et non décoratif, reprenant le précédent ton+icône de
   l'Alert gelé (vérifié : la couleur calculée de l'icône diffère de la
   couleur du corps). Purement informatif et STATIQUE : aucun rôle sur le
   conteneur (le Button Retry optionnel garde sa sémantique native — aucun
   focus auto, aucun piège clavier), zéro mouvement, zéro glass, zéro
   transition/animation. `align` utilise le `start` logique pour suivre
   `dir="rtl"` naturellement (vérifié : `direction: rtl`). Les tailles
   sm/md/lg mettent à l'échelle l'icône, le niveau de titre (h5/h4/h3), la
   taille de description et le padding ensemble (vérifié : la taille de
   police du titre croît strictement). Responsive : `w-full`, se recentre
   sans mesure JS (vérifié : icône centrée à moins de 2px du centre à
   1280px et 390px). grep zéro GlassSurface/blur/backdrop-filter/rgba/
   shadow/transition/animation/animate-/`.focus()` ; zéro TODO/FIXME/
   `console.*`/import inutilisé. API : `title` · `description` · `icon` ·
   `action` · `size` (sm/md/lg) · `align` (center/left) · `className`
   (+ attributs natifs du div). ZÉRO fichier gelé modifié. Preuve :
   `/dev/error-state` — basic · retry · without action · sm/md/lg ·
   centered · inline · inside card/table/list · dashboard · server error ·
   load failed (network) · unknown error · RTL ; captures desktop/tablet/
   mobile + RTL ; assertions programmatiques pour le rendu titre/
   description, l'icône teintée d'erreur (couleur calculée ≠ couleur du
   corps), le bouton Retry présent/absent, les tailles de titre
   strictement croissantes, l'alignement center vs start logique, le
   recentrage responsive à deux viewports, la direction RTL, et la
   garantie statique. **GELÉ (2026-07-07)** — API publique verrouillée
   (`title`/`description`/`icon`/`action`/`size`/`align`/`className`) ;
   plus de redesign ni de changement d'API sans ADR.

   **OfflineState : GELÉ (validé visuellement 2026-07-07, après une passe
   de Frozen-review — contenu-only dès l'origine, comme l'ErrorState gelé ;
   zéro code mort, zéro import/prop inutilisé, aucune duplication interne ;
   verrouillé tel quel).** Une impossibilité momentanée
   d'accéder au contenu parce que l'APPLICATION N'A PLUS DE CONNEXION
   RÉSEAU — et (généralement) un moyen de réessayer au retour du réseau.
   JAMAIS une erreur serveur, un chargement, une progression, une absence
   de données, une permission refusée, une maintenance, ou une erreur
   inconnue. Pas un ErrorState (un ÉCHEC — la requête a réellement atteint
   le serveur et échoué ; OfflineState est l'inverse : la requête n'a
   jamais quitté l'appareil faute de connexion — cause différente, action
   différente : « se reconnecter », pas « nos serveurs sont cassés »), pas
   un EmptyState (un succès sans données / un premier lancement — ici rien
   n'a chargé PARCE QU'il n'y a pas de réseau), pas un Spinner/Skeleton/
   Progress/CircularProgress (activité en cours — OfflineState est terminal :
   rien ne peut se produire tant que la connectivité n'est pas revenue),
   pas un Alert (un message sur une vue qui fonctionne ; OfflineState EST
   la vue quand la région ne peut pas charger), pas un Toast (un ping
   transient « vous êtes hors ligne » — momentané), pas un NoPermission
   (un BLOCAGE d'autorisation — le réseau va bien, la requête a réussi),
   pas un MaintenanceState (un arrêt planifié côté serveur avec un ETA —
   ici c'est la connectivité PROPRE de l'utilisateur qui manque), pas un
   Retry Banner (une fine bande — OfflineState est la version pleine
   région), pas un FullscreenOverlay (une SURFACE qui peut en CONTENIR
   un). Les variantes (connexion perdue, mode avion, aucune connexion,
   reconnexion en attente) se ramènent à UNE responsabilité : l'absence de
   connectivité. **Un primitif de CONTENU, PAS une surface — le contrat
   exact de l'ErrorState gelé : ne dessine aucun fond/ombre/radius/
   bordure/verre/matière/Card ; toute la matière vient de la surface
   parente (GlassCard/GlassPanel/Drawer/Modal/FullscreenOverlay/Page/
   Dashboard). Les surfaces sont architecturales (Liquid Glass), les états
   sont du contenu — un état ne porte jamais sa propre surface. La racine
   est une colonne flex transparente (tokens d'espacement/alignement
   uniquement). Les démos le placent dans de VRAIES surfaces glass
   (GlassCard/GlassPanel/un vrai Drawer/un vrai Modal-Dialog/un vrai
   FullscreenOverlay) sur le fond d'écran de capture partagé.** Ne compose
   PAS Modal/Drawer/Alert/Toast, et délibérément NE compose PAS
   l'ErrorState gelé malgré la mise en page identique (responsabilités
   distinctes : réseau absent vs échec ; ErrorState gelé — le coupler
   bloquerait son évolution derrière une ADR). Compose uniquement les
   Heading et Text gelés ; rend un `icon` et une `action` Retry fournis
   par l'appelant tels quels. Icône teintée `text-warning` (ambre) — une
   hiérarchie sémantique à trois niveaux lisible d'un coup d'œil :
   EmptyState neutre (rien ici) → OfflineState ambre (pas de réseau) →
   ErrorState rouge (échec) (vérifié : couleur de l'icône ≠ couleur du
   corps, et ≠ le rouge d'ErrorState). Purement informatif et STATIQUE :
   aucun rôle sur le conteneur (le Button Retry garde sa sémantique native
   — aucun focus auto, aucun piège clavier), zéro mouvement, zéro glass,
   zéro transition/animation. `align` utilise le `start` logique (vérifié :
   `direction: rtl`). Les tailles sm/md/lg s'échelonnent ensemble
   (vérifié : la taille de police du titre croît strictement).
   Responsive : `w-full`, se recentre sans mesure JS (vérifié : icône
   centrée à moins de 2px à 1280px et 390px). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation/animate-/`.focus()` ;
   zéro TODO/FIXME/`console.*`/import inutilisé. API : `title` ·
   `description` · `icon` · `action` · `size` (sm/md/lg) · `align`
   (center/left) · `className` (+ attributs natifs du div). ZÉRO fichier
   gelé modifié. Preuve : `/dev/offline-state` (sur le fond d'écran, chaque
   exemple dans un vrai GlassCard/GlassPanel/Drawer/Modal/
   FullscreenOverlay) — basic · retry · without action · sm/md/lg ·
   centered (GlassPanel) · inline · inside a real Drawer · inside a real
   Dialog · inside a real FullscreenOverlay · dashboard · chat · gallery ·
   files · RTL ; captures desktop/tablet/mobile + RTL ; assertions
   programmatiques pour le rendu titre/description, l'icône teintée warning
   (couleur calculée ≠ couleur du corps), le bouton Retry présent/absent,
   les tailles de titre strictement croissantes, l'alignement center vs
   start logique, le recentrage responsive à deux viewports, la direction
   RTL, et la garantie statique. **GELÉ (2026-07-07)** — API publique
   verrouillée (`title`/`description`/`icon`/`action`/`size`/`align`/
   `className`) ; plus de redesign ni de changement d'API sans ADR.

   **SuccessBanner : GELÉ (validé visuellement 2026-07-08, après une passe
   Frozen-review — token-clean dès la construction ; aucun code mort, aucun
   import/prop inutilisé, aucune duplication interne, aucun style arbitraire ;
   verrouillé sans changement ; API publique verrouillée, plus de changement
   sans ADR).** Une primitive
   Feedback qui POSSÈDE sa propre surface — l'inverse délibéré des états
   content-only. Une confirmation PERSISTANTE, DANS LE FLUX, qu'une
   opération que l'utilisateur vient d'effectuer a RÉUSSI et mérite de
   rester visible (un programme publié, une séance enregistrée, un client
   créé, un paiement confirmé, un profil mis à jour). UNE seule
   responsabilité : un « c'est fait » positif et permanent qui vit dans la
   page, pousse le contenu, et persiste jusqu'à ce que l'utilisateur le
   ferme ou que l'état change. JAMAIS une erreur serveur, un chargement, un
   progrès, une absence de données, une permission refusée, une maintenance
   ou un échec inconnu. Pas un Toast (transitoire, flottant, auto-fermant,
   hors du flux — SuccessBanner vit DANS le flux et persiste), pas un Alert
   (la bande générique multi-variantes AU SUJET de la vue — SuccessBanner
   est la confirmation unique, positive, succès-seulement, DE l'action
   effectuée ; le brief interdit d'être/composer un Alert), pas un Dialog
   (bloquant/modal — SuccessBanner ne bloque jamais, ne piège jamais le
   focus), pas les états content-only (EmptyState/ErrorState/OfflineState
   REMPLACENT une région qui n'a pas pu afficher son contenu —
   SuccessBanner est À CÔTÉ d'un contenu PRÉSENT), pas un Progress/Spinner
   (en cours — SuccessBanner est le résultat positif terminal APRÈS le
   travail), pas un Snackbar/message inline ni un Notification Center. Les
   variantes (save, publish, import, sync, payment) se ramènent à UNE
   responsabilité. **Possède sa surface : une bande teintée succès
   construite UNIQUEMENT depuis les tokens succès
   (`bg-[var(--ds-color-success-tint)]`,
   `border-[var(--ds-color-success-border)]`, icône `text-success`), un
   rayon token (`rounded-lg`) et un espacement token — jamais de couleur en
   dur, jamais de GlassSurface/blur/backdrop-filter/shadow, jamais de
   mouvement.** Compose uniquement l'Icon gelé (le caller fournit l'icône
   de validation), Text, et l'IconButton gelé (fermeture) — jamais
   Toast/Alert/Card/Dialog. `w-full` (suit la largeur du parent sans JS —
   vérifié : colonnes pleine vs demi-largeur suivies exactement) ;
   `role="status"` (aria-live polite) annonce le succès sans l'urgence d'un
   alert ; flex horizontal → la fermeture se retourne sous `dir="rtl"`
   (vérifié : `direction: rtl`, action + fermeture rendues) ; l'IconButton
   de fermeture garde sa sémantique native (aucun focus auto, aucun piège)
   et auto-masque la bande (vérifié) + déclenche `onDismiss`. Deux props
   additives justifiées : `align` (left/center, la section Alignement du
   brief) et `onDismiss` (une bande fermable doit pouvoir observer sa
   fermeture). Tailles sm/md/lg échelonnées ensemble (vérifié : la taille
   du titre croît strictement). Statique : zéro animation sur la racine,
   hors boutons composés (vérifié). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation/animate-/`.focus()`
   dans le composant (uniquement dans la prose du doc-comment décrivant ce
   qu'il n'est PAS) ; zéro TODO/FIXME/`console.*`/import inutilisé ; zéro
   hex/px/ms en dur. API : `title` · `description` · `icon` · `action` ·
   `dismissible` · `onDismiss` · `size` (sm/md/lg) · `align` (left/center)
   · `className` (+ attributs natifs du div). ZÉRO fichier gelé modifié.
   Preuve : `/dev/success-banner` (sur le fond d'écran, la bande montrée
   directement dans le flux puisqu'elle possède sa surface) — basic ·
   with/without description · dismissible · with/without action ·
   dismissible+action · sm/md/lg · program published · payment confirmed ·
   import completed · settings saved · responsive width · RTL, plus
   `scripts/success-banner-proof.mjs` (captures desktop/tablet/mobile + RTL
   ; assertions rendu, `role="status"`, surface teintée, auto-masquage à la
   fermeture, bouton d'action, tailles strictement croissantes, largeur
   responsive, direction RTL, statique). **GELÉ (2026-07-08)** — API publique
   verrouillée (`title`/`description`/`icon`/`action`/`dismissible`/
   `onDismiss`/`size`/`align`/`className`) ; plus de redesign ni de
   changement d'API sans ADR.

   **WarningBanner : GELÉ (validé visuellement 2026-07-08, après une passe
   Frozen-review — token-clean dès la construction ; aucun code mort, aucun
   import/prop inutilisé, aucune duplication interne, aucun style arbitraire ;
   verrouillé sans changement ; API publique verrouillée, plus de changement
   sans ADR).** Le frère du
   SuccessBanner gelé — même famille Feedback, même comportement de bande
   dans le flux, polarité inverse. Une confirmation PERSISTANTE, DANS LE
   FLUX, d'une situation qui nécessite l'ATTENTION de l'utilisateur sans
   bloquer immédiatement son travail (un abonnement bientôt expiré, un
   profil incomplet, un stockage presque plein, un paiement bientôt
   renouvelé, un programme non publié, des données partiellement
   synchronisées). UNE seule responsabilité : prévenir d'un RISQUE ou d'une
   action recommandée, dans le flux, sans bloquer. JAMAIS un échec, jamais
   un blocage, jamais transitoire. Pas un Toast/Snackbar (transitoire,
   flottant, auto-fermant, hors-flux — WarningBanner vit DANS le flux et
   persiste jusqu'à résolution ou fermeture), pas un Alert (la bande
   générique multi-variantes AU SUJET de la vue — WarningBanner est le
   signal unique warning-only avec ses propres tokens et une action
   recommandée optionnelle ; le brief interdit d'être/composer un Alert),
   pas un Error Banner/ErrorState (un ÉCHEC, souvent bloquant/à réessayer —
   WarningBanner est l'inverse : rien n'a échoué, le travail continue), pas
   un Info Banner (une note neutre sans notion de risque — WarningBanner
   porte la charge ambre « attention » et souvent une étape suivante), pas
   un Dialog (bloquant/modal — ne bloque jamais, ne piège pas le focus),
   pas un OfflineState (un état content-only qui REMPLACE une région —
   WarningBanner est À CÔTÉ d'un contenu PRÉSENT), pas un Spinner (en cours
   — un état stable), pas un EmptyState (une absence — accompagne un contenu
   présent), pas un Notification Center (une liste historique — un
   avertissement unique in situ). Les variantes (abonnement expirant,
   stockage faible, profil incomplet, email non vérifié, sync partielle,
   programme non publié) se ramènent à UNE responsabilité. **Possède sa
   surface — comme le SuccessBanner gelé et à l'inverse des états
   content-only : une bande teintée warning bâtie UNIQUEMENT sur les tokens
   warning (`bg-[var(--ds-color-warning-tint)]`,
   `border-[var(--ds-color-warning-border)]`, icône `text-warning`), un
   rayon token (`rounded-lg`) et un espacement token — jamais de couleur en
   dur, jamais de GlassSurface/blur/backdrop-filter/shadow, jamais de
   mouvement.** Compose uniquement l'Icon gelé (le caller fournit l'icône
   d'avertissement), Text, et l'IconButton gelé (fermeture) — jamais
   Alert/Toast/Card/Dialog ; ne compose PAS le SuccessBanner gelé malgré la
   mise en page identique (polarité distincte : succès vs. risque ;
   SuccessBanner gelé — le coupler bloquerait son évolution derrière un
   ADR). `w-full` (suit la largeur du parent sans JS — vérifié : colonnes
   pleine vs demi-largeur suivies exactement) ; `role="status"` (aria-live
   polite) fait remonter l'avertissement SANS l'urgence interruptive de
   `role="alert"`, en accord avec sa nature non bloquante ; flex horizontal
   → la fermeture se retourne sous `dir="rtl"` (vérifié : `direction: rtl`,
   action + fermeture rendues) ; l'IconButton de fermeture garde sa
   sémantique native (aucun focus auto, aucun piège) et auto-masque la
   bande (vérifié) + déclenche `onDismiss`. Icône teintée `text-warning`
   (ambre) — un token signifiant, non décoratif, distinct de la couleur du
   corps (vérifié). Deux props additives justifiées : `align` (left/center,
   la section Alignement du brief) et `onDismiss`. Tailles sm/md/lg
   échelonnées ensemble (vérifié : la taille du titre croît strictement).
   Statique : zéro animation sur la racine, hors boutons composés
   (vérifié). grep zéro GlassSurface/blur/backdrop-filter/rgba/shadow/
   transition/animation/animate-/`.focus()` dans le composant (uniquement
   dans la prose du doc-comment décrivant ce qu'il n'est PAS) ; zéro
   TODO/FIXME/`console.*`/import inutilisé ; zéro hex/px/ms en dur. API :
   `title` · `description` · `icon` · `action` · `dismissible` ·
   `onDismiss` · `size` (sm/md/lg) · `align` (left/center) · `className`
   (+ attributs natifs du div). ZÉRO fichier gelé modifié. Preuve :
   `/dev/warning-banner` (sur le fond d'écran, la bande montrée directement
   dans le flux puisqu'elle possède sa surface) — basic · with/without
   description · dismissible · with/without action · dismissible+action ·
   sm/md/lg · dashboard · subscription expiring · storage almost full ·
   profile incomplete · program unpublished · partial sync · responsive
   width · RTL, plus `scripts/warning-banner-proof.mjs` (captures
   desktop/tablet/mobile + RTL ; assertions rendu, `role="status"`, surface
   teintée + icône teintée, auto-masquage à la fermeture, bouton d'action,
   tailles strictement croissantes, largeur responsive, direction RTL,
   statique). **GELÉ (2026-07-08)** — API publique verrouillée (`title`/
   `description`/`icon`/`action`/`dismissible`/`onDismiss`/`size`/`align`/
   `className`) ; plus de redesign ni de changement d'API sans ADR.

   **ErrorBanner : GELÉ (validé visuellement 2026-07-08, après une passe
   Frozen-review — token-clean dès la construction ; aucun code mort, aucun
   import/prop inutilisé, aucune duplication interne, aucun style arbitraire ;
   verrouillé sans changement ; API publique verrouillée, plus de changement
   sans ADR).** Le troisième frère de
   la famille bannière Feedback (SuccessBanner + WarningBanner, tous deux
   gelés) — même comportement de bande dans le flux, polarité plus grave.
   Une erreur PERSISTANTE, DANS LE FLUX, NON MODALE : un échec important
   concernant le contexte courant, visible dans le flux, qui ne nécessite
   PAS une interruption modale (publication impossible, paiement refusé,
   sync échouée, import interrompu, sauvegarde impossible, quota dépassé).
   UNE seule responsabilité : informer DURABLEMENT d'une erreur liée au
   contexte courant SANS interrompre le flux. Pas un ErrorState (un état
   content-only qui REMPLACE toute une région qui n'a pas pu charger — il
   EST la vue ; ErrorBanner est À CÔTÉ d'un contenu présent qui fonctionne,
   et à l'inverse de l'ErrorState sans surface il POSSÈDE sa surface teintée
   error), pas un WarningBanner (un RISQUE — rien n'a échoué ; ErrorBanner
   est un échec réel), pas un SuccessBanner (polarité opposée), pas un
   Toast/Snackbar (transitoire, flottant, auto-fermant — une erreur ne doit
   pas disparaître seule ; ErrorBanner persiste jusqu'à résolution ou
   fermeture), pas un Alert (la bande générique multi-variantes ; le brief
   interdit d'être/composer un Alert), pas un AlertDialog/Dialog
   (bloquant/modal — ErrorBanner ne bloque jamais, important mais NON
   MODAL), pas un OfflineState (un état content-only réseau qui REMPLACE une
   région), pas un Spinner (en cours — ErrorBanner est l'état terminal APRÈS
   l'échec), pas un Notification Center (une liste historique — une erreur
   unique in situ). Les variantes (sauvegarde impossible, paiement refusé,
   publication échouée, import échoué, sync échouée, quota dépassé) se
   ramènent à UNE responsabilité. **Possède sa surface — comme ses frères
   gelés et à l'inverse des états content-only : une bande teintée error
   bâtie UNIQUEMENT sur les tokens error (`bg-[var(--ds-color-error-tint)]`,
   `border-[var(--ds-color-error-border)]`, icône `text-error`), un rayon
   token (`rounded-lg`) et un espacement token — jamais de couleur en dur,
   jamais de GlassSurface/blur/backdrop-filter/shadow, jamais de
   mouvement.** Compose uniquement l'Icon gelé (le caller fournit l'icône
   d'erreur), Text, et l'IconButton gelé (fermeture) — jamais
   Toast/Alert/Card/Dialog ; ne compose PAS les SuccessBanner/WarningBanner
   gelés malgré la mise en page identique (polarité distincte : échec vs.
   risque vs. succès ; tous deux gelés — le coupler bloquerait leur
   évolution derrière un ADR). `w-full` (suit la largeur du parent sans JS —
   vérifié : colonnes pleine vs demi-largeur suivies exactement) ; flex
   horizontal → la fermeture se retourne sous `dir="rtl"` (vérifié :
   `direction: rtl`, action + fermeture rendues). **`role="alert"` (aria-live
   assertive) est le rôle approprié pour une erreur persistante non modale —
   annoncée de façon assertive sans capturer le focus ni bloquer, complétant
   la hiérarchie à trois niveaux (Success/Warning polis `role="status"` →
   Error assertif `role="alert"` ; vérifié : la bande utilise `role="alert"`,
   PAS `role="status"`).** L'IconButton de fermeture garde sa sémantique
   native (aucun focus auto, aucun piège) et auto-masque la bande (vérifié)
   + déclenche `onDismiss`. Icône teintée `text-error` (rouge) — un token
   signifiant, non décoratif, distinct de la couleur du corps (vérifié), le
   niveau plus grave sous l'ambre du WarningBanner. Deux props additives
   justifiées : `align` (left/center, la section Alignement du brief) et
   `onDismiss`. Tailles sm/md/lg échelonnées ensemble (vérifié : la taille
   du titre croît strictement). Statique : zéro animation sur la racine,
   hors boutons composés (vérifié). grep zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation/animate-/`.focus()` dans
   le composant (uniquement dans la prose du doc-comment décrivant ce qu'il
   n'est PAS) ; zéro TODO/FIXME/`console.*`/import inutilisé ; zéro hex/px/ms
   en dur. API : `title` · `description` · `icon` · `action` · `dismissible`
   · `onDismiss` · `size` (sm/md/lg) · `align` (left/center) · `className`
   (+ attributs natifs du div). ZÉRO fichier gelé modifié. Preuve :
   `/dev/error-banner` (sur le fond d'écran, la bande montrée directement
   dans le flux puisqu'elle possède sa surface) — basic · with/without
   description · dismissible · with/without action · dismissible+action ·
   sm/md/lg · dashboard · payment failed · import failed · publish failed ·
   sync failed · quota exceeded · responsive width · RTL, plus
   `scripts/error-banner-proof.mjs` (captures desktop/tablet/mobile + RTL ;
   assertions rendu, `role="alert"` pas `role="status"`, surface teintée +
   icône teintée, auto-masquage à la fermeture, bouton d'action, tailles
   strictement croissantes, largeur responsive, direction RTL, statique).
   **GELÉ (2026-07-08)** — API publique verrouillée (`title`/`description`/
   `icon`/`action`/`dismissible`/`onDismiss`/`size`/`align`/`className`) ;
   plus de redesign ni de changement d'API sans ADR.

   **Badge : GELÉ (2026-07-08)** — validé visuellement après rebuild + craft
   pass Liquid Glass + passe de simplification. API publique verrouillée
   (`variant` neutral/success/warning/error · `appearance` soft/solid/outline ·
   `size` sm/md · `icon` · `className`) ; plus de changement sans ADR.

   **IDENTITÉ VISUELLE OFFICIELLEMENT GELÉE (2026-07-08).** Cette version
   devient la référence visuelle de DISCIPLINE (direction artistique, palette,
   typographie, espacements globaux, composants existants, style des cartes,
   animations, identité — verrouillés ; changement uniquement pour un vrai
   problème UX). On entre en **développement produit** : rendre le produit plus
   intelligent, pas l'interface plus belle. Première fonctionnalité : l'**Avatar
   DISCIPLINE** — spécification produit/UX/interaction dans
   `docs/DISCIPLINE_AVATAR_EXPERIENCE.md` (design uniquement, aucun code).

   **Avatar (Data Display) : GELÉ (2026-07-08).** Reconstruit en compound puis
   validé visuellement ; passe Frozen-review sans rien à changer (aucun code
   mort, duplication, import/prop inutile, incohérence token/taille/spacing/
   radius/fallback). API publique verrouillée (ADR pour changer). Détail :

   **Avatar (Data Display) : RECONSTRUIT EN COMPOUND (2026-07-08).**
   L'Avatar simple pré-méthodologie (`<Avatar name src size/>`) devient le vrai
   primitif compound (`Avatar`·`Avatar.Image`·`Avatar.Fallback`·`Avatar.Group`).
   Primitif fondamental Data Display : répond seulement « qui est cet objet ? »,
   aucune connaissance métier. Fallback strict image→initiales→icône
   utilisateur (jamais vide). Tailles xs/sm/md/lg/xl = une échelle de tokens
   monotone (24·32·40·48·64px — évite les paliers non définis type `h-16`) ;
   formes circle/rounded/square ; la forme ne change jamais en responsive, seule
   la taille. `Avatar.Group` = composition pure (overlap RTL-correct via marge
   logique négative, ring token, chip `+N`). Export `getInitials`. INTERDITS :
   presence online, badge notif/IA, halo, pulse, launcher, tooltip/menu intégré,
   animation, coach/guide/chatbot. Consommateurs migrés (AvatarLauncher +
   démos). Preuve `/dev/avatar` + `scripts/avatar-proof.mjs` verte. **NON GELÉ**
   — attendre validation visuelle.

   **Collapsible (Disclosure) : GELÉ (2026-07-09).** Frozen Review ayant
   trouvé et corrigé un vrai défaut : `className` passé aux côtés de
   `asChild` était silencieusement abandonné (la branche `asChild`
   diffusait `{...props}` sans `className`, déstructuré plus haut) — un
   consommateur stylant son propre élément trigger personnalisé
   (`<Collapsible.Trigger asChild className="...">`) aurait vu cette
   classe disparaître au lieu d'être fusionnée sur son élément via le
   Slot de Radix. Corrigé en passant `className={className}` aussi dans
   la branche `asChild` ; vérifié par une nouvelle assertion de preuve
   (une classe `cl-custom-marker` se retrouve bien sur le `Button`
   personnalisé). Aucun autre défaut objectif trouvé. API publique
   nécessite désormais un ADR pour être modifiée. Détail de la
   construction : l'atome Disclosure dont Accordion est littéralement
   construit : une seule région, un seul état ouvert/fermé, aucune
   logique de groupe, aucune exclusivité, aucune coordination. Répond à
   UNE seule chose : « est-ce que je veux masquer ou révéler CETTE zone
   de contenu ? ». Pas Accordion (un GROUPE de Collapsibles coordonnés —
   exclusivité `single`/`multiple`, navigation clavier Arrow/Home/End
   partagée, chaque trigger enveloppé dans un titre pour le plan du
   document ; Collapsible est l'atome dont Radix construit littéralement
   son propre Accordion — une région, aucun frère, aucune règle
   d'exclusion, aucun wrapper de titre). Pas Tabs (COMMUTE entre plusieurs
   vues nommées toujours visibles ; Collapsible n'a qu'une région présente
   ou absente, aucune « autre vue » affichée à sa place). Pas TreeView
   (données hiérarchiques avec sélection). Pas Drawer/BottomSheet (overlay
   porté, scrim, dismissible ; Collapsible reste dans le flux de la page).
   Pas Dialog (bloquant). Pas Popover (ancré, positionné, fermé au clic
   extérieur ; Collapsible n'a aucune logique de positionnement ni de
   fermeture au clic extérieur — un simple bouton bascule en ligne). Pas
   Tooltip (déclenché au survol, transitoire). Pas NavigationMenu (mène
   vers d'autres destinations). Compose DIRECTEMENT
   `@radix-ui/react-collapsible` (nouvelle dépendance épinglée `1.1.16`) —
   aucun wrapper intermédiaire. Le Trigger partage EXACTEMENT la même
   matière de ligne déjà établie par le Trigger du Accordion gelé (fond
   hover/focus piloté par tokens, `rounded-sm`, rotation calme du chevron
   `duration-fast`/`ease-standard`, et le correctif de continuité
   `data-[state=open]:rounded-b-none` déjà appliqué à Accordion) pour une
   raison délibérée : Accordion est construit À PARTIR DE Collapsible,
   donc l'atome et le groupe qu'il forme doivent se lire comme une seule
   matière, jamais deux. Contrairement au Trigger d'Accordion, celui de
   Collapsible n'est PAS enveloppé dans un titre — vérifié : le parent du
   trigger n'est jamais un `h1`–`h6` — puisqu'il n'y a aucun plan de
   groupe à préserver. `Content` ne dessine aucune carte ni nouvelle
   surface, ne contraint jamais la hauteur (vérifié : `max-height: none`,
   jamais de scroll interne). 100 % du comportement Radix conservé tel
   quel : ARIA, clavier (Tab/Enter/Space, vérifié), focus, `asChild`.
   Vérifié : `open`/`onOpenChange` pilote l'état en externe (contrôlé) aux
   côtés du basculement non contrôlé sans prop `open` ; `defaultOpen`
   démarre révélé ; `disabled` bloque entièrement le trigger ; `forceMount`
   garde le contenu présent dans le DOM même fermé ; un Collapsible
   imbriqué dans le contenu d'un autre s'ouvre/ferme indépendamment ;
   `asChild` rend l'élément propre du consommateur (un `Button`
   personnalisé) comme trigger tel quel, SANS chevron ni className par
   défaut imposés ; RTL fonctionnel. API : `Collapsible`
   (`open`/`defaultOpen`/`onOpenChange`/`disabled`/`className`) ·
   `Collapsible.Trigger` (`asChild`/`className`) · `Collapsible.Content`
   (`forceMount`/`className`). Preuve `/dev/collapsible` +
   `scripts/collapsible-proof.mjs` verte (ARIA, machine d'état contrôlé/
   non contrôlé/defaultOpen/disabled, présence DOM forceMount, hauteur du
   contenu long, indépendance imbriquée, timing de rotation du chevron,
   contrat asChild verbatim, RTL, clavier complet, vérification
   anti-régression contre Accordion gelé). **NON GELÉ** — attendre
   validation visuelle.

   **Carousel (Data Display) : construit selon le processus complet, NON
   GELÉ (2026-07-10).** Compound (`Carousel`/`Carousel.Content`/
   `Carousel.Item`/`Carousel.Previous`/`Carousel.Next`/
   `Carousel.Indicators`). Répond à UNE seule question : « comment
   parcourir SÉQUENTIELLEMENT une série d'éléments ? » Aucune logique
   métier ni connaissance de domaine : ni images/produits/articles, ni
   lightbox, ni zoom, ni plein écran, ni scroll infini/virtualisé, ni
   drag, ni masonry/grille, ni autoplay/diaporama, ni chargement différé,
   ni analytics, ni « swipe business logic » — tout cela appartient à un
   composant supérieur qui COMPOSERAIT un Carousel. Pas ScrollArea (une
   surface de défilement générique sans slides discrets, sans snapping,
   sans stepping, sans index actif). Pas Tabs (COMMUTE des panneaux nommés
   mutuellement exclusifs dont un seul est monté ; un Carousel glisse le
   long d'une piste continue, les éléments adjacents partiellement
   visibles). Pas Pagination (accès aléatoire à des pages numérotées qui
   REMPLACENT la vue ; un Carousel est un voyage séquentiel continu, ses
   points indiquent la position, pas des numéros de page). Pas une Gallery
   (grille 2-D lue d'un coup vs séquence 1-D lue une région à la fois).
   Pas Card (ce qu'un Item enveloppe couramment). Pas List/Timeline/
   ActivityFeed (aucune piste balayée à snap). Construit sur une piste
   scroll-snap CSS NATIVE — aucune dépendance de moteur de carousel,
   aucune animation JS de transform : le stepping appelle le
   `scrollIntoView` du navigateur, qui respecte `scroll-behavior: smooth`
   et se dégrade en saut instantané sous `prefers-reduced-motion` (via
   `motion-reduce:scroll-auto`). Direction entièrement native — une piste
   horizontale et les valeurs logiques `scroll-snap-align`
   (`start`/`center`/`end`) se reflètent correctement sous `dir="rtl"`, et
   les flèches se reflètent avec. L'index actif est lu depuis la géométrie
   (l'élément dont le centre est le plus proche du centre de la fenêtre —
   agnostique à la direction/orientation), jamais une prop du
   consommateur. `Carousel.Previous`/`Carousel.Next` composent l'IconButton
   gelé verbatim et se désactivent aux extrémités sauf si `loop` (comme la
   désactivation aux bords de la Pagination gelée). `Carousel.Indicators`
   rend un point de position par élément, l'actif doucement allongé via une
   transition largeur+couleur `duration-standard`/`ease-out` pilotée par
   les tokens (le même budget de mouvement calme que les chevrons Accordion/
   Collapsible gelés). Pattern WAI-ARIA Carousel complet : racine
   `aria-roledescription="carousel"` + `aria-label`, piste `role="group"` +
   `aria-live="polite"`, chaque item `aria-roledescription="slide"` +
   `aria-label="N of M"` (injecté structurellement), contrôles
   `aria-controls` vers la piste. Clavier : Flèche Gauche/Droite
   (horizontal, reflété en RTL) ou Haut/Bas (vertical) pour avancer,
   Home/End vers le premier/dernier, Tab/Shift+Tab à travers les vrais
   contrôles focusables. `orientation` (`horizontal` par défaut/
   `vertical`), `loop` (par défaut false — enroule le PAS, jamais un
   marquee infini à slides clonés) et `align` (`start` par défaut/
   `center`/`end`, l'alignement de snap) sont les seules props ; la
   largeur/hauteur d'un item reste la décision de mise en page du
   consommateur (Invariant A1). Compose UNIQUEMENT les tokens Typography/
   `border`/`accent` et l'IconButton/Icon gelés — aucun GlassSurface,
   aucune ombre, aucun dégradé, aucune inclinaison, aucun coverflow.
   Preuve `/dev/carousel` + `scripts/carousel-proof.mjs` verte (structure
   ARIA, piste snap native, stepping de base, indicateurs + allongement de
   l'actif, désactivation aux bords sans loop, enroulement avec loop, axe
   vertical, clavier Flèche/Home/End, composition IconButton, responsive,
   RTL, vérification anti-régression). Grep propre. **NON GELÉ** —
   attendre validation visuelle.

   **DataGrid (Data Display) : GELÉ (2026-07-10).** Une Frozen Review a
   trouvé et corrigé un vrai défaut objectif : une `DataGrid.Column`
   triable (`sortable`) avec `align="center"`/`"end"` n'alignait pas
   réellement son en-tête (le `<span>` du label était toujours `flex-1`,
   ce qui absorbe tout l'espace libre — rendant `justify-center` inerte
   (code mort) et `flex-row-reverse` inversait le label et le chevron au
   lieu de pousser le groupe vers le bord de fin ; seul `start`, le seul
   chemin exercé par la démo, se rendait correctement). Corrigé en ne
   faisant grandir le label que pour `start` (apparence validée
   inchangée, chevron toujours épinglé au bord de fin de la colonne) et,
   pour `center`/`end`, en gardant le label + chevron ensemble comme un
   groupe positionné par le `justify-center`/`justify-end` RTL-aware du
   conteneur flex ; `flex-row-reverse` supprimé. Couvert par une nouvelle
   colonne de démo (« Progress » triable `align="end"`) et une nouvelle
   assertion de preuve. Aucun autre défaut objectif trouvé. API publique
   désormais figée (ADR nécessaire pour la modifier). Compound
   (`DataGrid`/`DataGrid.Toolbar`/
   `DataGrid.Header`/`DataGrid.Body`/`DataGrid.Row`/`DataGrid.Cell`/
   `DataGrid.Column`/`DataGrid.Footer`/`DataGrid.Empty`/
   `DataGrid.Pagination`). Répond à UNE seule question : « comment
   manipuler un grand ensemble de données comparables ? » — ce que devient
   le Table gelé une fois le dataset assez grand pour avoir besoin de tri,
   sélection de lignes, pagination et une barre d'outils en plus de la
   simple comparaison, tout en restant une surface d'orchestration UI,
   jamais un moteur de données : aucune connaissance d'API, de backend, de
   SQL, de recherche serveur, de permissions, de règles métier, de
   chargement différé, de virtualisation métier, d'import/export, de
   CSV/Excel, de GraphQL, ni d'aucun concept du domaine DISCIPLINE. La
   direction de tri, les lignes sélectionnées et la page courante sont
   tous un état CONTRÔLÉ possédé par le consommateur — DataGrid ne fait
   que rendre l'affordance (un en-tête triable cliquable, un contrôle de
   pagination, un emplacement de barre d'outils) et transmettre
   l'interaction, sans jamais réordonner, filtrer ou découper les données
   lui-même. Pas Table (aucun tri, sélection, pagination ni barre
   d'outils — DataGrid est construit EN COMPOSANT Table directement,
   jamais en dupliquant son balisage : `DataGrid.Header`/`Body`/`Row`/
   `Cell`/`Footer` SONT `Table.Header`/`Body`/`Row`/`Cell`/`Footer`,
   ré-exportés, jamais réimplémentés). Pas TreeView (une hiérarchie,
   aucune relation parent/enfant dans DataGrid). Pas Timeline/
   ActivityFeed (aucun axe temporel, aucune anatomie par ligne — les
   lignes de DataGrid sont des enregistrements arbitraires à colonnes
   nommées). Pas un Spreadsheet/Excel (aucune édition de cellule libre,
   aucune formule, aucune référence cellule-à-cellule — chaque cellule est
   un affichage fixe et en lecture seule d'un seul champ). Pas List/Card
   (aucune colonne nommée ; le détail isolé d'un seul objet,
   respectivement). `DataGrid.Column` est la seule pièce vraiment nouvelle
   par rapport à `Table.Head` : une affordance `sortable` OPTIONNELLE (un
   en-tête cliquable, un chevron indicateur, `aria-sort`) — le comparateur
   réel et le réordonnancement des lignes restent la responsabilité du
   consommateur. `DataGrid.Empty` est un wrapper `<tr>`/`<td>` valide
   (couvrant toutes les colonnes) autour du frozen `EmptyState`, pour que
   « aucune ligne » se rende toujours dans un `<tbody>` structurellement
   valide. `DataGrid.Pagination` est le vrai composant `Pagination` gelé
   lui-même, composé directement sous le tableau. `DataGrid` (racine) et
   `DataGrid.Toolbar` sont de simples emplacements de mise en page flex
   sans matière propre — le vrai `<Table role="grid">` se trouve entre
   les deux comme son propre élément, puisqu'une barre d'outils et un
   contrôle de pagination ne peuvent légalement pas vivre à l'intérieur
   d'un `<table>`. Définir `role="grid"` sur le Table sous-jacent est la
   SEULE mise en fil ARIA Grid ajoutée à la main : selon le mapping
   HTML-ARIA, le rôle implicite d'un `<td>` devient déjà `gridcell` (au
   lieu de `cell`) dès que son ancêtre `<table>` porte `role="grid"`, et
   `<th>`/`<tr>` calculent déjà `columnheader`/`row` de toute façon —
   chaque rôle ARIA Grid découle de la sémantique HTML réelle, jamais un
   `role="gridcell"` écrit à la main sur chaque cellule. La navigation
   clavier est entièrement native (chaque surface interactive est un vrai
   `<button>` — aucun modèle de navigation cellule-à-cellule par flèches,
   un souci de tableur éditable que DataGrid n'a explicitement pas).
   Aucun GlassSurface, aucun quadrillage lourd, aucun style Excel —
   DataGrid hérite du rythme calme de Table sans rien changer. Preuve
   `/dev/data-grid` + `scripts/datagrid-proof.mjs` verte (rôles ARIA Grid
   découlant de `role="grid"`, sélection basculant un vrai état coché/
   indéterminé, tri basculant `aria-sort` et réordonnant réellement les
   lignes possédées par le consommateur, la vraie Pagination changeant les
   lignes visibles, la Toolbar du consommateur filtrant ses propres
   lignes, Empty/Loading rendus dans une ligne valide, contenu long qui
   s'enroule sans troncature, scroll responsive hérité de Table,
   Pagination désactivée désactivant réellement ses boutons, RTL, clavier,
   vérification anti-régression contre Table/TreeView/ActivityFeed/
   Timeline gelés). Grep propre. **NON GELÉ** — attendre validation
   visuelle.

   **TreeView (Data Display) : GELÉ (2026-07-10).** Une Frozen Review
   complète a trouvé et corrigé un vrai défaut de code mort : le paramètre
   `current` de `focusTreeItem` n'était jamais utilisé (réduit au silence
   par un `void current`), puisque la fonction n'agit que sur `next` —
   supprimé, avec mise à jour de chaque site d'appel. Aucun autre défaut
   objectif trouvé. API publique désormais figée (ADR nécessaire pour la
   modifier). Compound réel (`TreeView`/`TreeView.Item`/
   `TreeView.Trigger`/`TreeView.Content`/`TreeView.Icon`/`TreeView.Label`).
   Répond à UNE seule question : « quelle est la structure hiérarchique de
   ces éléments ? » Aucune logique métier : ni routing, ni système de
   fichiers, ni permissions, ni chargement différé, ni glisser-déposer, ni
   cases à cocher, ni sélection, ni édition, ni renommage, ni menu
   contextuel, ni recherche, ni filtre, ni virtualisation — tout cela
   appartient à un futur File Explorer séparé. Pas List (aucune relation
   parent/enfant). Pas Table (aucune colonne, seulement du containment).
   Pas Accordion (un groupe plat de sections indépendantes à un seul
   niveau, jamais de nesting arbitraire). Pas Collapsible (l'atome dont
   TreeView est construit — une seule région, aucune hiérarchie, aucun
   niveau, aucun focus roving). Pas Navigation Menu/Sidebar (des
   destinations vers lesquelles naviguer ; TreeView révèle une structure
   sur place). Pas Tabs/Timeline/ActivityFeed (aucun concept de
   containment). Pas un File Explorer (un écran métier qui composerait
   TreeView comme sa couche d'affichage pure). Construit NATURELLEMENT sur
   le `Collapsible` gelé — chaque machine d'état ouverture/fermeture
   (`open`/`defaultOpen`/`onOpenChange`/`disabled`, `aria-expanded`/
   `aria-controls`, activation Entrée/Espace) est celle de Collapsible,
   remodelée via `asChild` en une ligne d'arbre (chevron en tête, icône
   optionnelle, label, indentation de profondeur) au lieu de la forme
   « ligne FAQ » propre à Collapsible — le mécanisme d'ouverture/fermeture
   lui-même n'est jamais réimplémenté. Un `TreeView.Item` sans
   `TreeView.Content` est une FEUILLE : aucun Collapsible, aucun chevron
   (un espaceur invisible de même largeur garde tous les labels alignés
   quelle que soit la profondeur), aucun `aria-expanded` — exactement ce
   qu'exige le pattern WAI-ARIA Tree View pour un treeitem sans enfant. La
   profondeur est lue depuis un contexte et exprimée UNIQUEMENT par de
   l'indentation (`calc(var(--ds-space-4) * (level - 1) + var(--ds-space-2))`,
   un calcul CSS piloté par les tokens, jamais une valeur pixel en dur) et
   `aria-level` — jamais une ligne verticale de guidage, jamais une boîte,
   une Card ou un fond gris. Pattern WAI-ARIA Tree View complet : la racine
   est `role="tree"` ; chaque ligne est `role="treeitem"` portant
   `aria-level`/`aria-setsize`/`aria-posinset` (calculés structurellement
   depuis la position parmi les frères, jamais une prop que le
   consommateur définit) ; chaque `TreeView.Content` est `role="group"`.
   Le clavier suit exactement le modèle APG, câblé à la main à la racine
   via un seul gestionnaire `keydown` délégué et des appels `.focus()`
   littéraux (une exception justifiée, le même précédent déjà utilisé par
   MultiSelect/TimePicker/DateRangePicker gelés, puisqu'aucun modèle
   clavier d'arbre packagé n'existe à composer) : ArrowDown/ArrowUp
   déplacent un `tabIndex` roving à travers chaque treeitem actuellement
   rendu (le `Collapsible.Content` démonte entièrement une branche fermée,
   donc « rendu » signifie déjà « visible ») ; Home/End sautent au premier/
   dernier treeitem ; ArrowRight ouvre une branche fermée ou entre dans son
   premier enfant ; ArrowLeft ferme une branche ouverte ou remonte vers son
   parent ; Entrée/Espace n'ont besoin d'aucun gestionnaire puisque chaque
   ligne est un vrai `<button>`. Compose UNIQUEMENT les tokens Typography
   et le Collapsible gelé — aucun GlassSurface, aucune Card, aucune ombre,
   aucun dégradé, aucune ligne décorative, aucune boîte autour d'un nœud.
   Preuve `/dev/tree-view` + `scripts/tree-view-proof.mjs` verte (structure
   ARIA, setsize/posinset, absence de ligne de guidage, comportement
   default-open/contrôlé/non contrôlé/désactivé, Icon/Badge/Avatar composés
   sans adaptation, troncature des labels longs, responsive, RTL,
   navigation clavier complète vérifiée de bout en bout, vérification
   anti-régression contre Collapsible/Accordion/ActivityFeed/Timeline gelés).
   Grep propre (la seule occurrence de transition-transform est la chaîne
   de rotation du chevron déjà gelée à l'identique dans Accordion et
   Collapsible). **NON GELÉ** — attendre validation visuelle.

   **ActivityFeed (Data Display) : GELÉ (2026-07-10).** Une Frozen Review
   complète (composant, captures, preuve Playwright, API, architecture,
   tokens, dépendances) n'a trouvé aucun défaut objectif — zéro code
   changé, gel tel quel. API publique désormais figée (ADR nécessaire pour
   la modifier). Compound réel (`ActivityFeed`/
   `ActivityFeed.Item`/`ActivityFeed.Avatar`/`ActivityFeed.Icon`/
   `ActivityFeed.Content`/`ActivityFeed.Title`/`ActivityFeed.Description`/
   `ActivityFeed.Meta`/`ActivityFeed.Actions`). Répond à UNE seule
   question : « qu'est-ce qui s'est passé récemment ? » — à distinguer
   nettement de Timeline (« dans quel ordre ces événements se sont-ils
   produits ? », un axe chronologique tracé comme une ligne entre des
   points ; ActivityFeed ne trace aucun axe, seulement une liste
   d'activités lues pour leur contenu). Aucune logique métier : ni
   notifications push, ni temps réel, ni WebSocket, ni likes, ni
   commentaires, ni réponses, ni réactions, ni favoris, ni état non-lu, ni
   sélection, ni pagination, ni scroll infini, ni chargement, ni filtre,
   ni groupe, ni tri, ni recherche — tout cela appartient aux écrans
   métier. Pas Table (compare des propriétés alignées en colonnes ;
   ActivityFeed n'en a aucune). Pas List (une séquence générique sans
   anatomie fixe ; ActivityFeed a une anatomie précise : acteur/icône,
   titre, description, métadonnées, actions, toujours dans cet ordre).
   Pas Card (détail complet isolé avec sa propre surface ; un
   ActivityFeed.Item est une ligne plate lue au sein d'une liste). Pas
   Accordion (divulgation progressive ; chaque item est toujours visible).
   Pas TreeView (containment hiérarchique ; ActivityFeed est plat). Pas
   une Notification (actionnable et à état — lu/non lu, rejetable ;
   ActivityFeed n'a rien de tout cela). Pas un Audit Log (machinerie de
   conformité, immuable, filtrable, qu'ActivityFeed n'implémente pas). Pas
   Chat/Comment Thread (contenu conversationnel à double sens ;
   ActivityFeed est à sens unique, rapporté par le système). Pas History
   (souvent réversible/annulable, lié à un seul objet ; ActivityFeed est
   transversal). Pas un Feed social (Facebook/Twitter/Instagram/LinkedIn/
   Discord/Slack — réactions, commentaires, fils : interdiction absolue).
   `ActivityFeed` rend un vrai `<ul>` (contrairement au `<ol>` de
   Timeline — l'ordre n'est pas ici le point sémantique) de
   `ActivityFeed.Item` en `<li>`. `ActivityFeed.Avatar`/
   `ActivityFeed.Icon` sont de simples emplacements de colonne de tête
   partageant une empreinte fixe identique, pour qu'un `Avatar` ou une
   `Icon` réel et non modifié s'aligne identiquement ligne après ligne.
   Les lignes sont séparées par le vrai `Separator` gelé (composé
   directement, à un quart de sa force habituelle, `divider/40` —
   identique à l'atténuation déjà utilisée par Table — jamais un div
   personnalisé) ; le séparateur final du dernier item est masqué via un
   sélecteur CSS structurel `:last-child`, jamais un index JS. `compact`
   (booléen) resserre le rythme des lignes ; `align` (`start` par
   défaut/`center`) définit si l'emplacement de tête s'aligne en haut ou
   au centre vertical de la ligne — les deux sont de la pure mise en
   page, sans signification métier. Compose UNIQUEMENT les tokens
   Typography, le token partagé `divider`, et tout contenu qu'un
   consommateur place dans ses emplacements — aucun GlassSurface, aucune
   Card, aucune ombre, aucun dégradé, aucune animation, aucun élément
   décoratif dessiné par ActivityFeed lui-même. Preuve `/dev/activity-feed`
   + `scripts/activity-feed-proof.mjs` verte (structure `<ul>`/`<li>`
   native, Separator atténué et masqué après le dernier item, rythme
   compact/confortable, Avatar/Icon/Badge/Button/Code composés sans
   adaptation, empreintes de slots identiques, métadonnées en
   `tabular-nums`, contenu long qui s'enroule sans troncature,
   comportement responsive toujours vertical, RTL, aucune région live/
   état non-lu/rôle de notification fabriqué, vérification
   anti-régression contre Timeline/Table/Accordion/Separator gelés). Grep
   propre. **NON GELÉ** — attendre validation visuelle.

   **Timeline (Data Display) : GELÉ (2026-07-10).** Après le passage Craft
   Review (ligne de connexion atténuée à `divider/40` ; `Timeline.Dot` uni
   réduit à un point de 8px à contour fin), une Frozen Review complète
   (composant, captures, preuve Playwright, API, tokens, architecture,
   dépendances) n'a trouvé aucun autre défaut objectif — zéro code changé,
   gel tel quel. API publique désormais figée (ADR nécessaire pour la
   modifier). Compound réel (`Timeline`/`Timeline.Item`/
   `Timeline.Separator`/`Timeline.Dot`/`Timeline.Content`/`Timeline.Title`/
   `Timeline.Description`/`Timeline.Time`), la même forme que le Timeline
   de MUI. Répond à UNE seule question : « dans quel ordre ces événements
   se sont-ils produits ? » Aucune logique métier : ni likes, ni
   commentaires, ni notifications, ni pagination, ni virtualisation, ni
   temps réel, ni filtre, ni groupe, ni tri — tout cela appartient à un
   futur ActivityFeed séparé. Pas ActivityFeed (le futur sur-ensemble de
   Timeline). Pas Stepper (une tâche fixe et prospective avec une machine
   d'état completed/current/pending — Timeline n'a aucun « courant », c'est
   un enregistrement en lecture seule du passé). Pas Progress (une seule
   quantité continue, aucun événement discret nommé). Pas Table (compare
   plusieurs propriétés ALIGNÉES entre objets ; Timeline n'a qu'un seul
   axe, le temps). Pas List (ordre arbitraire vs chronologie qui EST le
   sujet). Pas Card (le détail complet d'un objet vs une séquence). Pas
   TreeView (containment hiérarchique vs séquence plate). Pas Calendar (une
   grille spatiale où l'on planifie DANS des créneaux vs un enregistrement
   linéaire en lecture seule). Pas Chart (une tendance agrégée vs des
   événements discrets et lisibles). Pas Accordion (sections de
   divulgation indépendantes, aucun axe chronologique). `Timeline` rend un
   vrai `<ol>` de `Timeline.Item` en `<li>` — l'ordre est sémantique. La
   ligne de connexion est un simple filet `divider` de 1px, possédée par le
   `Timeline.Separator` de l'événement PRÉCÉDENT et tracée seulement APRÈS
   son Dot, vers le suivant ; la ligne finale du dernier item est masquée
   via un sélecteur CSS structurel `:last-child` sur la racine, jamais un
   index JS. `Timeline.Dot` est un petit cercle à contour discret
   (`border-border`, comme l'anneau « pending » du Stepper gelé) qui
   grandit uniquement pour accueillir une icône ou un Avatar enfant (CSS
   `has-[>*]`, aucune prop supplémentaire). `Timeline.Time` utilise
   `tabular-nums` (même convention que les cellules numériques de Table).
   `orientation` (`vertical` par défaut/`horizontal`) est un simple bascule
   d'axe ; `align` (`start` par défaut/`end`) place `Timeline.Content`
   avant ou après l'axe — les deux sont de la pure mise en page, RTL-aware
   via le `flex-direction` logique natif, sans signification métier.
   Compose UNIQUEMENT les tokens Typography et les tokens partagés
   `divider`/`border` — aucun GlassSurface, aucune Card, aucune ombre,
   aucun dégradé, aucune animation. Preuve `/dev/timeline` +
   `scripts/timeline-proof.mjs` verte (structure `<ol>`/`<li>` native, deux
   axes, ligne aria-hidden disparaissant après le dernier item, Avatar/
   Badge/Icon composés dans Dot/Content sans adaptation, Dot qui grandit
   pour une icône, `tabular-nums` sur Time, rythme dense/confortable,
   contenu long qui s'enroule sans troncature, responsive, RTL,
   vérification anti-régression contre Table/Accordion/Collapsible/
   Separator gelés). Grep propre. **NON GELÉ** — attendre validation
   visuelle.

   **Table (Data Display) : GELÉ (2026-07-10).** Après le passage Craft
   Review (poids du header `font-semibold` ; séparateurs déplacés de
   `Table.Row` vers `Table.Header`/`Table.Body`, limite du header en
   `divider` pleine force, lignes du corps atténuées à `divider/40` ;
   `tabular-nums` sur les cellules), une Frozen Review complète (composant,
   captures, preuve Playwright, tokens, API, dépendances) n'a trouvé aucun
   autre défaut objectif — zéro code changé, gel tel quel. API publique
   désormais figée (ADR nécessaire pour la modifier). Premier composant de
   la nouvelle catégorie Data Display.
   Répond à UNE seule question : « comment comparer plusieurs objets selon
   plusieurs propriétés à la fois ? » N'affiche que des données, aucune
   logique métier : ni pagination, ni tri, ni filtre, ni édition, ni
   colonnes redimensionnables, ni glisser-déposer, ni sélection, ni
   virtualisation, ni scroll infini, ni overlay de chargement, ni menu de
   colonne, ni action groupée — tout cela appartient à un futur DataGrid
   séparé, jamais à Table. Pas DataGrid (le futur sur-ensemble de Table).
   Pas List (une séquence unique, sans colonnes multiples ALIGNÉES). Pas
   Card (le détail complet d'UN objet, ne passe jamais à l'échelle de la
   comparaison). Pas TreeView (containment hiérarchique, pas une
   comparaison de pairs à plat). Pas Timeline (un seul axe chronologique).
   Pas Chart (une tendance visuelle approximative vs des faits discrets
   exacts). Pas Accordion (divulgation progressive, pas une comparaison
   simultanée). Pas Tabs (bascule une seule vue ; Table montre toutes les
   lignes/colonnes en même temps). Pas Grid Layout (arrangement CSS pur,
   aucun rôle sémantique de tableau). Compose DIRECTEMENT les éléments
   natifs `table`/`thead`/`tbody`/`tfoot`/`tr`/`th`/`td`/`caption` — jamais
   un `<div>` réimplémentant la sémantique d'un tableau, donc chaque rôle
   ARIA natif et chaque comportement natif (zoom navigateur, sélection de
   texte, navigation lecteur d'écran) sont hérités gratuitement. La seule
   concession nécessaire est un simple wrapper `overflow-x-auto` (un
   `<table>` ne peut pas défiler lui-même), sans bordure/fond/padding
   propre — sur un écran étroit le tableau défile horizontalement, ne
   casse jamais ses colonnes et ne se transforme jamais en pile de Cards.
   `stickyHeader` est PUREMENT visuel (`position: sticky` + un fond,
   propagé via un React Context vers `Table.Header` — aucune logique de
   suivi de scroll). `align` (`start`/`center`/`end` sur `Table.Head`/
   `Table.Cell`) est une alignement logique, correct en RTL — la bonne
   façon d'aligner une colonne numérique sans coder en dur gauche/droite.
   Ne compose QUE les tokens Typography et le token couleur `divider` déjà
   partagé avec Separator gelé — aucun GlassSurface, aucune Card, aucune
   ombre, aucun quadrillage épais, aucun style « tableur » : l'en-tête est
   discret (`text-body-sm`/`font-medium`/`text-text-secondary`, un seul
   filet sous l'en-tête, jamais un fond gris épais), chaque ligne séparée
   de la suivante par le même filet unique, jamais un quadrillage vertical
   et horizontal complet. API : `Table` (`stickyHeader`/`className`) ·
   `Table.Header`/`Table.Body`/`Table.Footer`/`Table.Row` (`className`) ·
   `Table.Head`/`Table.Cell` (`align`/`className`) · `Table.Caption`
   (`className`). Preuve `/dev/table` + `scripts/table-proof.mjs` verte
   (sémantique native, caption, header/footer, alignement numérique
   vérifié en LTR et RTL à la fois par la valeur logique calculée et la
   position physique réelle du texte, contenu mixte composant Avatar/
   Badge/Code gelés sans aucune adaptation, contenu long qui s'enroule,
   sticky header, scroll horizontal responsive sans jamais devenir une
   pile de Cards, RTL, vérification anti-régression contre Accordion/
   Collapsible/Separator gelés). Grep propre (zéro GlassSurface/blur/
   backdrop-filter/rgba/shadow/transition/animation et zéro hex/px/ms en
   dur hors prose de doc-comment). **NON GELÉ** — attendre validation
   visuelle.

   **Accordion (Disclosure) : GELÉ (2026-07-09).** Passe de craft
   (pré-gel) corrigeant trois incohérences objectives — rayon du Trigger
   `rounded-md`→`rounded-sm` (aligné sur DropdownMenu.Item/Breadcrumb.Link,
   même forme de ligne pleine largeur) ; anneau de focus
   `ring-accent`→`ring-accent-accessible` (aligné sur tous les autres
   primitifs plats) ; `data-[state=open]:rounded-b-none` pour que le
   surlignage hover/focus du Trigger ouvert se fonde dans le Content au
   lieu de flotter comme une pilule déconnectée — puis Frozen Review
   complète (composant, code mort, imports/props/branches inutilisés,
   captures, preuve Playwright, API, tokens, dépendances) : aucun autre
   défaut objectif trouvé, gel tel quel. API publique nécessite désormais
   un ADR pour être modifiée. Détail de la construction : première brique
   de la nouvelle catégorie Disclosure. Répond à UNE seule chose : « quel
   contenu supplémentaire puis-je
   révéler ? » — jamais une navigation, un feedback, un overlay, une
   donnée ou une action. Pas Collapsible (une seule section togglable sans
   relation aux frères ; Accordion est un GROUPE de Collapsibles coordonnés
   — `type="single"` impose au plus un ouvert, `type="multiple"` en
   autorise plusieurs, plus la navigation clavier partagée sur tout le
   groupe). Pas Tabs (gelé : Tabs COMMUTE la région visible — les panneaux
   inactifs disparaissent entièrement ; Accordion révèle du contenu
   SUPPLÉMENTAIRE sur place, chaque déclencheur reste visible). Pas
   TreeView (données hiérarchiques avec sélection ; Accordion divulgue des
   SECTIONS DE CONTENU indépendantes, aucune sélection). Pas
   Drawer/Sheet/BottomSheet (surfaces OVERLAY : portées, scrim,
   dismissibles — Accordion n'a ni overlay, ni scrim, ni portail, ni geste
   de fermeture). Pas Popover/Tooltip (transitoires, ancrés). Pas Dialog
   (modal bloquant). Pas NavigationMenu (mène vers d'autres
   DESTINATIONS ; Accordion révèle du contenu EN LIGNE sur la page
   actuelle). Compose DIRECTEMENT `@radix-ui/react-accordion` (nouvelle
   dépendance épinglée `1.2.16`) — aucun wrapper intermédiaire. `Trigger`
   associe en interne le `Header` de Radix à son `Trigger` (contrat
   d'accessibilité de Radix exigeant le contrôle interactif à l'intérieur
   d'un titre) — un détail d'implémentation de `Trigger`, jamais une pièce
   séparée de l'API publique. `Item` ne décide d'aucune bordure/fond/
   espacement propre (Invariant A1 — une liste divisée se compose avec le
   `Separator` gelé, au point d'usage). `Content` ne dessine aucune carte
   ni nouvelle surface : le contenu apparaît directement sous le Trigger,
   jamais un `GlassSurface`. Seule affordance du Trigger : un fond
   hover/focus plat piloté par tokens (jamais de verre/flou/ombre) plus un
   petit chevron qui pivote de 180° avec la même transition calme et
   instantanée `duration-fast`/`ease-standard` déjà utilisée par les
   chevrons gelés de Select/DropdownMenu — aucun rebond, aucun spring.
   `Content` ne contraint jamais la hauteur : aucun `max-h-*`, aucune
   hauteur fixe, aucun scroll interne — vérifié. 100 % du comportement
   Radix conservé tel quel : ARIA, clavier complet (Arrow/Home/End/Enter/
   Space, vérifié), focus, RTL. Vérifié : `single` ferme les autres
   panneaux ; `multiple` en garde plusieurs ouverts indépendamment ;
   `collapsible` permet de refermer à rien ; non-`collapsible` marque le
   seul panneau ouvert `aria-disabled="true"` (l'application la plus
   stricte possible de « toujours un panneau ouvert », sans empêcher de
   basculer vers un autre panneau) ; `disabled` sur un Item ne bloque que
   lui ; `disabled` sur le Root bloque tout ; contrôlé/non contrôlé via
   `value`/`onValueChange`/`defaultValue` ; un Accordion imbriqué dans le
   contenu d'un Item s'ouvre/ferme indépendamment de l'extérieur. API :
   `Accordion` (`type`/`value`/`defaultValue`/`onValueChange`/
   `collapsible`/`disabled`/`orientation`/`dir`/`className`) ·
   `Accordion.Item` (`value`/`disabled`/`className`) · `Accordion.Trigger`
   (`className` + attributs natifs) · `Accordion.Content`
   (`forceMount`/`className`). Preuve `/dev/accordion` +
   `scripts/accordion-proof.mjs` verte (ARIA, machine d'état single/
   multiple/collapsible, contrôlé/non contrôlé, item/groupe désactivé,
   hauteur du contenu long, indépendance imbriquée, timing de rotation du
   chevron, RTL, clavier complet, vérification anti-régression). **NON
   GELÉ** — attendre validation visuelle.

   **Separator (Layout) : GELÉ (2026-07-09).** Frozen Review complète
   (composant, code mort, imports/props/branches inutilisés, captures,
   preuve Playwright, API, tokens, dépendances) — aucun défaut objectif
   trouvé, zéro code modifié, gel tel quel. API publique
   (`orientation`/`decorative`/`className`) nécessite désormais un ADR pour
   être modifiée. Détail de la construction :

   **Separator (Layout) : CONSTRUIT au processus complet
   (2026-07-09).** Le composant pré-méthodologie (bundlé avec Alert/Icon)
   était déjà très proche de la cible (Radix Separator, `orientation`/
   `decorative`/`className`, token `bg-divider`, épaisseur hairline) — la
   logique reste inchangée ; analyse, doc-comment étendu, `/dev/separator` et
   `scripts/separator-proof.mjs` ajoutés. Répond à UNE seule chose : « ces
   deux groupes de contenu sont visuellement distincts. » Ne crée aucun
   espacement, aucune section, aucune surface, ne gère aucun layout — il ne
   fait que matérialiser une frontière ; ne peut jamais porter d'enfants,
   de label ou d'icône. Pas un `<hr>` nu (bloc uniquement, porte un sens
   implicite de « rupture thématique » selon la spec HTML5 qui décrit mal
   un séparateur d'UI, et embarque des marges/bordures par défaut que chaque
   consommateur devrait réinitialiser — Separator couvre les deux
   orientations, marge zéro par construction, et expose le vrai contrat
   ARIA Separator). Pas Divider (nom utilisé ailleurs, ex. Material Design
   3 — DISCIPLINE nomme ce composant d'après le terme ARIA/WAI-APG que son
   rôle implémente, `separator`). Pas Border (propriété CSS sur le bord
   d'un élément existant, pas un contenu autonome avec son propre rôle
   d'accessibilité). Pas Spacer (crée de l'espace SANS marque visible —
   responsabilité opposée). Pas Card/GlassCard (une surface structurelle
   avec padding et fond ; Separator n'a aucune surface, aucun padding,
   aucun contenu). Pas Section (regroupement de contenu avec des enfants ;
   Separator est une feuille sans contenu). Pas Stack (arrange les enfants
   via `gap` — un Stack peut placer des Separators entre ses enfants par
   commodité, mais l'arrangement reste sa propre responsabilité). Pas Grid
   (layout pur, aucun sens de frontière sémantique). Pas Heading (signal
   typographique d'IMPORTANCE ; Separator ne porte aucun contenu ni sens
   d'importance, seulement l'adjacence). Compose UNIQUEMENT Radix Separator
   (motif WAI-ARIA Separator : `role="separator"` + `aria-orientation`
   quand `decorative={false}` ; `role="none"` — retiré explicitement, pas
   simplement omis, selon la recommandation APG pour les séparateurs
   purement décoratifs — quand `decorative` vaut true, le défaut) plus le
   token couleur `bg-divider` et une épaisseur hairline. Aucun
   GlassSurface/Card/Badge/Button/Tooltip/Popover, aucun
   shadow/blur/gradient/glow, aucune transition ni animation, aucune
   icône/label/texte, aucun enfant, aucune logique JS. API : `orientation`
   (`horizontal` défaut · `vertical`) · `decorative` · `className` (+
   attributs natifs). Vérifié : zéro enfant sur chaque instance ; le mode
   décoratif porte `role="none"`, le mode non-décoratif expose
   `role="separator"` + `aria-orientation` ; rendu correct dans un vrai
   GlassCard/Drawer/Modal ; suit la largeur de son conteneur en responsive ;
   RTL sans logique directionnelle ; zéro style interactif/animé sur la
   page. Aucun consommateur de production n'existait au-delà des démos dev
   — aucun autre fichier modifié. Preuve `/dev/separator` +
   `scripts/separator-proof.mjs` verte. **NON GELÉ** — attendre validation
   visuelle.

   **Text (Typography) : GELÉ (2026-07-09).** Frozen Review complète
   (composant, captures, preuve Playwright, API, tokens, dépendances) —
   aucun défaut objectif trouvé, zéro code modifié, gel tel quel. API
   publique (`as`/`className`/`children`) nécessite désormais un ADR pour
   être modifiée. Détail de la construction :

   **Text (Typography) : CONSTRUIT au processus complet, NON GELÉ
   (2026-07-09).** Le `<Text size="body-lg".."caption" tone="default".."tertiary"
   weight="regular".."semibold">` pré-méthodologie (bundlé avec
   Alert/Icon/Separator) devient un vrai primitif analysé. Répond à UNE seule
   chose : « ceci est du contenu textuel » — jamais un titre, une action, une
   propriété, une valeur technique, un nom de champ ou une navigation. Pas un
   `<span>` nu (aucune relation aux tokens DISCIPLINE — chaque consommateur
   improviserait sa propre taille/couleur, dérivant à mesure que les tokens
   évoluent), pas Heading (rôle structurel du plan de titres, un par titre ;
   Text est le corps non numéroté qui suit), pas Label/Code/Badge (axes
   différents), pas Paragraph (`<Text as="p">`, le défaut, couvre déjà ce
   cas), pas Caption (annotation secondaire plus petite, un futur frère), pas
   Link/Button (interactifs), pas HelperText (lié à un champ via
   `aria-describedby`, un souci Forms). **Changement d'API (reconstruction) :
   `size`/`tone`/`weight` sont entièrement supprimés** — Text rend l'unique
   style de corps canonique (`text-body text-text`) depuis les tokens ; un
   consommateur ayant besoin d'une autre combinaison de tokens utilise
   `className`, exactement comme tout autre primitif DISCIPLINE. `as` change
   uniquement le tag sémantique — `p` (défaut) · `span` · `div` · `strong` ·
   `em` · `small` — jamais le style visuel (vérifié : chaque tag porte
   exactement la même taille de police calculée que le paragraphe par
   défaut). Zéro marge, zéro padding propre (vérifié : `0px` sur tous les
   côtés). **Migration consommateur (large) :** ~65 sites d'appel sur 23
   fichiers migrés de `size=`/`tone=`/`weight=` vers `className` — y compris
   les TROIS bannières Feedback GELÉES (`SuccessBanner`/`ErrorBanner`/
   `WarningBanner`) et les trois primitifs d'état gelés
   (`EmptyState`/`ErrorState`/`OfflineState`), dont les champs internes
   `sizeConfig` ont été retypés de noms de tokens nus vers des classes
   Tailwind littérales (ex. `'body-sm'` → `'text-body-sm'`) — une migration
   interne pure, aucun changement visuel/comportemental sur les six
   composants gelés, vérifié contre des captures fraîches ne montrant aucune
   régression. Preuve `/dev/text` + `scripts/text-proof.mjs` verte (vrais
   tags p/span/strong/em/small à taille identique, marge/padding zéro, repli
   du paragraphe long, rendu dans un vrai Card/Drawer/Modal, parité de taille
   Text/Code, stabilité responsive, RTL, vérification anti-régression sur
   les six consommateurs gelés). **NON GELÉ** — attendre validation visuelle.

   **Heading (Typography) : GELÉ (2026-07-09).** Frozen Review complète
   (composant, captures, preuve Playwright, API, tokens, dépendances) —
   aucun défaut objectif trouvé, zéro code modifié, gel tel quel. API
   publique (`level`/`as`/`className`/`children`) nécessite désormais un ADR
   pour être modifiée. Détail de la reconstruction (2026-07-09) : Le `<Heading level="h1".."h5"|"display-1".."display-3">`
   pré-méthodologie (bundlé avec Alert/Icon/Separator/Text) devient un vrai
   primitif analysé. Répond à UNE seule chose : « cette information est un
   titre » — jamais une mise en page, une section, une hiérarchie métier, une
   navigation ou une action. Pas Text (aucune place dans le plan de titres du
   document — l'effacer en prose stylée est une perte SÉMANTIQUE, pas de
   taille), pas Label/Code/Badge/Button (axes différents), pas
   CardHeader/PageHeader (composites de mise en page qui UTILISENT un
   Heading), pas Hero (section marketing avec décisions de layout que
   l'Invariant A1 interdit à un composant de base), pas « Title » (terme
   ambigu ailleurs), pas Caption (hors hiérarchie de titres). **Changement
   d'API (reconstruction) : `level` passe d'une chaîne à un NOMBRE 1–6**
   (`level={2}`), découplé de `as` (le tag sémantique) — exactement comme
   Primer `Heading` et `@atlaskit/heading` : `<Heading as="div" level={2}>`
   garde la taille visuelle h2 tout en sortant complètement de la sémantique
   de titre. `display-1/2/3` sont retirés du périmètre de Heading (un rôle
   d'affichage Hero n'est pas un titre de document). **Conflit signalé, pas
   corrigé en silence :** l'échelle typographique canonique de DISCIPLINE ne
   définit que cinq tailles de titre — aucun token `--ds-text-h6` n'existe, et
   l'identité visuelle gelée interdit d'en inventer un hors correctif UX
   strictement nécessaire. Résolution : `level={6}` rend un vrai `<h6>`
   (plan de titres correct) qui réutilise la taille visuelle de `h5`, comme
   Material Design 3 et Carbon qui n'inventent pas un palier toujours plus
   petit par niveau. Zéro marge interne, jamais. **Migration
   consommateur :** ~48 sites d'appel sur 23 fichiers de démo dev migrés de
   `level="hN"` vers `level={N}` ; les trois primitifs d'état gelés
   (EmptyState/ErrorState/OfflineState) ont eu leur champ de config interne
   `title: 'h5'|'h4'|'h3'` retypé en `title: 5|4|3` — un changement de type
   interne pur, aucun changement visuel/comportemental, les trois compilent
   toujours et leur API publique gelée reste intacte. Preuve `/dev/heading` +
   `scripts/heading-proof.mjs` verte (vrais tags h1–h6, échelle strictement
   décroissante, réutilisation h6→h5, découplage level/as, marge zéro, repli
   du titre long, rendu correct dans un vrai Card/Drawer/Modal, stabilité du
   tag en responsive, RTL, vérification anti-régression). **NON GELÉ** —
   attendre validation visuelle.

   **Code (Data Display) : RECONSTRUIT au processus complet, NON GELÉ
   (2026-07-09).** Le `<Code variant="inline"|"block">` pré-méthodologie
   (bundlé avec Alert/Heading/Icon/Separator/Text) devient un vrai primitif
   analysé. Répond à UNE seule chose : « ce texte est une valeur technique, pas
   de la prose » (commande, variable, endpoint, méthode HTTP, token CSS,
   raccourci) — rendu verbatim, monospace. Pas Text/Heading (prose
   proportionnelle, aucune sémantique `<code>`), pas Badge (une propriété
   ATTACHÉE à une donnée — Code EST la valeur, sans couleur ni surface), pas
   Label (nomme un champ de formulaire), pas Link/Button (interactif — Code
   est inerte), pas un primitif Kbd dédié (`<code>` = « fragment de code » vs
   `<kbd>` = « saisie utilisateur » selon la spec HTML — Code ne se scinde pas
   pour autant : il reste `<code>` par défaut et expose `asChild` pour rendre
   la même matière sur un vrai `<kbd>`, prouvé sur la démo Keyboard Shortcut),
   pas CodeBlock/Terminal/Monaco/CodeMirror (surfaces multi-lignes,
   scrollables, souvent éditables — une AUTRE responsabilité ; CodeBlock reste
   un futur frère légitime, jamais un mode de ce composant). **Changement
   d'API (reconstruction) : le prop `variant` (`inline`/`block`) est
   entièrement supprimé** — Code est toujours une ligne, jamais un `<pre>` ;
   `asChild` (Radix Slot, même convention que le Button gelé) le remplace comme
   seule échappatoire. Aucun prop `size`/`variant`/`color`/`weight` : Code ne
   fixe aucune taille de police (garde `font-size: inherit`), donc s'aligne
   toujours sur le contexte de texte environnant — vérifié sur trois tailles
   ambiantes différentes. Composent UNIQUEMENT les tokens Typography : fond
   neutre discret (`bg-surface`), rayon faible (`rounded-xs`), `font-mono` —
   aucun verre/ombre/transition/animation/icône/bouton copier/coloration
   syntaxique. Non interactif partout (aucun `role`, hors tab order, jamais un
   lien) ; les valeurs longues se replient dans leur conteneur
   (`break-words`, zéro débordement). **Migration consommateur :** la seule
   utilisation de `variant="block"` (`showcase.tsx`, galerie dev générique, pas
   un composant gelé) a été retirée ; `drawer-demo.tsx` et le reste de
   `showcase.tsx` utilisaient déjà le défaut préservé et compilent sans
   changement. Preuve `/dev/code` + `scripts/code-proof.mjs` verte (monospace,
   fond neutre, contrat non-interactif, héritage de taille, `asChild`→`<kbd>`,
   méthodes HTTP en éléments séparés, repli des valeurs longues, responsive,
   RTL). **NON GELÉ** — attendre validation visuelle.

   **Label (Forms accessibilité) : CONSTRUIT au processus complet, puis PASSE
   DE POLISH (2026-07-08), NON GELÉ.** Primitif d'ACCESSIBILITÉ, pas de
   présentation : répond seulement « quel est le nom de ce champ ? » via un
   vrai `<label>` lié par `htmlFor`. Ne valide jamais, n'affiche ni
   erreur/succès/aide, ne gère aucun état. **Deux défauts objectifs
   corrigés :** (1) le marqueur `required` n'est plus rouge (rouge = signal
   d'erreur prématuré) → discret, `aria-hidden`, poussé à `text-text-secondary`
   lors du polish pass (un cran plus lisible que `text-text-tertiary`) ; (2)
   vrai prop `disabled` (atténué, jamais invisible), en gardant
   `peer-disabled` — la preuve du polish pass vérifie désormais une VRAIE
   relation DOM (`control.disabled === true`, non-interactif), pas seulement
   l'opacité. Layout inline → long/multiline se replient proprement, marqueur
   attaché même en RTL ; un soupçon de `tracking-[0.01em]` ajouté au polish
   pass pour une présence de label plus nette. Icône REJETÉE (documenté).
   API : `htmlFor` · `required` · `disabled` · `className` · `children`. Le
   changement de couleur de l'astérisque s'applique aux ~28 consommateurs de la
   famille Input (tous compilent). Preuve `/dev/label` +
   `scripts/label-proof.mjs` verte. **NON GELÉ** — attendre validation visuelle.

   **Sprint 1 — AvatarLauncher : CONSTRUIT, NON GELÉ (2026-07-08).** La porte
   d'entrée unique et calme vers le Guide (`src/components/avatar/avatar-launcher.tsx`)
   — première brique du module Avatar, pas du DS. Compose UNIQUEMENT des
   primitives gelées (IconButton pour la matière glass, Icon = boussole,
   Spinner, Badge non-lus neutre, Avatar présence coach, Tooltip) ; aucune
   nouvelle matière/surface/animation. États : `state`
   (idle/loading/active/coach/unavailable) + `unread` + `disabled` natif ;
   hover/press/focus natifs ; « waiting » = Badge non-lus discret. UNE seule
   taille considérée (56px — un launcher garde une cible constante partout ; le
   responsive = placement, pas rétrécissement ; contourne aussi l'échelle
   non-monotone de l'IconButton gelé). Clavier + ARIA complets
   (`aria-haspopup="dialog"`/`aria-expanded`/`aria-busy`/nom accessible), RTL
   correct via propriétés logiques. API : `state` · `unread` · `coach` ·
   `label` · `className`. Preuve `/dev/avatar-launcher` +
   `scripts/avatar-launcher-proof.mjs` verte. **Aucune autre brique Avatar tant
   que le Launcher n'est pas gelé.**

   Historique — **Badge : PASSE DE SIMPLIFICATION (2026-07-08).** Cohérence du
   design system plutôt que surface d'API. Palette réduite aux quatre vraies
   couleurs sémantiques (neutral/success/warning/error ; `info` supprimé) — les
   propriétés métier (Coach/Premium/Draft/Hypertrophy) portent toutes le verre
   neutre, donc un écran se lit comme une seule matière retenue, pas un nuancier.
   Solids approfondis + désaturés (quasi-noir / vert forêt / ambre / oxblood
   profonds — Apple/Linear/GitHub). Prop `shape` supprimée (TOUJOURS un pill).
   Tailles réduites à `sm`/`md`. Icône ~1px plus présente, texte toujours
   dominant. Démo élaguée aux sections vraiment distinctes. API désormais :
   `variant` (neutral/success/warning/error) · `appearance` (soft/solid/outline)
   · `size` (sm/md) · `icon` · `className`. Responsabilités/composition/
   accessibilité/logique/contrat non-interactif inchangés. Preuve re-run verte
   (34 badges). **Reste NON GELÉ tant que la validation visuelle explicite n'a
   pas eu lieu.**

   Historique — **CRAFT PASS Liquid Glass (2026-07-08).** Refonte
   visuelle complète : le Badge est désormais un MICRO-FRAGMENT du Liquid
   Glass DISCIPLINE (matière déplacée dans `.ds-badge` du nouveau
   `src/styles/badge.css`, règle de Construction comme `.ds-glass`/`.ds-micro`)
   — surface de verre translucide légèrement éclairée, bordure machined
   ultra-fine, léger backdrop blur, couleur portée par le texte/icône + une
   très légère teinte (jamais un aplat agressif). `soft` quasi-neutre,
   `outline` verre nu + hairline coloré, `solid` la seule voix forte
   (noir profond / rouge profond, GitHub/Linear/Apple). Palette désaturée ;
   `info` = primaire DISCIPLINE retenue. Géométrie qui respire davantage, type
   `font-semibold`, rayon `rounded` net à 8px (fini le « bonbon »).
   API/props/logique/comportement/accessibilité/variantes INCHANGÉS ; le
   composant reste grep-clean (matière dans badge.css). Preuve re-run verte.
   **Reste NON GELÉ tant que la validation visuelle explicite n'a pas eu lieu.**

   Historique : primitive Data Display reconstruite depuis une implémentation
   pré-méthodologie (non
   documentée, groupée avec Alert/Avatar/Code/…) au processus complet
   analyse/build/preuve. Une petite information STATIQUE ATTACHÉE à une donnée
   : une propriété courte qui qualifie un contenu existant (Active, Premium,
   Draft, Paid, Coach, Beginner, Hypertrophy, « 12 clients »). UNE seule
   responsabilité : afficher une propriété compacte liée à une donnée.
   Purement informatif, JAMAIS interactif, n'existe jamais seul. Pas un Chip
   (INTERACTIF — sélectionnable/supprimable/filtre, focus+clavier+close ;
   Badge n'est jamais cliquable, ni tabindex/focus/rôle), pas un Tag (un Chip
   d'entrée — mots-clés saisis ; Badge ne se saisit/supprime pas), pas un Pill
   (une FORME, pas une responsabilité — Badge propose `shape="pill"` sans en
   être défini), pas un Label (une légende de champ `<label for>` ; Badge
   décrit une donnée, pas un champ), pas un StatusDot (un point sans texte —
   Badge porte toujours un texte, la couleur n'est jamais seule), pas un
   Counter/Notification badge (un nombre SUPERPOSÉ dans un coin — un Badge
   numérique est inline, pas une surcharge flottante), pas un Avatar (une
   personne), pas un Button (une ACTION), pas Tabs/Stepper/Breadcrumb
   (navigation/progression/position), pas un Progress (une fraction qui évolue
   — Badge est statique, sans piste/valeur). Les familles (statut, catégorie,
   numérique, rôle, priorité, version) se ramènent à UNE responsabilité.
   Compose uniquement les tokens typographiques, un `icon` fourni par le
   caller (typiquement l'Icon gelé), et les tokens de couleur — jamais
   Button/Card/Alert/Toast/Chip. Trois axes orthogonaux pilotés par tokens :
   `variant` (couleur sémantique), `appearance` (soft tint / solid fill /
   outline), `shape` (rounded / pill / square). Aucun glass/blur/shadow,
   jamais de couleur en dur, entièrement STATIQUE — aucune transition, aucune
   animation, aucun focus (vérifié : 54 badges sans rôle, sans tabindex, des
   `<span>`, non focusables, `animation-name: none` ; un Badge ne doit jamais
   devenir cliquable). `inline-flex` sur la ligne de base de la donnée ;
   l'icône optionnelle précède le texte et se retourne sous `dir="rtl"` via
   flex (vérifié : `direction: rtl`). Appearances vérifiées (soft translucide
   0<alpha<1, solid opaque alpha 1, outline sans fond + bordure visible) ;
   tailles xs/sm/md/lg (hauteur strictement croissante) et le Badge garde sa
   taille exacte à travers les viewports — ne se redimensionne jamais
   (vérifié : hauteur identique à 1280px/390px) ; formes (square ≈0 < rounded
   < pill). Migration du rebuild : le seul démo non gelé sur l'ancien
   `variant="accent"` (galerie `/dev/components`) → `info` (même token
   `#6c5ce7`) ; tous les autres consommateurs n'utilisaient que la surface
   préservée et sont intacts. grep zéro GlassSurface/blur/backdrop-filter/
   rgba/shadow/transition/animation/animate-/`.focus()` dans le composant
   (uniquement dans la prose du doc-comment) ; zéro TODO/FIXME/`console.*`/
   import inutilisé ; zéro hex/px/ms en dur. API : `variant`
   (neutral/success/warning/error/info) · `appearance` (soft/solid/outline) ·
   `size` (xs/sm/md/lg) · `shape` (rounded/pill/square) · `icon` · `className`
   (+ attributs natifs du span). UN démo non gelé migré ; ZÉRO fichier gelé
   modifié. Preuve : `/dev/badge` (sur le fond d'écran, badges dans de vraies
   surfaces GlassCard/table/list) — basic · variants · soft/solid/outline ·
   with/without icon · sizes · shapes · status · role · priority · category ·
   count · inside Card/Table/List · responsive · RTL, plus
   `scripts/badge-proof.mjs` (captures desktop/tablet/mobile + RTL ;
   assertions rendu, variants, appearances, tailles, formes, présence d'icône,
   contrat non-interactif, stabilité de taille, RTL). **Built, non frozen** —
   gel interdit tant que la validation visuelle explicite n'a pas eu lieu.

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
