# DISCIPLINE RULEBOOK
Generated from project documentation.

## Table of Contents
1. 04-Dashboard-Preview
2. 02-Member-Dashboard
3. Volume5-01-Motion-Design-System
4. Volume5-02-Hero-Timeline
5. Volume5-04-Micro-Interactions
6. Volume5-08-Motion-QA-Guidelines
7. Volume6-02-Buttons
8. Volume6-03-Glass-Cards
9. Volume6-05-Hero
10. Volume6-07-Dashboard
11. Volume8-01-AI-Design-Language
12. Volume8-02-Composition-Rules
13. Volume8-06-Photography-&-Media-Rules
14. Volume8-07-AI-Code-Generation-Rules
15. Volume8-08-AI-Prompting-Protocol
16. Volume9-01-Liquid-Glass-Philosophy
17. Volume9-02-Glass-Material-Specification
18. Volume9-04-Blur-System
19. Volume9-06-Shadow-System
20. Volume9-07-Layering-&-Depth-System
21. Volume9-09-Editorial-Grid-System
22. Volume9-10-Hero-Art-Direction
23. Volume9-11-Glass-Navigation-System
24. Volume9-12-Glass-Button-Language
25. Volume9-13-Glass-Dashboard-Art-Direction
26. Volume9-14-Premium-Motion-Language
27. Volume9-15-Interaction-Physics
28. Volume9-16-Micro-Details
29. Volume9-17-Premium-Typography-System
30. Volume9-18-AI-Creative-Director
31. Volume9-20-Creative-Manifesto

---

# 04-Dashboard-Preview

_Source: 02 - Landing page/04-Dashboard-Preview.md_

# Dashboard Preview
Preview workout calendar, nutrition, progress graphs, subscriptions and messages.


# 02-Member-Dashboard

_Source: 03 - Dashboard/02-Member-Dashboard.md_


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



# Volume5-01-Motion-Design-System

_Source: 05 - Motion Design System/Volume5-01-Motion-Design-System.md_


# DISCIPLINE
# Volume 5 — 01-Motion-Design-System.md

## OBJECTIVE

Define a premium motion language that gives DISCIPLINE the feel of a modern Apple product rather than a conventional fitness website.

Motion must communicate hierarchy, feedback, clarity and delight.

Animation should never exist only for decoration.

---

# MOTION PRINCIPLES

Every animation must:

- Guide attention
- Reinforce hierarchy
- Communicate state changes
- Feel natural
- Respect user intent

Avoid excessive movement.

---

# MOTION STACK

- Framer Motion
- GSAP
- GSAP ScrollTrigger
- Lenis Smooth Scroll

Framer Motion controls UI interactions.

GSAP controls cinematic storytelling.

---

# GLOBAL TIMING

Fast:
120–180 ms

Standard:
220–320 ms

Large transitions:
450–700 ms

Hero sequences:
800–1400 ms

Ease:
[0.22, 1, 0.36, 1]

---

# PAGE LOAD

Sequence:

1. Background fades in.
2. Navigation slides down.
3. Hero headline reveals line by line.
4. Glass cards fade upward.
5. CTA appears last.

---

# PAGE TRANSITIONS

Between routes:

- Fade
- Slight blur
- Scale 0.98 → 1
- Duration 450 ms

Never use hard cuts.

---

# SCROLL REVEALS

Use ScrollTrigger.

Effects:

- Fade Up
- Fade Left
- Fade Right
- Scale In
- Blur Reveal
- Clip Reveal

Trigger once unless interaction requires replay.

---

# HERO ANIMATION

Headline:

- Mask reveal
- Stagger each line
- 80 ms delay

CTA:

- Fade + scale

Background:

- Slow parallax
- Subtle light movement

---

# LIQUID GLASS

Cards react on hover:

- TranslateY(-4px)
- Increase blur perception
- Border glow
- Dynamic reflection

Buttons:

- Magnetic hover
- Ripple highlight
- Violet glow

---

# CURSOR

Desktop only.

Custom cursor supports:

- Hover state
- Drag state
- Click compression
- Media preview

Hide on touch devices.

---

# MICROINTERACTIONS

Buttons

Inputs

Cards

Switches

Tabs

Accordions

Dropdowns

All interactions animate within 150–250 ms.

---

# LOADING STATES

Skeleton shimmer.

Progress indicators.

Animated logo.

No spinner-only experiences for long operations.

---

# DASHBOARD MOTION

Widgets:

- Staggered entrance
- Counter animations
- Chart drawing
- Hover lift
- Expand transitions

Realtime updates animate smoothly.

---

# MODALS

Open:

- Fade
- Scale
- Blur background

Close:

- Reverse animation

Trap focus before animation completes.

---

# MOBILE MOTION

Reduce animation intensity.

Maintain 60 FPS.

Disable heavy parallax.

Respect prefers-reduced-motion.

---

# PERFORMANCE RULES

Animate only:

- opacity
- transform
- filter (sparingly)

Avoid animating layout properties.

Use will-change only during active animation.

---

# QA CHECKLIST

- 60 FPS maintained
- No layout shifts
- No animation overlap
- No blocking interactions
- Motion consistent across pages

---

# FINAL REQUIREMENTS

Motion should become part of the DISCIPLINE identity.

Users should immediately perceive refinement, precision and quality through every transition and interaction.



# Volume5-02-Hero-Timeline

_Source: 05 - Motion Design System/Volume5-02-Hero-Timeline.md_


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



# Volume5-04-Micro-Interactions

_Source: 05 - Motion Design System/Volume5-04-Micro-Interactions.md_


# DISCIPLINE
# Volume 5 — 04-Micro-Interactions.md

## OBJECTIVE

Design a complete micro-interaction system that makes every action feel responsive, intentional and premium.

Micro-interactions should reinforce confidence without distracting from the user's task.

---

# DESIGN PRINCIPLES

Every interaction must provide:

- Immediate feedback
- Clear state changes
- Smooth transitions
- Consistent timing
- Accessibility support

Animations should be subtle, never theatrical.

---

# GLOBAL TIMING

Hover:
120–180 ms

Press:
80–120 ms

Release:
160–240 ms

Success:
300–500 ms

Spring easing for tactile interactions.

---

# BUTTONS

Hover:

- Lift 2–4px
- Slight scale (1.02)
- Glass reflection shifts
- Violet glow intensifies

Pressed:

- Scale to 0.97
- Shadow softens

Loading:

- Replace label with spinner
- Preserve width
- Disable repeated clicks

Success:

- Checkmark animation
- Soft green accent flash
- Return to default state

---

# INPUT FIELDS

Focus:

- Violet border glow
- Placeholder fades slightly
- Label animates upward

Validation:

- Green outline on success
- Red outline on error
- Helper text slides into view

Typing:

- No layout shifts
- Character counter (optional)

---

# TOGGLES & SWITCHES

Thumb slides smoothly.

Background color interpolates.

Provide haptic feedback on supported devices.

Respect keyboard interaction.

---

# CHECKBOXES & RADIOS

Animate:

- Scale in
- Checkmark draw
- Focus ring

Duration:
180 ms

---

# CARDS

Hover:

- Lift
- Glass highlight follows cursor
- Border brightness increases

Selection:

- Accent border
- Persistent glow
- Scale 1.01

---

# NAVIGATION

Menu items:

- Underline grows from center
- Icon fades in (optional)
- Active page indicator animates

Sidebar:

- Sliding indicator
- Soft background transition

---

# ACCORDIONS

Expand:

- Height animation
- Fade content
- Rotate chevron 180°

Collapse:

- Reverse animation

Maintain focus order.

---

# MODALS & DRAWERS

Open:

- Background blur
- Fade overlay
- Scale dialog from 0.96 to 1

Close:

- Reverse animation
- Restore focus

---

# TOASTS

Slide in from edge.

Auto-dismiss with progress bar.

Pause timer on hover.

Support:

- Success
- Info
- Warning
- Error

---

# DRAG & DROP

Dragging:

- Slight rotation
- Shadow increase
- Scale 1.03

Drop target:

- Violet outline
- Glass pulse

Successful drop:

- Snap animation

---

# CHARTS

Counters animate upward.

Graphs draw progressively.

Tooltips fade and follow pointer.

---

# CURSOR INTERACTIONS

Desktop only.

States:

- Default
- Hover
- Click
- Drag
- Media preview

Hide on touch devices.

---

# EMPTY STATES

Illustration fades in.

Primary CTA pulses gently.

Avoid static screens.

---

# ERROR STATES

Shake animation only once.

Highlight problematic field.

Explain recovery action clearly.

---

# SUCCESS STATES

Use:

