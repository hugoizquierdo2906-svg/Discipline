# DISCIPLINE COMPONENT LIBRARY

This document consolidates all component-related documentation extracted from the project.



---

# Source: 02 - Landing page/04-Dashboard-Preview.md

# Dashboard Preview
Preview workout calendar, nutrition, progress graphs, subscriptions and messages.

---

# Source: 02 - Landing page/05-Testimonials.md

# Testimonials
Glass testimonial cards with portraits, ratings and animated carousel.

---

# Source: 02 - Landing page/06-FAQ.md

# FAQ
Expandable glass accordions with smooth height animations.

---

# Source: 03 - Dashboard/02-Member-Dashboard.md


# DISCIPLINE
# Volume 3 — 02-Member-Dashboard.md

## Objective

Design a premium member dashboard that feels closer to Apple Health, Linear, Arc Browser and Notion than a traditional fitness application.

The dashboard must become the central workspace for every client.

---

# General Layout

- Responsive application shell
- Left collapsible sidebar
- Top navigation bar
- Main content area
- Right contextual panel (desktop)
- 12-column responsive grid
- Max content width: 1600px

---

# Visual Style

Background:
- #FAFAF8

Cards:
- Liquid Glass
- backdrop-filter: blur(32px)
- rgba(255,255,255,.58)

Accent:
- #8B7CFF

Border radius:
- 28px

Soft shadows only.

---

# Sidebar

Sections:

- Dashboard
- Training
- Nutrition
- Habits
- Progress
- Photos
- Messages
- Calendar
- Billing
- Settings

Active item:
- Pastel violet glow
- Glass highlight
- Animated indicator

---

# Top Bar

Contains:

- Greeting
- Search
- Notifications
- Profile menu
- Current coaching plan
- Quick action button

Sticky while scrolling.

---

# Dashboard Widgets

## Daily Summary

Display:

- Calories
- Protein
- Water
- Steps
- Workout status
- Sleep
- Recovery

Each metric displayed inside independent Liquid Glass cards.

---

## Weekly Progress

Interactive charts:

- Weight
- Body fat
- Calories
- Training volume

Smooth animated transitions.

---

## Habit Tracker

Track:

- Sleep
- Water
- Meditation
- Stretching
- Steps

Daily streak visualization.

---

## Workout Preview

Shows:

- Today's session
- Exercise count
- Estimated duration
- Completion percentage

Primary CTA:
Start Workout

---

## Nutrition Preview

Displays:

- Calories remaining
- Macro split
- Meals
- Water intake

Button:
View Meal Plan

---

## Progress Gallery

Timeline of progress photos.

Comparison slider.

Monthly snapshots.

---

## Coach Messages

Inbox with:

- unread badge
- attachments
- images
- voice notes (future ready)

---

## Calendar

Monthly and weekly view.

Display:

- Check-ins
- Calls
- Workout schedule
- Nutrition updates

---

# Motion

Use Framer Motion.

Animations:

- Fade Up
- Scale In
- Blur Reveal
- Staggered widget loading
- Hover lift
- Magnetic buttons

Durations:
200–500ms

---

# Responsive

Desktop:
3-column dashboard.

Tablet:
2 columns.

Mobile:
Single column.
Bottom navigation replaces sidebar.

---

# Accessibility

Keyboard navigation.

ARIA labels.

Reduced motion support.

Visible focus indicators.

---

# Performance

Lazy load heavy charts.

Virtualize long lists.

Memoize widgets.

Avoid layout shifts.

---

# Final Requirement

The dashboard must feel like premium software instead of a coaching portal.
Every interaction should reinforce clarity, confidence and progress.


---

# Source: 04 - Components/02-Components.md


# DISCIPLINE
# Volume 4 — 02-Components.md

## OBJECTIVE

Define a complete, reusable component architecture for the DISCIPLINE platform.

Every component must be modular, accessible, themeable and production-ready.

The design language is based on Apple Liquid Glass with premium editorial aesthetics.

---

# COMPONENT PHILOSOPHY

Components must be:

- Reusable
- Typed
- Accessible
- Responsive
- Animated
- Independent
- Easily testable

Avoid duplicated UI.

---

# COMPONENT HIERARCHY

Level 1 — Foundations

- Button
- Input
- Textarea
- Label
- Badge
- Avatar
- Icon
- Divider
- Spinner

Level 2 — UI

- GlassCard
- Modal
- Drawer
- Tooltip
- Dropdown
- Accordion
- Tabs
- Toast
- Alert
- Progress Bar

Level 3 — Business

- WorkoutCard
- MealCard
- ProgressCard
- SubscriptionCard
- CoachCard
- NotificationCard
- StatisticCard
- ExerciseCard

---

# BUTTONS

Variants

- Primary
- Secondary
- Ghost
- Outline
- Destructive

States

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

Glass buttons use:

- backdrop blur
- pastel violet glow
- subtle elevation

---

# GLASS CARD

Radius:
28px

Background:
rgba(255,255,255,.58)

Backdrop:
blur(32px)

Border:
rgba(255,255,255,.60)

Shadow:
soft only

Hover:

- translateY(-4px)
- brighter border
- stronger blur

---

# FORM COMPONENTS

Input

Textarea

Checkbox

Radio

Switch

Slider

Date Picker

Search Bar

Every input supports:

- validation
- helper text
- error state
- success state
- loading state

---

# NAVIGATION COMPONENTS

Navbar

Sidebar

Breadcrumb

Pagination

Bottom Navigation (mobile)

Command Palette

---

# DASHBOARD COMPONENTS

Widgets:

- Calories
- Workout
- Water
- Steps
- Sleep
- Recovery
- Coach Messages
- Progress

Widgets are draggable (future-ready).

---

# CHART COMPONENTS

Support:

- Line Chart
- Bar Chart
- Area Chart
- Radial Progress
- Donut Chart

Charts animate on mount.

---

# FEEDBACK COMPONENTS

Toast

Snackbar

Alert Banner

Confirmation Dialog

Loading Skeleton

Empty State

Error State

Success State

---

# MEDIA COMPONENTS

Image Viewer

Video Player

Before / After Slider

Carousel

Lightbox

Gallery Grid

---

# ANIMATIONS

Use Framer Motion.

Default durations:

150–400ms

Transitions:

- Fade
- Scale
- Blur
- Slide
- Stagger

Hover animations must never exceed 250ms.

---

# RESPONSIVE RULES

Desktop:
12-column grid

Tablet:
8-column grid

Mobile:
4-column grid

Touch targets:

Minimum 44px.

---

# ACCESSIBILITY

Every component must support:

- Keyboard navigation
- ARIA labels
- Focus rings
- Screen readers
- Reduced motion

---

# TESTING

Each component includes:

- Unit tests
- Storybook story
- Accessibility test
- Visual regression test

---

# FINAL REQUIREMENT

Every component should feel handcrafted.

No Bootstrap-like appearance.

No generic UI.

The complete library should be reusable across future DISCIPLINE products while maintaining a consistent premium experience.


---

# Source: 04 - Components/05-Performance.md


# DISCIPLINE
# Volume 4 — 05-Performance.md

## OBJECTIVE

Engineer a world-class performance strategy that delivers an instant, fluid experience across desktop and mobile while maintaining premium visuals and animations.

Target Core Web Vitals:

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

---

# PERFORMANCE PHILOSOPHY

Performance is a feature.

Every animation, component and API request must justify its existence.

Never sacrifice responsiveness for visual effects.

---

# NEXT.JS STRATEGY

- App Router
- Server Components by default
- Client Components only when required
- Streaming for large pages
- Route-level code splitting
- Partial prerendering when appropriate

---

# IMAGE OPTIMIZATION

Use next/image.

Rules:

- AVIF/WebP preferred
- Responsive sizes
- Lazy-load below the fold
- Blur placeholders
- CDN caching
- Compress uploads automatically

---

# VIDEO OPTIMIZATION

- Autoplay only when muted
- Lazy-load non-critical videos
- Adaptive bitrate
- Poster image before playback
- Pause when out of viewport

---

# FONT STRATEGY

Use next/font.

- Self-host fonts
- Preload primary font
- font-display: swap
- Minimize font families and weights

---

# BUNDLE OPTIMIZATION

