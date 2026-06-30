# DISCIPLINE — BUILD PLAN

> Every implementation phase must comply with DISCIPLINE_CONSTITUTION.md before being considered complete.

> **Document status:** Draft v1.0 · Source of truth for development sequencing.
> **Scope:** Full lifecycle from empty repository to production deployment.
> **Reading order:** Each phase lists its own dependencies. Never start a phase before its listed dependencies are complete.
> **Canonical reference:** All numeric values (colors, spacing, timing, radii, blur, z-index) are governed by `DISCIPLINE_CANONICAL_TOKENS.md`. It overrides all other documents without exception.

---

## READING THIS DOCUMENT

Each phase follows this fixed structure:

- **Objective** — what this phase accomplishes and why it exists at this moment in the sequence
- **Dependencies** — phases and external conditions that must be complete before this phase begins
- **Deliverables** — the exact list of artefacts that must exist when this phase is done
- **Validation criteria** — the pass/fail checklist to close the phase
- **Risks** — known failure modes and their mitigations
- **Implementation order** — the precise internal sequence of tasks within this phase

No code appears anywhere in this document. This is a strategic and architectural plan only.

---

## PHASE INDEX

| # | Phase | Type |
|---|---|---|
| 01 | Repository & Toolchain Bootstrap | Infrastructure |
| 02 | Design Token System | Foundation |
| 03 | Component Library — Level 1 Primitives | Foundation |
| 04 | Component Library — Level 2 Glass & Composite | Foundation |
| 05 | Landing Page — Structure & Layout System | Product |
| 06 | Landing Page — Hero Section | Product |
| 07 | Landing Page — Social Proof Section | Product |
| 08 | Landing Page — Plans Section | Product |
| 09 | Landing Page — Transformations Section | Product |
| 10 | Landing Page — Method Section | Product |
| 11 | Landing Page — Dashboard Preview Section | Product |
| 12 | Landing Page — Testimonials Section | Product |
| 13 | Landing Page — FAQ Section | Product |
| 14 | Landing Page — Contact Section | Product |
| 15 | Landing Page — Footer | Product |
| 16 | Landing Page — Global Motion & Polish | Product |
| 17 | SEO & Metadata Layer | Cross-cutting |
| 18 | Database Schema & Migrations | Infrastructure |
| 19 | Authentication System | Product |
| 20 | Onboarding Flow | Product |
| 21 | API Layer & Server Actions Foundation | Infrastructure |
| 22 | Member Dashboard — Shell & Navigation | Product |
| 23 | Member Dashboard — Workout Module | Product |
| 24 | Member Dashboard — Nutrition Module | Product |
| 25 | Member Dashboard — Habits Module | Product |
| 26 | Member Dashboard — Progress & Photos Module | Product |
| 27 | Member Dashboard — Calendar & Planning | Product |
| 28 | Member Dashboard — Messages & Coaching Chat | Product |
| 29 | Component Library — Level 3 Business Components | Foundation |
| 30 | Stripe Integration — Products & Checkout | Product |
| 31 | Stripe Integration — Webhooks & Lifecycle | Product |
| 32 | Stripe Integration — Customer Portal | Product |
| 33 | Notification System | Product |
| 34 | Email System | Product |
| 35 | Storage — Cloudflare R2 | Infrastructure |
| 36 | Media Production Integration | Product |
| 37 | Performance Optimization | Cross-cutting |
| 38 | Accessibility Audit & Remediation | Cross-cutting |
| 39 | Testing — Unit & Integration | Quality |
| 40 | Testing — End-to-End | Quality |
| 41 | Testing — Visual Regression | Quality |
| 42 | Monitoring & Observability | Infrastructure |
| 43 | Production Deployment | Infrastructure |
| 44 | Launch Readiness & Go-Live | Operations |

---

## PHASE 01 — Repository & Toolchain Bootstrap

### Objective
Establish the project repository with a reproducible, deterministic development environment. Every developer and CI runner must get byte-identical output from the same source. This phase has zero product value but is the prerequisite for every subsequent phase.

### Dependencies
- Empty GitHub repository `hugoizquierdo2906-svg/Discipline` exists and is accessible
- Node.js LTS version pinned and agreed upon
- Access credentials to: Vercel account, GitHub, Cloudflare (for R2), Stripe, Resend, Sentry, PostHog

### Deliverables
- `package.json` with exact dependency versions (no ranges in production dependencies)
- `.nvmrc` / `.node-version` file locking Node version
- `pnpm-lock.yaml` committed (pnpm is the package manager)
- `.gitignore` covering `.env*`, `node_modules`, `.next`, Playwright test results, coverage reports
- `.env.example` with every required key listed (values empty or placeholder)
- `tsconfig.json` with `strict: true`, path aliases (`@/` mapped to `src/`), no `any` allowed
- `next.config.ts` with: bundle analyzer, image domains for Cloudflare R2, security headers
- ESLint configuration: `eslint-config-next`, `@typescript-eslint/recommended`, `eslint-plugin-jsx-a11y`, `eslint-plugin-import`, custom rules forbidding raw color values outside token files
- Prettier configuration aligned with project style (single quotes, no semicolons, trailing commas)
- `lint-staged` + `husky` pre-commit hooks running lint + type-check on staged files
- GitHub Actions CI workflow: install → lint → type-check → build (runs on every push and PR)
- Vercel project linked, preview deployments enabled for all branches
- `src/` directory structure created (empty but correct):
  - `src/app/` — Next.js App Router
  - `src/components/ui/` — Level 1 primitives
  - `src/components/shared/` — Level 2 composites
  - `src/features/` — feature slices
  - `src/lib/` — utilities and adapters
  - `src/styles/` — global CSS and token files
  - `src/types/` — shared TypeScript interfaces
  - `src/hooks/` — shared React hooks
  - `src/server/` — server-only code (actions, services, db)
- `public/` directory structure created per `DISCIPLINE_MEDIA_MAP.md` (subdirectories: `brand/`, `images/`, `videos/`, `backgrounds/`, `textures/`, `mockups/`, `og/`)
- README documenting: how to install, run dev, build, and run tests
- `CHANGELOG.md` initialized

### Validation criteria
- `pnpm install` from a clean clone completes without errors
- `pnpm dev` starts the development server on port 3000 with zero errors
- `pnpm build` completes with zero TypeScript errors and zero ESLint errors
- `pnpm lint` exits with code 0
- A test commit triggers the CI workflow and it passes green
- Vercel preview deployment is live for the initial commit
- No `.env` files with real secrets are committed

### Risks
| Risk | Mitigation |
|---|---|
| Dependency version conflicts between Next.js 15 / React 19 and community packages | Pin all dependencies to exact versions; test build before committing lock file |
| Inconsistent Node versions across environments | Enforce via `.nvmrc` + CI matrix; use Volta or nvm |
| Pre-commit hooks bypassed with `--no-verify` | Document that `--no-verify` is forbidden; CI catches anything that slips through |
| `.env` secrets accidentally committed | `.gitignore` entry + `git-secrets` or `gitleaks` in CI scan |

### Implementation order
1. Initialize repository with `pnpm create next-app` targeting Next.js 15 with TypeScript and App Router
2. Pin Node version in `.nvmrc`
3. Configure TypeScript strict mode and path aliases
4. Install and configure ESLint + Prettier
5. Install and configure Husky + lint-staged
6. Create `src/` directory skeleton
7. Create `public/` directory skeleton per media map
8. Write `.env.example` with all required keys
9. Configure `next.config.ts` with security headers
10. Write GitHub Actions CI workflow
11. Link Vercel project and test first preview deployment
12. Write README and initialize CHANGELOG
13. Commit and push — confirm CI green and Vercel preview live

---

## PHASE 02 — Design Token System

### Objective
Translate `DISCIPLINE_CANONICAL_TOKENS.md` into the project's styling infrastructure. Every visual value in the application must derive from this token layer — no hardcoded values permitted anywhere in component code. This phase establishes the design contract that all subsequent phases respect.

### Dependencies
- Phase 01 complete
- `DISCIPLINE_CANONICAL_TOKENS.md` read and understood as the final authority on all numeric values
- Tailwind CSS installed (already included by Next.js default setup)

### Deliverables
- **[Carried over from Phase 01]** ESLint rule forbidding raw color values (hardcoded hex/rgb/hsl) outside the token files. Deferred from Phase 01 because no token files existed yet; it is the **first item of this phase** so the rule has a valid whitelist target (`src/styles/tokens.css`, `tailwind.config.ts`).
- `src/styles/tokens.css` — CSS custom properties for all token categories:
  - Color palette (background, surface, text, accent, accent-accessible, semantic states)
  - Typography scale (display-1 through caption, all responsive breakpoints)
  - Spacing scale (section-y, hero-y, content, gap tokens)
  - Radius tokens (sm, md, lg, pill)
  - Blur tokens (0 through 48px, glass standard at 32px)
  - Shadow tokens (shadow-1 through shadow-4, contact, ambient, accent-glow)
  - Motion tokens (fast 160ms, standard 240ms, page 480ms, hero 1200ms, easing curves)
  - Z-index tokens (base 0 through tooltip 120)
  - Breakpoint values
- `src/styles/globals.css` importing tokens.css + Tailwind directives + base resets
- `tailwind.config.ts` mapping every CSS custom property to a Tailwind utility:
  - Custom color utilities derived from CSS vars
  - Custom spacing utilities
  - Custom font-size utilities matching typography scale
  - Custom border-radius utilities
  - Custom blur utilities
  - Custom shadow utilities
  - Custom duration and easing utilities
  - Custom z-index utilities
  - Screen breakpoints matching canonical values
- `src/styles/typography.css` — base typographic defaults (font-family: Geist, antialiasing, line-height defaults)
- Geist font loaded via `next/font/google` with display-swap and subset optimization
- `src/lib/tokens.ts` — TypeScript constants mirroring all CSS token values for use in Framer Motion inline styles and GSAP animations (where CSS vars cannot be used directly)
- ESLint rule or Stylelint rule that flags any hardcoded hex color, pixel value for spacing, or duration value outside of the token files
- Documentation comment at the top of each token file pointing to `DISCIPLINE_CANONICAL_TOKENS.md` as source of truth

### Validation criteria
- Every color, spacing, radius, blur, shadow, z-index, and motion value traces back to a token
- `pnpm build` passes with zero errors
- A visual test page (`/dev/tokens` route, accessible only in development) renders all tokens in a visual grid and confirms no broken references
- Tailwind IntelliSense in VS Code suggests all custom utilities
- No raw hex codes, raw pixel values for spacing, or raw millisecond values exist outside of `tokens.css` and `tailwind.config.ts`
- Geist font loads without FOUT (Flash of Unstyled Text) on a slow-network simulation

### Risks
| Risk | Mitigation |
|---|---|
| Tailwind's JIT compiler not picking up CSS var references | Use standard Tailwind extend pattern; test all utilities in `/dev/tokens` page |
| Geist font not available via `next/font` | Pre-confirm package availability; fallback to local font files if needed |
| Token drift between `tokens.css` and `lib/tokens.ts` | Write a build-time validation script that asserts the two are in sync |
| Responsive token values not applied at correct breakpoints | Explicitly test all breakpoints (390px, 768px, 1024px, 1440px, 1920px) |

### Implementation order
1. **[Carried over from Phase 01]** Create the token files first (`src/styles/tokens.css`, `tailwind.config.ts`), then add the ESLint rule forbidding raw color values outside them. (Token files must exist before the rule, otherwise it has no whitelist target.)
2. Install Geist font and configure in root layout
3. Populate `src/styles/tokens.css` — start with color tokens
4. Add typography scale tokens
5. Add spacing, radius, blur, shadow tokens
6. Add motion and z-index tokens
7. Update `src/styles/globals.css` to import tokens and set base typographic defaults
8. Update `tailwind.config.ts` — map each token category to Tailwind extensions
9. Create `src/lib/tokens.ts` for Framer Motion / GSAP usage
10. Create development `/dev/tokens` page to visually verify all tokens
11. Extend the ESLint / Stylelint rule to also flag raw spacing (px) and duration (ms) values outside the token files
12. Verify build passes and all tokens render correctly

---

## PHASE 03 — Component Library — Level 1 Primitives

### Objective
Build the foundational, stateless UI primitives that every higher-level component and feature will compose. These components have no business logic, no data fetching, and no side effects. They receive props and render deterministic output. Accessibility must be baked in from this level — not retrofitted later.

### Dependencies
- Phase 01 and 02 complete
- Shadcn UI installed and configured as the headless primitive layer
- Radix UI primitives available through Shadcn
- Lucide React installed for icons
- `DISCIPLINE_CANONICAL_TOKENS.md` §12 (component specifications) understood
- `DISCIPLINE_COMPONENT_LIBRARY.md` Level 1 section read

### Deliverables
Each component delivered with: TypeScript interface, all states (default, hover, focus, disabled, loading), keyboard interaction, ARIA attributes, responsive behavior, and motion specification.

**Buttons**
- `Button` — primary (brand accent background, dark label), secondary (glass surface), ghost (text only), destructive (semantic error state)
- `IconButton` — square variant of Button with icon only, tooltip required for accessibility
- `LinkButton` — renders as anchor tag, same visual variants as Button

**Form Inputs**
- `Input` — text, email, password, number; with label, error state, helper text, character count, prefix/suffix slots
- `Textarea` — multiline input with auto-resize option
- `Select` — native and custom (Radix) variants
- `Checkbox` — with label and indeterminate state
- `RadioGroup` — keyboard navigable
- `Switch` — toggle with label
- `Slider` — range input for numeric values
- `DatePicker` — calendar popover, accessible keyboard navigation
- `FileInput` — drag-and-drop zone + click-to-browse