- Check animation
- Soft glow
- Positive confirmation message

Never rely on color alone.

---

# MOBILE

Reduce hover-dependent effects.

Prioritize tap feedback.

Target 60 FPS.

Support haptic feedback where available.

---

# ACCESSIBILITY

Support:

- Keyboard focus
- Screen readers
- prefers-reduced-motion

Interactions must remain understandable without animation.

---

# PERFORMANCE

Animate only:

- transform
- opacity
- filter (limited)

Avoid expensive layout recalculations.

Batch animations where possible.

---

# QA CHECKLIST

- Consistent interaction timing
- No visual glitches
- No layout shifts
- Accessible focus states
- Smooth on low-end devices
- Touch interactions verified

---

# FINAL REQUIREMENTS

Every micro-interaction should make DISCIPLINE feel handcrafted.

Users should perceive precision, quality and responsiveness through even the smallest interface details.



# Volume5-08-Motion-QA-Guidelines

_Source: 05 - Motion Design System/Volume5-08-Motion-QA-Guidelines.md_


# DISCIPLINE
# Volume 5 — 08-Motion-QA-Guidelines.md

## OBJECTIVE

Establish the quality standards that every animation, transition and visual effect must satisfy before being released to production.

Motion quality is a defining characteristic of DISCIPLINE.

---

# MOTION QUALITY PRINCIPLES

Every animation must be:

- Intentional
- Smooth
- Consistent
- Accessible
- Performant
- Reversible when appropriate

Never animate for decoration alone.

---

# CONSISTENCY RULES

Maintain a unified language:

- Same easing families
- Same timing scale
- Same hover behavior
- Same page transition style
- Same glass interaction rules

Avoid mixing unrelated animation styles.

---

# FRAME RATE TARGETS

Desktop:
- 60 FPS minimum

High-refresh displays:
- 120 FPS when hardware allows

Mobile:
- Stable 60 FPS

Investigate any sustained drop below target.

---

# TIMING SYSTEM

Hover:
120–180 ms

Click:
80–120 ms

UI Transition:
220–320 ms

Modal:
250–350 ms

Page Transition:
400–600 ms

Hero Timeline:
3–5 s

---

# PERFORMANCE BUDGET

Avoid:

- Animating width/height
- Expensive box-shadow changes
- Continuous layout calculations
- Excessive blur on mobile

Prefer:

- transform
- opacity
- GPU acceleration

---

# GSAP QA

Verify:

- Timelines cleaned on unmount
- ScrollTriggers refreshed correctly
- No duplicate triggers
- No memory leaks
- Context destroyed on navigation

---

# FRAMER MOTION QA

Check:

- Exit animations complete
- AnimatePresence behaves correctly
- Layout animations don't jump
- Reduced motion fallback works

---

# SCROLL QA

Validate:

- Lenis remains smooth
- No jitter
- Pinning releases correctly
- Progress bar synchronized
- Scroll restoration between routes

---

# MICROINTERACTION QA

Buttons:

- Hover
- Press
- Loading
- Success

Inputs:

- Focus
- Error
- Success

Cards:

- Hover lift
- Reflection
- Selection

---

# VISUAL EFFECTS QA

Review:

- Glass readability
- Reflection intensity
- Bloom level
- Noise visibility
- Shadow consistency
- Gradient smoothness

Effects must never reduce usability.

---

# ACCESSIBILITY QA

Support:

- prefers-reduced-motion
- Keyboard navigation
- Screen readers
- Visible focus

Animations must never block interaction.

---

# CROSS-BROWSER QA

Test:

- Chrome
- Edge
- Firefox
- Safari
- iOS Safari
- Chrome Android

Animations should remain visually consistent.

---

# DEVICE QA

Validate on:

- Low-end mobile
- Mid-range laptop
- High-refresh monitor
- Touchscreen devices

---

# AUTOMATED TESTS

Run before release:

- Lighthouse
- Performance profiling
- Visual regression
- Accessibility audit
- Memory leak inspection

---

# MANUAL REVIEW

Review every page for:

- Timing consistency
- Stagger rhythm
- Visual hierarchy
- Interaction clarity
- Overall polish

---

# RELEASE CHECKLIST

Before shipping:

- 60 FPS verified
- No animation glitches
- No console warnings
- Motion matches design system
- Accessibility confirmed
- QA sign-off completed

---

# FINAL REQUIREMENTS

Motion is part of the DISCIPLINE brand identity.

Every transition, hover effect and animation should communicate precision, confidence and premium craftsmanship while remaining fast, subtle and reliable.



# Volume6-02-Buttons

_Source: 06 - UI Bible/Volume6-02-Buttons.md_


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



# Volume6-03-Glass-Cards

_Source: 06 - UI Bible/Volume6-03-Glass-Cards.md_


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



# Volume6-05-Hero

_Source: 06 - UI Bible/Volume6-05-Hero.md_


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



# Volume6-07-Dashboard

_Source: 06 - UI Bible/Volume6-07-Dashboard.md_


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



# Volume8-01-AI-Design-Language

_Source: 08 - AI design language/Volume8-01-AI-Design-Language.md_


# DISCIPLINE
# Volume 8 — 01-AI-Design-Language.md

## OBJECTIVE

Create a design language specifically written for AI coding agents so every generated page shares the same premium identity.

This document defines rules, not examples.

---

# CORE PHILOSOPHY

Design must feel:

- Calm
- Premium
- Editorial
- Intentional
- Minimal
- Luxurious

Never generic.

Never template-like.

---

# GLOBAL RULES

Never repeat identical layouts more than twice.

Every section has one dominant focal point.

Alternate dense and spacious compositions.

Whitespace is intentional.

---

# COMPOSITION

Use asymmetric grids.

Break alignment occasionally.

Avoid perfectly centered pages.

Create visual rhythm.

---

# VISUAL PRIORITY

Order:

1. Hero
2. Primary CTA
3. Supporting proof
4. Secondary content
5. Footer

---

# LIQUID GLASS

Glass is a material.

Not decoration.

Opacity:

45–60%

Blur:

24–40px

Never stack excessive glass layers.

---

# TYPOGRAPHY

Large headlines.

Short paragraphs.

Strong hierarchy.

Maximum:

70 characters per text line.

---

# COLOR

Primary:

Off White

Secondary:

Warm Gray

Accent:

Pastel Violet

Accent reserved for interaction.

---

# MOTION

Motion explains interface.

Never animate everything.

One dominant animation per viewport.

---

# IMAGERY

Use cinematic photography.

Natural light.

Real people.

Premium environments.

Avoid stock-photo feeling.

---

# SPACING

Every section breathes.

Alternate:

Compact

↓

Airy

↓

Compact

---

# COMPONENT RULES

Every component must:

- Have a purpose
- Be reusable
- Support all interaction states
- Follow design tokens

---

# CONVERSION

Every screen answers:

What is the next action?

Only one primary CTA.

---

# FORBIDDEN PATTERNS

Do not use:

- Bootstrap appearance
- Loud gradients
- Neon colors
- Overcrowded dashboards
- Generic SaaS layouts
- Cookie-cutter cards

---

# AI GENERATION RULES

When generating code:

- Prefer semantic HTML
- Use reusable React components
- Keep Tailwind utility usage consistent
- Respect accessibility
- Optimize for performance
- Preserve visual identity

---

# QA

Reject any generated page if it:

- Feels generic
- Repeats layouts excessively
- Ignores whitespace
- Breaks hierarchy
- Misuses accent color

---

# FINAL REQUIREMENT

Every page generated from this language should immediately be recognizable as DISCIPLINE without showing the logo.



# Volume8-02-Composition-Rules

_Source: 08 - AI design language/Volume8-02-Composition-Rules.md_


# DISCIPLINE
# Volume 8 — 02-Composition-Rules.md

## OBJECTIVE

Define the composition rules that every AI-generated page must follow to achieve a premium editorial aesthetic.

Composition is the primary factor that separates a luxury digital product from a generic template.

---

# CORE PRINCIPLES

Every screen should have:

- One dominant focal point
- One secondary focal point
- Clear visual hierarchy
- Intentional whitespace
- Balanced asymmetry

Never compete for attention.

---

# GRID SYSTEM

Desktop:
12 columns

Tablet:
8 columns

Mobile:
4 columns

Maximum content width:
1440px

Align to the grid, but allow controlled overlaps.

---

# VISUAL RHYTHM

Alternate section density:

1. Hero (airy)
2. Trust (compact)
3. Features (airy)
4. Coaching plans (compact)
5. Testimonials (airy)
6. CTA (compact)

Avoid identical spacing patterns.

---

# ASYMMETRY

Prefer:

- Offset headlines
- Floating cards
- Uneven column widths
- Intentional negative space

Avoid perfectly mirrored layouts.

---

# FOCAL POINTS

Every viewport contains:

Primary:
Largest element.

Secondary:
Supporting content.

Tertiary:
Micro-details.

Users should know where to look within one second.

---

# CONTENT FLOW

Reading path:

Top Left

↓

Headline

↓

CTA

↓

Supporting proof

↓

Next section

Use natural eye movement.

---

# WHITESPACE

Whitespace is content.

Minimum vertical spacing:

120px

Hero spacing:

160–240px

Increase whitespace around key messages.

---

# LAYERING

Depth order:

1. Background
2. Media
3. Glass
4. Typography
5. CTA
6. Floating elements

Never flatten the interface.

---

# IMAGE PLACEMENT

Images should:

- Support the headline
- Avoid competing with CTAs
- Maintain strong contrast
- Leave room for typography

Never crop faces awkwardly.

---

# CARD ARRANGEMENT

Use:

- Staggered layouts
- Variable heights
- Consistent alignment
- Breathing room

Avoid perfect grids everywhere.

---

# TYPOGRAPHIC COMPOSITION

Headlines dominate.

Paragraphs remain narrow.

Maximum:

70 characters per line.

Never place long text blocks beside large headlines without spacing.

---

# SECTION TRANSITIONS

Each section should visually prepare the next.

Use:

- Alternating backgrounds
- Directional imagery
- Motion cues
- Progressive storytelling

---

# RESPONSIVE

Do not simply stack desktop layouts.

Recompose content for mobile.

Preserve hierarchy first.

---

# AI GENERATION RULES

Before accepting a generated page, verify:

- Strong focal point
- Balanced whitespace
- Asymmetrical composition
- Clear CTA hierarchy
- No repetitive layouts

Reject pages that feel like templates.

---

# QA CHECKLIST

- Visual rhythm maintained
- Grid respected
- Asymmetry intentional
- Typography balanced
- CTA immediately visible
- Mobile composition redesigned

---

# FINAL REQUIREMENTS

Composition should feel curated by an art director rather than assembled by a page builder.

Every DISCIPLINE page must guide the eye naturally while communicating elegance, confidence and clarity.



# Volume8-06-Photography-&-Media-Rules

_Source: 08 - AI design language/Volume8-06-Photography-&-Media-Rules.md_


# DISCIPLINE
# Volume 8 — 06-Photography-&-Media-Rules.md

## OBJECTIVE

Define the visual direction for every photograph, video, illustration and media asset used throughout DISCIPLINE.

Media should communicate premium coaching, credibility and calm sophistication.

Every asset must strengthen the brand before a single word is read.

---

# CREATIVE PHILOSOPHY

Media should feel:

- Authentic
- Editorial
- Luxurious
- Human
- Technical
- Timeless

Never resemble generic fitness advertising.

---

# PHOTOGRAPHY STYLE

Preferred:

- Natural expressions
- Real training environments
- Minimal distractions
- Premium interiors
- High-end gyms
- Architectural backgrounds

Avoid:

- Forced smiles
- Overly posed models
- Cheap equipment
- Busy backgrounds

---

# LIGHTING

Primary:

Soft natural light.

Secondary:

Controlled studio lighting.

Mood:

Bright, clean, directional.

Avoid harsh flash photography.

---

# COLOR GRADING

Palette:

- Snow White
- Warm White
- Light Stone
- Soft Gray
- Pastel Violet accents

Skin tones remain natural.

Slight contrast increase.

Moderate desaturation.

---

# COMPOSITION

Use:

- Negative space
- Rule of thirds
- Leading lines
- Layering
- Depth

Leave room for typography.

---

# SUBJECTS

Show:

- Men and women
- Different experience levels
- Authentic body types
- Confidence over perfection

Expressions should communicate focus and discipline.

---

# FITNESS CONTENT

Capture:

- Training technique
- Recovery
- Nutrition
- Lifestyle
- Coaching moments
- Progress tracking

Avoid exaggerated bodybuilding clichés.

---

# VIDEO DIRECTION

Background videos:

- 4K source
- 24–60 FPS
- Slow camera movement
- Stable framing

Use subtle motion.

No aggressive edits.

---

# ICONOGRAPHY

Use Lucide React.

Maintain:

- 2px stroke
- Rounded caps
- Consistent scale

Icons support content rather than dominate it.

---

# ILLUSTRATIONS

Flat minimal style.

Soft gradients.

Simple geometry.

Use only when photography is unavailable.

---

# IMAGE TREATMENT

Aspect ratios:

16:9

4:3

1:1

Rounded corners:

24–32px.

Glass overlays allowed.

---

# BEFORE / AFTER

Display:

- Consistent pose
- Consistent lighting
- Consistent framing

Include timeframe.

Never manipulate results.

---

# TESTIMONIAL MEDIA

Include:

- Portrait
- Name
- Result
- Optional short video

Authenticity is more valuable than perfection.

---

# RESPONSIVE

Serve responsive image sizes.

Lazy-load non-critical media.

Use modern formats:

AVIF

WebP

Fallback JPEG.

---

# ACCESSIBILITY

Provide descriptive alt text.

Captions for videos.

Avoid text embedded inside images.

---

# PERFORMANCE

Compress assets responsibly.

Preload hero media.

Stream large videos.

Optimize LCP.

---

# AI GENERATION RULES

Generated imagery must:

- Match DISCIPLINE palette
- Preserve realistic anatomy
- Maintain premium environments
- Avoid artificial plastic skin
- Leave whitespace for UI

Reject media that feels like stock imagery.

---

# QA CHECKLIST

- Consistent lighting
- Natural skin tones
- Premium composition
- Typography-safe framing
- Optimized file size
- Accessible alternatives
- Mobile crops verified

---

# IMPLEMENTATION NOTES

Organize assets by:

- Marketing
- Dashboard
- Coaching
- Testimonials
- Exercises
- Nutrition

Maintain versioned media guidelines for future shoots.

---

# FINAL REQUIREMENTS

Every image and video should make DISCIPLINE feel like a luxury digital product rather than a traditional fitness brand.

Media must communicate trust, craftsmanship and transformation before any interaction occurs.



# Volume8-07-AI-Code-Generation-Rules

_Source: 08 - AI design language/Volume8-07-AI-Code-Generation-Rules.md_


# DISCIPLINE
# Volume 8 — 07-AI-Code-Generation-Rules.md

## OBJECTIVE

Define the engineering standards every AI coding assistant must follow when generating code for DISCIPLINE.

Generated code must be indistinguishable from work produced by a senior product engineering team.

---

# CORE PRINCIPLES

Every generation must be:

- Modular
- Typed
- Accessible
- Performant
- Maintainable
- Production-ready

Never generate prototype-quality code.

---

# TECHNOLOGY STACK

Required:

- Next.js App Router
- React 19+
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- GSAP
- Lucide React
- React Hook Form
- Zod
- Prisma
- PostgreSQL
- Stripe

---

# ARCHITECTURE

Organize by feature.

Example:

app/
components/
features/
hooks/
lib/
services/
types/
styles/

No business logic inside UI components.

---

# COMPONENT RULES

Every component must:

- Have one responsibility
- Be reusable
- Accept typed props
- Expose variants
- Support loading and error states
- Be documented

Avoid duplicated components.

---

# TYPESCRIPT

Strict mode enabled.

Never use:

- any
- @ts-ignore

Prefer:

- discriminated unions
- generics
- utility types

---

# REACT

Prefer:

- Server Components
- Server Actions
- Suspense
- Streaming

Use Client Components only when required.

---

# STYLING

Tailwind only.

Use design tokens.

No inline styles except dynamic transforms.

No arbitrary values unless justified.

---

# STATE MANAGEMENT

Local:

React state.

Server:

Server Actions.

Global:

Minimal shared state.

Prefer URL state where appropriate.

---

# DATA FETCHING

Validate all inputs with Zod.

Cache safely.

Handle loading, empty and error states.

Never expose secrets to the client.

---

# PERFORMANCE

Targets:

- Lighthouse >95
- LCP <2.5s
- CLS <0.05
- INP <200ms

Lazy-load heavy modules.

Optimize images and video.

---

# ACCESSIBILITY

Meet WCAG AA.

Support:

- Keyboard navigation
- Screen readers
- Visible focus
- Reduced motion

Semantic HTML required.

---

# SECURITY

Sanitize inputs.

Protect Server Actions.

Validate permissions.

Store secrets in environment variables.

Use HTTPS everywhere.

---

# TESTING

Generate:

- Unit tests
- Component tests
- Integration tests