- Dynamic imports
- Tree shaking
- Remove dead code
- Analyze bundles before release
- Lazy-load charts, editors and heavy libraries

---

# DATA FETCHING

- Server Actions
- Request deduplication
- Revalidation
- Optimistic UI
- Suspense boundaries

---

# DATABASE PERFORMANCE

- Proper indexes
- Cursor pagination
- Avoid N+1 queries
- Select only required fields
- Connection pooling

---

# CACHING

Use multiple layers:

- Browser cache
- CDN cache
- Server cache
- Database cache

Define cache policies per route.

---

# ANIMATION PERFORMANCE

- Animate transform and opacity
- Avoid layout-triggering properties
- Use will-change sparingly
- Target 60 FPS
- Disable heavy effects on low-end devices

---

# SCROLL PERFORMANCE

Lenis smooth scrolling.

Use Intersection Observer.

Throttle expensive listeners.

Avoid continuous DOM measurements.

---

# MEMORY MANAGEMENT

- Cleanup listeners
- Cancel pending requests
- Dispose animations
- Revoke object URLs
- Prevent memory leaks

---

# ACCESSIBILITY & PERFORMANCE

Support prefers-reduced-motion.

Disable non-essential animations when requested.

Maintain high contrast without increasing rendering cost.

---

# MONITORING

Integrate:

- Lighthouse CI
- Sentry Performance
- PostHog
- Vercel Analytics

Track:

- Core Web Vitals
- JS errors
- Slow queries
- API latency

---

# TESTING

Before release verify:

- Lighthouse >= 95
- Mobile performance
- Desktop performance
- Slow 3G simulation
- CPU throttling
- Image optimization
- Bundle size regression

---

# DEPLOYMENT CHECKLIST

- Production build passes
- No console errors
- No hydration warnings
- No unused dependencies
- Environment variables validated
- Database migrations completed

---

# FINAL REQUIREMENTS

The DISCIPLINE platform must feel instantaneous.

Large media, Liquid Glass effects and premium animations should never compromise responsiveness.

Every release should maintain excellent Core Web Vitals and a smooth user experience.


---

# Source: 05 - Motion Design System/Volume5-02-Hero-Timeline.md


# DISCIPLINE
# Volume 5 — 02-Hero-Timeline.md

## OBJECTIVE

Design a cinematic hero sequence that immediately communicates premium quality.

The first five seconds should create the same emotional impact as visiting an Apple keynote page or an award-winning Awwwards experience.

---

# HERO STRUCTURE

Layers (back to front):

1. Fullscreen background video
2. Gradient overlays
3. Noise texture
4. Light bloom
5. Navigation
6. Hero content
7. Floating glass elements
8. Cursor effects

---

# GSAP MASTER TIMELINE

Timeline duration:
≈ 3.5 seconds

Sequence:

0.00s
- Fade from black

0.20s
- Background video opacity: 0 → 1

0.45s
- Navigation slides from Y = -32px

0.70s
- Eyebrow text fades in

0.90s
- Hero title reveals line-by-line using clip-path

1.50s
- Description fades upward

1.70s
- CTA buttons scale from 0.95 → 1

2.00s
- Statistics stagger into view

2.30s
- Floating glass cards appear

2.80s
- Ambient light animation begins

3.50s
- Timeline completes

---

# HEADLINE REVEAL

Each line:

- overflow hidden
- translateY(120%)
- animate to 0%

Delay:
80 ms between lines.

Ease:
[0.22,1,0.36,1]

---

# BACKGROUND VIDEO

Rules:

- Autoplay
- Loop
- Muted
- object-cover

Overlay:

Linear gradient

Top:
rgba(255,255,255,.12)

Bottom:
rgba(250,250,248,.82)

Video pauses when hidden.

---

# GLASS CARDS

Entrance:

- opacity 0 → 1
- y 32 → 0
- scale .96 → 1

Hover:

- translateY(-6px)
- stronger reflection
- violet border glow

---

# CTA BUTTONS

Primary:

- Magnetic hover
- Glass ripple
- Scale 1.03

Secondary:

- Border highlight
- Soft blur increase

Click:

- Compress to 0.97
- Return with spring animation

---

# PARALLAX

Mouse movement (desktop):

Background:
2px

Hero text:
4px

Floating cards:
8px

Disable on touch devices.

---

# LIGHT EFFECTS

Subtle animated radial gradients.

Cycle:
12–18 seconds.

No abrupt changes.

---

# SCROLL HANDOFF

When the user scrolls:

- Hero content fades
- Background scales slightly
- Next section rises naturally
- No snapping

Use ScrollTrigger.

---

# MOBILE EXPERIENCE

Reduce animation count.

No cursor effects.

Minimal parallax.

Prioritize readability.

---

# PERFORMANCE

Target:

- 60 FPS
- GPU accelerated transforms
- No layout shifts
- Lazy-load non-critical assets

---

# QA CHECKLIST

- Hero loads under 2 seconds
- Timeline never stutters
- CTA always interactive
- Video never blocks rendering
- Motion consistent across browsers

---

# FINAL REQUIREMENT

The hero must create an immediate premium impression.

Users should understand the DISCIPLINE brand before reading a single paragraph.


---

# Source: 06 - UI Bible/Volume6-02-Buttons.md


# DISCIPLINE
# Volume 6 — 02-Buttons.md

## OBJECTIVE

Define every button used across the DISCIPLINE platform.

Buttons must communicate confidence, precision and premium quality while remaining highly accessible and reusable.

Buttons are one of the strongest elements of the visual identity.

---

# DESIGN PRINCIPLES

Buttons must be:

- Clear
- Tactile
- Elegant
- Responsive
- Accessible

Every interaction should feel physical.

---

# BUTTON TYPES

## Primary

Purpose:

Main CTA.

Background:

Pastel Violet

Text:

White

Glass reflection enabled.

---

## Secondary

Glass background.

Dark text.

Soft border.

---

## Ghost

Transparent.

No background.

Underline on hover.

---

## Outline

Transparent.

1px border.

Glass hover.

---

## Destructive

Soft red.

Confirmation required.

---

# BUTTON SIZES

Small

Height:
36px

Medium

Height:
48px

Large

Height:
56px

Hero

Height:
64px

Minimum touch target:

44px.

---

# BORDER RADIUS

Small:
14px

Standard:
20px

Hero:
28px

---

# STATES

Every button defines:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading
- Success
- Error

No undefined state allowed.

---

# HOVER

Primary:

- Lift 3px
- Glass reflection moves
- Violet glow increases
- Shadow deepens slightly

Duration:

160ms

---

# ACTIVE

Scale:

0.97

Shadow softens.

Spring back on release.

---

# FOCUS

Visible ring:

2px

Accent Violet.

Never remove browser focus visibility.

---

# LOADING

Replace label with spinner.

Preserve button width.

Disable repeated clicks.

Optional progress label:

"Processing..."

---

# SUCCESS

Animated checkmark.

Soft green glow.

Return to default after confirmation.

---

# ERROR

Shake once.

Red border.

Readable message below.

Never rely only on color.

---

# ICON BUTTONS

Support:

- Leading icon
- Trailing icon
- Icon-only

Icon spacing:

12px.

Lucide React only.

---

# MAGNETIC EFFECT

Desktop only.

Cursor attraction:

4–8px.

Disabled on touch devices.

---

# LIQUID GLASS

Secondary buttons:

Background:

rgba(255,255,255,.55)

Blur:

24px

Reflection follows cursor.

---

# TYPOGRAPHY

Weight:

600

Tracking:

Slightly increased.

Uppercase only for marketing CTAs.

Sentence case inside dashboard.

---

# ACCESSIBILITY

Minimum contrast:

WCAG AA.

Keyboard support.

Visible focus.

Screen reader labels.

Disabled buttons remain identifiable.

---

# RESPONSIVE

Desktop:

Comfortable padding.

Mobile:

Larger tap areas.

Reduced hover dependency.

---

# PERFORMANCE

Animate only:

- transform
- opacity
- filter (limited)

Avoid expensive shadow animations.

---

# QA CHECKLIST

- Hover consistent
- Press feels tactile
- Loading preserves layout
- Success visible
- Error understandable
- Keyboard navigation verified
- Mobile tap tested

---