**Display**
- `Badge` — variants: default, success, warning, error, info; sizes: sm, md
- `Avatar` — image with fallback initials, sizes: sm, md, lg, xl; loading skeleton state
- `Icon` — wrapper around Lucide icons with size and color tokens
- `Spinner` — loading indicator, sizes: sm, md, lg
- `Skeleton` — shimmer placeholder for any shape (rectangular, circular, text)
- `Separator` — horizontal and vertical divider

**Typography**
- `Heading` — h1 through h6, mapped to design scale tokens, as prop
- `Text` — paragraph and span variants, size and weight props
- `Label` — form label, always associated with input via htmlFor
- `Code` — inline and block code display

**Feedback**
- `Alert` — four semantic variants (info, success, warning, error) with icon, title, description, dismiss button
- `Progress` — linear and circular variants, animated
- `Tooltip` — accessible, keyboard-triggered, configurable placement

### Validation criteria
- Every component renders without TypeScript errors
- Every interactive component is keyboard-navigable (Tab, Enter, Space, Arrow keys as appropriate)
- Every component meets WCAG 2.2 AA for color contrast
- Every component has explicit focus-visible styles (never `outline: none` without replacement)
- Every text rendering component uses tokens from the typography scale
- Every color in every component traces to a design token
- Storybook or a `/dev/components` page exists showing all Level 1 components and their states
- `pnpm build` passes with zero errors
- axe-core scan of the dev page shows zero violations

### Risks
| Risk | Mitigation |
|---|---|
| Shadcn generates components with hardcoded Tailwind colors | Immediately replace all hardcoded values with token-based utilities upon generation |
| Radix primitives have accessibility quirks at certain versions | Pin Radix versions; test keyboard navigation manually |
| Focus ring styles overridden by Tailwind's preflight reset | Explicitly define `focus-visible` styles in base CSS |
| Avatar fallback initials overflow container | Test with long names and single-character names |

### Implementation order
1. Install and initialize Shadcn UI with project configuration
2. Build Button family (primary → secondary → ghost → destructive → icon → link)
3. Build form Input and Textarea
4. Build Select (native first, custom Radix second)
5. Build Checkbox, RadioGroup, Switch
6. Build Slider and DatePicker
7. Build FileInput with drag-and-drop
8. Build Badge, Avatar, Icon, Spinner, Skeleton, Separator
9. Build Typography components (Heading, Text, Label, Code)
10. Build Alert, Progress, Tooltip
11. Create `/dev/components` visual test page with all states
12. Run axe-core accessibility scan
13. Fix all violations
14. Confirm build passes

---

## PHASE 04 — Component Library — Level 2 Glass & Composite

### Objective
Build the Liquid Glass composition layer — the visual identity of DISCIPLINE. These components compose Level 1 primitives with the glass material system (backdrop-filter, layered shadows, border highlights) to create the premium aesthetic defined in `DISCIPLINE_RULEBOOK.md` and `DISCIPLINE_CANONICAL_TOKENS.md`. This phase defines the "feel" of the product.

### Dependencies
- Phase 03 complete
- `DISCIPLINE_RULEBOOK.md` sections on Glass Material Specification, Blur System, Shadow System, Layering & Depth System fully read
- `DISCIPLINE_CANONICAL_TOKENS.md` §12 component specs (GlassCard, Navbar, Modal, Sidebar) understood
- Framer Motion installed

### Deliverables

**Glass Material System**
- `GlassCard` — the base glass surface: semi-transparent background, `backdrop-filter: blur(32px)`, layered shadow, 1px border with highlight on top edge. Variants: default, elevated, recessed. All border-radius from `--ds-radius-lg` (28px).
- `GlassSurface` — lower-level primitive for glass backgrounds without opinionated padding/radius, used to compose other glass components
- `GlassPanel` — full-width glass section divider used between page sections
- `GlassOverlay` — modal/drawer backdrop with blur

**Navigation**
- `Navbar` — top navigation bar: glass background, pill-shaped active indicator, logo left, nav links center (desktop), CTA right, responsive hamburger (mobile). Scroll behavior: transparent at top, glass frosted on scroll. Height: 64px (desktop) / 56px (mobile) per §12.1 tokens.
- `MobileMenu` — slide-in drawer triggered by hamburger, contains all nav links
- `Sidebar` — dashboard left sidebar: glass surface, icon + label nav items, collapse to icon-only on mobile. Width: 240px expanded / 72px collapsed per §12.6 tokens.
- `BottomNav` — mobile dashboard navigation bar (4–5 items), fixed at bottom of viewport
- `CommandPalette` — ⌘K global search/action palette with fuzzy matching, glass modal

**Overlay & Floating**
- `Modal` — centered dialog on glass overlay, Radix Dialog primitive, close on Escape and click outside, focus trap, animated entrance (scale + fade)
- `Drawer` — slide-in panel from right (desktop) or bottom (mobile), Radix Dialog
- `Sheet` — full-height side panel
- `Popover` — anchored floating card, Radix Popover
- `DropdownMenu` — glass-styled dropdown, Radix DropdownMenu
- `ContextMenu` — right-click menu
- `Toast` — notification toast system (Sonner or custom), top-right stack, auto-dismiss
- `FloatingCard` — elevated glass card that appears to float above content, used for KPI widgets in Hero

**Data Display**
- `DataTable` — sortable, filterable, paginated table with glass header, virtualization for large datasets
- `StatCard` — metric display with label, value, delta indicator, icon
- `ChartWrapper` — consistent glass container for Tremor/Recharts charts
- `EmptyState` — illustrated empty state with action CTA
- `ErrorState` — error display with retry action

**Forms**
- `FormField` — React Hook Form controller wrapper composing Input/Select/etc. with label, error, and helper text in a consistent layout
- `FormSection` — groups related FormFields with a section heading
- `SearchInput` — Input with search icon, clear button, debounced onChange

**Feedback**
- `ConfirmationDialog` — pre-built Modal for destructive action confirmations
- `LoadingOverlay` — full-screen or component-scoped loading state

### Validation criteria
- Glass effect renders correctly on all supported browsers (Chrome, Safari, Firefox, Edge) — especially `backdrop-filter` on Safari
- All glass components use exactly `--ds-blur-glass: 32px` unless a documented exception exists in the tokens
- All shadows use multi-layer shadow tokens (no single-value box-shadows)
- Modal and Drawer have working focus traps and close on Escape
- Toast system handles multiple concurrent toasts without layout shift
- All motion (Modal entrance, Drawer slide, Sidebar collapse) uses token-defined durations and easing
- Navbar scroll transition is smooth with no layout shift
- CommandPalette opens in < 100ms perceived time
- Level 2 component `/dev/components` page updated to show all new components
- axe-core scan: zero violations
- `pnpm build` passes

### Risks
| Risk | Mitigation |
|---|---|
| `backdrop-filter` not rendering on some browsers | Test on all targets; provide non-blurred fallback for browsers with `@supports not (backdrop-filter: blur())` |
| Multiple stacked glass layers creating performance issues (excessive compositing) | Limit nesting of `backdrop-filter` elements; use `will-change: transform` judiciously |
| Focus trap conflicts when Modals nest | Use Radix's built-in focus management; avoid nesting modals |
| Sidebar collapse animation causing layout reflow | Use CSS transform (translateX) not width animation |
| CommandPalette search becoming slow with many items | Implement virtualization and debouncing from the start |

### Implementation order
1. Build `GlassSurface` and `GlassOverlay` (lowest-level glass)
2. Build `GlassCard` with all variants
3. Build `GlassPanel`
4. Build `FloatingCard`
5. Build `Navbar` (desktop state first, then scroll behavior, then mobile)
6. Build `MobileMenu`
7. Build `Sidebar` (expanded state, then collapsed, then transition)
8. Build `BottomNav`
9. Build `Modal` and `Drawer`
10. Build `Sheet`, `Popover`, `DropdownMenu`, `ContextMenu`
11. Build `Toast` system
12. Build `CommandPalette`
13. Build data display components (DataTable, StatCard, ChartWrapper, EmptyState, ErrorState)
14. Build form composite components (FormField, FormSection, SearchInput)
15. Build `ConfirmationDialog` and `LoadingOverlay`
16. Update `/dev/components` page
17. Cross-browser glass rendering test
18. Accessibility audit

---

## PHASE 05 — Landing Page — Structure & Layout System

### Objective
Establish the structural scaffolding of the Landing page before any individual section is built. This includes the page route, the global layout wrapper, the section container system, and the scroll infrastructure. Getting this right prevents layout debt across all ten subsequent section phases.

### Dependencies
- Phase 01–04 complete
- Lenis smooth scroll installed
- `DISCIPLINE_MASTER_CONTEXT.md` Landing page architecture section read
- `DISCIPLINE_CANONICAL_TOKENS.md` spacing tokens (section-y, hero-y) confirmed
- Editorial grid system from `DISCIPLINE_RULEBOOK.md` understood

### Deliverables
- `src/app/(landing)/page.tsx` — root landing page
- `src/app/(landing)/layout.tsx` — landing layout (no sidebar, no dashboard chrome)
- `src/components/shared/Section.tsx` — universal section wrapper enforcing vertical padding from `--ds-space-section-y` token, optional `id` prop for anchor links, data attribute for scroll tracking
- `src/components/shared/Container.tsx` — horizontal max-width container with responsive padding, aligning to the editorial grid (content column, bleed column defined)
- `src/components/shared/SectionLabel.tsx` — small uppercase overline label used above section headings
- Lenis smooth scroll initialized in a client component provider, registered globally in the landing layout
- GSAP ScrollTrigger registered with Lenis's scroll handler (critical integration)
- Navbar integrated into landing layout (from Phase 04)
- Route group structure that separates Landing from Dashboard (prevents layout collisions)
- Placeholder div for each of the 10 sections so the scroll-to-anchor system can be validated before content exists

### Validation criteria
- Page loads with correct fonts and no layout shift
- Smooth scroll works on desktop and is disabled on mobile (or uses native momentum scroll)
- GSAP ScrollTrigger fires at correct positions (verify with visual markers in dev mode)
- Navbar transitions correctly from transparent to frosted on scroll
- Each section's vertical padding matches the `--ds-space-section-y` token at each breakpoint
- The editorial grid is consistent across all sections (content column alignment)
- No horizontal overflow at any viewport width from 390px to 1920px

### Risks
| Risk | Mitigation |
|---|---|
| Lenis + GSAP ScrollTrigger integration causing double-scroll or misfire | Follow the official integration pattern; test on multiple browsers |
| Smooth scroll conflicting with browser native anchor link behavior | Override anchor behavior with programmatic Lenis scroll to position |
| Layout route groups causing unexpected URL structures | Test all routes from initial setup |

### Implementation order
1. Create route group `(landing)` with `layout.tsx` and `page.tsx`
2. Build `Container` component
3. Build `Section` component
4. Build `SectionLabel` component
5. Integrate Navbar into landing layout
6. Initialize Lenis in a client provider
7. Register GSAP ScrollTrigger with Lenis
8. Add ten placeholder sections to page.tsx
9. Verify scroll, anchor links, and Navbar behavior

---

## PHASE 06 — Landing Page — Hero Section

### Objective
Build the above-the-fold Hero section — the highest-priority, highest-conversion element of the Landing. This section must be visually arresting, load instantly (LCP < 2.5s), and communicate the DISCIPLINE value proposition without ambiguity. The Hero is the design statement of the product.

### Dependencies
- Phase 05 complete
- `DISCIPLINE_CANONICAL_TOKENS.md` §12.2 Hero component specifications
- `DISCIPLINE_RULEBOOK.md` Hero Art Direction section
- `DISCIPLINE_MEDIA_MAP.md` Hero asset specifications (`DISC-HERO-VID-001`, `DISC-HERO-IMG-001`)
- Framer Motion installed
- GSAP + GSAP ScrollTrigger installed

### Deliverables
- `src/features/landing/components/HeroSection.tsx` — orchestrating component
- `src/features/landing/components/HeroBackground.tsx` — video background layer with poster fallback. Video: `DISC-HERO-VID-001` (16:9, muted, autoplay, loop, ≤8s). Poster: `DISC-HERO-IMG-001`. If video not yet produced: a gradient placeholder respecting the off-white + violet palette.
- `src/features/landing/components/HeroContent.tsx` — text content layer positioned over video. Contains: overline label, H1 heading, subheadline paragraph, CTA button group (primary + secondary)
- `src/features/landing/components/HeroKPICards.tsx` — three floating glass KPI cards showing social proof metrics (e.g., "2,400 clients", "94% satisfaction", "12 weeks average transformation"). Cards use `FloatingCard` component. Content is static copy, no media required.
- `src/features/landing/components/HeroScrollIndicator.tsx` — animated scroll-down cue (arrow or line animation), fades out on scroll
- Hero entrance animation sequence:
  - Background fades in first (0–400ms)
  - Overline label enters from below (400–640ms)
  - H1 headline enters line by line (600–1200ms, staggered)
  - Subheadline enters (1000–1240ms)
  - CTA buttons enter (1100–1340ms)
  - KPI cards enter with slight stagger (1200–1500ms)
  - All using `--ds-dur-hero: 1200ms` total cadence
- Scroll parallax: background moves at 0.3× scroll speed; content moves at 0.15× (subtle depth)
- Mobile variant: 9:16 video (`DISC-HERO-VID-001-MOBILE`) with content repositioned for vertical layout
- `preload` link tag for hero poster image in `<head>` (LCP optimization)