Critical user flows require end-to-end tests.

---

# DOCUMENTATION

Every exported component includes:

- Purpose
- Props
- Usage
- Accessibility notes

Complex logic requires comments explaining intent.

---

# AI REJECTION RULES

Reject generated code if it:

- Uses any
- Duplicates logic
- Breaks design tokens
- Ignores accessibility
- Mixes concerns
- Hardcodes business values
- Leaves TODOs in production code

---

# QA CHECKLIST

- Types compile
- ESLint clean
- No hydration issues
- Responsive verified
- Accessibility verified
- Performance budget respected

---

# IMPLEMENTATION NOTES

Prefer composition over inheritance.

Extract reusable utilities.

Centralize constants, schemas and tokens.

Favor explicit, readable code over clever abstractions.

---

# FINAL REQUIREMENTS

Every AI-generated file must be immediately deployable, consistent with the DISCIPLINE architecture and maintainable by a professional engineering team.



# Volume8-08-AI-Prompting-Protocol

_Source: 08 - AI design language/Volume8-08-AI-Prompting-Protocol.md_


# DISCIPLINE
# Volume 8 — 08-AI-Prompting-Protocol.md

## OBJECTIVE

Define the official prompting protocol for every AI used to design, code, review or improve DISCIPLINE.

Every prompt should produce consistent, production-ready results aligned with the DISCIPLINE design system, architecture and engineering standards.

---

# PRIMARY GOAL

AI is treated as a senior member of the product team.

Every generation must:

- Respect the design system
- Respect the UI Bible
- Respect the UX Bible
- Respect engineering standards
- Produce production-ready code

Never generate placeholder-quality work.

---

# STANDARD PROMPT STRUCTURE

Every prompt contains:

1. Objective
2. Context
3. Existing constraints
4. Technical stack
5. Design language
6. Expected output
7. Acceptance criteria
8. Self-review instructions

---

# CONTEXT BLOCK

Always provide:

- Product name
- Current feature
- Related components
- Existing architecture
- Design tokens
- Responsive requirements

Never ask the AI to guess missing context.

---

# DESIGN BLOCK

Reference:

- Liquid Glass
- Pastel Violet accent
- Off-white palette
- Apple-inspired minimalism
- Editorial composition
- Premium typography
- Motion system

---

# ENGINEERING BLOCK

Require:

- TypeScript strict
- Next.js App Router
- Tailwind CSS
- Accessibility
- Performance
- Modular architecture

---

# OUTPUT FORMAT

Every response should include:

- Implementation summary
- Folder structure
- Components created
- Type definitions
- Production-ready code
- Notes about trade-offs

Avoid unnecessary explanations.

---

# SELF REVIEW

Before finalizing, the AI checks:

- Accessibility
- Responsiveness
- Type safety
- Performance
- Design consistency
- Duplicate logic

If any item fails, regenerate before answering.

---

# REFACTORING PROTOCOL

When improving existing code:

1. Preserve behavior.
2. Improve readability.
3. Reduce duplication.
4. Increase performance.
5. Maintain API compatibility whenever possible.

Document breaking changes explicitly.

---

# FEATURE GENERATION

For every new feature:

Generate:

- Components
- Types
- Validation
- Loading states
- Error states
- Empty states
- Tests (recommended)
- Documentation

---

# DESIGN VALIDATION

Reject any design that:

- Looks generic
- Breaks hierarchy
- Ignores spacing
- Misuses accent color
- Violates design tokens

---

# CODE VALIDATION

Reject any code that:

- Uses any
- Leaves TODOs
- Duplicates components
- Hardcodes values
- Ignores accessibility
- Mixes presentation and business logic

---

# ITERATION PROTOCOL

After each generation:

Review:

- UX
- UI
- Motion
- Accessibility
- Performance
- Maintainability

Improve weak areas before continuing.

---

# ACCEPTANCE CHECKLIST

A generation is accepted only if:

- Production-ready
- Responsive
- Accessible
- Typed
- Performant
- Consistent with DISCIPLINE
- Visually premium

---

# IMPLEMENTATION NOTES

Maintain a shared prompt library.

Version prompts alongside the project.

Update prompts whenever the design system evolves.

---

# FINAL REQUIREMENTS

Every AI interaction should reinforce the DISCIPLINE identity.

Prompts are considered part of the product architecture and must evolve with the platform to ensure consistently exceptional design and engineering quality.



# Volume9-01-Liquid-Glass-Philosophy

_Source: 09 - Creative Direction/Volume9-01-Liquid-Glass-Philosophy.md_


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



# Volume9-02-Glass-Material-Specification

_Source: 09 - Creative Direction/Volume9-02-Glass-Material-Specification.md_


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



# Volume9-04-Blur-System

_Source: 09 - Creative Direction/Volume9-04-Blur-System.md_


# DISCIPLINE
# Volume 9 — 04-Blur-System.md

## OBJECTIVE

Define the complete blur system for the DISCIPLINE Liquid Glass interface.

Blur is not a visual effect.

Blur is a physical property that creates depth, separates layers and reinforces readability.

Every blur value must communicate distance between the user and the interface.

---

# DESIGN PHILOSOPHY

Blur creates hierarchy.

Blur creates focus.

Blur creates atmosphere.

Blur must never become decorative or reduce legibility.

---

# BLUR PRINCIPLES

Every blur must:

- Preserve readability
- Reveal depth
- Feel physically plausible
- Remain consistent

Never choose arbitrary blur values.

---

# OFFICIAL BLUR SCALE

Level 0

0px

Solid surfaces only.

---

Level 1

8px

Small overlays.

---

Level 2

16px

Dropdowns.

Context menus.

---

Level 3

24px

Navigation.

Buttons.

Floating controls.

---

Level 4

32px

Standard Glass Cards.

Primary UI.

---

Level 5

40px

Hero Glass.

Premium floating panels.

---

Level 6

48px

Fullscreen overlays.

Modals.

Maximum permitted blur.

---

# DEPTH RELATIONSHIP

Further layer

↓

Higher blur

↓

Lower visual noise

↓

Greater perceived depth

Blur and elevation must always evolve together.

---

# READABILITY

Minimum text contrast:

WCAG AA.

Blur must never reduce text clarity.

Glass opacity should compensate when background imagery becomes complex.

---

# BACKGROUND RULES

Simple backgrounds:

Lower blur.

Detailed photography:

Increase blur.

Video:

Adaptive blur based on luminance.

---

# RESPONSIVE

Desktop

Use full blur scale.

Tablet

Reduce one level where appropriate.

Mobile

Maximum:

32px

Preserve battery life.

---

# PERFORMANCE

Reuse blur tokens.

Avoid stacking multiple backdrop-filter layers.

Limit simultaneous Level 5+ surfaces.

Maintain 60 FPS.

---

# INTERACTION

Hover

Increase blur by one level only if readability is preserved.

Active

Return to base blur.

Modal

Animate blur over 180–240ms.

Never animate more than one blur layer simultaneously.

---

# AI GENERATION RULES

Every generated component must use only official blur levels.

Reject:

- Random blur values
- Over-frosted panels
- Glass that hides content
- Inconsistent blur hierarchy

---

# QA CHECKLIST

- Blur scale respected
- Text readable
- Hero consistent
- Mobile optimized
- Performance verified
- Layer hierarchy correct

---

# IMPLEMENTATION NOTES

Create design tokens:

blur-0
blur-1
blur-2
blur-3
blur-4
blur-5
blur-6

Every component references tokens instead of hardcoded values.

---

# FINAL REQUIREMENTS

Blur should become an invisible system that gives DISCIPLINE its sense of depth, refinement and premium craftsmanship without ever distracting from the content.



# Volume9-06-Shadow-System

_Source: 09 - Creative Direction/Volume9-06-Shadow-System.md_


# DISCIPLINE
# Volume 9 — 06-Shadow-System.md

## OBJECTIVE

Define the official shadow system used across every DISCIPLINE interface.

Shadows are responsible for communicating elevation, hierarchy and physical presence.

Every shadow must support the illusion that Liquid Glass panels are floating above the interface.

---

# SHADOW PHILOSOPHY

Shadows are:

- Soft
- Diffuse
- Layered
- Physically believable
- Minimal

Shadows are never:

- Pure black
- Sharp
- Decorative
- Excessive

---

# LIGHT MODEL

Global light source:

Top-center.

All shadows project downward with a slight bias toward the lower-right.

Never mix shadow directions.

---

# ELEVATION SCALE

Level 0

No shadow.

Used for backgrounds.

---

Level 1

0 6px 16px rgba(0,0,0,.04)

Navigation.

Small buttons.

---

Level 2