# IMPLEMENTATION NOTES

Create a single reusable Button component with variants, sizes and states exposed through typed props.

No duplicated button implementations are allowed anywhere in the project.

---

# FINAL REQUIREMENTS

Buttons should become one of the strongest visual signatures of DISCIPLINE.

Users should immediately recognize interactions as refined, premium and responsive.


---

# Source: 06 - UI Bible/Volume6-03-Glass-Cards.md


# DISCIPLINE
# Volume 6 — 03-Glass-Cards.md

## OBJECTIVE

Define the complete specification for every Liquid Glass card used across the DISCIPLINE platform.

Glass cards are the primary visual container of the interface and must communicate clarity, depth and premium craftsmanship.

---

# DESIGN PHILOSOPHY

Every card should feel like a physical sheet of frosted glass floating above the background.

Characteristics:

- Elegant
- Lightweight
- Calm
- Layered
- Functional

Never create a heavy or opaque appearance.

---

# CORE APPEARANCE

Background:

rgba(255,255,255,0.58)

Backdrop Blur:

32px

Border:

1px solid rgba(255,255,255,0.60)

Radius:

28px

Shadow:

0 20px 60px rgba(0,0,0,.08)

---

# SIZE SYSTEM

Small

For metrics and compact widgets.

Medium

Default content card.

Large

Dashboard modules.

Hero

Feature showcases.

All cards expand naturally with content.

---

# INTERNAL SPACING

Padding Scale

24px

32px

40px

56px

Use a consistent 8px spacing grid.

---

# CARD LAYOUT

Header

- Icon (optional)
- Title
- Badge (optional)
- Actions

Body

- Description
- Statistics
- Media
- Charts

Footer

- CTA
- Metadata
- Timestamp

---

# VARIANTS

## Standard

General information.

## Elevated

Highlighted content.

## Interactive

Clickable cards.

## Selection

Supports active state.

## Metric

Dashboard KPI.

## Pricing

Subscription plans.

## Testimonial

Client reviews.

---

# HOVER

- TranslateY(-6px)
- Slight scale (1.01)
- Reflection shifts
- Border brightness increases
- Shadow deepens subtly

Duration:

180–220ms

---

# ACTIVE

Scale:

0.99

Maintain visual stability.

---

# FOCUS

2px pastel violet focus ring.

Keyboard accessible.

---

# SELECTION

Selected cards display:

- Accent border
- Persistent glow
- Check indicator (optional)

---

# GLASS REFLECTION

Reflection responds to:

- Cursor position
- Scroll direction
- Ambient animation

Opacity:

5–10%

Never cover content.

---

# MEDIA SUPPORT

Cards may contain:

- Images
- Video previews
- Charts
- Progress rings
- Before/After sliders

Maintain 16:9 or 4:3 media ratios where appropriate.

---

# TYPOGRAPHY

Title

20–28px

Body

16–18px

Caption

12–14px

Maximum 3 text hierarchy levels per card.

---

# ICONOGRAPHY

Lucide React.

24px default.

Consistent stroke width.

---

# RESPONSIVE

Desktop

Multi-column layouts.

Tablet

Adaptive widths.

Mobile

Full-width cards.

Minimum touch target:

44px.

---

# ACCESSIBILITY

Maintain WCAG AA contrast.

Visible keyboard focus.

Readable text over glass.

Reduced transparency fallback if needed.

---

# PERFORMANCE

Limit blur layers.

Reuse shadows.

Animate only:

- transform
- opacity

Avoid nested backdrop filters.

---

# QA CHECKLIST

- Blur consistent
- Reflection subtle
- Border readable
- Hover smooth
- Mobile performance verified
- Keyboard navigation works
- No clipping of content

---

# IMPLEMENTATION NOTES

Create a single reusable GlassCard component.

Expose props for:

- variant
- size
- interactive
- selected
- loading
- media
- footer
- actions

Avoid duplicated card implementations.

---

# FINAL REQUIREMENTS

Glass cards define the visual identity of DISCIPLINE.

Every card should feel refined, tactile and instantly recognizable while remaining highly reusable across the entire platform.


---

# Source: 06 - UI Bible/Volume6-04-Navbar.md


# DISCIPLINE
# Volume 6 — 04-Navbar.md

## OBJECTIVE

Design a premium navigation system that feels invisible until needed, always remains intuitive and reinforces the DISCIPLINE visual identity.

The navbar should resemble modern Apple experiences: light, fluid and context-aware.

---

# DESIGN PHILOSOPHY

The navigation should communicate:

- Simplicity
- Precision
- Confidence
- Calm
- Premium quality

It must never dominate the content.

---

# LAYOUT

Desktop:

----------------------------------------------------
Logo | Navigation Links | CTA | Account Avatar
----------------------------------------------------

Maximum width:

1440px

Horizontal padding:

32–48px

Height:

80px

---

# NAVIGATION LINKS

Marketing:

- Home
- Coaching
- Method
- Results
- Pricing
- Blog
- Contact

Authenticated:

- Dashboard
- Training
- Nutrition
- Progress
- Messages
- Billing
- Settings

---

# LOGO

Position:

Top left.

Click:

Returns to homepage.

Hover:

Subtle scale (1.02)

Transition:

160ms

---

# CTA BUTTON

Primary CTA:

"Start Your Transformation"

Variant:

Primary Glass Button

Always visible on desktop.

Hidden inside mobile menu.

---

# BACKGROUND STATES

## Transparent

Hero only.

Glass blur disabled.

---

## Glass

Activated after scrolling.

Background:

rgba(255,255,255,.55)

Blur:

24px

Border:

Bottom separator.

---

## Compact

After 120px scroll.

Height:

80px → 64px

Smooth transition.

---

# SCROLL BEHAVIOR

Scroll Down

Navbar hides slightly.

Scroll Up

Navbar reappears.

Never disappear completely.

---

# ACTIVE LINK

Current page displays:

- Accent underline
- Slight text emphasis
- Smooth transition

Duration:

180ms

---

# HOVER

Navigation items:

- Underline grows
- Accent color increases slightly
- Optional icon fade

No excessive movement.

---

# MOBILE NAVIGATION

Hamburger button.

Fullscreen glass overlay.

Sections:

- Navigation
- CTA
- Social links
- Login/Profile

Large touch targets.

---

# ACCOUNT MENU

Avatar click opens dropdown.

Items:

- Profile
- Dashboard
- Billing
- Settings
- Logout

Glass dropdown.

Blur background.

---

# SEARCH

Optional command palette.

Shortcut:

⌘K / Ctrl+K

Supports:

- Pages
- Exercises
- Articles
- Clients (coach)

---

# ANIMATIONS

Entrance:

Fade + slide down.

Menu:

Glass fade.

Overlay:

Blur + opacity.

Dropdown:

Scale 0.98 → 1.

---

# RESPONSIVE

Desktop:

Horizontal layout.

Tablet:

Reduced spacing.

Mobile:

Drawer overlay.

Touch targets:

Minimum 44px.

---

# ACCESSIBILITY

Keyboard navigation.

Visible focus.

ARIA labels.

Escape closes menus.

Focus trap inside mobile overlay.

---

# PERFORMANCE

Lazy-load command palette.

Avoid layout shifts.

Animate only:

- transform
- opacity

Throttle scroll listeners.

---

# QA CHECKLIST

- Scroll behavior smooth
- Active link accurate
- Mobile menu accessible
- Dropdown focus managed
- CTA visible
- No layout shift
- 60 FPS maintained

---

# IMPLEMENTATION NOTES

Create reusable components:

- Navbar
- NavItem
- MobileMenu
- UserMenu
- CommandPalette

Navigation configuration should come from a centralized data structure.

---

# FINAL REQUIREMENTS

The navbar should disappear into the experience until needed.

It must always feel elegant, lightweight and instantly responsive while remaining one of the strongest elements of the DISCIPLINE brand.


---

# Source: 06 - UI Bible/Volume6-05-Hero.md


# DISCIPLINE
# Volume 6 — 05-Hero.md

## OBJECTIVE

Define the complete specification for the DISCIPLINE Hero.

The Hero is the emotional centerpiece of the website.

Within the first five seconds it must communicate:

- Premium coaching
- Scientific methodology
- Trust
- Transformation
- Modern craftsmanship