### Validation criteria
- LCP ≤ 2.5s on a simulated Fast 3G connection (Lighthouse)
- Video plays automatically without sound on page load (muted + autoplay attributes)
- Fallback poster image visible before video loads
- If browser blocks autoplay, poster image persists without error
- All text in the Hero zone-safe area has sufficient contrast against the video background (WCAG AA minimum)
- KPI cards render with correct glass appearance (backdrop-filter active)
- Entrance animation runs once on page load, never repeats on re-render
- Scroll parallax does not cause layout shift (CLS = 0)
- On mobile (390px), content is fully readable and CTA buttons are thumb-reachable
- CTA buttons link to correct targets (#plans section and /auth/register)
- Hero section occupies 100dvh on all viewport sizes

### Risks
| Risk | Mitigation |
|---|---|
| Video autoplay blocked by browser | Always provide poster + ensure `muted` attribute is set; treat video as progressive enhancement |
| LCP degraded by large video file | Hero poster (still image) should be the LCP element, not the video; preload poster aggressively |
| Parallax causing performance issues on low-end mobile | Disable parallax below a defined breakpoint (md); use `useReducedMotion` |
| Text unreadable over certain video frames | Add a subtle dark gradient overlay above the video, below the content |
| KPI card values becoming stale (hardcoded copy) | Accept static copy at launch; mark as TODO for dynamic data in Phase 21 |

### Implementation order
1. Build `HeroBackground` with gradient placeholder (video production may not be complete)
2. Build `HeroContent` with typography hierarchy and CTA buttons
3. Build `HeroKPICards` with FloatingCard glass components
4. Build `HeroScrollIndicator`
5. Assemble `HeroSection`
6. Implement entrance animation sequence
7. Implement scroll parallax
8. Add mobile layout
9. Add `preload` link for poster image
10. Add video element (swap gradient placeholder once `DISC-HERO-VID-001` is produced)
11. Lighthouse audit for LCP
12. Accessibility check for contrast

---

## PHASE 07 — Landing Page — Social Proof Section

### Objective
Build the trust-signal section immediately below the Hero. This section communicates legitimacy through quantified results or partner/press logos. The layout must feel editorial and authoritative, not generic.

### Dependencies
- Phase 05–06 complete
- Decision made on proof format: metrics-only (no media required) or logo bar (requires `DISC-PROOF-LOGO-001..n` SVG assets per media map)
- Copy finalized for metrics or logo list

### Deliverables
- `src/features/landing/components/ProofSection.tsx`
- If metrics format: three to five large-number statistics with label and description. Numbers animate via count-up on scroll entry (GSAP or Framer Motion `useInView`)
- If logo format: horizontally scrolling (or static grid) of partner/press logos using SVG monochrome assets at normalized height
- Both formats: subtle glass divider above and below, consistent horizontal padding from `Container`
- Scroll-triggered entrance animation: fade + translate up, staggered per item

### Validation criteria
- Count-up animation triggers once when section enters viewport, not on re-scroll
- Logos (if applicable) maintain aspect ratio and are all the same visual weight (monochrome, normalized height)
- No CLS from animation
- Section heading contrast meets WCAG AA
- On mobile, metric items stack vertically with adequate spacing

### Risks
| Risk | Mitigation |
|---|---|
| No press logos exist at launch | Default to metrics format; logo format can be added later without structural change |
| Count-up animation running too fast or too slow | Expose duration as a configuration constant tied to `--ds-dur-standard` |

### Implementation order
1. Choose metrics vs. logo format (default: metrics if assets not ready)
2. Build metric display components with count-up animation
3. Build logo bar component (SVG loader, normalization) — build even if temporarily hidden
4. Assemble `ProofSection` with scroll-triggered entrance
5. Test at all breakpoints

---

## PHASE 08 — Landing Page — Plans Section

### Objective
Build the pricing and coaching plan selection section. This is the primary conversion touchpoint after the Hero. Pricing cards must be clear, scannable, and guide users toward the recommended plan. Glass card design with a highlighted "recommended" state.

### Dependencies
- Phase 04 (GlassCard), Phase 05–07 complete
- Plan names, prices, features, and CTA copy finalized (START / PRO / ELITE from project docs)
- Stripe Product IDs created in Stripe Dashboard (even if Stripe integration is Phase 30–32, the plan data structure must be agreed upon)

### Deliverables
- `src/features/landing/components/PlansSection.tsx`
- `src/features/landing/components/PlanCard.tsx` — glass card displaying: plan name, price (monthly/annual toggle), feature list with check icons, CTA button, highlighted state for recommended plan
- `src/features/landing/components/PlanToggle.tsx` — monthly/annual billing toggle with discount badge ("Save 20%")
- Three plan cards: START (entry), PRO (recommended, highlighted), ELITE (premium)
- Annual/monthly price switching with smooth number transition animation
- Plan comparison table (optional but recommended for higher-intent users) — collapsible below the cards
- Section heading, subheading, and value statement above cards
- All CTA buttons link to `/auth/register?plan={planId}` (pre-selects plan in onboarding)
- Scroll-triggered entrance: cards animate in with stagger

### Validation criteria
- Price toggle switches values without layout shift
- Recommended plan card is visually distinct (elevated shadow, accent border, badge)
- All three plans visible side-by-side on desktop (1024px+); stack vertically on mobile
- Feature list check icons use Lucide icons, not emoji
- CTA buttons use primary Button variant with correct sizing from tokens
- Glass card effect renders correctly
- Annual discount percentage mathematically correct

### Risks
| Risk | Mitigation |
|---|---|
| Pricing subject to change before launch | Build PlanCard to accept price as prop; centralize plan data in a constants file |
| Three-column layout breaking at mid-range tablet | Test at 768px; consider horizontal scroll or 1+2 stacked layout |

### Implementation order
1. Create plan data constants file (plan names, prices, features)
2. Build `PlanToggle` component
3. Build `PlanCard` (default state, then recommended state)
4. Build optional comparison table
5. Assemble `PlansSection` with scroll entrance animation
6. Test price toggle and CTA links

---

## PHASE 09 — Landing Page — Transformations Section

### Objective
Build the before/after transformation evidence section. This is the highest-trust signal in fitness marketing but carries the strictest integrity requirements. The section must never display fabricated results.

### Dependencies
- Phase 05–08 complete
- **Real transformation clients with written consent obtained** — this is a hard dependency. Without real clients, this section must be replaced by an alternative (e.g., Method/Process section) or hidden
- `DISC-TRANSFORM-IMG-001..003-A/B` assets produced (4:5 ratio, paired before/after, neutral background)

### Deliverables (conditional on real clients)
- `src/features/landing/components/TransformSection.tsx`
- `src/features/landing/components/TransformCard.tsx` — displays before/after pair with a draggable reveal slider or fade toggle between A and B images
- `src/features/landing/components/TransformSlider.tsx` — interactive before/after comparison widget (touch-compatible)
- Three transformation pairs displayed in a horizontal scroll (mobile) or three-column grid (desktop)
- Each card includes: client first name, duration (e.g., "12 weeks"), optional brief quote
- Legal disclaimer below section about individual results
- Consent records referenced in an internal document (not shown on site)

**Fallback deliverable (if no real clients):**
- `src/features/landing/components/MethodProcessSection.tsx` — replaces Transformations with a visual explanation of the DISCIPLINE methodology (4 phases, illustrated with icons from Lucide)

### Validation criteria
- Every transformation displayed has documented written consent
- Consent record filename and date noted in an internal tracking document
- Before/after images match in camera distance, angle, and lighting (as specified in media map contract)
- Slider component is touch-compatible (mobile swipe gesture)
- Images load with lazy loading (below-the-fold)
- Legal disclaimer present

### Risks
| Risk | Mitigation |
|---|---|
| No real clients available at launch | Use fallback MethodProcess section; do not display AI-generated transformations under any circumstances |
| Image pairs visually inconsistent (different lighting, angles) | Media map contract specifies exact requirements; enforce in photography brief |
| Reveal slider causing performance issues | Test on mid-range Android device; debounce slider interaction |

### Implementation order
1. Assess real client availability — decide Transformations vs. MethodProcess fallback
2. If Transformations: build `TransformSlider`, `TransformCard`, `TransformSection`
3. If fallback: build `MethodProcessSection` with icon-led pillar layout
4. Add legal disclaimer
5. Test interactive slider touch behavior

---

## PHASE 10 — Landing Page — Method Section

### Objective
Build the services and coaching methodology section. Communicates what DISCIPLINE coaches do and how, establishing authority and differentiating from generic fitness apps. Can be icon-led (Lucide icons, no media required) or editorial-image-led.

### Dependencies
- Phase 05–09 complete
- Decision on icon-led vs. image-led format
- If image-led: `DISC-METHOD-IMG-001..005` produced (3:2 ratio, cinematic)
- Method pillars copy finalized (coaching, nutrition, habits, performance, education — or current equivalent)

### Deliverables
- `src/features/landing/components/MethodSection.tsx`
- `src/features/landing/components/PillarCard.tsx` — glass card with icon (or image), pillar name, short description
- Five pillar cards in a horizontal scroll (mobile) or asymmetric grid (desktop)
- Section heading and narrative paragraph
- Scroll-triggered stagger animation on card entrance

### Validation criteria
- Icon-led variant works without any media assets
- Image-led variant lazy-loads images with skeleton placeholder
- Five pillars readable and distinct at all breakpoints
- Glass card effect on pillar cards consistent with other sections

### Risks
| Risk | Mitigation |
|---|---|
| Method images not ready at launch | Build icon-led variant first; swap images when available without layout change |

### Implementation order
1. Build `PillarCard` in icon-led mode
2. Add image variant support
3. Assemble `MethodSection` with grid layout
4. Implement scroll-triggered stagger

---

## PHASE 11 — Landing Page — Dashboard Preview Section

### Objective
Show the actual product UI to prospective users. This section converts curiosity into desire by showing what the member dashboard looks like. The mockup must accurately represent the real dashboard — never a fabricated UI.

### Dependencies
- Phase 05–10 complete
- **Dashboard design must exist** before this mockup can be produced — this is a hard dependency on Phase 22–28
- `DISC-DASH-MOCK-001` produced (16:10, 2560×1600, retina, matches real dashboard)
- Alternatively: a temporary placeholder indicating "Dashboard preview coming soon" if Phase 22–28 not yet complete when Landing launches

### Deliverables
- `src/features/landing/components/DashSection.tsx`
- `src/features/landing/components/DashMockup.tsx` — glass-framed browser/device mockup containing dashboard screenshot
- Subtle floating animation on mockup (slow sinusoidal bob, 4–6s period)
- Section heading, subheading, and feature callouts pointing to specific areas of the mockup
- Mobile mockup (`DISC-DASH-MOCK-001-MOBILE`) shown on simulated phone frame below or beside desktop mockup

### Validation criteria
- Mockup image is sharp on retina displays (served at @2x)
- Dashboard preview accurately represents the real dashboard (alignment checked post-Phase 22–28)
- Floating animation uses `--ds-dur-page: 480ms` easing or slower; never bouncy
- Section functions correctly if mockup image is replaced (no hardcoded dimensions)

### Risks
| Risk | Mitigation |
|---|---|
| Dashboard not designed when Landing launches | Display placeholder with "App preview coming soon" text; slot for image defined |
| Mockup diverges from real dashboard post-launch | Schedule a mockup refresh whenever dashboard UI changes significantly |

### Implementation order
1. Build `DashMockup` with placeholder image
2. Build section layout with callouts
3. Add floating animation
4. Replace placeholder with real mockup once Dashboard phases complete

---

## PHASE 12 — Landing Page — Testimonials Section

### Objective
Build the social proof testimonials section with real client quotes and portraits. Authenticity is mandatory — fabricated testimonials are prohibited.

### Dependencies
- Phase 05–11 complete
- Real client testimonials collected with written consent
- `DISC-TESTI-AVATAR-001..n` portraits produced (1:1, 512×512)
- If no real testimonials: section hidden or replaced with a "Join the founding members" waitlist CTA

### Deliverables
- `src/features/landing/components/TestiSection.tsx`
- `src/features/landing/components/TestiCard.tsx` — glass card with: avatar, name, plan type, star rating, quote text
- Horizontally scrollable carousel (mobile) or masonry/grid (desktop)
- Entrance animation with stagger

### Validation criteria
- Every testimonial has documented consent
- Avatar images use the `Avatar` component with loading skeleton
- Carousel is touch-swipeable on mobile
- Screen readers can navigate carousel (arrow key support, ARIA role="region" with label)

### Risks
| Risk | Mitigation |
|---|---|
| No real testimonials at launch | Show a "Be the first" waitlist capture form instead |

### Implementation order
1. Build `TestiCard` with Avatar integration
2. Build carousel for mobile, grid for desktop
3. Assemble `TestiSection`
4. Accessibility check for carousel keyboard nav

---

## PHASE 13 — Landing Page — FAQ Section

### Objective
Build the FAQ accordion section. This is the lowest-media section — pure glass + text. Reduces support burden by answering common pre-purchase questions.

### Dependencies
- Phase 05 complete
- FAQ copy finalized (minimum 8 questions covering: plans, cancellation, coaching access, results timeline, equipment, language)

### Deliverables
- `src/features/landing/components/FAQSection.tsx`
- `src/features/landing/components/FAQAccordion.tsx` — glass-surfaced accordion using Radix Accordion primitive. Smooth height animation on open/close. Only one item open at a time (or multi-open mode configurable).
- FAQ items as a static data array (easy to update without touching component code)
- Section heading and optional subheading
- Structured data (FAQ schema JSON-LD) embedded in `<head>` via Next.js metadata API (coordinated with Phase 17)

### Validation criteria
- Accordion open/close animation is smooth (no height jump)
- Multiple concurrent accordion items don't interfere
- Each accordion item has correct ARIA attributes (aria-expanded, aria-controls)
- FAQ schema JSON-LD is valid (test with Google Rich Results Test)
- Answers contain correct information matching the Plans section

### Risks
| Risk | Mitigation |
|---|---|
| FAQ content becoming outdated post-launch | Centralize FAQ data in a CMS-like constants file for easy non-developer updates |

### Implementation order
1. Create FAQ data array
2. Build `FAQAccordion` with Radix
3. Assemble `FAQSection`
4. Add FAQ JSON-LD schema
5. Validate with schema testing tool

---

## PHASE 14 — Landing Page — Contact Section

### Objective
Build the contact / intake form section. Serves as a pre-sale lead capture for high-intent visitors who want to speak with a coach before purchasing.

### Dependencies
- Phase 05 complete
- Email sending capability (Phase 34) — or a temporary Formspree / native mailto fallback
- `DISC-CONTACT-BG-001` (optional background, inherits GLOBAL-BG-001)

### Deliverables
- `src/features/landing/components/ContactSection.tsx`
- `src/features/landing/components/ContactForm.tsx` — React Hook Form + Zod validated form: Name, Email, Phone (optional), Message, Goal (select: weight loss / muscle gain / performance / habit building)
- Server Action for form submission that sends confirmation email to user and notification to coach
- Success state: animated confirmation message replacing form
- Error state: field-level and form-level error display
- Honeypot field for basic spam protection
- Rate limiting on the server action (max submissions per IP per hour)

### Validation criteria
- Form validates client-side before submission (Zod schema)
- Server Action validates server-side as well (double validation)
- Success email received by test email address
- Coach notification email received
- Honeypot field does not appear to screen readers
- Form is fully keyboard navigable
- Rate limiting prevents more than 5 submissions per IP per hour

### Risks
| Risk | Mitigation |
|---|---|
| Email service not configured in Phase 34 yet | Use a temporary mailto link or Formspree fallback; replace with Server Action when Phase 34 is complete |
| Spam submissions overwhelming coach | Rate limiting + honeypot; add CAPTCHA if needed post-launch |

### Implementation order
1. Build `ContactForm` with validation
2. Write Server Action for submission
3. Add honeypot and rate limiting
4. Add email sending (or fallback)
5. Build success and error states
6. Assemble `ContactSection`

---

## PHASE 15 — Landing Page — Footer

### Objective
Build the global Footer. Functional, minimal, on-brand. Links to legal pages, social profiles, and key site sections.

### Dependencies
- Phase 05 complete
- Legal pages exist (Privacy Policy, Terms of Service) — can be placeholder pages at launch
- Social media profile URLs confirmed

### Deliverables
- `src/components/shared/Footer.tsx`
- Three-column layout (desktop): logo + tagline | navigation links | social links + legal
- Mobile: stacked, full-width columns
- Logo uses `DISC-GLOBAL-LOGO-001` SVG
- Copyright notice with current year (dynamically rendered)
- Links: Plans, FAQ, Contact, Login, Privacy Policy, Terms of Service
- Social icons: Instagram, YouTube (Lucide or custom SVG)
- Newsletter signup input (optional: simple email field, submission deferred to Phase 34)

### Validation criteria
- All links navigate to correct destinations
- Copyright year is dynamic (not hardcoded)
- Logo SVG renders correctly at footer size
- No broken links to placeholder pages (mark as "coming soon" appropriately)
- Footer accessible by keyboard from last main content element

### Implementation order
1. Build footer layout grid
2. Add logo, tagline, navigation columns
3. Add social icons
4. Add copyright with dynamic year
5. Add newsletter input (or hide if email system not ready)

---

## PHASE 16 — Landing Page — Global Motion & Polish

### Objective
Layer the coordinated motion design system across all Landing sections, apply final typographic polish, ensure visual consistency, and close all known visual regressions. This phase treats the Landing as a complete, unified experience.

### Dependencies
- Phases 05–15 all complete (all sections built)
- `DISCIPLINE_RULEBOOK.md` Motion Design System, Micro-Interactions, and Motion QA sections
- `DISCIPLINE_CANONICAL_TOKENS.md` motion tokens
- `prefers-reduced-motion` media query behavior defined

### Deliverables
- Global scroll-triggered entrance animation system — all sections use consistent patterns (fade + translate, same easing, same durations)
- `useReducedMotion` hook integrated — when reduced motion is preferred, animations are replaced with simple fades (no translate, no scale)
- Cursor effects (optional, per RULEBOOK): subtle magnetic attraction on CTA buttons, desktop only
- Micro-interactions on all interactive elements:
  - Button hover: subtle scale 1.02, shadow lift, duration 160ms
  - Glass card hover: shadow elevation increase, duration 160ms
  - Link hover: color transition, duration 160ms
- Page-load performance audit and corrections:
  - All below-fold images have `loading="lazy"`
  - Hero poster has `loading="eager"` and `fetchpriority="high"`
  - All non-critical JavaScript deferred
- Final responsive check at all five breakpoints (390, 768, 1024, 1440, 1920)
- Final glass rendering check across Chrome, Safari, Firefox, Edge
- Final typography check: heading hierarchy consistent, no orphaned words in headlines
- Video `preload="none"` on the hero video (poster loads first, video loads after interaction or after a delay)

### Validation criteria
- Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS = 0
- `prefers-reduced-motion` test: zero translate/scale animations fire when preference is set
- Visual review of full Landing at 390px, 768px, 1024px, 1440px, 1920px — no broken layouts
- No console errors or warnings in production build
- Cross-browser glass rendering confirmed

### Risks
| Risk | Mitigation |
|---|---|
| GSAP ScrollTrigger misfiring after Lenis updates | Pin Lenis version; regression-test after any Lenis upgrade |
| Reduced motion preference not reliably detected on iOS | Test on real iOS device; use both CSS and JS detection |

### Implementation order
1. Audit all section entrance animations for consistency
2. Apply `useReducedMotion` to all animated components
3. Add micro-interactions to buttons and cards
4. Add cursor magnetic effect (desktop)
5. Performance audit: lazy loading, preload, defer
6. Responsive visual review at all breakpoints
7. Cross-browser glass test
8. Fix all issues
9. Final Lighthouse run — must pass all thresholds

---

## PHASE 17 — SEO & Metadata Layer

### Objective
Implement server-side SEO infrastructure for the entire application. SEO must be handled at the framework level (Next.js Metadata API), never with client-side workarounds.

### Dependencies
- Phase 05–16 complete (Landing page structure exists)
- Primary language confirmed (FR / EN / ES multilingual scope)
- Domain confirmed and DNS pointing to Vercel
- Open Graph image (`DISC-GLOBAL-OG-001`, 1200×630) produced

### Deliverables
- `src/app/layout.tsx` — root metadata (site name, description, Open Graph, Twitter Card, canonical URL)
- Per-page `metadata` exports for: Landing, Auth pages, Dashboard (noindex), Legal pages
- `src/app/sitemap.ts` — dynamic sitemap covering all public routes
- `src/app/robots.ts` — robots.txt: allow public pages, disallow `/dashboard/*`, disallow `/api/*`
- Open Graph image configured: `DISC-GLOBAL-OG-001` as default, page-specific OG images for key routes
- Twitter Card metadata
- JSON-LD structured data for:
  - Organization schema on Landing (`@type: Organization`)
  - FAQ schema on Landing FAQ section
  - BreadcrumbList on inner pages
- `hreflang` alternates for EN/FR/ES if multilingual is in scope at launch
- Favicon and app icons configured from `DISC-GLOBAL-FAVICON-001` in `public/brand/favicon/`
- `manifest.json` for PWA basics (name, icons, theme color)

### Validation criteria
- Google Rich Results Test shows FAQ schema valid
- Open Graph preview renders correctly (test with opengraph.xyz or equivalent)
- `sitemap.xml` accessible at `/sitemap.xml` and contains all public pages
- `robots.txt` accessible at `/robots.txt` and correctly disallows dashboard
- Lighthouse SEO score = 100
- All pages have unique, descriptive `<title>` tags
- No duplicate canonical URLs

### Risks
| Risk | Mitigation |
|---|---|
| OG image not yet produced | Use a temporary text-based OG image (Next.js OG image generation) |
| Multilingual hreflang complexity delaying launch | Ship EN-only at launch; add FR and ES in a post-launch sprint |

### Implementation order
1. Configure root metadata in `app/layout.tsx`
2. Add per-page metadata to Landing
3. Create `sitemap.ts`
4. Create `robots.ts`
5. Configure favicons and manifest
6. Add Organization JSON-LD
7. Add FAQ JSON-LD (coordinate with Phase 13)
8. Add hreflang if multilingual in scope
9. Validate all schemas and OG previews

---

## PHASE 18 — Database Schema & Migrations

### Objective
Design and implement the complete PostgreSQL schema with Prisma ORM. The schema is the contract between all server-side features. It must be correct before any authentication, dashboard, or payment logic is built — migrations are expensive to reverse once data exists.

### Dependencies
- Phase 01 complete (project structure)
- PostgreSQL instance provisioned (Supabase, Railway, or Neon recommended for Vercel-compatible hosted Postgres)
- Prisma installed (`@prisma/client` + `prisma` dev dependency)
- All feature requirements read from `DISCIPLINE_MASTER_CONTEXT.md` database section

### Deliverables
- `prisma/schema.prisma` — complete schema with all models
- All tables use UUID primary keys
- All models with "deleted" records use `deletedAt DateTime?` soft-delete pattern
- Argon2 used for password hashing (enforced at the application layer, not schema layer)
- Schema models:

**Identity & Auth**
- `User` — id, email (unique), emailVerified, name, avatar, locale, createdAt, updatedAt, deletedAt
- `Account` — OAuth accounts linked to User (provider, providerAccountId, tokens)
- `Session` — active sessions (token, userId, expiresAt)
- `VerificationToken` — email verification and password reset tokens
- `TwoFactorAuth` — TOTP secret, backup codes, enabledAt

**Subscription & Billing**
- `Subscription` — userId, stripeCustomerId, stripeSubscriptionId, planId, status, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd
- `Plan` — id, name (START/PRO/ELITE), stripePriceId (monthly), stripePriceIdAnnual, features (JSON)

**Member Profile**
- `MemberProfile` — userId (1:1), birthDate, gender, height, weight, goalWeight, fitnessGoal (enum), activityLevel (enum), onboardingCompletedAt
- `BodyMeasurement` — userId, date, weight, bodyFat, waist, chest, hips, arms, thighs, notes

**Workout**
- `Exercise` — id, name, category, muscleGroups (array), equipment, instructions, videoUrl (optional)
- `WorkoutTemplate` — coachId (or system), name, description, difficulty, estimatedDuration
- `WorkoutTemplateExercise` — templateId, exerciseId, sets, reps, restSeconds, order
- `WorkoutSession` — userId, templateId (optional), startedAt, completedAt, notes
- `WorkoutSet` — sessionId, exerciseId, setNumber, reps, weightKg, durationSeconds, completed

**Nutrition**
- `Food` — id, name, brand (optional), caloriesPer100g, proteinPer100g, carbsPer100g, fatPer100g, fiberPer100g, source (enum: user/database/coach)
- `NutritionPlan` — coachId, userId, name, targetCalories, targetProtein, targetCarbs, targetFat, startDate, endDate
- `MealLog` — userId, date, mealType (enum: breakfast/lunch/dinner/snack)
- `MealLogEntry` — mealLogId, foodId, quantityGrams

**Habits**
- `HabitTemplate` — name, description, category, icon
- `Habit` — userId, templateId (optional), name, description, frequency (enum: daily/weekly), targetCount, color, icon, startDate, archivedAt
- `HabitLog` — habitId, date, completed, notes

**Progress Photos**
- `ProgressPhoto` — userId, r2Key, takenAt, angle (enum: front/side/back), notes, isPrivate

**Coaching**
- `CoachProfile` — userId (1:1), bio, specialties, certifications
- `CoachClientRelationship` — coachId, clientId (userId), startDate, endDate, status (enum)
- `Message` — conversationId, senderId, content, sentAt, readAt
- `Conversation` — coachId, clientId, createdAt

**Notifications**
- `Notification` — userId, type (enum), title, body, data (JSON), readAt, createdAt

- Initial seed migration with: default Plan records (START/PRO/ELITE with Stripe price IDs), default Exercise library (50+ exercises), default HabitTemplate records
- Migration naming convention: `YYYYMMDD_HHMMSS_description`
- `DATABASE_URL` in `.env` pointing to Postgres instance
- Prisma `generate` run produces type-safe client

### Validation criteria
- `prisma migrate dev` runs with zero errors on a fresh database
- `prisma generate` produces TypeScript types with zero errors
- Seed script populates all reference data without errors
- All foreign key relationships are correctly defined and enforced
- All indexes on frequently-queried columns exist (userId, email, date range queries)
- Soft-delete pattern: `deletedAt IS NULL` filter applied in all Prisma queries (consider Prisma middleware for this)
- TypeScript types from Prisma are used throughout — no type casting `as any`

### Risks
| Risk | Mitigation |
|---|---|
| Schema changes required after data exists | Write every change as a migration; never edit existing migration files |
| N+1 query patterns from naive Prisma usage | Audit query patterns during Phase 21; add `include` and `select` carefully |
| UUID primary keys causing performance concerns at scale | Use UUID v7 (time-ordered) for better index performance; acceptable for launch scale |
| Soft delete inconsistency across queries | Implement Prisma middleware that automatically appends `deletedAt: null` to all find queries |

### Implementation order
1. Install Prisma and initialize
2. Configure `DATABASE_URL` in `.env`
3. Define Identity & Auth models
4. Define Subscription & Billing models
5. Define MemberProfile and BodyMeasurement models
6. Define Workout models
7. Define Nutrition models
8. Define Habits models
9. Define Progress Photos model
10. Define Coaching and Message models
11. Define Notification model
12. Add all indexes
13. Run `prisma migrate dev --name init`
14. Write seed script
15. Run seed and verify data
16. Implement soft-delete Prisma middleware

---

## PHASE 19 — Authentication System

### Objective
Implement the complete authentication system: registration, login, OAuth, 2FA, password reset, and email verification. Authentication is the gate to every protected feature.

### Dependencies
- Phase 18 complete (User, Account, Session, VerificationToken, TwoFactorAuth schemas)
- Phase 34 partially complete or email provider configured (needed for verification and password reset emails)
- Auth library decision: Better Auth (preferred) or Auth.js (alternative)
- Google, Apple, Microsoft OAuth app credentials configured in their respective developer consoles
- `DISCIPLINE_MASTER_CONTEXT.md` Authentication section fully read

### Deliverables
- Auth library configured with: Prisma adapter, all providers, session strategy
- **Registration flow:**
  - `/auth/register` page — email + password form
  - Email verification sent on registration
  - `/auth/verify-email/[token]` page — token consumption
- **Login flow:**
  - `/auth/login` page — email + password form
  - "Remember me" option
  - Failed attempt counter (lock account after 5 failures for 15 minutes)
- **OAuth flows:**
  - Google Sign In button
  - Apple Sign In button
  - Microsoft Sign In button
  - Account linking: if email already exists, prompt to link accounts
- **2FA:**
  - TOTP setup page (QR code + secret)
  - 2FA verification step during login
  - Backup codes (8 codes, shown once on setup, stored hashed)
- **Password reset:**
  - `/auth/forgot-password` — email input, sends reset link
  - `/auth/reset-password/[token]` — new password form, token expires in 1 hour
- **Session management:**
  - Sessions stored in database
  - Session cookie: `httpOnly`, `secure`, `sameSite: lax`
  - Middleware protecting all `/dashboard/*` routes
  - Redirect to `/auth/login` with `callbackUrl` on unauthorized access
- Auth pages use a dedicated layout without the Navbar (minimal, centered, glass card)
- Argon2 used for all password hashing (via `argon2` or `@node-rs/argon2`)
- CSRF protection on all auth mutations
- Rate limiting on login endpoint (10 attempts per IP per 15 minutes)

### Validation criteria
- Registration creates a User record and sends verification email
- Email verification marks `emailVerified` and redirects to onboarding
- Login with correct credentials creates a Session and redirects to `/dashboard`
- Login with wrong credentials increments failure counter; locked after 5 failures
- Google OAuth creates/links account correctly
- 2FA: setup flow generates valid TOTP codes; backup codes work
- Password reset token expires after 1 hour
- `/dashboard` routes return 401 without session; redirect includes `callbackUrl`
- Logout destroys Session record
- No plain-text passwords anywhere in the database (verify with schema inspection)
- Rate limiting test: 11th login attempt from same IP is blocked

### Risks
| Risk | Mitigation |
|---|---|
| OAuth callback URL misconfiguration | Document exact callback URLs; test each provider in a staging environment |
| Apple Sign In requires additional SIWA configuration | Allocate extra time for Apple setup; test early in a staging environment |
| TOTP clock skew causing 2FA failures | Accept ±30 second window in TOTP validation |
| Prisma adapter incompatibility with auth library version | Pin adapter version; test on a clean database |

### Implementation order
1. Install and configure auth library with Prisma adapter
2. Configure environment variables for all OAuth providers
3. Build auth route group layout (minimal, centered)
4. Build registration page and form
5. Build email verification (token generation, email send, token consumption page)
6. Build login page with account lock logic
7. Integrate Google OAuth
8. Integrate Apple OAuth
9. Integrate Microsoft OAuth
10. Build account linking flow
11. Build 2FA setup and verification
12. Build password reset flow
13. Configure session middleware for `/dashboard/*`
14. Add rate limiting to login
15. End-to-end test all auth flows

---

## PHASE 20 — Onboarding Flow

### Objective
Guide new members through a multi-step onboarding questionnaire that populates their `MemberProfile` and sets initial goals. A well-designed onboarding reduces early churn by ensuring members feel understood from day one.

### Dependencies
- Phase 19 complete
- Phase 18 complete (MemberProfile schema)
- Onboarding questions and goal categories finalized

### Deliverables
- `src/features/onboarding/` feature slice
- Multi-step wizard: 5–7 steps
  - Step 1: Welcome + coach introduction
  - Step 2: Goal selection (weight loss / muscle gain / performance / habit building)
  - Step 3: Current stats (age, height, weight)
  - Step 4: Activity level and schedule availability
  - Step 5: Equipment access
  - Step 6: Dietary preferences / restrictions
  - Step 7: Plan confirmation / upgrade prompt if on free tier
- Progress indicator showing current step and total steps
- "Skip for now" option on non-critical steps
- Answers saved to `MemberProfile` on completion
- On completion: `onboardingCompletedAt` set, redirect to `/dashboard`
- Middleware check: if `onboardingCompletedAt` is null and user is logged in, redirect to onboarding

### Validation criteria
- All steps render correctly and navigate forward/backward
- Data persists even if user navigates back
- Skip option does not create incomplete MemberProfile (defaults used for skipped fields)
- Completion sets `onboardingCompletedAt` timestamp
- Re-visiting `/onboarding` after completion redirects to `/dashboard`
- All form inputs are keyboard accessible

### Implementation order
1. Build step wizard shell with navigation and progress indicator
2. Build each step as a self-contained form component
3. Write Server Actions for saving each step's data
4. Implement middleware redirect for incomplete onboarding
5. Test full flow end-to-end

---

## PHASE 21 — API Layer & Server Actions Foundation

### Objective
Establish the patterns, error handling conventions, and reusable utilities for all server-side data operations. This phase creates the infrastructure that all feature modules (Phases 22–33) will use.

### Dependencies
- Phase 18 complete (database schema)
- Phase 19 complete (auth session available)
- Zod installed
- `DISCIPLINE_MASTER_CONTEXT.md` API design section read

### Deliverables
- `src/server/db.ts` — Prisma client singleton (prevents connection pool exhaustion in development)
- `src/server/auth.ts` — helper that retrieves current session and throws if unauthenticated
- `src/server/errors.ts` — typed error classes: `AuthenticationError`, `AuthorizationError`, `ValidationError`, `NotFoundError`, `ConflictError`
- `src/server/response.ts` — standardized action response type: `{ data, error, success }`
- `src/lib/zod-schemas/` — shared Zod schemas for all domain objects
- `src/server/services/` — service layer directory (one file per domain: `workout.service.ts`, `nutrition.service.ts`, etc.)
- Service pattern: each service function receives validated input and a Prisma transaction scope; contains no HTTP logic
- Rate limiting utility using an in-memory or Redis-backed store (protect all mutation actions)
- Logging utility (structured JSON logs to Sentry-compatible format)
- All Server Actions use the pattern: authenticate → authorize → validate → call service → return typed response

### Validation criteria
- TypeScript compiles with strict mode; zero `any` types in server layer
- All Server Actions return the standardized response type
- An unauthenticated call to a protected action returns `AuthenticationError`
- An unauthorized call (wrong userId) returns `AuthorizationError`
- Invalid input returns `ValidationError` with Zod error details
- Prisma singleton does not cause connection pool errors in development hot-reload

### Risks
| Risk | Mitigation |
|---|---|
| Prisma connection pool exhaustion in serverless environment | Use Prisma Accelerate or connection pooling (PgBouncer) for Vercel deployments |
| Rate limiting state lost across serverless instances | Use Redis (Upstash) for rate limiting state in production |

### Implementation order
1. Create Prisma singleton in `src/server/db.ts`
2. Create auth helper
3. Create error classes
4. Create standardized response type
5. Create Zod schemas for all domain objects
6. Create service layer directory and placeholder files
7. Create rate limiting utility
8. Create logging utility
9. Document the Server Action pattern in a comment at the top of one example file

---

## PHASE 22 — Member Dashboard — Shell & Navigation

### Objective
Build the persistent dashboard chrome: sidebar navigation, mobile bottom navigation, top bar, and the responsive layout that wraps all dashboard content. This is the container that all subsequent dashboard phases fill.

### Dependencies
- Phase 04 (Sidebar, BottomNav, CommandPalette components)
- Phase 19–21 complete
- `DISCIPLINE_CANONICAL_TOKENS.md` §12.6 Sidebar spec, §12.7 Top Bar spec
- Dashboard navigation items finalized (icons + labels)

### Deliverables
- `src/app/(dashboard)/layout.tsx` — authenticated route group layout
- Dashboard route structure:
  - `/dashboard` — overview/home
  - `/dashboard/workouts` — workout module
  - `/dashboard/nutrition` — nutrition module
  - `/dashboard/habits` — habits module
  - `/dashboard/progress` — progress photos and body metrics
  - `/dashboard/calendar` — weekly planner
  - `/dashboard/messages` — coaching chat
  - `/dashboard/settings` — profile and account settings
  - `/dashboard/subscription` — plan management (Stripe Customer Portal link)
- `src/features/dashboard/components/DashboardSidebar.tsx` — Sidebar configured with dashboard navigation items
- `src/features/dashboard/components/DashboardTopBar.tsx` — Top bar with: page title, breadcrumb, notification bell, avatar menu (profile, settings, logout)
- `src/features/dashboard/components/DashboardBottomNav.tsx` — Mobile bottom nav with 5 key items
- CommandPalette registered globally in dashboard layout
- Active route highlighting in Sidebar and BottomNav
- Sidebar collapse state persisted in localStorage
- Dashboard overview page placeholder with "Welcome, [name]" heading

### Validation criteria
- Sidebar highlights active route on all dashboard pages
- Sidebar collapse/expand animation is smooth (CSS transform, not width)
- BottomNav visible on mobile (< 768px), Sidebar visible on desktop
- TopBar shows correct page title for each route
- CommandPalette opens with ⌘K on all dashboard pages
- Auth middleware: unauthenticated access to any `/dashboard/*` redirects to `/auth/login`
- Logout from TopBar destroys session and redirects to `/`

### Implementation order
1. Create `(dashboard)` route group with `layout.tsx`
2. Create all dashboard route placeholders
3. Build `DashboardSidebar` with nav items
4. Build `DashboardTopBar`
5. Build `DashboardBottomNav`
6. Register CommandPalette in layout
7. Implement Sidebar collapse with localStorage persistence
8. Test auth middleware

---

## PHASE 23 — Member Dashboard — Workout Module

### Objective
Build the complete workout tracking module: exercise library browsing, workout template selection, live session tracking, and history review.

### Dependencies
- Phase 21–22 complete
- Phase 18 complete (Exercise, WorkoutTemplate, WorkoutSession, WorkoutSet schemas)
- Exercise seed data in database
- Level 2 components available (GlassCard, DataTable, Modal)

### Deliverables
- `src/features/workouts/` feature slice
- Pages:
  - `/dashboard/workouts` — overview: recent sessions, assigned templates, quick start button
  - `/dashboard/workouts/library` — browse all exercises with filter (muscle group, equipment, category)
  - `/dashboard/workouts/templates` — list assigned workout templates
  - `/dashboard/workouts/templates/[id]` — template detail with exercise list
  - `/dashboard/workouts/session` — live session tracking page
  - `/dashboard/workouts/history` — past sessions list and detail view
- Server Actions: `getWorkoutTemplates`, `startWorkoutSession`, `logWorkoutSet`, `completeWorkoutSession`, `getWorkoutHistory`
- Live session timer (wall clock, not server-side)
- Set logging: reps, weight, rest timer with audio/vibration cue
- Progressive overload indicator: compares current set to last session's same exercise
- Session completion summary modal
- Charts: weekly volume chart, personal records tracker (Recharts/Tremor)

### Validation criteria
- Exercise library loads with pagination (50 items per page)
- Filter by muscle group returns correct exercises
- Starting a session creates a `WorkoutSession` record
- Logging a set creates a `WorkoutSet` record
- Completing a session sets `completedAt`
- History shows sessions in reverse chronological order
- Charts render with actual user data

### Risks
| Risk | Mitigation |
|---|---|
| Live session state lost on page refresh | Persist session state in localStorage; sync with database on each set logged |
| Large exercise library causing slow loads | Add database index on exercise category and muscle groups; use pagination |

### Implementation order
1. Build server actions and services for workout module
2. Build exercise library page with filter
3. Build template list and detail pages
4. Build live session tracking page (timer, set logging)
5. Build session completion modal
6. Build history page
7. Build workout charts

---

## PHASE 24 — Member Dashboard — Nutrition Module

### Objective
Build food logging, meal tracking, and macro/calorie visualization.

### Dependencies
- Phase 21–22 complete
- Phase 18 complete (Food, NutritionPlan, MealLog, MealLogEntry schemas)
- Food database seed data

### Deliverables
- `src/features/nutrition/` feature slice
- Pages:
  - `/dashboard/nutrition` — today's meals, macro ring chart, calorie progress bar
  - `/dashboard/nutrition/log` — add food to a meal (search food database, select quantity)
  - `/dashboard/nutrition/history` — past days' logs
  - `/dashboard/nutrition/plan` — view assigned nutrition plan from coach
- Food search with debounced API call against food database
- Macro ring chart (protein/carbs/fat circles, Recharts)
- Daily calorie progress bar with remaining/exceeded states
- Custom food creation (if food not in database)
- Serving size and quantity editing

### Validation criteria
- Food search returns relevant results with < 300ms perceived response
- Logging a food item adds to `MealLogEntry` and updates daily totals
- Macro ring updates in real-time after logging
- Custom food saves to `Food` table with `source: user`
- Nutrition plan from coach displays correctly

### Implementation order
1. Build server actions for nutrition module
2. Build food search with debounce
3. Build meal logging flow
4. Build macro ring and calorie progress charts
5. Build nutrition history
6. Build nutrition plan view

---

## PHASE 25 — Member Dashboard — Habits Module

### Objective
Build the daily habit tracking system with streak counting and habit analytics.

### Dependencies
- Phase 21–22 complete
- Phase 18 complete (Habit, HabitLog schemas)

### Deliverables
- `src/features/habits/` feature slice
- Pages:
  - `/dashboard/habits` — today's habits as checkboxes, current streaks
  - `/dashboard/habits/manage` — create, edit, archive habits
  - `/dashboard/habits/analytics` — streak history, completion rates, calendar heat map
- Habit creation: name, description, frequency (daily/weekly), target count, color, icon
- Streak counter per habit
- Weekly completion heat map (GitHub-style calendar, custom or react-calendar-heatmap)
- One-tap check-in for daily habits

### Validation criteria
- Checking off a habit creates a `HabitLog` record
- Streak updates correctly after completing or missing a habit
- Heat map renders completion data for the past 12 weeks
- Archived habits do not appear in daily view

### Implementation order
1. Build server actions for habit CRUD and log
2. Build daily habit check-in list
3. Build habit management page
4. Build streak calculation logic
5. Build heat map chart

---

## PHASE 26 — Member Dashboard — Progress & Photos Module

### Objective
Build body measurement tracking and progress photo storage. Progress photos are stored in Cloudflare R2 (Phase 35 dependency).

### Dependencies
- Phase 21–22 complete
- Phase 18 complete (BodyMeasurement, ProgressPhoto schemas)
- Phase 35 complete (Cloudflare R2 storage integration)

### Deliverables
- `src/features/progress/` feature slice
- Pages:
  - `/dashboard/progress` — overview: weight chart, body fat chart, measurement history table
  - `/dashboard/progress/photos` — photo gallery with front/side/back filters, date selector
  - `/dashboard/progress/measurements` — log new body measurements
- Weight and body fat trend line charts (Recharts)
- Progress photo upload via the FileInput component (uploads to R2 via signed URL)
- Before/after photo comparison for any two dates
- Measurements table with delta since last entry

### Validation criteria
- Photo upload completes via R2 signed URL (not direct to server)
- Photos are private per user (R2 access control)
- Charts render with at least two data points
- Photo gallery filters by angle correctly

### Implementation order
1. Build measurement logging and chart display
2. Build photo upload flow (requires Phase 35)
3. Build photo gallery
4. Build before/after comparison

---

## PHASE 27 — Member Dashboard — Calendar & Planning

### Objective
Build the weekly planning view showing scheduled workouts, meal plans, and habits in a calendar interface.

### Dependencies
- Phase 21–26 complete
- Phase 18 complete (all relevant schemas)

### Deliverables
- `src/features/calendar/` feature slice
- `/dashboard/calendar` — weekly calendar grid showing: scheduled workouts (from templates), meal plan overview, habit targets
- Drag-to-reschedule workout sessions (Dnd-kit)
- "This week at a glance" summary panel

### Validation criteria
- Calendar renders correct week based on current date
- Scheduled items appear on correct day
- Drag-and-drop reschedule updates the session date in the database

### Implementation order
1. Build weekly calendar grid component
2. Populate with workout, nutrition, habit data
3. Add drag-to-reschedule

---

## PHASE 28 — Member Dashboard — Messages & Coaching Chat

### Objective
Build the real-time or near-real-time messaging system between coach and client.

### Dependencies
- Phase 21–22 complete
- Phase 18 complete (Message, Conversation schemas)
- Decision on real-time technology: Server-Sent Events (simpler), or a third-party like Pusher / Ably (more capable)

### Deliverables
- `src/features/messages/` feature slice
- `/dashboard/messages` — conversation list + message thread
- Message input with text and file attachment support
- Read receipts (`readAt` timestamp updated when message viewed)
- Polling or Server-Sent Events for new message notification
- Unread message badge on Sidebar Messages nav item and TopBar notification bell

### Validation criteria
- Messages sent by coach appear in client's thread within 5 seconds
- `readAt` set when client opens the conversation
- File attachments uploaded to R2 and linked in message
- Unread badge count is accurate

### Risks
| Risk | Mitigation |
|---|---|
| Real-time complexity delaying launch | Use polling (10-second interval) at launch; migrate to SSE or Pusher post-launch |

### Implementation order
1. Build conversation list
2. Build message thread with polling
3. Build message input with send action
4. Build file attachment upload
5. Build unread badge integration
6. (Post-launch) Migrate to SSE if polling latency is unacceptable

---

## PHASE 29 — Component Library — Level 3 Business Components

### Objective
Extract and formalize the business-specific components built during dashboard feature phases into the shared component library. This phase does not build new features — it refactors components from Phases 22–28 into reusable, documented, tested library entries.

### Dependencies
- Phases 22–28 complete

### Deliverables
- `src/components/shared/WorkoutCard.tsx`
- `src/components/shared/MealCard.tsx`
- `src/components/shared/ProgressCard.tsx`
- `src/components/shared/SubscriptionCard.tsx`
- `src/components/shared/NotificationItem.tsx`
- All Level 3 components have: TypeScript interfaces, all states, accessibility, responsive behavior documented
- `/dev/components` page updated with Level 3 components

### Validation criteria
- All Level 3 components extracted from feature code with zero behavior changes
- Components are imported from `@/components/shared/` not from feature directories
- Feature code that used inline implementations now uses the extracted components

---

## PHASE 30 — Stripe Integration — Products & Checkout

### Objective
Connect the Plans section to Stripe Checkout, allowing users to purchase a coaching subscription.

### Dependencies
- Phase 18–21 complete (Subscription schema, Server Actions pattern)
- Phase 19 complete (auth — Stripe customer must be linked to User)
- Stripe account created, products and prices created in Stripe Dashboard
- Stripe Node.js SDK installed
- `DISCIPLINE_MASTER_CONTEXT.md` Stripe integration section read

### Deliverables
- Stripe SDK configured with secret key (server-only)
- Stripe publishable key available to client
- `src/server/services/stripe.service.ts` — all Stripe interactions isolated here
- Server Action: `createCheckoutSession` — creates Stripe Checkout session for a plan, returns URL
- Server Action: `createStripeCustomer` — creates Stripe Customer linked to User on first purchase
- `src/app/(landing)/plans/checkout/route.ts` — POST endpoint that creates checkout session and redirects
- Success page: `/checkout/success?session_id=[id]` — validates session, shows confirmation
- Cancel page: `/checkout/cancel` — shows cancellation message with retry CTA
- `stripeCustomerId` stored in `User` or `Subscription` table after first checkout

### Validation criteria
- Clicking a plan CTA redirects to Stripe Checkout with correct product and price
- Completing checkout in test mode creates a `Subscription` record with `status: active`
- Stripe Customer ID is stored in the database after first checkout
- Success page validates the session ID before showing confirmation (prevents URL guessing)
- Cancel page renders without error

### Risks
| Risk | Mitigation |
|---|---|
| Test mode vs. live mode key confusion | Use environment variable names that include `_TEST_` / `_LIVE_` suffix |
| Stripe Customer created multiple times for same user | Check for existing `stripeCustomerId` before creating |

### Implementation order
1. Configure Stripe SDK
2. Create Stripe products and prices in Stripe Dashboard (if not already done)
3. Build `stripe.service.ts`
4. Build `createStripeCustomer` action
5. Build `createCheckoutSession` action
6. Build success and cancel pages
7. Test full checkout flow in test mode

---

## PHASE 31 — Stripe Integration — Webhooks & Lifecycle

### Objective
Handle all Stripe subscription lifecycle events via webhooks. Webhooks are the authoritative source of subscription state — the database must always reflect what Stripe says.

### Dependencies
- Phase 30 complete
- Stripe webhook secret configured in environment variables
- `DISCIPLINE_MASTER_CONTEXT.md` Stripe webhooks section read

### Deliverables
- `src/app/api/webhooks/stripe/route.ts` — POST endpoint receiving Stripe webhook events
- Webhook signature verification (prevent forged events)
- Event handlers for:
  - `checkout.session.completed` — create/update Subscription record, activate plan
  - `customer.subscription.updated` — sync plan changes, update Subscription record
  - `customer.subscription.deleted` — downgrade to free tier or deactivate
  - `invoice.payment_succeeded` — update `currentPeriodEnd`, send confirmation email
  - `invoice.payment_failed` — flag subscription as `past_due`, send warning email
  - `customer.subscription.trial_will_end` — send trial ending reminder (if trials used)
- Idempotency: event IDs stored; duplicate events silently ignored
- Webhook handler is NOT behind auth middleware (Stripe doesn't send auth tokens)

### Validation criteria
- Stripe CLI local listener forwards events correctly to local endpoint
- `checkout.session.completed` creates correct Subscription record
- `customer.subscription.deleted` correctly sets `status: canceled` in database
- Duplicate event with same ID is ignored without error
- Invalid webhook signature returns 400 status immediately

### Risks
| Risk | Mitigation |
|---|---|
| Webhook handler missing events and allowing access to canceled subscribers | Implement a nightly reconciliation job that cross-checks Stripe API vs. database |
| Webhook endpoint timing out (Stripe expects response in < 30s) | Acknowledge webhook immediately (return 200), then process asynchronously |

### Implementation order
1. Build webhook route handler with signature verification
2. Implement event dispatch to individual handlers
3. Implement each event handler
4. Add idempotency key storage
5. Test with Stripe CLI

---

## PHASE 32 — Stripe Integration — Customer Portal

### Objective
Allow subscribers to manage their subscription (upgrade, downgrade, cancel, update payment method) without custom-built UI, using the Stripe Customer Portal.

### Dependencies
- Phase 30–31 complete
- Stripe Customer Portal configured in Stripe Dashboard (branding, allowed actions)

### Deliverables
- Server Action: `createPortalSession` — generates a Stripe Customer Portal session URL for the current user's `stripeCustomerId`
- `/dashboard/subscription` page — shows current plan details (name, next billing date, status), and a button "Manage Subscription" that triggers portal session creation and redirect
- Plan feature comparison visible on subscription page
- Upgrade CTA for users on START plan

### Validation criteria
- "Manage Subscription" redirects to Stripe Customer Portal with correct customer context
- User can cancel and subscription status reflects `canceled` after webhook processed
- User can upgrade and subscription status reflects new plan after webhook processed
- Users without a Stripe Customer ID see an appropriate message (not a broken page)

### Implementation order
1. Configure Stripe Customer Portal in Stripe Dashboard
2. Build `createPortalSession` action
3. Build subscription management page
4. Test cancel and upgrade flows via portal

---

## PHASE 33 — Notification System

### Objective
Build the in-app notification system: display real-time (or near-real-time) notifications for events like new coach messages, workout reminders, and payment events.

### Dependencies
- Phase 21–22 complete (dashboard shell, server actions foundation)
- Phase 18 complete (Notification schema)

### Deliverables
- `src/features/notifications/` feature slice
- Notification bell in TopBar with unread count badge
- Notification dropdown: recent notifications with mark-as-read
- `/dashboard/notifications` page — full notification list with filters
- Server-side notification creation utility (used by other services):
  - Message received notification
  - Workout completion notification
  - Payment success/failure notification
  - Coach feedback notification
- Polling or SSE for unread count in TopBar (5-10 second interval)
- Push notification setup (optional, post-launch): Web Push API registration

### Validation criteria
- Notification appears in bell dropdown within 10 seconds of being created
- Unread count decrements when notification is marked as read
- Clicking a notification navigates to the relevant section
- Full notification list paginates correctly

### Implementation order
1. Build notification creation utility
2. Build notification bell component with polling
3. Build notification dropdown
4. Build full notifications page
5. Trigger test notifications from other modules

---

## PHASE 34 — Email System

### Objective
Build transactional email infrastructure using React Email for templates and Resend for delivery.

### Dependencies
- Phase 01 complete
- Resend account created, domain verified (send-from address configured)
- React Email installed

### Deliverables
- React Email templates (each as a `.tsx` file in `src/emails/`):
  - `WelcomeEmail` — sent after registration
  - `EmailVerificationEmail` — sent with verification link
  - `PasswordResetEmail` — sent with reset link
  - `SubscriptionConfirmationEmail` — sent after successful checkout
  - `PaymentFailedEmail` — sent on invoice failure
  - `CoachMessageEmail` — digest of unread messages (or real-time notification)
  - `WorkoutReminderEmail` — scheduled reminder (via cron or Vercel scheduled function)
  - `ContactFormConfirmationEmail` — auto-reply to contact form
  - `CoachContactNotificationEmail` — notification to coach of new contact submission
- `src/lib/email.ts` — send function wrapping Resend SDK with error handling and logging
- All emails designed consistently with DISCIPLINE brand (off-white background, accent violet, Geist font via web-safe fallback or email-safe alternative)
- Email preview route: `/dev/emails/[template]` accessible only in development

### Validation criteria
- Welcome email received after registration (test with real email)
- All emails render correctly in Gmail, Apple Mail, Outlook (test with Litmus or Email on Acid, or manual)
- No broken images (use absolute URLs for email images)
- Unsubscribe link present in all marketing-adjacent emails
- `from` address is verified domain (not a free address)

### Risks
| Risk | Mitigation |
|---|---|
| Email rendering in Outlook (notorious for ignoring modern CSS) | Test in Outlook; use React Email's battle-tested components |
| Resend rate limits | Resend generous free tier; only upgrade when scale requires |

### Implementation order
1. Install and configure Resend and React Email
2. Build base email layout template
3. Build each transactional email template
4. Build `email.ts` send utility
5. Build email preview dev route
6. Test all emails end-to-end

---

## PHASE 35 — Storage — Cloudflare R2

### Objective
Set up Cloudflare R2 as the object storage backend for all user-generated binary content: progress photos, coach documents, profile pictures.

### Dependencies
- Phase 01 complete
- Cloudflare account with R2 enabled
- `DISCIPLINE_MEDIA_MAP.md` `public/` structure reviewed (static assets go to `public/`, user content goes to R2)

### Deliverables
- Cloudflare R2 bucket created with private access
- R2 bucket configured with lifecycle rules (delete orphaned uploads after 24 hours if no database record created)
- `src/lib/r2.ts` — R2 client using `@aws-sdk/client-s3` (S3-compatible)
- Server Action: `generatePresignedUploadUrl` — returns a signed URL for client-side direct upload to R2, avoiding server memory limits
- Server Action: `generatePresignedDownloadUrl` — returns a signed URL for private content retrieval
- Key naming convention: `{userId}/{context}/{uuid}.{ext}` (e.g., `user123/progress-photos/abc123.webp`)
- File type and size validation before generating upload URL (max 10MB per photo, allowed types: `image/jpeg`, `image/webp`, `image/png`)
- After successful upload, client calls a "confirm upload" Server Action that creates the database record (`ProgressPhoto`, etc.)
- R2 custom domain configured for public bucket (for static assets if used)

### Validation criteria
- Presigned upload URL works for file upload from browser without credentials
- File appears in R2 bucket after upload
- Presigned download URL returns correct file
- File type restriction prevents non-image uploads
- Size restriction prevents files > 10MB
- Orphaned uploads (no database record after 24 hours) cleaned up by lifecycle rule

### Risks
| Risk | Mitigation |
|---|---|
| R2 presigned URL expiry too short | Set upload URLs to expire in 15 minutes; download URLs to 1 hour |
| S3 SDK compatibility issues with R2 | Use S3 SDK v3 with R2's S3-compatible endpoint; test file operations thoroughly |
| Large photo uploads timing out | Direct client-to-R2 upload bypasses server entirely — no server timeout risk |

### Implementation order
1. Create R2 bucket and API credentials
2. Configure environment variables
3. Build `r2.ts` client
4. Build `generatePresignedUploadUrl` action with validation
5. Build `generatePresignedDownloadUrl` action
6. Build "confirm upload" action
7. Configure lifecycle rules in Cloudflare
8. Test upload/download flow end-to-end

---

## PHASE 36 — Media Production Integration

### Objective
Replace all placeholder media assets with the final produced assets from `DISCIPLINE_MEDIA_MAP.md`. Validate that replacing assets does not break any layouts (the contract-based development approach guarantees this, but requires verification).

### Dependencies
- All Landing page phases (06–16) complete
- Media assets produced according to the contract in `DISCIPLINE_MEDIA_MAP.md`
- Each asset approved by the creative director / product owner

### Deliverables (for each P0 asset produced)
- `DISC-HERO-VID-001`: placed at `public/videos/hero.mp4` + `hero.webm` + poster at `public/images/hero-poster.webp`
- `DISC-HERO-VID-001-MOBILE`: placed at `public/videos/hero-mobile.mp4`
- `DISC-HERO-IMG-001`: poster already placed above
- `DISC-GLOBAL-LOGO-001`: placed at `public/brand/logo.svg` — dark, light, and monochrome variants
- `DISC-GLOBAL-FAVICON-001`: all sizes placed at `public/brand/favicon/`
- `DISC-GLOBAL-OG-001`: placed at `public/og/default.png`
- `DISC-GLOBAL-BG-001`: placed at `public/backgrounds/ambient-01.webp`

For each P1 asset (when produced):
- Transformation image pairs: `public/images/transform-*.webp`
- Testimonial avatars: `public/images/testi/avatar-*.webp`
- Dashboard mockup: `public/mockups/dashboard.webp`

### Validation criteria
- Hero video plays and loops seamlessly
- Hero poster matches first frame of video
- Logo renders correctly in Navbar and Footer at all sizes
- OG image renders correctly in social share preview
- Favicon appears in browser tab and bookmarks
- No layout breaks after asset replacement (validate against contracts)
- LCP ≤ 2.5s still met after real assets replace placeholders
- All images served in AVIF or WebP format (not JPEG or PNG unless alpha required)

### Risks
| Risk | Mitigation |
|---|---|
| Video file too large (> 10MB for 8s loop) | Re-encode with higher compression; target < 5MB for hero video |
| Hero poster and video first frame mismatched | Produce poster by extracting exact first frame with FFmpeg |
| Logo SVG contains embedded raster images | Ensure SVG is fully vector; test at 16px and 400px sizes |

### Implementation order
1. P0 assets: place logo, favicon, OG, background
2. Validate favicon and OG
3. Place hero poster and video
4. Test video playback and LCP
5. P1 assets: place transformation images (if real clients available)
6. P1 assets: place testimonial avatars
7. P1 assets: place dashboard mockup (after Phase 22–28)
8. Run full Landing page regression

---

## PHASE 37 — Performance Optimization

### Objective
Achieve and lock in performance budgets: LCP ≤ 2.5s, INP ≤ 200ms, CLS = 0, Lighthouse ≥ 95. Performance is a feature, not a post-launch concern.

### Dependencies
- All product phases (05–36) complete
- Real assets in place (Phase 36)

### Deliverables
- Image optimization audit: all `<img>` using `next/image` with correct `sizes` attribute, AVIF/WebP served
- Hero poster has `priority` and `fetchpriority="high"` set
- Font: Geist loaded with `display: swap` and preload link in `<head>`
- All below-fold images have `loading="lazy"` (or use `next/image` which does this automatically)
- Bundle size audit: run `next build --analyze`, identify and eliminate large dependencies (e.g., unused chart libraries, full lodash instead of es-lodash)
- Code splitting: all heavy components (charts, data tables) are `dynamic()` imported
- CSS: no unused CSS variables shipped in production (CSS purging via Tailwind)
- Lighthouse CI configuration: `lighthouserc.json` with thresholds (Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100)
- Lighthouse CI added to GitHub Actions workflow — fails build if thresholds not met
- Core Web Vitals monitoring in Vercel Analytics (automatic) and PostHog (custom events)
- `next.config.ts` headers: `Cache-Control` for static assets (images, fonts), `Content-Security-Policy`, `X-Frame-Options`

### Validation criteria
- Lighthouse CI runs on every PR and reports all four scores
- LCP ≤ 2.5s on simulated Slow 4G in Lighthouse
- INP ≤ 200ms (verify with Chrome DevTools Performance panel)
- CLS = 0 (verify with Chrome DevTools Layout Shift tool)
- Hero poster image in `<head>` preload link confirmed
- Bundle analyzer shows no single chunk > 200KB uncompressed
- All images compressed: hero poster ≤ 150KB, background ≤ 100KB

### Risks
| Risk | Mitigation |
|---|---|
| Large third-party scripts (analytics, chat) degrading INP | Load all third-party scripts with `strategy="lazyOnload"` via `next/script` |
| CLS from late-loading fonts | Preload font; use `font-display: swap` with size-adjust to minimize layout shift |

### Implementation order
1. Run initial Lighthouse audit — baseline measurement
2. Audit and fix all image usage
3. Bundle size analysis — remove/replace heavy dependencies
4. Add dynamic imports for heavy components
5. Audit third-party script loading strategy
6. Configure Lighthouse CI
7. Run final Lighthouse CI — must pass all thresholds

---

## PHASE 38 — Accessibility Audit & Remediation

### Objective
Achieve WCAG 2.2 AA compliance across all public pages and authenticated flows. Accessibility is non-negotiable per `DISCIPLINE_PROMPT.md`.

### Dependencies
- All product phases complete
- axe DevTools or similar automated scanner available

### Deliverables
- Full automated axe-core scan of all public pages: zero violations
- Full automated axe-core scan of all dashboard pages: zero violations
- Manual keyboard navigation test: Tab through entire Landing page without mouse
- Manual keyboard navigation test: complete a full dashboard workflow (log workout, log meal, check habits) with keyboard only
- Screen reader test (VoiceOver on macOS or NVDA on Windows): verify all pages are navigable and comprehensible
- Color contrast audit: every text + background combination passes WCAG AA minimum
- Focus management audit: Modal and Drawer focus traps work correctly; focus returns to trigger element on close
- Skip-to-content link: visible on focus, jumps to main content, present on all pages
- `alt` text audit: every informational image has descriptive alt; decorative images have `alt=""`
- Form accessibility audit: every input has a label, error messages linked via `aria-describedby`
- Heading hierarchy audit: no skipped heading levels on any page
- ARIA landmark audit: main, nav, header, footer, aside regions correctly labeled

### Validation criteria
- axe-core: zero violations (not "incomplete") on all pages
- Keyboard navigation: user can complete any task without a mouse
- Color contrast: every foreground/background pair passes WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Screen reader: no "orphaned" content, no broken ARIA references
- Focus trap: Tab key never escapes an open Modal or Drawer until it's closed

### Risks
| Risk | Mitigation |
|---|---|
| Liquid Glass aesthetic conflicting with contrast requirements | Use `--ds-color-accent-accessible: #6C5CE7` on interactive elements where `#8B7CFF` fails contrast against white backgrounds |
| Complex interactions (drag-and-drop, carousel) difficult to make accessible | Provide keyboard alternatives for every drag/swipe interaction |

### Implementation order
1. Run automated axe-core scan on all pages
2. Fix all automated violations
3. Manual keyboard navigation test — Landing
4. Manual keyboard navigation test — Dashboard flows
5. Screen reader test
6. Fix all issues found in manual testing
7. Final automated scan — zero violations

---

## PHASE 39 — Testing — Unit & Integration

### Objective
Establish a test suite that gives confidence in business logic, server actions, and component behavior without over-testing implementation details.

### Dependencies
- Phase 18–33 complete (all features built)
- Vitest installed, `@testing-library/react` and `@testing-library/user-event` configured

### Deliverables
- `vitest.config.ts` configured with path aliases and global test setup
- Test setup file: mock `next/navigation`, mock `next/image`, configure DOM environment
- Unit tests for all utility functions in `src/lib/`
- Unit tests for all Zod schemas (valid inputs pass, invalid inputs fail with correct messages)
- Unit tests for all Server Action business logic (mock Prisma, test transformation and validation logic)
- Integration tests for key database operations (using a test database, not mocks):
  - Create user and verify password hash
  - Create subscription and verify relations
  - Soft delete and verify not returned in queries
- Component tests for all Level 1 primitives (render, state changes, keyboard interaction)
- Component tests for all form components (validation, error display, submission)
- Coverage target: 80% line coverage for `src/server/` and `src/lib/`; 60% for `src/features/`

### Validation criteria
- `pnpm test` exits with zero failures
- Coverage report shows ≥ 80% for server layer
- No tests depend on implementation details (test behavior, not internals)
- Tests run in < 60 seconds total (fast test feedback loop)

### Implementation order
1. Configure Vitest and testing libraries
2. Write utility function tests
3. Write Zod schema tests
4. Write Server Action unit tests (with Prisma mocks)
5. Write integration tests (with test database)
6. Write Level 1 component tests
7. Write form component tests
8. Generate coverage report and fill gaps

---

## PHASE 40 — Testing — End-to-End

### Objective
Automate user journey testing for critical flows using Playwright. E2E tests are the final confidence layer before production.

### Dependencies
- Phase 39 complete
- All features complete
- Playwright configured with pre-installed Chromium (already available in the environment)
- Test database with seed data for E2E tests

### Deliverables
- `playwright.config.ts` configured for all three browsers (Chromium, Firefox, WebKit)
- E2E tests for:
  - **Landing page:** load, navigate to Plans, click CTA
  - **Registration:** complete form, verify email, complete onboarding
  - **Login:** email+password, OAuth (mock), 2FA
  - **Workout logging:** select template, log sets, complete session
  - **Nutrition:** search food, log meal, verify macro update
  - **Habits:** check off habit, verify streak
  - **Progress:** upload photo, view gallery
  - **Subscription:** complete checkout (Stripe test mode), verify plan upgrade
  - **Messaging:** send message, verify delivery
  - **Settings:** update profile, change password
- Playwright CI step added to GitHub Actions (runs after unit/integration tests)
- Playwright test reports stored as CI artifacts

### Validation criteria
- All E2E tests pass on Chromium (minimum), all three browsers (target)
- E2E tests run in < 10 minutes in CI
- Flaky tests do not exist (tests that intermittently fail are treated as bugs)
- E2E tests use Page Object pattern for maintainability

### Risks
| Risk | Mitigation |
|---|---|
| Tests fragile due to timing issues | Use Playwright's auto-wait; avoid `page.waitForTimeout()` |
| Stripe Checkout E2E test depends on external service | Use Stripe's test cards and test mode; mock payment completion where necessary |

### Implementation order
1. Configure Playwright
2. Write Landing page tests
3. Write auth flow tests
4. Write workout module tests
5. Write nutrition module tests
6. Write habits, progress, messages tests
7. Write Stripe checkout test
8. Add Playwright to CI pipeline

---

## PHASE 41 — Testing — Visual Regression

### Objective
Capture and protect the visual appearance of key components and pages. Prevent unintended visual changes from reaching production.

### Dependencies
- Phase 39–40 complete
- Percy, Chromatic, or Playwright's built-in screenshot comparison configured

### Deliverables
- Visual regression tool configured (Playwright screenshot comparison recommended for simplicity)
- Baseline screenshots captured for:
  - Landing page at 390px, 768px, 1024px, 1440px
  - Dashboard overview at 768px, 1440px
  - Plans section at all breakpoints
  - All Level 1 and Level 2 components in their states (via `/dev/components` page)
- CI step that compares screenshots against baselines and fails if diff exceeds threshold (1% pixel difference)
- Process for updating baselines: explicit approval step, not automatic

### Validation criteria
- Visual regression tests run in CI on every PR
- A known visual change (e.g., updating button padding by 4px) is caught
- False positive rate is low (< 1 flaky test per 100 runs)

---

## PHASE 42 — Monitoring & Observability

### Objective
Instrument the production application with error tracking, user behavior analytics, and performance monitoring so that issues are discovered before users report them.

### Dependencies
- Phase 37 complete (performance baseline set)
- Sentry account created, Sentry DSN available
- PostHog account created, PostHog API key available

### Deliverables
- **Sentry:**
  - `@sentry/nextjs` installed and configured
  - Source maps uploaded to Sentry on each build (maps errors to original TypeScript)
  - Error boundary wrapping all routes (custom error UI matching DISCIPLINE design)
  - Performance tracing: 20% sample rate in production, 100% in staging
  - Alerts configured: error rate spike, P95 response time > 2s
  - `sentry.edge.config.ts` and `sentry.server.config.ts` and `sentry.client.config.ts` all configured
- **PostHog:**
  - PostHog provider wrapped around app root (client-side analytics)
  - Key events tracked:
    - `landing_viewed`
    - `plans_viewed`
    - `cta_clicked` (with plan name property)
    - `checkout_started`
    - `checkout_completed`
    - `registration_completed`
    - `onboarding_completed`
    - `workout_logged`
    - `habit_checked`
  - Feature flags configured in PostHog for future A/B testing
  - `identify` called after login (links events to user ID)
- **Vercel Analytics:** already enabled (automatic — no additional setup needed)
- **Lighthouse CI:** already configured in Phase 37 (runs on every PR)
- `src/app/error.tsx` and `src/app/not-found.tsx` — custom error pages matching DISCIPLINE design
- `src/app/(dashboard)/error.tsx` — dashboard-specific error boundary
- Health check endpoint: `GET /api/health` returns database connectivity status and app version

### Validation criteria
- A thrown error in a route component appears in Sentry within 60 seconds
- PostHog receives events when key actions are taken (verify in PostHog UI)
- Source maps correctly map stack traces to TypeScript files in Sentry
- Error pages render correctly and include a "Go back to home" CTA
- Health check endpoint returns `200 OK` with `{ status: "ok", version: "..." }`

### Implementation order
1. Install and configure Sentry (`@sentry/nextjs`)
2. Build custom error pages
3. Configure Sentry alerts
4. Install and configure PostHog
5. Implement key event tracking
6. Implement `identify` call on login
7. Build health check endpoint
8. Verify all monitoring in staging environment

---

## PHASE 43 — Production Deployment

### Objective
Deploy the application to production on Vercel with all required infrastructure, environment variables, and database migrations applied safely.

### Dependencies
- All phases 01–42 complete and passing in staging
- Custom domain DNS configured to point to Vercel
- All production environment variables set (never shared with development)
- SSL certificate provisioned (automatic via Vercel)
- Stripe live mode keys configured
- Resend production sending domain verified
- Sentry production DSN set
- PostHog production API key set
- R2 production bucket created (separate from staging)
- PostgreSQL production database provisioned (separate from staging)

### Deliverables
- Vercel production deployment with all environment variables
- Production database with `prisma migrate deploy` applied (not `migrate dev`)
- Seed data applied to production database (Plans, Exercise library, HabitTemplates)
- Custom domain live and SSL active
- Stripe live mode: products, prices, and webhook endpoint registered with production URL
- Stripe webhook signing secret configured in production environment
- `NEXT_PUBLIC_APP_URL` set to production domain
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` set to live mode key
- DNS: `www.` redirects to root domain (or vice versa, per decision)
- Preview deployments: remain enabled for all non-production branches
- Production deployment requires: CI passes, Lighthouse CI passes, all tests pass — no exceptions

### Validation criteria
- Production URL loads with correct domain and SSL
- Registration flow works end-to-end in production (real email received)
- Stripe checkout works in live mode (do not use a real card in testing — use Stripe test cards in live mode is not possible; use a real card for a small amount and immediately refund)
- All environment variables verified (no `undefined` values in production logs)
- Sentry receives events from production
- No staging or development credentials in production environment
- `robots.txt` in production allows crawling of public pages

### Risks
| Risk | Mitigation |
|---|---|
| Migration applied incorrectly on production database | Always run `migrate deploy` (not `migrate dev`) on production; backup database before first migration |
| Production Stripe webhook events not received | Test Stripe webhook endpoint with Stripe Dashboard's test delivery tool |
| Environment variable typo causing silent failure | Validate all env vars at application startup; throw if required vars are missing |

### Implementation order
1. Provision production PostgreSQL database (separate from staging)
2. Set all production environment variables in Vercel dashboard
3. Create production R2 bucket
4. Configure Stripe live mode products, prices, and webhook
5. Verify Resend domain for production sending
6. Trigger production deployment from main branch
7. Run `prisma migrate deploy` against production database
8. Run seed script
9. Verify domain, SSL, and redirects
10. Smoke test: load page, register, checkout
11. Monitor Sentry for first 30 minutes of production traffic

---

## PHASE 44 — Launch Readiness & Go-Live

### Objective
Final pre-launch checklist, soft launch, and go-live coordination. This phase is operational, not technical.

### Dependencies
- Phase 43 complete (production deployment live)
- Legal pages live (Privacy Policy, Terms of Service, Cookie Policy)
- All P0 media assets in place
- Support/contact email address active and monitored
- Coach(es) have dashboard accounts and are familiar with the messaging module

### Deliverables
- Pre-launch checklist reviewed and signed off:
  - [ ] Privacy Policy published and up-to-date (GDPR/CCPA if applicable)
  - [ ] Terms of Service published
  - [ ] Cookie consent banner (if required by jurisdiction)
  - [ ] All links on Landing page work and go to correct destinations
  - [ ] All Stripe prices correct (verified against displayed prices on Landing)
  - [ ] Unsubscribe link in all emails
  - [ ] `robots.txt` correct — dashboard excluded from indexing
  - [ ] `sitemap.xml` submitted to Google Search Console
  - [ ] Google Analytics / PostHog event verification
  - [ ] Sentry alert rules active
  - [ ] Support email monitored
  - [ ] Coach accounts created
  - [ ] Stripe payout account verified and active
- Soft launch: send invitation to a small group of founding members (5–10) and collect feedback
- Hard launch: announce publicly after soft launch issues resolved
- Post-launch monitoring plan:
  - First 24 hours: monitor Sentry error rate every hour
  - First week: review Vercel Analytics daily (bounce rate, page views, conversion)
  - First month: review PostHog funnels (landing → plans → checkout → registration conversion)

### Validation criteria
- Zero P0 or P1 bugs discovered during soft launch
- All legal pages live with accurate content
- Stripe payouts working (coach receives test payout)
- Google Search Console: `sitemap.xml` indexed
- Sentry: error rate < 0.1% of page views

---

## APPENDIX A — Development Principles (carry into every phase)

The following principles govern every decision across all phases. They are not phase-specific — they apply everywhere.

**Design system supremacy.** All numeric values (colors, spacing, radii, blur, timing) come from `DISCIPLINE_CANONICAL_TOKENS.md`. No exceptions. A raw hex code or pixel value outside the token files is a bug.

**Contract-first media.** Media assets are referenced by their `DISC-*` IDs from `DISCIPLINE_MEDIA_MAP.md`. Layouts are built to their contract (ratio, dimensions, zone-safe area). When real assets arrive, they slot in without layout changes.

**Integrity before conversion.** Testimonials and transformation images must be real people with documented written consent. A placeholder or honest "coming soon" is always preferable to fabricated social proof.

**Performance is a feature.** LCP ≤ 2.5s, INP ≤ 200ms, CLS = 0. These are pass/fail thresholds, enforced by Lighthouse CI on every pull request.

**Accessibility is non-negotiable.** WCAG 2.2 AA is the floor, not the ceiling. Every component, every page, every flow.

**Services, not components.** Business logic lives in `src/server/services/`. Components and Server Actions orchestrate and render — they do not contain business rules.

**Server-first, client when necessary.** Default to Server Components and Server Actions. Add `"use client"` only when interactivity, browser APIs, or stateful libraries require it.

**Reduced motion respect.** Every animation checks `prefers-reduced-motion`. When the preference is set, animation is reduced to simple fades — never disabled entirely (which would cause abrupt transitions).

**Soft delete always.** No hard deletes of user-generated data or user accounts. All deletions set `deletedAt` and are excluded from queries by default.

**Webhook as authority.** Stripe webhook events are the source of truth for subscription state. The database reflects what Stripe says — never the other way around.

---

## APPENDIX B — Phase Dependency Graph (simplified)

```
01 (Bootstrap)
 └─ 02 (Tokens)
     └─ 03 (L1 Components)
         └─ 04 (L2 Components)
             ├─ 05 (Landing Shell)
             │   ├─ 06 (Hero)
             │   ├─ 07 (Proof)
             │   ├─ 08 (Plans)
             │   ├─ 09 (Transform)
             │   ├─ 10 (Method)
             │   ├─ 11 (Dash Preview) ─── depends on 22-28
             │   ├─ 12 (Testimonials)
             │   ├─ 13 (FAQ)
             │   ├─ 14 (Contact) ──────── depends on 34
             │   ├─ 15 (Footer)
             │   └─ 16 (Motion Polish)
             └─ 18 (DB Schema)
                 ├─ 19 (Auth) ─────────── depends on 34 (partial)
                 │   └─ 20 (Onboarding)
                 │       └─ 21 (API Layer)
                 │           └─ 22 (Dashboard Shell)
                 │               ├─ 23 (Workouts)
                 │               ├─ 24 (Nutrition)
                 │               ├─ 25 (Habits)
                 │               ├─ 26 (Progress) ── depends on 35
                 │               ├─ 27 (Calendar)
                 │               └─ 28 (Messages) ─ depends on 35 (file attachments)
                 ├─ 30 (Stripe Checkout) ─ depends on 19, 21
                 │   ├─ 31 (Stripe Webhooks)
                 │   └─ 32 (Customer Portal)
                 ├─ 33 (Notifications) ─── depends on 22
                 └─ 34 (Email System)

17 (SEO) ────────────────────────────────── depends on 05-15
29 (L3 Components) ─────────────────────── depends on 22-28
35 (R2 Storage) ────────────────────────── depends on 01
36 (Media Integration) ─────────────────── depends on 05-16
37 (Performance) ───────────────────────── depends on all product phases
38 (Accessibility) ─────────────────────── depends on all product phases
39 (Unit Tests) ────────────────────────── depends on all product phases
40 (E2E Tests) ─────────────────────────── depends on 39
41 (Visual Regression) ─────────────────── depends on 40
42 (Monitoring) ────────────────────────── depends on all product phases
43 (Production Deploy) ─────────────────── depends on 37-42
44 (Go-Live) ───────────────────────────── depends on 43
```

---

## APPENDIX C — Environment Variable Inventory

All variables required across all phases. Every variable has a development, staging, and production value. Never share across environments.

| Variable | Phase introduced | Used for |
|---|---|---|
| `DATABASE_URL` | 18 | PostgreSQL connection string |
| `NEXTAUTH_SECRET` / `BETTER_AUTH_SECRET` | 19 | Session token signing |
| `NEXTAUTH_URL` / `BETTER_AUTH_URL` | 19 | Auth callback base URL |
| `GOOGLE_CLIENT_ID` | 19 | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | 19 | Google OAuth |
| `APPLE_CLIENT_ID` | 19 | Apple Sign In |
| `APPLE_CLIENT_SECRET` | 19 | Apple Sign In |
| `MICROSOFT_CLIENT_ID` | 19 | Microsoft OAuth |
| `MICROSOFT_CLIENT_SECRET` | 19 | Microsoft OAuth |
| `STRIPE_SECRET_KEY` | 30 | Stripe server-side API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 30 | Stripe client-side |
| `STRIPE_WEBHOOK_SECRET` | 31 | Webhook signature verification |
| `RESEND_API_KEY` | 34 | Email delivery |
| `EMAIL_FROM` | 34 | Sending address |
| `CLOUDFLARE_R2_ACCOUNT_ID` | 35 | R2 storage |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | 35 | R2 storage |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | 35 | R2 storage |
| `CLOUDFLARE_R2_BUCKET_NAME` | 35 | R2 storage |
| `CLOUDFLARE_R2_PUBLIC_URL` | 35 | R2 public URL (if public bucket) |
| `SENTRY_DSN` | 42 | Error tracking |
| `SENTRY_AUTH_TOKEN` | 42 | Source map upload |
| `NEXT_PUBLIC_POSTHOG_KEY` | 42 | Analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | 42 | Analytics |
| `NEXT_PUBLIC_APP_URL` | 43 | Canonical URL for emails and OG |

---

*End of DISCIPLINE BUILD PLAN — v1.0*