0 12px 28px rgba(0,0,0,.05)

Cards.

Inputs.

Glass controls.

---

Level 3

0 20px 48px rgba(0,0,0,.07)

Floating cards.

Pricing.

Dashboard widgets.

---

Level 4

0 32px 72px rgba(0,0,0,.09)

Hero glass.

Large panels.

Primary visual focus.

---

# CONTACT SHADOW

Every floating element receives a very soft contact shadow.

Opacity:

2–3%

Blur:

8–12px

Purpose:

Anchor the component subtly.

---

# AMBIENT SHADOW

Wide diffuse shadow surrounding premium glass.

Creates atmospheric depth.

Never visibly separate from the object.

---

# SHADOW STACKING

Maximum:

Two simultaneous shadow layers.

Example:

- Contact shadow
- Ambient shadow

Never stack three or more visible shadow effects.

---

# GLASS INTERACTION

Hover:

Increase elevation one level.

Pressed:

Reduce elevation one level.

Focus:

Maintain elevation, brighten edge highlight.

---

# HERO DEPTH

Hero panels should appear closest to the user.

Supporting cards recede gradually.

Depth transition must feel continuous.

---

# MOBILE

Reduce blur radius by 20%.

Reduce spread slightly.

Maintain perceived depth while improving rendering performance.

---

# PERFORMANCE

Animate only:

- opacity
- transform

Never animate blur radius continuously.

Reuse shadow tokens.

---

# DESIGN TOKENS

shadow-0

shadow-1

shadow-2

shadow-3

shadow-4

shadow-contact

shadow-ambient

All components consume tokens only.

---

# AI GENERATION RULES

Reject any interface where:

- Shadows are inconsistent
- Elevation hierarchy is unclear
- Heavy black shadows appear
- Components appear glued to the background
- Every element uses the same shadow

---

# QA CHECKLIST

- Consistent light direction
- Elevation hierarchy respected
- Hover transitions smooth
- Contact shadow visible
- Hero most elevated
- Mobile optimized
- 60 FPS maintained

---

# IMPLEMENTATION NOTES

Implement shadows through centralized design tokens.

Pair every elevation level with matching blur, glass opacity and border intensity.

Shadows, lighting and reflections must always evolve together.

---

# FINAL REQUIREMENTS

Users should perceive depth instinctively without consciously noticing the shadow system.

The interface should feel sculpted from floating Liquid Glass suspended in a bright architectural space.



# Volume9-07-Layering-&-Depth-System

_Source: 09 - Creative Direction/Volume9-07-Layering-&-Depth-System.md_


# DISCIPLINE
# Volume 9 — 07-Layering-&-Depth-System.md

## OBJECTIVE

Define the spatial organization of every interface inside DISCIPLINE.

The platform should feel constructed from floating architectural layers rather than flat UI panels.

Depth is a structural system, not a visual effect.

---

# DEPTH PHILOSOPHY

Every screen exists in three-dimensional space.

Users should perceive:

- Foreground
- Interface
- Background

without consciously thinking about it.

Depth must guide attention naturally.

---

# DEPTH PYRAMID

Layer 0

Background

Layer 1

Large atmospheric shapes

Layer 2

Editorial imagery

Layer 3

Primary Glass

Layer 4

Secondary Glass

Layer 5

Floating Components

Layer 6

Interactive Controls

Layer 7

Navigation

Layer 8

Dialogs & Modals

Never violate this hierarchy.

---

# SPATIAL SEPARATION

Minimum perceived spacing:

24px

Preferred:

40px

Premium:

64px

Large floating Hero:

96px

Whitespace contributes to perceived depth.

---

# FLOATING BEHAVIOR

All premium components float.

Never touch the browser edges directly.

Maintain visible air around glass.

Floating distance should remain visually consistent.

---

# Z-INDEX TOKENS

z-background

0

z-media

10

z-glass

20

z-floating

30

z-controls

40

z-navigation

50

z-modal

100

Never use arbitrary z-index values.

---

# PARALLAX

Desktop only.

Background:

1x movement.

Editorial media:

2x.

Glass:

3x.

Floating controls:

4x.

Movement remains extremely subtle.

Maximum translation:

8px.

---

# HERO DEPTH

The Hero is the deepest composition.

Use:

- Background geometry
- Glass layers
- Floating statistics
- Editorial photography
- Transparent framing

The eye should immediately understand spatial order.

---

# OVERLAPPING

Overlap only when it increases hierarchy.

Examples:

- Statistic cards over Hero
- Floating CTA
- Glass widgets

Avoid random overlaps.

---

# LAYER TRANSITIONS

Scrolling should reveal layers progressively.

Never expose every layer simultaneously.

Depth evolves while the user explores the page.

---

# SECTION DEPTH

Alternate:

Flat

↓

Medium depth

↓

Strong depth

↓

Minimal

↓

Hero depth

Creates rhythm across long pages.

---

# MOBILE

Reduce parallax.

Preserve layering.

Maintain floating sensation.

Avoid unnecessary transforms.

---

# PERFORMANCE

GPU accelerated transforms only.

Animate:

- translate3d
- opacity
- scale

Never animate layout properties.

Maintain 60 FPS.

---

# AI GENERATION RULES

Reject interfaces that:

- Feel flat
- Stack every card identically
- Ignore depth hierarchy
- Use random z-index values
- Lose floating sensation

Every page should feel sculpted.

---

# QA CHECKLIST

- Layer hierarchy correct
- Floating spacing consistent
- Hero depth premium
- Parallax subtle
- Mobile optimized
- Z-index tokens respected
- Motion smooth

---

# IMPLEMENTATION NOTES

Centralize:

Depth tokens

Elevation tokens

Parallax controller

Z-index scale

Every component consumes the shared spatial system.

---

# FINAL REQUIREMENTS

Users should perceive DISCIPLINE as a floating architectural interface built from layered Liquid Glass suspended in light.

Depth must become part of the brand identity itself.



# Volume9-09-Editorial-Grid-System

_Source: 09 - Creative Direction/Volume9-09-Editorial-Grid-System.md_


# DISCIPLINE
# Volume 9 — 09-Editorial-Grid-System.md

## OBJECTIVE

Define the editorial grid that structures every DISCIPLINE page.

The grid should disappear visually while ensuring perfect balance, rhythm and alignment.

It must resemble the precision of premium editorial design rather than traditional web layouts.

---

# PHILOSOPHY

The grid is invisible.

Users should never notice it.

They should only perceive harmony.

Every composition begins with the grid.

Every composition ends with the grid.

---

# MASTER GRID

Desktop

12 columns

80px outer margins

32px gutters

Maximum width:

1600px

Content width:

1440px

---

Tablet

8 columns

32px margins

24px gutters

---

Mobile

4 columns

24px margins

16px gutters

---

# VERTICAL RHYTHM

Base unit

8px

Major spacing

32px

Section spacing

160px

Hero spacing

220px

Everything aligns to multiples of 8.

---

# ALIGNMENT

Primary content aligns to grid.

Decorative elements may intentionally break the grid by 8–24px.

Never break alignment accidentally.

---

# TYPOGRAPHIC GRID

Display headlines:

Span 7–8 columns.

Body text:

Span 4–5 columns.

Statistics:

Span 2–3 columns.

Buttons:

Align with headline start.

---

# IMAGE GRID

Large editorial images:

6–8 columns.

Portraits:

4 columns.

Floating imagery:

Break grid slightly while maintaining balance.

Always leave room for typography.

---

# GLASS GRID

Glass panels align with grid.

Floating elements may extend beyond columns.

Maximum extension:

48px.

---

# SECTION COMPOSITION

Every section uses:

- Primary column
- Secondary column
- Floating accent
- Negative space

No full-width text blocks.

---

# HERO GRID

Headline:

Left.

Subject:

Right.

Floating metrics:

Lower-right.

Primary CTA:

Bottom-left.

Glass navigation:

Top.

---

# ASYMMETRIC BALANCE

Weight is balanced visually rather than mathematically.

Large imagery may balance multiple smaller cards.

Whitespace is considered visual weight.

---

# RESPONSIVE RULES

Recompose.

Never simply collapse columns.

Preserve hierarchy before alignment.

Maintain editorial feel.

---

# AI GENERATION RULES

Every generated layout must:

- Respect the master grid
- Maintain editorial rhythm
- Use asymmetrical balance
- Leave generous whitespace
- Avoid repetitive structures

Reject layouts that resemble common website builders.

---

# QA CHECKLIST

- Grid respected
- Baseline rhythm consistent
- Hero balanced
- Typography aligned
- Images correctly placed
- Mobile recomposed
- Whitespace intentional

---