---

# DESIGN PHILOSOPHY

The Hero is not a banner.

It is an immersive experience.

Everything must support one question:

"Why should I trust DISCIPLINE?"

---

# LAYOUT

Desktop:

12-column grid.

Maximum width:

1440px

Minimum height:

100vh

Sections:

- Navigation
- Hero Content
- Floating Glass Elements
- Bottom Information Strip

---

# BACKGROUND

Fullscreen cinematic video.

Properties:

- autoplay
- muted
- loop
- object-cover

Overlay:

Top:
rgba(255,255,255,.10)

Bottom:
rgba(250,250,248,.82)

Noise texture:
2% opacity.

---

# TYPOGRAPHY

Eyebrow

14px

Uppercase

Tracking wide

Hero Title

72–120px

Weight:
700

Maximum:

3 lines

Body

18px

Readable width:
60–70 characters.

---

# HERO COMPOSITION

Left

- Eyebrow
- Headline
- Description
- Primary CTA
- Secondary CTA

Right

- Floating Glass Cards
- Statistics
- Visual Highlights

Bottom

- Trust indicators
- Client count
- Scroll indicator

---

# CTA SYSTEM

Primary

"Start Your Transformation"

Pastel Violet.

Secondary

"Explore The Method"

Glass variant.

Spacing:

16px.

---

# FLOATING ELEMENTS

Support:

- KPI Cards
- Client Results
- Coach Quote
- Progress Ring
- Before / After Preview

Never overlap critical typography.

---

# STATISTICS

Examples:

+500 Clients

96% Retention

4.9/5 Rating

Animated counters.

---

# TRUST SIGNALS

Include:

- Verified testimonials
- Secure payments
- Evidence-based coaching
- Years of experience

Visible without scrolling.

---

# VISUAL RHYTHM

Use asymmetric composition.

Large empty space around headline.

One dominant focal point.

Alternate dense and airy regions.

---

# SCROLL INDICATOR

Minimal.

Animated.

Bottom center.

Disappears after scrolling.

---

# MOTION

Hero sequence:

1. Video fades in
2. Navigation appears
3. Headline reveals
4. Description fades
5. CTA enters
6. Statistics animate
7. Floating cards arrive
8. Ambient loop begins

---

# RESPONSIVE

Desktop

Split layout.

Tablet

Compressed spacing.

Mobile

Single column.

Headline remains dominant.

CTAs stacked vertically.

---

# ACCESSIBILITY

Readable contrast.

Keyboard accessible CTAs.

Reduced motion fallback.

Video never required to understand content.

---

# PERFORMANCE

Preload hero assets.

Optimize video bitrate.

Use responsive media.

Avoid CLS.

Maintain 60 FPS.

---

# QA CHECKLIST

- Hero loads under 2.5 seconds
- Headline readable
- CTA immediately visible
- Video never blocks rendering
- Mobile layout balanced
- Floating cards never obscure content

---

# IMPLEMENTATION NOTES

Create reusable components:

- Hero
- HeroTitle
- HeroDescription
- HeroCTA
- HeroStats
- FloatingGlassCard
- ScrollIndicator

All content should be configurable through structured data.

---

# FINAL REQUIREMENTS

The Hero must instantly establish DISCIPLINE as a premium coaching brand.

It should feel cinematic, spacious and unforgettable while remaining focused on conversion.


---

# Source: 06 - UI Bible/Volume6-06-Forms.md


# DISCIPLINE
# Volume 6 — 06-Forms.md

## OBJECTIVE

Define a complete premium form system for DISCIPLINE.

Forms should feel effortless, reassuring and exceptionally clear.

Every interaction must reduce friction while maintaining strong validation and accessibility.

---

# DESIGN PRINCIPLES

Forms should communicate:

- Trust
- Clarity
- Precision
- Simplicity

Never overwhelm users with unnecessary fields.

Group related information logically.

---

# FOUNDATION COMPONENTS

Inputs

Textarea

Select

Combobox

Checkbox

Radio

Switch

Slider

Range Slider

Date Picker

Time Picker

Tag Input

Search Input

OTP Input

File Upload

Image Upload

Progress Upload

---

# INPUT APPEARANCE

Background

rgba(255,255,255,.55)

Blur

24px

Border

1px solid rgba(255,255,255,.60)

Radius

20px

Padding

16px

Label

Above input.

Never inside after interaction begins.

---

# INPUT STATES

Every input supports:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Success
- Error

Transitions:

150–200ms

---

# VALIDATION

Client:

Immediate feedback.

Server:

Zod validation.

Never trust client-side validation.

Display:

- Error message
- Recovery guidance
- Highlighted field

---

# FORM LAYOUT

Desktop:

Maximum width:

720px

Use logical sections.

One primary action.

One secondary action.

Mobile:

Single-column layout.

---

# FILE UPLOAD

Support:

- Progress photos
- PDF documents
- Videos

Drag & Drop

Browse

Paste from clipboard

Preview before upload.

Show upload progress.

---

# IMAGE HANDLING

Display:

- Thumbnail
- Replace
- Remove
- Crop (future)

Accepted formats:

JPEG

PNG

WEBP

HEIC

---

# ONBOARDING FORM

Collect:

- Goal
- Age
- Height
- Weight
- Activity level
- Training experience
- Equipment
- Dietary preferences

Display progress stepper.

---

# WEEKLY CHECK-IN

Questions:

- Energy
- Sleep
- Stress
- Hunger
- Motivation

Sliders:

1–10

Optional comments.

Photo upload.

---

# CONTACT FORM

Fields:

- Name
- Email
- Subject
- Message

Anti-spam protection.

Success confirmation.

---

# SEARCH

Instant filtering.

Debounced requests.

Keyboard navigation.

Highlight matching results.

---

# ACCESSIBILITY

Labels always visible.

ARIA attributes.

Keyboard navigation.

Error announcements.

Visible focus ring.

---

# RESPONSIVE

Desktop:

Two-column sections when appropriate.

Tablet:

Adaptive spacing.

Mobile:

Single column.

Touch targets ≥ 44px.

---

# PERFORMANCE

Debounce validation.

Lazy-load heavy widgets.

Optimize uploads.

Prevent layout shifts.

---

# QA CHECKLIST

- Validation accurate
- Keyboard support
- Screen reader friendly
- Upload progress visible
- Mobile usability verified
- No layout shifts

---

# IMPLEMENTATION NOTES

Create reusable components:

- FormField
- TextInput
- TextArea
- Select
- UploadZone
- Stepper
- ValidationMessage

Integrate with:

- React Hook Form
- Zod
- Server Actions

---

# FINAL REQUIREMENTS

Forms should inspire confidence and feel exceptionally polished.

Users should complete onboarding, check-ins and contact requests with minimal effort while benefiting from clear feedback and premium interactions.


---

# Source: 06 - UI Bible/Volume6-07-Dashboard.md


# DISCIPLINE
# Volume 6 — 07-Dashboard.md

## OBJECTIVE

Design the primary member dashboard of DISCIPLINE.

The dashboard must provide an immediate overview of the member's progress while remaining calm, elegant and highly actionable.

It should feel closer to Linear, Apple Health and Notion than to a traditional fitness application.

---

# INFORMATION HIERARCHY

Priority order:

1. Today's focus
2. Workout
3. Nutrition
4. Progress
5. Coach communication
6. Upcoming tasks
7. Historical analytics

The most important information must always appear above the fold.

---

# LAYOUT

Desktop

12-column responsive grid.

Maximum width:

1440px

Sections:

- Sidebar
- Top Navigation
- Main Content
- Secondary Panel (optional)

Tablet

Adaptive 8-column layout.

Mobile

Single-column cards.

---

# TOP BAR

Contains:

- Greeting
- Current streak
- Search
- Notifications
- Profile menu

Quick actions:

- Start Workout
- Log Meal
- Submit Check-in

---

# SIDEBAR

Navigation:

- Dashboard
- Training
- Nutrition
- Progress
- Messages
- Billing
- Settings

Supports collapse/expand animation.

---

# WIDGET SYSTEM

Every widget is modular.

Required widgets:

- Today's Workout
- Daily Calories
- Protein Progress
- Water Intake
- Sleep Score
- Weekly Goal
- Coach Message
- Recovery Score
- Habit Tracker
- Upcoming Check-in

Widgets share a common GlassCard foundation.

---

# KPI CARDS

Display:

- Weight
- Body Fat
- Workout Streak
- Monthly Compliance
- Active Plan

Counters animate on first render.

---

# CHARTS

Supported:

- Weight Trend
- Calories
- Protein
- Training Volume
- Recovery
- Adherence

Animations:

- Progressive draw
- Smooth tooltip
- Hover highlight

---

# ACTIVITY FEED

Chronological timeline.

Includes:

- Completed workouts
- Nutrition logs
- Coach feedback
- Progress photos
- Subscription updates

Newest entries first.

---

# TASK PANEL

Today's tasks:

- Workout
- Water target
- Meal tracking
- Recovery
- Check-in

Completed tasks display a success animation.

---

# COACH PANEL

Shows:

- Latest message
- Next review
- Assigned priorities
- Call schedule

Quick reply available.

---

# PERSONALIZATION

Members may:

- Reorder widgets
- Hide optional widgets
- Choose compact mode
- Choose comfortable mode

Preferences persist across devices.

---

# EMPTY STATES

When no data exists:

- Friendly illustration
- Helpful explanation
- Primary CTA
- Onboarding shortcut

---

# NOTIFICATIONS

Bell icon with unread count.

Notification drawer:

- Messages
- Billing
- Progress reminders
- Coach updates

---

# RESPONSIVE

Desktop:

Multi-column dashboard.

Tablet:

Adaptive cards.

Mobile:

Vertical stack with sticky quick actions.

---

# ACCESSIBILITY

Keyboard navigation.

ARIA landmarks.

Visible focus.

Charts provide text summaries.

---

# PERFORMANCE

Stream dashboard sections.

Lazy-load heavy charts.

Cache frequently requested data.

Realtime updates should modify only affected widgets.

---

# QA CHECKLIST

- Dashboard loads under 2.5 seconds
- Widgets align consistently
- Charts animate once
- Mobile layout verified
- Keyboard navigation complete
- No layout shifts

---

# IMPLEMENTATION NOTES

Reusable components:

- DashboardLayout
- WidgetCard
- KPIWidget
- ChartWidget
- ActivityFeed
- TaskList
- CoachPanel
- NotificationDrawer

All widgets consume typed data models and remain independently reusable.

---

# FINAL REQUIREMENTS

The dashboard should become the daily home of every DISCIPLINE member.

Within a few seconds, users must understand their priorities, celebrate their progress and know exactly what to do next.


---

# Source: 08 - AI design language/Volume8-05-Component-Composition.md


# DISCIPLINE
# Volume 8 — 05-Component-Composition.md

## OBJECTIVE

Define how UI components combine to create coherent, premium interfaces.

Components should behave like a design language rather than isolated elements.

Every composition must remain modular, scalable and visually balanced.

---

# DESIGN PHILOSOPHY

Components should:

- Work independently
- Work together seamlessly
- Share common spacing
- Share motion language
- Share visual hierarchy

No component exists in isolation.

---

# COMPOSITION HIERARCHY

Page

↓

Section

↓

Container

↓

Layout

↓

Component

↓

Subcomponent

↓

Primitive

Every level has a single responsibility.

---

# CONTAINERS

Container widths:

Small:
720px

Medium:
960px

Large:
1200px

XL:
1440px

Center content by default.

---

# COMPONENT GROUPS

Marketing

- Hero
- Testimonials
- Pricing
- FAQ
- CTA

Application

- Dashboard
- Forms
- Tables
- Charts
- Notifications

Shared

- Buttons
- Cards
- Inputs
- Avatars
- Icons
- Modals

---

# STACKING RULES

Vertical rhythm:

24px

32px

48px

64px

96px

Never mix arbitrary spacing.

---

# GLASS COMPOSITION

Glass Cards may contain:

- Headline
- Description
- KPI
- Media
- CTA
- Footer

Limit nested glass surfaces.

Maximum:

2 visible glass levels.

---

# CTA COMPOSITION

One primary CTA.

Optional secondary CTA.

Maximum:

2 buttons together.

Avoid button overload.

---

# CARD COMPOSITION

Header

↓

Content

↓

Supporting Data

↓

Action

↓

Footer

Never skip visual hierarchy.

---

# FORM COMPOSITION

Label

↓

Input

↓

Helper Text

↓

Validation

↓

Action

Maintain consistent spacing.

---

# DASHBOARD COMPOSITION

Top Bar

↓

Primary KPI Row

↓

Today's Focus

↓

Widgets

↓

Activity Feed

↓

Secondary Panels

Prioritize actionable information.

---

# SECTION COMPOSITION

Every section contains:

- Purpose
- Headline
- Supporting content
- Visual
- Action

Remove unnecessary decoration.

---

# SPACING RELATIONSHIPS

Between components:

24–32px

Between sections:

120–200px

Between cards:

24px

Within cards:

24–40px

---

# VISUAL BALANCE

Balance:

Text

↓

Media

↓

Whitespace

↓

Glass

↓

Accent

Never allow one element to dominate without intention.

---

# RESPONSIVE COMPOSITION

Desktop:

Multi-column.

Tablet:

Adaptive.

Mobile:

Single-column.

Recompose instead of shrinking.

---

# AI GENERATION RULES

When assembling components:

- Preserve hierarchy.
- Avoid duplicated patterns.
- Respect design tokens.
- Keep spacing consistent.
- Minimize cognitive load.

Reject layouts that resemble page builders.

---

# QA CHECKLIST

- Components align correctly
- Spacing consistent
- CTA hierarchy respected
- Responsive layout recomposed
- Glass layers limited
- No duplicated interaction patterns

---

# IMPLEMENTATION NOTES

Every component exposes:

- variant
- size
- state
- theme
- actions
- slots

Compose pages using configuration and composition rather than copying markup.

---

# FINAL REQUIREMENTS

Every DISCIPLINE screen should feel intentionally composed.

The interface must appear handcrafted by a premium product design team, with components working together as one coherent visual language.


---

# Source: 09 - Creative Direction/Volume9-01-Liquid-Glass-Philosophy.md


# DISCIPLINE
# Volume 9 — 01-Liquid-Glass-Philosophy.md

## OBJECTIVE

This document defines the artistic DNA of DISCIPLINE.

Everything revolves around one material:

Liquid Glass.

It is not an effect.

It is the identity of the product.

---

# CREATIVE MANIFESTO

DISCIPLINE should feel like a luxury object designed from glass.

Every interface should appear sculpted rather than assembled.

The interface must feel:

- Calm
- Light
- Architectural
- Precise
- Futuristic
- Minimal

Never look like a traditional SaaS dashboard.

Never resemble Bootstrap, Material UI or generic templates.

---

# LIQUID GLASS PRINCIPLES

Glass is always:

- Floating
- Layered
- Semi-transparent
- Softly illuminated
- Perfectly clean

Glass is never:

- Opaque
- Plastic
- Frosted beyond readability
- Dirty
- Overdecorated

---

# DESIGN LANGUAGE

The page is built from layers.

Background

↓

Depth

↓

Glass

↓

Typography

↓

Interactions

↓

Micro reflections

---

# COLOR SYSTEM

Background

#F8F8F6

Cards

rgba(255,255,255,.55)

Borders

rgba(255,255,255,.65)

Accent

Pastel Violet

Never introduce saturated colors except for deliberate actions.

---

# WHITESPACE

Whitespace is a design element.

Large margins.

Large breathing areas.

No cramped layouts.

---

# GLASS DEPTH

Every screen should contain:

Primary glass

Secondary glass

Floating accent glass

Maximum visible layers:

3

---

# LIGHT

Light comes from above.

Shadows remain extremely soft.

Reflections move subtly with interaction.

No dramatic black shadows.

---

# SHAPES

Large rounded corners.

Floating geometry.

Thin borders.

Organic spacing.

---

# MOTION

Glass glides.

Never bounces.

Ease curves should feel physical.

Animations reveal depth rather than attracting attention.

---

# AI DIRECTIVE

When generating a page:

Imagine designing an Apple prototype built entirely from floating glass.

If any component feels generic, redesign it.

If any section resembles a template, reject it.

---

# QUALITY STANDARD