# IMPLEMENTATION NOTES

Create reusable layout primitives:

GridContainer

EditorialColumns

SectionWrapper

HeroGrid

FloatingGrid

Expose spacing through design tokens only.

---

# FINAL REQUIREMENTS

The editorial grid should become the invisible structure behind every DISCIPLINE interface.

Even complex layouts must feel effortless, spacious and meticulously composed.



# Volume9-10-Hero-Art-Direction

_Source: 09 - Creative Direction/Volume9-10-Hero-Art-Direction.md_


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



# Volume9-11-Glass-Navigation-System

_Source: 09 - Creative Direction/Volume9-11-Glass-Navigation-System.md_


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



# Volume9-12-Glass-Button-Language

_Source: 09 - Creative Direction/Volume9-12-Glass-Button-Language.md_


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



# Volume9-13-Glass-Dashboard-Art-Direction

_Source: 09 - Creative Direction/Volume9-13-Glass-Dashboard-Art-Direction.md_


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



# Volume9-14-Premium-Motion-Language

_Source: 09 - Creative Direction/Volume9-14-Premium-Motion-Language.md_


# DISCIPLINE
# Volume 9 — 14-Premium-Motion-Language.md

## OBJECTIVE

Define the official motion language of DISCIPLINE.

Motion is a structural design tool that communicates hierarchy, materiality and intention.

Animations should make the interface feel engineered from Liquid Glass instead of static pixels.

---

# MOTION PHILOSOPHY

Motion should feel:

- Calm
- Physical
- Precise
- Elegant
- Intentional

Never playful.

Never exaggerated.

Never distracting.

---

# MOTION PRINCIPLES

Every animation must:

- Explain change
- Preserve orientation
- Reinforce depth
- Respect accessibility
- Feel physically plausible

No animation exists purely for decoration.

---

# OFFICIAL EASING

Primary

cubic-bezier(.22,1,.36,1)

Micro

ease-out

Exit

ease-in

Spring

Very low bounce only.

No elastic motion.

---

# DURATION SCALE

Instant

80ms

Micro

140ms

Standard

220ms

Complex

320ms

Scene transition

600–900ms

Never exceed 1000ms.

---

# PAGE TRANSITIONS

Sequence:

Fade

↓

Translate Y (16–24px)

↓

Glass highlight

↓

Content reveal

No page wipes.

No dramatic zooms.

---

# HERO ENTRANCE

Headline

0ms

Supporting copy

80ms

CTA

160ms

Glass cards

240ms

Background media

Continuous subtle motion.

---

# GLASS MOTION

Hover:

Lift 2px

Reflection shifts

Border brightens

Pressed:

Scale 0.985

Reflection compresses

Shadow softens

Idle:

Ambient drift every 15–20 seconds.

---

# SCROLL ANIMATIONS

Reveal once.

Opacity + Translate.

Never animate every scroll event.

Avoid parallax beyond 8px.

---

# STAGGER

Cards:

40–60ms interval

Lists:

30–40ms

Dashboard widgets:

60–80ms

Keep choreography subtle.

---

# MODALS

Backdrop fades.

Glass scales from 0.98 → 1.

Duration:

240ms.

Focus trapped immediately.

---

# LOADING

Skeletons:

Glass shimmer.

Progress bars:

Linear.

Spinners:

Minimal.

Never use flashy loaders.

---

# CHARTS

Animate:

Line drawing

Bar growth

Counter increment

One animation only.

---

# ACCESSIBILITY

Honor prefers-reduced-motion.

Disable:

Parallax

Ambient drift

Complex transitions

Retain essential feedback.

---

# PERFORMANCE

GPU only:

transform

opacity

filter (limited)

Never animate:

width

height

top

left

Maintain 60 FPS.

---

# DO

✓ Calm motion
✓ Physical glass behavior
✓ Consistent timing
✓ Minimal choreography
✓ Meaningful transitions

---

# DON'T

✗ Bounce
✗ Overshoot
✗ Flashing
✗ Constant looping
✗ Random easing
✗ Heavy particle effects

---

# AI GENERATION RULES

Every generated animation must:

- Respect official timing
- Use approved easing
- Reinforce Liquid Glass
- Preserve readability
- Remain subtle

Reject animations that resemble marketing templates or gaming interfaces.

---

# QA CHECKLIST

- Timing consistent
- Motion meaningful
- Reduced motion supported
- GPU accelerated
- 60 FPS
- Hero choreography correct
- Glass interactions premium

---

# IMPLEMENTATION NOTES

Shared tokens:

motion-fast
motion-standard
motion-slow
ease-primary
ease-micro
ease-exit

Reusable utilities:

MotionProvider
GlassHover
RevealOnScroll
PageTransition
HeroTimeline

Implement with Framer Motion and GSAP only where each library provides the clearest benefit.

---

# FINAL REQUIREMENTS

Every movement in DISCIPLINE should feel like a carefully choreographed interaction with a premium Liquid Glass object.

Motion must become an invisible signature of the product rather than a visual effect.



# Volume9-15-Interaction-Physics

_Source: 09 - Creative Direction/Volume9-15-Interaction-Physics.md_


# DISCIPLINE
# Volume 9 — 15-Interaction-Physics.md

## OBJECTIVE

Define the physical interaction model of the DISCIPLINE interface.

Every interaction should feel as though the user is manipulating real Liquid Glass suspended in space.

The interface must behave with believable physical consistency rather than artificial animation.

---

# PHILOSOPHY

Interaction is physical.

Not decorative.

Every movement should imply:

- Mass
- Inertia
- Friction
- Balance
- Precision

Users should instinctively trust the interface because it behaves predictably.

---

# PHYSICAL MODEL

Every interactive component has:

Mass

↓

Momentum

↓

Resistance

↓

Settlement

No instant teleportation.

No exaggerated elasticity.

---

# CURSOR MAGNETISM

Desktop only.

Interactive elements gently attract the cursor.

Maximum attraction:

6px

Activation radius:

32px

The effect must remain almost imperceptible.

---

# POINTER FOLLOW

Glass reflections follow pointer movement.

Maximum translation:

3px

Maximum rotation:

1°

Return duration:

220ms

Never create a "3D card tilt" effect.

---

# PRESS RESPONSE

Mouse Down:

Scale:

0.985

Shadow:

Decrease one elevation.

Reflection compresses.

Mouse Up:

Return smoothly.

Total interaction:

120–180ms.

---

# DRAG PHYSICS

Used for:

- Sliders
- Carousels
- Timeline
- Calendar

Rules:

- Momentum preserved
- Gentle deceleration
- No rubber-band overshoot
- Snap only when appropriate

---

# SCROLL PHYSICS

Scrolling should feel:

Dense

Stable

Premium

Parallax:

Maximum:

8px

Never create floating chaos.

---

# GLASS FLOATING

Idle movement:

Vertical drift:

1–2px

Cycle:

18–24 seconds

Each floating object uses a slightly different phase.

Never synchronize floating animations.

---

# HOVER RESPONSE

Glass lifts:

2px

Border brightness:

+8%

Reflection shifts.

Shadow increases one level.

No glow explosion.

---

# BUTTON PHYSICS

Hover:

Lift.

Press:

Compress.

Release:

Ease back.

No bounce.

No spring oscillation.

---

# FORM CONTROLS

Inputs:

Focus ring grows softly.

Checkboxes:

Scale 1.05 then settle.

Switches:

Smooth momentum.

Duration:

160–200ms.

---

# PAGE TRANSITIONS

Content should feel connected.

Never appear from nowhere.

Maintain spatial continuity.

---

# TOUCH INTERACTION

Touch targets:

Minimum:

44px

Long press:

Soft visual feedback.

Swipe:

Natural momentum.

No aggressive gestures.

---

# ACCESSIBILITY

Reduced Motion:

Disable:

- Cursor tracking
- Ambient floating
- Parallax

Retain:

- Focus feedback
- State transitions
- Essential confirmations

---

# PERFORMANCE

GPU acceleration only.

Animate:

transform

opacity

CSS variables

Never animate expensive layout properties.

Target:

60 FPS desktop

120 FPS on supported devices when possible.

---

# DO

✓ Calm inertia
✓ Soft resistance
✓ Predictable movement
✓ Physical continuity
✓ Elegant feedback

---

# DON'T

✗ Rubber-band effects
✗ Strong 3D tilts
✗ Gaming physics
✗ Elastic overshoot
✗ Infinite bouncing
✗ Excessive cursor tracking

---

# AI GENERATION RULES

Every generated interaction must:

- Respect physical consistency
- Reinforce Liquid Glass
- Preserve readability
- Remain subtle
- Match official timing tokens