Reject immediately if:

- Layout looks ordinary
- Cards feel flat
- Too many colors appear
- Shadows are heavy
- Glass loses depth
- Typography feels cramped

---

# FINAL REQUIREMENT

A DISCIPLINE page should be recognizable from a single screenshot because of its Liquid Glass identity alone.


---

# Source: 09 - Creative Direction/Volume9-02-Glass-Material-Specification.md


# DISCIPLINE
# Volume 9 — 02-Glass-Material-Specification.md

## OBJECTIVE

Define the exact visual specification of the Liquid Glass material used throughout DISCIPLINE.

Glass is the primary design material. Every panel, card and floating interface must feel as though it is crafted from the same premium substance.

---

# MATERIAL PHILOSOPHY

Glass is:

- Elegant
- Lightweight
- Layered
- Tactile
- Calm

Glass is never:

- Thick
- Plastic
- Milky
- Noisy
- Over-processed

---

# BASE MATERIAL

Fill:

rgba(255,255,255,0.52)

Backdrop Blur:

28–36px

Border:

1px solid rgba(255,255,255,0.68)

Radius:

28px

Shadow:

0 24px 60px rgba(20,20,20,0.08)

---

# SURFACE LEVELS

Level 1

Background panels.

Opacity:
42%

Blur:
20px

---

Level 2

Standard cards.

Opacity:
52%

Blur:
28px

---

Level 3

Floating premium cards.

Opacity:
60%

Blur:
36px

Reflection enabled.

Maximum visible levels on screen:

3

---

# EDGE TREATMENT

Edges must appear polished.

Use:

- Thin bright border
- Internal highlight
- Soft external shadow

Never use thick outlines.

---

# REFLECTION

Reflection opacity:

4–8%

Direction:

Top-left.

Reflection moves subtly with cursor movement.

Never cover text.

---

# REFRACTION

Very subtle distortion behind glass.

Only visible during movement.

No exaggerated lens effects.

---

# COLOR INTERACTION

Background influences glass slightly.

Glass should inherit surrounding light while remaining neutral.

Accent color must never tint the entire surface.

---

# HOVER STATE

Scale:

1.01

Shadow:

+10%

Reflection shifts.

Border becomes slightly brighter.

Duration:

180ms

---

# ACTIVE STATE

Scale:

0.995

Reflection pauses.

Shadow softens.

---

# DISABLED STATE

Opacity:

75%

Blur maintained.

Interaction removed.

---

# STACKING RULES

Glass panels may overlap.

Maintain:

24–40px spacing.

Never create more than three simultaneous visible layers.

---

# LIGHT BEHAVIOR

Primary light:

Top center.

Secondary fill:

Upper left.

Soft ambient bounce.

No hard hotspots.

---

# MOBILE

Reduce blur to improve performance.

Preserve transparency.

Maintain readability.

---

# PERFORMANCE

Animate only:

- opacity
- transform
- reflection position

Reuse blur values.

Avoid nested backdrop-filter chains.

---

# AI GENERATION RULES

Every generated glass component must:

- Match the official material
- Use approved blur values
- Respect layer limits
- Preserve readability
- Feel physically plausible

Reject components that resemble frosted plastic.

---

# QA CHECKLIST

- Glass consistency verified
- Reflection subtle
- Blur performant
- Borders polished
- Shadows soft
- Mobile optimized
- Text readable

---

# FINAL REQUIREMENTS

Every glass surface in DISCIPLINE should feel like the same engineered material.

A user should recognize the product from the quality of its glass alone.


---

# Source: 09 - Creative Direction/Volume9-10-Hero-Art-Direction.md


# DISCIPLINE
# Volume 9 — 10-Hero-Art-Direction.md

## OBJECTIVE

Define the visual direction of the Hero section.

The Hero is the signature of DISCIPLINE.

It must immediately communicate premium coaching, futuristic craftsmanship and Liquid Glass elegance.

Users should understand the product within three seconds while feeling compelled to continue scrolling.

---

# HERO PHILOSOPHY

The Hero is not a banner.

It is an immersive scene.

It introduces the entire visual language of the platform.

Everything below inherits its tone.

---

# ABOVE THE FOLD

Always visible:

- Glass Navigation
- Editorial Headline
- Supporting copy
- Primary CTA
- Secondary CTA
- Floating KPI Cards
- Cinematic Media

No distractions.

No carousels.

---

# LAYOUT

Desktop:

Left:
Headline + CTA

Right:
Hero media

Foreground:
Floating Glass cards

Background:
Architectural gradients and soft geometry

Never center every element.

---

# HEADLINE

Maximum:

2–3 lines

Large:

88–120px

Weight:

700–800

Short.

Powerful.

Example structure:

Discipline.
Built Through Understanding.

---

# SUPPORTING COPY

Maximum width:

520px

Maximum:

3 lines

16–20px

Muted gray.

Never compete with the headline.

---

# CTA SYSTEM

Primary:

Pastel Violet Liquid Glass button.

Secondary:

Transparent Glass button.

Maximum:

Two CTAs.

---

# HERO MEDIA

Use:

- Cinematic athlete
- Premium gym
- Editorial portrait
- Lifestyle scene

Leave negative space for typography.

Never crop faces aggressively.

---

# FLOATING GLASS

Examples:

- Active members
- Average rating
- Coaching plans
- Success metrics

Cards overlap the Hero naturally.

Each card has a unique elevation.

---

# LIGHTING

Bright architectural daylight.

Soft ambient reflections.

Subtle edge highlights.

No dramatic contrast.

---

# COLOR

Background:

Off White

Glass:

Neutral white

Accent:

Pastel Violet

Typography:

Near Black

Avoid colorful gradients.

---

# MOTION

Entrance:

Fade + Y translation (24px)

Duration:

0.8s

Glass cards:

Soft floating loop (2–4px)

Cursor:

Very subtle parallax

Never use exaggerated animations.

---

# SCROLL TRANSITION

The Hero should dissolve naturally into the next section.

Glass cards may continue across the section boundary.

Avoid abrupt endings.

---

# RESPONSIVE

Recompose.

Keep headline dominant.

Media moves below or partially behind text.

Floating cards remain visible.

---

# DO

✓ Large breathing space
✓ Editorial composition
✓ Floating glass
✓ Oversized typography
✓ Premium photography
✓ Clear CTA hierarchy

---

# DON'T

✗ Full-width text blocks
✗ Generic SaaS heroes
✗ Busy backgrounds
✗ Excessive gradients
✗ Flat buttons
✗ Equal visual weight

---

# AI GENERATION RULES

Every generated Hero must:

- Feel like an Awwwards showcase
- Respect the Liquid Glass system
- Avoid template layouts
- Maintain asymmetrical balance
- Prioritize emotion before information

Reject any Hero that could belong to another fitness brand.

---

# QA CHECKLIST

- Hero recognizable instantly
- Headline dominant
- CTA visible
- Glass premium
- Motion elegant
- Mobile redesigned
- Scroll transition smooth

---

# IMPLEMENTATION NOTES

Reusable components:

- HeroCanvas
- HeroMedia
- HeroGlassCluster
- HeroHeadline
- HeroActions
- HeroMetrics
- HeroBackground

Drive all spacing, elevation and animation from shared design tokens.

---

# FINAL REQUIREMENTS

A screenshot of the Hero alone should immediately identify DISCIPLINE.

It should feel like a luxury digital product built from floating Liquid Glass rather than a traditional fitness website.


---

# Source: 09 - Creative Direction/Volume9-11-Glass-Navigation-System.md


# DISCIPLINE
# Volume 9 — 11-Glass-Navigation-System.md

## OBJECTIVE

Define the complete navigation experience for DISCIPLINE using the Liquid Glass design language.

The navigation is not merely a menu. It is a floating control surface that introduces the visual identity of the product from the first second.

---

# PHILOSOPHY

The navigation should feel like a piece of precision glass floating above the interface.

It should remain elegant, lightweight and almost invisible until interaction occurs.

Users should perceive refinement before functionality.

---

# STRUCTURE

Desktop Navigation

- Brand Logo
- Primary Links
- CTA Button
- User Avatar (logged in)
- Theme/Language (optional)

Maximum height:

72px

Maximum width:

1360px

Centered.

Floating.

---

# GLASS MATERIAL

Opacity:

56%

Backdrop Blur:

32px

Border:

1px solid rgba(255,255,255,.68)

Corner Radius:

999px

Shadow:

shadow-2

Never use solid navigation backgrounds.

---

# SPACING

Horizontal padding:

28–36px

Vertical padding:

14–18px

Gap between navigation items:

24px

Maintain generous breathing room.

---

# LOGO

Position:

Left.

Maximum height:

28px

Always monochrome.

Never animate continuously.

Hover:

Very subtle opacity transition.

---

# NAVIGATION LINKS

Typography:

16px

Weight:

500

Color:

Neutral Gray

Hover:

Near Black

Active:

Pastel Violet underline with glass glow.

Never use bold for active state.

---

# PRIMARY CTA

Liquid Glass button.

Pastel Violet accent.

Rounded:

999px

Minimum width:

148px

Hover:

Lift + edge highlight.

Pressed:

Compress 1%.

---

# SCROLL BEHAVIOR

At page top:

Maximum transparency.

After 80px scroll:

Increase opacity slightly.

Increase blur from 32px to 36px.

Reduce height by 6px.

Motion duration:

220ms.

---

# STICKY BEHAVIOR

Navigation remains fixed.

Never jumps.

Always transitions smoothly.

No hard snapping.

---

# MOBILE NAVIGATION

Glass floating pill.

Hamburger icon.

Full-screen glass drawer.

Drawer animation:

Scale + fade.

Duration:

320ms.

Background blur:

48px.

---

# INTERACTION

Hover:

Border brightens.

Reflection shifts.

Shadow deepens slightly.

Focus:

Visible outline.

Pressed:

Shadow softens.

Scale:

0.99

---

# MICRO DETAILS

Pointer tracking:

Maximum 3px.

Reflection follows cursor subtly.

Ambient shimmer:

12–18 second cycle.

Never distract.

---

# ACCESSIBILITY

WCAG AA.

Keyboard navigation.

Visible focus.

ARIA labels.

Escape closes mobile menu.

Trap focus inside drawer.

---

# PERFORMANCE

Animate only:

- transform
- opacity
- CSS variables

Avoid layout shifts.

Maintain 60 FPS.

---

# DO

✓ Floating navigation
✓ Large rounded pill
✓ Calm motion
✓ Thin borders
✓ Consistent glass
✓ Minimal visual noise

---

# DON'T

✗ Opaque navbar
✗ Drop shadows heavier than Hero
✗ Underline animations longer than 250ms
✗ Sticky jumps
✗ Busy mega menus
✗ Thick borders

---

# AI GENERATION RULES

Every generated navigation must:

- Match the official Liquid Glass material
- Float independently from page content
- Respect spacing tokens
- Use one primary CTA only
- Preserve editorial elegance

Reject navigation bars that resemble Bootstrap, Material UI or generic SaaS products.

---

# QA CHECKLIST

- Floating correctly
- Scroll transition smooth
- Mobile drawer premium
- Blur consistent
- CTA prominent
- Keyboard accessible
- 60 FPS maintained

---

# IMPLEMENTATION NOTES

Reusable components:

- GlassNavbar
- NavLink
- GlassCTA
- MobileDrawer
- NavigationBackdrop
- GlassLogo

Drive all behavior through shared motion, spacing and glass tokens.

---

# FINAL REQUIREMENTS

The navigation should feel like a precision-crafted sheet of floating Liquid Glass.

It must immediately establish the DISCIPLINE identity before the user interacts with any other part of the interface.


---

# Source: 09 - Creative Direction/Volume9-12-Glass-Button-Language.md


# DISCIPLINE
# Volume 9 — 12-Glass-Button-Language.md

## OBJECTIVE

Define the official button language for DISCIPLINE.

Buttons are precision-crafted Liquid Glass controls that communicate confidence, elegance and clarity.

They should feel like physical objects floating above the interface.

---

# DESIGN PHILOSOPHY

Buttons must feel:

- Light
- Premium
- Tactile
- Calm
- Intentional

Never resemble default web buttons.

---

# BUTTON FAMILY

Primary

Pastel Violet Liquid Glass.

Primary conversion actions.

---

Secondary

Neutral Liquid Glass.

Supporting actions.

---

Ghost

Transparent glass outline.

Low emphasis.

---

Icon

Circular Liquid Glass.

Navigation and utilities.

---

Floating CTA

Large premium glass capsule.

Reserved for Hero and checkout.

---

# DIMENSIONS

Small

40px height

Medium

48px height

Large

56px height

Hero CTA

64px height

Radius:

999px

---

# MATERIAL

Opacity:

58%

Blur:

32px

Border:

1px solid rgba(255,255,255,.68)

Shadow:

shadow-2

Reflection:

Top-left highlight

---

# TYPOGRAPHY

Weight:

600

Size:

16px

Letter spacing:

-0.01em

Centered vertically.

---

# PRIMARY BUTTON

Background:

Pastel Violet

Glass overlay retained.

Text:

White

Glow:

Subtle.

Never neon.

---

# SECONDARY BUTTON

Neutral glass.

Near-black text.

No colored background.

Accent appears only on hover.

---

# HOVER

Duration:

180ms

Effects:

- Translate Y -2px
- Shadow +1 level
- Reflection shifts
- Border brightens
- Cursor parallax (2px max)

---

# PRESSED

Scale:

0.985

Shadow:

-1 level

Reflection compresses.

Duration:

120ms.

---

# FOCUS

Visible glass outline.

Pastel Violet edge.

Keyboard accessible.

---

# LOADING

Spinner centered.

Content fades to 50%.

Button width never changes.

Remain clickable state disabled.

---

# DISABLED

Opacity:

60%

Blur preserved.

No shadow increase.

Cursor:

not-allowed.

---

# ICON BUTTONS

Sizes:

40 / 48 / 56px

Icons:

Lucide React

Stroke:

2px

Never use filled icons.

---

# FLOATING CTA

Exclusive to:

- Hero
- Pricing
- Final CTA

Largest elevation.

Strongest glass.

Always one per viewport.

---

# MICRO INTERACTIONS

Pointer tracking:

2px max.

Ambient shimmer:

15 second cycle.

No continuous bouncing.

---

# ACCESSIBILITY

Minimum touch target:

44px

WCAG AA contrast.

Visible focus.

Keyboard operable.

ARIA labels for icon-only buttons.

---

# PERFORMANCE

Animate only:

- transform
- opacity
- box-shadow
- CSS variables

Target:

60 FPS.

---

# DO

✓ Large rounded pills
✓ Premium glass
✓ Calm motion
✓ One primary CTA
✓ Consistent spacing

---

# DON'T

✗ Square buttons
✗ Heavy gradients
✗ Neon glow
✗ Multiple primary CTAs
✗ Thick borders
✗ Bootstrap styling

---

# AI GENERATION RULES

Every generated button must:

- Use official design tokens
- Respect Liquid Glass material
- Preserve tactile feedback
- Maintain visual hierarchy
- Match DISCIPLINE identity

Reject generic UI buttons immediately.

---

# QA CHECKLIST

- States implemented
- Glass consistent
- Motion smooth
- Accessible
- Responsive
- Loading stable
- Hover premium

---

# IMPLEMENTATION NOTES

Reusable components:

- GlassButton
- PrimaryButton
- SecondaryButton
- GhostButton
- IconButton
- FloatingCTA

Tokens:

button-radius
button-height
button-shadow
button-glass
button-motion

---

# FINAL REQUIREMENTS

Every button should feel like a finely machined piece of floating Liquid Glass.

Users should recognize DISCIPLINE interactions instantly through the quality of its buttons alone.


---

# Source: 09 - Creative Direction/Volume9-13-Glass-Dashboard-Art-Direction.md


# DISCIPLINE
# Volume 9 — 13-Glass-Dashboard-Art-Direction.md

## OBJECTIVE

Define the complete visual direction of the DISCIPLINE member dashboard.

The dashboard must preserve the same premium Liquid Glass identity as the landing page while presenting dense information with exceptional clarity.

It should feel like a luxury operating system, not a traditional fitness dashboard.

---

# DESIGN PHILOSOPHY

The dashboard should communicate:

- Focus
- Precision
- Progress
- Calm
- Control