Reject interactions that feel playful, arcade-like or experimental.

---

# QA CHECKLIST

- Pointer tracking subtle
- Press response premium
- Floating asynchronous
- Scroll stable
- Mobile optimized
- Reduced Motion respected
- 60 FPS maintained

---

# IMPLEMENTATION NOTES

Reusable utilities:

- GlassPhysics
- PointerTracker
- MagneticCursor
- FloatingController
- MotionTokens
- InteractionProvider

Drive all interaction values from centralized physics tokens.

---

# FINAL REQUIREMENTS

Users should never consciously notice the interaction physics.

They should simply feel that every DISCIPLINE interface behaves like a meticulously engineered object made from Liquid Glass.



# Volume9-16-Micro-Details

_Source: 09 - Creative Direction/Volume9-16-Micro-Details.md_


# DISCIPLINE
# Volume 9 — 16-Micro-Details.md

## OBJECTIVE

Define every microscopic visual detail that transforms DISCIPLINE from a well-designed interface into a world-class digital product.

Micro-details are largely invisible in isolation, but collectively create the perception of exceptional craftsmanship.

Every pixel matters.

---

# PHILOSOPHY

Users may never consciously notice these details.

They will, however, feel their absence.

Craftsmanship is the accumulation of hundreds of small decisions.

---

# OPTICAL ALIGNMENT

Do not rely exclusively on mathematical alignment.

Use optical correction when necessary.

Examples:

- Icons may shift 1–2px.
- Headlines may sit slightly above geometric center.
- Circular elements require optical centering.

Always prioritize perception over mathematics.

---

# BORDER PRECISION

Standard border:

1px

Highlight border:

0.5–1px equivalent using opacity.

Never exceed:

1px

Borders should separate surfaces, not define them.

---

# GLASS EDGE DETAILS

Every premium glass surface contains:

- Soft top highlight
- Subtle inner glow
- Neutral lower edge
- Controlled edge fade

Edges should suggest thickness without looking heavy.

---

# CORNER CONSISTENCY

Official radii:

12px

20px

28px

999px

Never invent intermediate values.

Nested components always reduce radius proportionally.

---

# SPACING CORRECTIONS

Optical spacing overrides geometric spacing.

Examples:

- Icon + text:
12px

- Headline + paragraph:
20–28px

- Paragraph + CTA:
28–36px

Maintain visual rhythm, not arithmetic rhythm.

---

# ICON TREATMENT

Use Lucide React only.

Stroke:

2px

Rounded joins.

Never mix icon families.

Icons align optically with text baseline.

---

# TYPOGRAPHIC FINISH

Maximum line length:

70 characters.

Negative tracking for large headlines.

Positive tracking for uppercase labels.

Avoid widows and orphans whenever possible.

---

# SHADOW FINISH

Shadows fade gradually.

No visible clipping.

No abrupt opacity changes.

Contact shadows remain nearly invisible.

---

# HIGHLIGHTS

Glass highlights should never exceed:

8% opacity.

Blend softly.

Never intersect typography.

---

# DIVIDERS

Use only when necessary.

Opacity:

6–10%

Thickness:

1px

Prefer whitespace over separators.

---

# BUTTON DETAILS

Text optically centered.

Reflection never touches label.

Shadow aligned with global light.

Hover lift exactly:

2px.

---

# CARD DETAILS

Internal padding:

24px

32px

40px

Never arbitrary.

Headers align with surrounding content.

Actions align to the baseline grid.

---

# FORM DETAILS

Caret color:

Pastel Violet.

Focus ring:

2px.

Placeholder:

Muted gray.

Validation icons align with text baseline.

---

# LOADING DETAILS

Skeleton shimmer:

18–24 seconds cycle.

No aggressive movement.

Loading states preserve layout.

---

# CURSOR DETAILS

Interactive regions:

cursor:pointer

Text:

cursor:text

Disabled:

not-allowed

Never hide the cursor unnecessarily.

---

# SOUNDLESS FEEDBACK

Every interaction should communicate state visually.

Do not depend on sound or vibration.

Feedback should remain immediate yet understated.

---

# ACCESSIBILITY

Focus indicators visible.

Contrast verified.

Micro-details never reduce readability.

Decorative effects remain optional.

---

# PERFORMANCE

Decorative layers:

Maximum two pseudo-elements.

Reuse gradients.

Reuse masks.

Avoid excessive DOM complexity.

---

# DO

✓ Optical corrections
✓ Thin borders
✓ Perfect spacing
✓ Soft highlights
✓ Invisible craftsmanship

---

# DON'T

✗ Pixel-perfect mathematics without perception
✗ Thick outlines
✗ Busy separators
✗ Inconsistent radii
✗ Random spacing
✗ Decorative excess

---

# AI GENERATION RULES

Every generated interface must:

- Apply optical corrections
- Respect official radii
- Preserve spacing rhythm
- Maintain border consistency
- Prioritize perception over geometry

Reject interfaces where components feel mechanically aligned rather than visually balanced.

---

# QA CHECKLIST

- Optical alignment verified
- Border thickness consistent
- Radii correct
- Highlights subtle
- Spacing harmonious
- Typography refined
- Accessibility maintained

---

# IMPLEMENTATION NOTES

Create design tokens:

radius-sm
radius-md
radius-lg
radius-pill

spacing-optical

border-standard

highlight-soft

Expose micro-detail values through shared tokens only.

---

# FINAL REQUIREMENTS

The quality of DISCIPLINE should emerge from thousands of nearly invisible refinements.

The interface must feel handcrafted under close inspection, rewarding attention without ever demanding it.



# Volume9-17-Premium-Typography-System

_Source: 09 - Creative Direction/Volume9-17-Premium-Typography-System.md_


# DISCIPLINE
# Volume 9 — 17-Premium-Typography-System.md

## OBJECTIVE

Define the complete typography system for DISCIPLINE.

Typography is the primary interface material after Liquid Glass.

It must communicate precision, confidence, luxury and clarity before the user reads the content.

---

# TYPOGRAPHY PHILOSOPHY

Typography should feel:

- Architectural
- Editorial
- Calm
- Premium
- Intelligent
- Timeless

Every word deserves intentional placement.

---

# TYPEFACE SYSTEM

Primary Typeface

Geist

Fallback:

Inter

System UI

Future Variable Font support encouraged.

---

# TYPOGRAPHIC ROLES

Display XXL

120px

Display XL

96px

Display L

72px

Heading XL

56px

Heading L

48px

Heading M

40px

Section Title

32px

Card Title

24px

Body Large

18px

Body

16px

Caption

14px

Micro

12px

Never invent intermediate scales.

---

# WEIGHTS

300

Light

400

Regular

500

Medium

600

SemiBold

700

Bold

Use only these official weights.

---

# LINE HEIGHT

Display

0.95–1.0

Headings

1.05–1.15

Body

1.55–1.7

Captions

1.4

Readable rhythm always takes priority.

---

# LETTER SPACING

Large Displays

-0.04em

Headings

-0.02em

Body

0em

Uppercase Labels

+0.08em

Buttons

-0.01em

Tracking should feel invisible.

---

# COLOR HIERARCHY

Primary Text

#111111

Secondary

#5F5F5F

Muted

#8E8E8E

Disabled

#B8B8B8

Accent

Pastel Violet

Accent reserved only for interaction and emphasis.

---

# MEASURE

Maximum line length

70 characters

Ideal:

55–65

Never allow full-width reading paragraphs.

---

# TYPOGRAPHIC GRID

Headlines align to the editorial grid.

Body text aligns to a 8px baseline.

Buttons align to optical centers.

---

# HIERARCHY

Every viewport contains:

One dominant headline.

One supporting paragraph.

One primary action.

Everything else becomes secondary.

---

# RESPONSIVE SCALE

Desktop

100%

Tablet

92%

Mobile

82–88%

Recompose before reducing size.

---

# GLASS RELATIONSHIP

Text always sits above glass.

Never reduce contrast to showcase blur.

Glass serves typography.

Typography never serves glass.

---

# MICRO TYPOGRAPHY

Avoid:

- Widows
- Orphans
- Excessive hyphenation
- Rivers of whitespace

Prefer manual balancing for Hero headlines.

---

# NUMBERS

Use tabular figures for:

- Metrics
- Charts
- Pricing
- Progress

Maintain alignment across widgets.

---

# ACCESSIBILITY

Minimum body size:

16px

WCAG AA contrast.

User zoom up to 200%.

Never encode meaning with color alone.

---

# PERFORMANCE

Load variable font subsets.

Preload primary font.

Use font-display: swap.

Avoid FOIT.

---

# DO

✓ Large editorial headlines
✓ Short paragraphs
✓ Strong hierarchy
✓ Calm rhythm
✓ Generous whitespace

---

# DON'T

✗ Tiny body text
✗ Long paragraphs
✗ Multiple display sizes together
✗ Decorative fonts
✗ Inconsistent tracking

---

# AI GENERATION RULES

Every generated interface must:

- Respect the official type scale
- Preserve editorial rhythm
- Maintain line length
- Prioritize readability
- Keep typography visually dominant

Reject interfaces where typography feels secondary to decoration.

---

# QA CHECKLIST

- Scale respected
- Hierarchy obvious
- Contrast verified
- Reading width correct
- Baseline rhythm maintained
- Responsive typography validated

---

# IMPLEMENTATION NOTES

Design tokens:

font-display
font-heading
font-body

tracking-display
tracking-heading
tracking-body

leading-display
leading-heading
leading-body

Components:

DisplayText
Heading
BodyText
Caption
MetricLabel

---

# FINAL REQUIREMENTS

Typography should become the voice of DISCIPLINE.

Even without images or glass effects, the interface must feel premium through typography alone.



# Volume9-18-AI-Creative-Director

_Source: 09 - Creative Direction/Volume9-18-AI-Creative-Director.md_


# DISCIPLINE
# Volume 9 — 18-AI-Creative-Director.md

## OBJECTIVE

Define how every AI involved in the DISCIPLINE project must think before producing design, code or visual decisions.

The AI is not a UI generator.

The AI is the Creative Director responsible for protecting the DISCIPLINE identity.

Every generation must strengthen the brand.

---

# ROLE

Assume the role of:

Senior Creative Director

Senior Product Designer

Senior UX Designer

Senior Frontend Architect

Work as one multidisciplinary team.

Never behave like a template generator.

---

# PRIMARY MISSION

Before producing anything, ask internally:

- Does this reinforce DISCIPLINE?
- Does it feel handcrafted?
- Does it feel like Liquid Glass?
- Is it simpler?
- Is it more elegant?
- Is it more useful?

If the answer is no, redesign it.

---

# NON-NEGOTIABLE PRINCIPLES

Always preserve:

- Liquid Glass identity
- Editorial composition
- Calm atmosphere
- Architectural spacing
- Premium typography
- Minimal color palette
- Optical precision
- Accessibility
- Performance

Never compromise one pillar for another.

---

# DECISION HIERARCHY

1. Clarity
2. Readability
3. Brand identity
4. Usability
5. Motion
6. Decoration

Decoration is always last.

---

# CREATIVE FILTER

Reject any idea that feels:

- Generic
- Trend-driven
- Overdesigned
- Noisy
- Heavy
- Corporate
- Gamified

Seek timelessness over novelty.

---

# PAGE REVIEW PROTOCOL

For every screen, verify:

Purpose

↓

Hierarchy

↓

Composition

↓

Typography

↓

Glass quality

↓

Motion

↓

Accessibility

↓

Performance

Only then approve.

---

# COMPONENT REVIEW

Every component must answer:

Why does it exist?

Can it be simpler?

Does it belong to DISCIPLINE?

Would removing it improve the page?

---

# HERO REVIEW

Reject the Hero if:

- CTA is unclear
- Headline is weak
- Layout is symmetrical without reason
- Glass feels flat
- Motion distracts
- Photography looks like stock

---

# DASHBOARD REVIEW

Reject dashboards that:

- Look like admin panels
- Prioritize statistics over actions
- Use dense tables
- Repeat identical cards
- Lose editorial rhythm

The dashboard must remain beautiful under daily use.

---

# CODE REVIEW

Approve code only if it is:

- Typed
- Modular
- Accessible
- Performant
- Maintainable
- Production-ready

Never sacrifice quality for speed.

---

# VISUAL CONSISTENCY

Every new page must look as if it has always belonged to DISCIPLINE.

No isolated visual experiments.

No feature-specific styles.

Everything inherits the same language.

---

# AI SELF-CHECK

Before finishing, answer:

✓ Would Apple ship this level of polish?

✓ Would this fit an Awwwards showcase?

✓ Does it still feel like DISCIPLINE?

If any answer is "no", iterate again.

---

# DO

✓ Remove unnecessary elements
✓ Increase whitespace when unsure
✓ Prefer fewer, better components
✓ Protect readability
✓ Maintain restraint

---

# DON'T

✗ Add effects because they are impressive
✗ Copy trends blindly
✗ Multiply CTAs
✗ Introduce new colors
✗ Break design tokens
✗ Ignore accessibility

---

# QA CHECKLIST

- Identity preserved
- Liquid Glass consistent
- Typography premium
- Motion restrained
- Components reusable
- Accessibility verified
- Performance budget respected

---

# IMPLEMENTATION NOTES

Every AI workflow should end with an explicit design review against:

- Volume 6 (UI Bible)
- Volume 7 (UX Bible)
- Volume 8 (AI Design Language)
- Volume 9 (Creative Direction)

No deliverable is complete until it satisfies all four.

---

# FINAL REQUIREMENTS

The AI must behave as the guardian of the DISCIPLINE brand.

Its responsibility is not to generate interfaces quickly, but to produce work that feels intentional, timeless and unmistakably DISCIPLINE.



# Volume9-20-Creative-Manifesto

_Source: 09 - Creative Direction/Volume9-20-Creative-Manifesto.md_


# DISCIPLINE
# Volume 9 — 20-Creative-Manifesto.md

## OBJECTIVE

This document is the final reference for the DISCIPLINE brand.

It defines the principles that must never change, regardless of future technologies, trends or redesigns.

Every design decision, line of code and interaction must reinforce this vision.

---

# WE BELIEVE

Technology should disappear.

Design should feel inevitable.

Interfaces should guide, never overwhelm.

Luxury comes from restraint, not excess.

Beauty exists to improve understanding.

---

# OUR MATERIAL

DISCIPLINE is built from one visual language:

Liquid Glass.

Glass is not an aesthetic effect.

It is the physical identity of the product.

Every surface must feel engineered.

---

# OUR VISUAL DNA

We choose:

- Editorial composition
- Architectural spacing
- Optical precision
- Cinematic photography
- Floating interfaces
- Calm motion
- Premium typography

We reject:

- Visual noise
- Generic SaaS patterns
- Decorative excess
- Trend chasing

---

# OUR USERS

We design for people seeking long-term progress.

Every interaction should inspire confidence.

Every screen should reduce cognitive effort.

The interface serves discipline—not distraction.

---

# OUR DESIGN VALUES

Clarity before beauty.

Beauty through clarity.

Consistency before novelty.

Craft before speed.

Quality before quantity.

Timelessness before trends.

---

# OUR ENGINEERING VALUES

Production-ready by default.

Accessible by default.

Performant by default.

Reusable by default.

Maintainable by default.

No compromise between engineering and design.

---

# OUR MOTION

Motion explains.

Motion reassures.

Motion never entertains at the expense of usability.

Every animation has a reason.

---

# OUR TYPOGRAPHY

Words carry authority.

Large headlines.

Short paragraphs.

Editorial rhythm.

Readable at every size.

---

# OUR REVIEW STANDARD

Before shipping any feature ask:

Does this feel unmistakably DISCIPLINE?

Would removing something improve it?

Does it respect every previous volume?

If not, redesign it.

---

# IMMUTABLE RULES

Never sacrifice:

- Readability
- Accessibility
- Performance
- Identity
- Simplicity
- Craftsmanship

These principles outrank deadlines.

---

# THE ROLE OF AI

AI is a collaborator.

Never an author without direction.

Every AI generation must be reviewed against:

- UI Bible
- UX Bible
- AI Design Language
- Creative Direction Bible

The AI protects the brand as much as the people building it.

---

# LONG-TERM EVOLUTION

Technology will change.

Frameworks will change.

Design trends will change.

The DISCIPLINE identity must remain recognizable.

Only implementation evolves.

The philosophy does not.

---

# FINAL CHECKLIST

Ship only when the product is:

✓ Clear

✓ Elegant

✓ Accessible

✓ Performant

✓ Cohesive

✓ Emotionally calm

✓ Technically excellent

✓ Unmistakably DISCIPLINE

---

# CREATIVE OATH

Every screen is intentional.

Every component earns its place.

Every interaction respects the user's attention.

Every detail reflects craftsmanship.

We do not build interfaces.

We build an environment where discipline feels natural.

---

# FINAL REQUIREMENT

If the logo disappears, DISCIPLINE must still be recognized.

Its identity lives in its composition, typography, motion, light, materials and relentless attention to detail.

This manifesto is the permanent north star for every future evolution of the product.