Information density must never create visual noise.

---

# LAYOUT

Desktop

Left:
Floating Navigation Rail

Center:
Today's Focus

Right:
Insights & Coach Panel

Maximum width:

1600px

Large margins preserved.

---

# BACKGROUND

Off-white architectural canvas.

Very soft gradients.

Subtle atmospheric shapes.

No busy textures.

---

# GLASS SYSTEM

Every widget uses:

Opacity:
56%

Blur:
32px

Radius:
28px

Border:
1px rgba(255,255,255,.68)

Shadow:
shadow-2

Maximum three glass layers visible.

---

# INFORMATION HIERARCHY

Priority:

1. Today's Workout
2. Nutrition
3. Weekly Progress
4. Coach Messages
5. Habits
6. Calendar
7. Analytics

The first viewport should answer:

"What should I do today?"

---

# WIDGETS

Supported widgets:

- Workout Card
- Nutrition Card
- Habit Tracker
- Weight Progress
- Body Measurements
- Coach Messages
- Weekly Check-in
- Calendar
- Personal Records
- Subscription Status

Widgets remain modular.

---

# CARD DESIGN

Every card contains:

Header

↓

Primary Metric

↓

Supporting Information

↓

Action

↓

Footer

No unnecessary decoration.

---

# CHARTS

Use minimalist line and bar charts.

Thin strokes.

Soft animations.

Glass background.

No heavy gridlines.

Accent color reserved for active data.

---

# COACH PANEL

Floating panel.

Pinned on desktop.

Collapsible on tablet.

Contains:

- Latest feedback
- Upcoming call
- Quick message
- Plan updates

---

# SIDEBAR

Floating glass rail.

Rounded pill geometry.

Collapsed by default on smaller screens.

Icons:

Lucide React only.

---

# MOTION

Cards:

Fade + translate.

Charts:

Progressive draw.

Widgets:

Staggered reveal.

Duration:

180–400ms.

No dramatic motion.

---

# RESPONSIVE

Desktop:
Three-column layout.

Tablet:
Two columns.

Mobile:
Single column with preserved hierarchy.

Do not simply stack widgets randomly.

---

# ACCESSIBILITY

Keyboard navigation.

Screen reader labels.

High contrast.

Reduced motion support.

Minimum touch target:
44px.

---

# PERFORMANCE

Virtualize long lists.

Lazy-load secondary widgets.

Defer analytics.

Maintain Lighthouse Performance >95.

---

# DO

✓ Floating widgets
✓ Editorial spacing
✓ Calm motion
✓ Clear hierarchy
✓ Soft glass

---

# DON'T

✗ Dense tables
✗ Tiny cards
✗ Dark dashboards
✗ Generic SaaS widgets
✗ Heavy borders

---

# AI GENERATION RULES

Every generated dashboard must:

- Feel like an extension of the landing page
- Preserve Liquid Glass consistency
- Prioritize today's actions
- Maintain editorial whitespace
- Avoid repetitive grids

Reject any dashboard resembling Notion, Monday, Jira or standard admin templates.

---

# QA CHECKLIST

- First viewport actionable
- Widget hierarchy correct
- Glass consistent
- Charts readable
- Motion elegant
- Responsive verified
- Accessibility compliant

---

# IMPLEMENTATION NOTES

Reusable components:

- DashboardShell
- GlassWidget
- WorkoutWidget
- NutritionWidget
- HabitWidget
- ProgressChart
- CoachPanel
- FloatingSidebar

Shared tokens:

dashboard-gap
widget-radius
widget-glass
widget-shadow
widget-motion

---

# FINAL REQUIREMENTS

Opening the DISCIPLINE dashboard should feel like entering a premium digital workspace crafted entirely from floating Liquid Glass.

It must combine the emotional quality of the marketing site with the efficiency of a world-class product interface.


---

# Source: 09 - Creative Direction/Volume9-19-Do-&-Don't-Visual-Library.md


# DISCIPLINE
# Volume 9 — 19-Do-&-Don't-Visual-Library.md

## OBJECTIVE

Create the definitive visual review library for DISCIPLINE.

This document defines what every screen MUST look like and what must NEVER appear.

It is intended to eliminate inconsistency across every future AI generation.

---

# REVIEW PHILOSOPHY

Before approving any interface ask:

Does this strengthen the DISCIPLINE identity?

If uncertain, reject it.

When in doubt:

Simplify.

---

# LAYOUT

## DO

✓ Large editorial spacing

✓ Asymmetrical balance

✓ Floating composition

✓ Strong focal point

✓ Clear reading flow

## DON'T

✗ Center every section

✗ Repeat identical layouts

✗ Dense blocks

✗ Equal visual weight everywhere

✗ Template builders

---

# LIQUID GLASS

## DO

✓ Consistent blur tokens

✓ Thin polished borders

✓ Soft reflections

✓ Layered depth

✓ Premium transparency

## DON'T

✗ Milky glass

✗ Plastic appearance

✗ Heavy opacity

✗ Thick outlines

✗ Random blur values

---

# TYPOGRAPHY

## DO

✓ Large headlines

✓ Short paragraphs

✓ Editorial rhythm

✓ High contrast

✓ Optical alignment

## DON'T

✗ Tiny text

✗ Long paragraphs

✗ Decorative fonts

✗ Weak hierarchy

✗ Full-width reading columns

---

# COLOR

## DO

✓ Off-white foundation

✓ Neutral greys

✓ Pastel Violet accent

✓ Restrained palette

## DON'T

✗ Bright gradients

✗ Neon colors

✗ Rainbow accents

✗ Random highlight colors

---

# BUTTONS

## DO

✓ Rounded glass capsules

✓ One dominant CTA

✓ Calm interaction

## DON'T

✗ Square buttons

✗ Multiple primary CTAs

✗ Loud glows

✗ Flat styling

---

# NAVIGATION

## DO

✓ Floating glass bar

✓ Soft blur

✓ Minimal links

✓ Elegant sticky behavior

## DON'T

✗ Heavy headers

✗ Mega menus

✗ Opaque bars

✗ Busy navigation

---

# HERO

## DO

✓ Cinematic media

✓ Editorial composition

✓ Floating KPI cards

✓ Generous whitespace

## DON'T

✗ Stock-looking layouts

✗ Crowded content

✗ Weak headlines

✗ Carousel heroes

---

# DASHBOARD

## DO

✓ Modular widgets

✓ Today's priority first

✓ Spacious layout

✓ Calm analytics

## DON'T

✗ Admin panel appearance

✗ Dense tables

✗ Tiny widgets

✗ Visual clutter

---

# MOTION

## DO

✓ Physical motion

✓ Soft easing

✓ Subtle transitions

✓ Purposeful animation

## DON'T

✗ Bounce

✗ Flashing

✗ Excessive parallax

✗ Infinite loops

---

# SPACING

## DO

✓ 8px baseline system

✓ Large section gaps

✓ Optical spacing

## DON'T

✗ Random spacing

✗ Cramped layouts

✗ Inconsistent padding

---

# ICONOGRAPHY

## DO

✓ Lucide React

✓ Consistent stroke

✓ Optical alignment

## DON'T

✗ Mixed icon packs

✗ Filled icons

✗ Decorative icons

---

# PHOTOGRAPHY

## DO

✓ Cinematic

✓ Architectural

✓ Authentic

✓ Bright premium lighting

## DON'T

✗ Generic stock photos

✗ Harsh flash

✗ Busy backgrounds

✗ Over-edited skin

---

# AI REVIEW

Reject immediately if the interface:

- Looks like Bootstrap
- Looks like Material UI
- Looks like a generic SaaS
- Uses visual gimmicks
- Ignores whitespace
- Breaks Liquid Glass rules
- Feels ordinary

---

# FINAL APPROVAL CHECKLIST

Approve only if:

✓ Instantly recognizable as DISCIPLINE

✓ Premium from first impression

✓ Liquid Glass consistent

✓ Editorial composition preserved

✓ Typography dominant

✓ Motion restrained

✓ Accessibility maintained

✓ Performance respected

---

# FINAL REQUIREMENTS

This library is the final visual filter for DISCIPLINE.

If a design violates any DON'T rule, it should be redesigned before implementation regardless of technical correctness.
