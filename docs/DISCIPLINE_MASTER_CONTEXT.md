> This document is governed by DISCIPLINE_CONSTITUTION.md.
>
> Whenever a conflict exists between this document and the Constitution, the Constitution prevails.

# DISCIPLINE MASTER CONTEXT

This document is an automatically merged master context generated from the project documentation.



---

# Source: 01 - Design/Discipline_Blueprint/Volume-1/01-Introduction.md


# DISCIPLINE — Volume 1
## Introduction

Build a world-class premium coaching platform named **DISCIPLINE**.

## Philosophy

DISCIPLINE is not a fitness website.
It is a premium coaching ecosystem combining education, habit formation, training, nutrition and long-term transformation.

## Visual Identity

Inspirations:
- Apple
- Arc Browser
- WHOOP
- Nike
- Aesop
- Linear

Avoid cliché bodybuilding aesthetics.

## Design Principles

- Calm
- Precision
- White space
- Editorial typography
- Liquid Glass
- Soft pastel violet accents
- Premium photography
- Smooth motion

## Color Palette

Background: #FAFAF8
Surface: #F3F3F1
Glass: rgba(255,255,255,.58)
Primary text: #101010
Secondary text: #666666
Accent: #8B7CFF

## Tech Stack

Next.js 15
React 18
TypeScript
Tailwind CSS
Framer Motion
GSAP
Lenis
Shadcn UI
Lucide React

## Landing Sections

1 Hero
2 Social Proof
3 Coaching Plans
4 Transformations
5 Method
6 Dashboard Preview
7 Testimonials
8 FAQ
9 Contact
10 Footer

This volume continues with Design System, Typography, Navigation, Hero and Motion specifications.



---

# Source: 02 - Landing page/01-Coaching-Plans.md


# Coaching Plans

## Objective
Present three premium monthly coaching subscriptions.

### START
Price card with:
- Personalized training
- Nutrition guide
- Monthly review

### PRO
Includes START plus:
- Weekly adjustments
- Chat support
- Technique analysis

### ELITE
Includes PRO plus:
- Weekly video call
- Priority support
- Long-term strategy

Design:
- Apple Liquid Glass
- Pastel violet accent
- Hover elevation
- Animated border glow
- Monthly billing toggle
- Stripe CTA



---

# Source: 02 - Landing page/02-Services.md


# Services
Describe coaching, nutrition, habit building, performance analysis and education with editorial layouts and glass cards.



---

# Source: 02 - Landing page/03-Before-After.md


# Before / After
Interactive comparison slider, transformation stories, measurable progress, subtle animations.



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

# Source: 02 - Landing page/07-Contact.md


# Contact
Instagram: @hugo.izquierdoo
Email: contact@hugoizquierdo.com
Glass contact form with validation.



---

# Source: 02 - Landing page/08-Footer.md


# Footer
Minimal footer with navigation, legal pages, social links and newsletter.



---

# Source: 03 - Dashboard/01-Authentication.md


# DISCIPLINE
# Volume 3 — 01-Authentication.md

## OBJECTIVE

Create a premium authentication system that reflects the quality of the DISCIPLINE platform.

The authentication flow should feel closer to Apple, Linear and Arc Browser than a traditional login page.

Core values:
- Security
- Simplicity
- Trust
- Performance
- Beautiful UX

---

# AUTHENTICATION FEATURES

## Supported Methods

- Email + Password
- Google OAuth
- Apple Sign In
- Microsoft OAuth
- Future-ready GitHub OAuth

## Session Management

- Secure HTTP-only cookies
- Refresh token rotation
- Automatic session renewal
- Logout from all devices
- Active device management

---

# LOGIN PAGE

Layout:

- Split screen desktop
- Fullscreen glass authentication card
- Lifestyle image/video on the left
- Authentication card on the right

Components:

- Logo
- Welcome title
- Email
- Password
- Remember me
- Forgot password
- Continue button
- OAuth providers

---

# REGISTRATION

Fields:

- First name
- Last name
- Email
- Password
- Confirm password
- Country
- Preferred language
- Accept Terms
- Newsletter (optional)

---

# PASSWORD POLICY

Minimum:

- 12 characters
- 1 uppercase
- 1 lowercase
- 1 number
- 1 special character

Display a live password strength meter.

---

# EMAIL VERIFICATION

After registration:

- Send verification email
- Resend after countdown
- Success confirmation page
- Automatic redirect after verification

---

# FORGOT PASSWORD

Flow:

1. Enter email
2. Receive secure reset link
3. Create new password
4. Success confirmation
5. Redirect to login

---

# TWO-FACTOR AUTHENTICATION

Optional support:

- Authenticator App
- Email code
- SMS (future)

Recovery codes available.

---

# SECURITY

- HTTPS only
- Argon2 password hashing
- CSRF protection
- XSS protection
- Rate limiting
- Zod server validation
- Brute-force protection
- Device fingerprinting (optional)

---

# USER ONBOARDING

After first login:

Collect:

- Height
- Weight
- Age
- Goal
- Activity level
- Experience
- Equipment
- Dietary preferences

Generate initial dashboard automatically.

---

# UI STYLE

- Apple-inspired Liquid Glass
- Background: #FAFAF8
- Accent: #8B7CFF
- 32px radius
- Soft shadows
- Blur: 32px

---

# MOTION

Framer Motion:

- Fade Up
- Fade Down
- Blur Reveal
- Glass Hover
- Success Check Animation

Duration:

200–500ms

---

# RESPONSIVE

Desktop:
Split layout.

Tablet:
Centered authentication card.

Mobile:
Single-column layout with full-width inputs.

---

# ACCESSIBILITY

- Keyboard navigation
- Screen reader labels
- Visible focus states
- Reduced motion support

---

# FINAL REQUIREMENTS

Authentication should feel effortless, premium and secure.

Every screen must reinforce confidence while remaining minimal, elegant and fast.



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

# Source: 03 - Dashboard/03-Workout.md


# DISCIPLINE
# Volume 3 — 03-Workout.md

## OBJECTIVE

Create a premium training experience that combines the simplicity of Apple Fitness+, the clarity of Notion and the polish of WHOOP.

The workout module must be the primary tool members use every day.

---

# USER EXPERIENCE

The workout page should immediately display:

- Today's workout
- Completion progress
- Estimated duration
- Current training block
- Coach notes
- Weekly volume
- Recovery indicator

Everything is displayed inside floating Liquid Glass cards.

---

# PAGE LAYOUT

Desktop

- Left: Workout navigation
- Center: Exercise list
- Right: Session summary

Tablet

- Two-column layout

Mobile

- Single-column layout
- Sticky bottom actions

---

# TRAINING BLOCKS

Support multiple phases:

- Hypertrophy
- Strength
- Fat Loss
- Deload
- Maintenance
- Custom

Each block contains:

- Start date
- End date
- Objective
- Coach notes
- Weekly schedule

---

# SESSION STRUCTURE

Each workout contains:

- Exercise name
- Demonstration video
- Primary muscles
- Secondary muscles
- Sets
- Repetitions
- Target RIR
- Rest timer
- Tempo
- Coach comments

---

# EXERCISE CARD

Each exercise is a Liquid Glass card.

Display:

- Thumbnail
- Name
- Difficulty
- Equipment
- Technique tips

Expandable details reveal:

- Video
- Instructions
- Common mistakes
- Alternatives

---

# WORKOUT TRACKING

Users can log:

- Weight
- Repetitions
- RIR
- Notes

Auto-save after each completed set.

Highlight personal records.

---

# REST TIMER

Built-in timer:

- 30 sec
- 60 sec
- 90 sec
- 120 sec
- Custom

Circular animated countdown.

Vibration support on mobile.

---

# PROGRESSION

Display:

- Previous performance
- Current performance
- Recommended load
- Weekly progression

Graphs animate smoothly.

---

# SEARCH & FILTERS

Search by:

- Exercise
- Muscle group
- Equipment
- Goal

Filters update instantly.

---

# FAVORITES

Allow users to:

- Save favorite exercises
- Create custom routines
- Duplicate sessions

---

# COACH FEATURES

Coach can:

- Update workouts remotely
- Add comments
- Attach videos
- Lock or unlock sessions

Changes sync in real time.

---

# MOTION

Framer Motion:

- Fade Up
- Card Scale
- Expand/Collapse
- Smooth list reordering

Hover:

- Lift 4px
- Glass highlight
- Violet border glow

---

# RESPONSIVE

Desktop:
3-panel layout.

Tablet:
2-panel layout.

Mobile:
Stacked cards with sticky action bar.

---

# ACCESSIBILITY

Keyboard navigation.

Screen reader labels.

Large touch targets.

Reduced motion support.

---

# PERFORMANCE

Lazy-load videos.

Virtualize long exercise lists.

Cache workout data.

Avoid layout shifts.

---

# FINAL REQUIREMENT

The workout experience should feel like a premium training operating system rather than a simple exercise list.

Every interaction should motivate the user to complete the session with maximum clarity and minimal friction.



---

# Source: 03 - Dashboard/04-Nutrition.md


# DISCIPLINE
# Volume 3 — 04-Nutrition.md

## OBJECTIVE

Design a premium nutrition management system that feels like a combination of Apple Health, WHOOP and MyFitnessPal, while remaining elegant and minimal.

Nutrition should never feel restrictive. The interface should educate, guide and adapt.

---

# PAGE STRUCTURE

Desktop Layout

- Left Sidebar: Navigation
- Center: Daily Nutrition
- Right Panel: Coach Insights & Weekly Summary

Tablet

- Two-column adaptive layout

Mobile

- Single column
- Sticky action bar

---

# HOME DASHBOARD

Display at the top:

- Daily calorie target
- Calories consumed
- Remaining calories
- Protein
- Carbohydrates
- Fat
- Fiber
- Water intake

All metrics displayed in Liquid Glass statistic cards.

---

# DAILY MEALS

Sections:

- Breakfast
- Lunch
- Dinner
- Snacks

Each meal card contains:

- Meal name
- Time
- Calories
- Macronutrients
- Ingredients
- Preparation time
- Photo
- Coach notes

---

# MEAL DETAILS

Each meal opens a detailed panel.

Display:

- Ingredient list
- Quantities
- Preparation steps
- Nutrition facts
- Allergens
- Substitutions
- Shopping list integration

---

# FOOD SEARCH

Instant search.

Support:

- Manual search
- Barcode scanning
- Favorites
- Recent foods
- Custom foods

Results update live.

---

# MACRO TRACKING

Interactive circular charts.

Display:

- Current intake
- Daily target
- Remaining amount

Animate values smoothly.

---

# WATER TRACKER

Quick buttons:

+250ml
+500ml
+750ml
+1L

Animated bottle fills throughout the day.

---

# SHOPPING LIST

Automatically generated.

Grouped by category:

- Proteins
- Vegetables
- Fruits
- Dairy
- Grains
- Drinks
- Miscellaneous

Allow check-off while shopping.

---

# COACH FEATURES

Coach can:

- Modify calories
- Change macros
- Replace meals
- Add comments
- Schedule refeed days
- Schedule diet breaks

Changes sync instantly.

---

# RECIPES

Premium recipe cards.

Display:

- Difficulty
- Cooking time
- Calories
- Protein
- Rating
- Save button

Hover:

- Glass highlight
- Soft scale animation

---

# PROGRESS ANALYTICS

Weekly graphs:

- Calories
- Protein
- Weight trend
- Meal adherence
- Water intake

Charts animate when entering viewport.

---

# NOTIFICATIONS

Examples:

- Time to eat lunch.
- Drink water.
- Coach updated your plan.
- Weekly check-in available.

---

# MOTION

Framer Motion:

- Fade Up
- Card reveal
- Blur transition
- Staggered loading
- Progress bar animations

Hover:

- Lift 3px
- Violet glow
- Glass reflection

---

# RESPONSIVE

Desktop:
Three-column workspace.

Tablet:
Two columns.

Mobile:
Single-column with collapsible sections.

---

# ACCESSIBILITY

Large touch targets.

Keyboard navigation.

ARIA labels.

Reduced motion support.

---

# PERFORMANCE

Lazy-load recipe images.

Cache meal data.

Virtualize food search.

Prevent unnecessary re-renders.

---

# FINAL REQUIREMENT

The nutrition module should feel like a premium health application.

The interface must encourage consistency through clarity, beautiful visuals and meaningful feedback instead of overwhelming the user.



---

# Source: 03 - Dashboard/05-Progress.md


# DISCIPLINE
# Volume 3 — 05-Progress.md

## OBJECTIVE

Create a premium progress tracking experience that motivates long-term consistency through beautiful data visualization, timeline storytelling and measurable results.

The Progress module should feel closer to Apple Health and WHOOP than a spreadsheet.

---

# PAGE STRUCTURE

Desktop

- Left: Progress navigation
- Center: Timeline and analytics
- Right: Coach insights

Tablet

- Two-column layout

Mobile

- Single column with sticky filters

---

# HEADER

Display:

- Current goal
- Current weight
- Days in program
- Adherence score
- Weekly completion

Primary actions:

- Add Progress Photo
- Log Measurements
- Weekly Check-in

---

# PROGRESS TIMELINE

Chronological timeline showing:

- Photos
- Weight updates
- Measurements
- Coach comments
- Milestones
- PR achievements

Each entry is displayed inside a Liquid Glass card.

---

# PHOTOS

Support:

- Front
- Side
- Back
- Optional custom angles

Features:

- Drag & drop upload
- Automatic date
- Tags
- Notes

Comparison Mode:

- Side-by-side
- Overlay slider
- Monthly comparison
- Custom date comparison

---

# BODY MEASUREMENTS

Track:

- Weight
- Body fat %
- Chest
- Waist
- Hips
- Arms
- Thighs
- Neck
- Calves

Interactive charts for every metric.

---

# ANALYTICS

Display:

- Weight trend
- Weekly average
- Monthly average
- Goal projection
- Adherence score
- Training consistency
- Nutrition consistency

Charts animate smoothly on load.

---

# MILESTONES

Automatic achievements:

- First workout
- 30-day streak
- 5 kg lost
- Personal records
- Program completion

Celebrate with subtle animations.

---

# COACH FEEDBACK

Coach can:

- Comment on photos
- Approve check-ins
- Leave voice notes
- Highlight improvements
- Recommend adjustments

---

# WEEKLY CHECK-IN

Form includes:

- Energy
- Sleep quality
- Stress
- Hunger
- Motivation
- Recovery
- Notes

Coach receives structured report.

---

# EXPORT

Allow export as:

- PDF report
- CSV
- Image summary

---

# MOTION

Framer Motion:

- Timeline reveal
- Counter animations
- Chart fade-in
- Image zoom
- Glass hover
- Smooth page transitions

Durations:

200–600ms

---

# RESPONSIVE

Desktop:
Three-panel workspace.

Tablet:
Two panels.

Mobile:
Stacked cards with sticky filter bar.

---

# ACCESSIBILITY

Keyboard navigation.

High contrast mode support.

ARIA labels.

Reduced motion support.

---

# PERFORMANCE

Lazy-load images.

Optimize uploads.

Virtualize long timelines.

Cache analytics.

---

# FINAL REQUIREMENT

The Progress module must make transformation tangible.

Users should instantly understand how far they have come and feel encouraged to continue through elegant visual storytelling and meaningful insights.



---

# Source: 03 - Dashboard/06-Subscriptions.md


# DISCIPLINE
# Volume 3 — 06-Subscriptions.md

## OBJECTIVE

Design a premium subscription management experience that is transparent, elegant and frictionless.

Members should always understand:
- their current plan
- next billing date
- included services
- payment status
- upgrade possibilities

The experience should resemble Stripe Billing, Apple Subscriptions and Linear rather than a traditional billing portal.

---

# AVAILABLE PLANS

## START

Monthly subscription.

Includes:

- Personalized training program
- Nutrition guidelines
- Monthly program adjustment
- Progress tracking
- Member dashboard

---

## PRO

Everything in START plus:

- Weekly adjustments
- Priority messaging
- Video technique analysis
- Weekly check-in review
- Faster response times

---

## ELITE

Everything in PRO plus:

- Weekly coaching call
- Unlimited messaging
- Long-term strategy
- Priority scheduling
- Advanced analytics
- Custom periodization

---

# BILLING PAGE

Top summary card displays:

- Current plan
- Monthly price
- Renewal date
- Subscription status
- Payment method

Primary actions:

- Upgrade Plan
- Manage Payment
- Cancel Subscription

---

# PLAN COMPARISON

Interactive comparison table.

Compare:

- Features
- Response times
- Calls included
- Priority support
- Analytics
- Video reviews

Current plan highlighted using pastel violet.

---

# UPGRADE FLOW

User selects a higher plan.

Display:

- Price difference
- Immediate cost
- Next billing amount
- Effective date

Confirmation dialog before purchase.

---

# DOWNGRADE FLOW

Warn user about features that will be removed.

Changes apply on the next renewal unless configured otherwise.

---

# CANCELLATION

Before cancellation:

- Ask for feedback
- Offer pause option
- Explain remaining access

Confirmation screen:

"Your subscription remains active until the current billing period ends."

---

# PAUSE SUBSCRIPTION

Optional feature.

Allow:

- 1 month
- 2 months
- 3 months

Display reactivation date.

---

# PAYMENT METHODS

Support:

- Visa
- Mastercard
- American Express
- Apple Pay
- Google Pay

Allow:

- Add
- Remove
- Replace
- Set default

---

# BILLING HISTORY

Display:

- Invoice number
- Date
- Amount
- Status
- Download PDF

Search and filters included.

---

# FAILED PAYMENTS

If payment fails:

- Notify user
- Retry automatically
- Update payment method
- Contact support

Use friendly messaging.

---

# AUTOMATED EMAILS

Generate emails for:

- New subscription
- Renewal reminder
- Successful payment
- Failed payment
- Cancellation
- Upgrade
- Downgrade
- Trial ending

---

# COACH VIEW

Coach dashboard shows:

- Active plan
- Renewal date
- Billing status
- Client tier

No sensitive payment details visible.

---

# MOTION

Framer Motion:

- Card reveal
- Price counter animation
- Smooth modal transitions
- Hover glow
- Success check animation

Duration:

200–500ms

---

# RESPONSIVE

Desktop:
Comparison table and billing summary side by side.

Tablet:
Stacked sections.

Mobile:
Cards with accordion comparisons.

---

# ACCESSIBILITY

Keyboard support.

Screen reader labels.

Visible focus states.

Reduced motion option.

---

# PERFORMANCE

Lazy-load invoices.

Cache billing history.

Optimize subscription requests.

---

# FINAL REQUIREMENT

Managing a subscription should feel effortless.

The interface must inspire trust, clearly communicate billing information and encourage upgrades through transparency instead of aggressive marketing.



---

# Source: 03 - Dashboard/07-Stripe.md


# DISCIPLINE
# Volume 3 — 07-Stripe.md

## OBJECTIVE

Implement a production-ready Stripe integration that powers the DISCIPLINE platform.

The payment experience must feel invisible, premium and trustworthy.

Use Stripe Checkout, Customer Portal and Webhooks.

---

# PRODUCTS

Create three recurring monthly products:

- START
- PRO
- ELITE

Each product has:

- Monthly price
- Description
- Features
- Billing interval
- Metadata

Future-ready for yearly billing.

---

# CHECKOUT

Use Stripe Checkout.

Flow:

1. User selects a plan.
2. Summary modal appears.
3. Display:
   - Plan
   - Monthly price
   - Taxes
   - Total
4. Redirect to Stripe Checkout.
5. Return to success page.

Cancel route returns user safely.

---

# SUCCESS PAGE

Display:

- Welcome message
- Active plan
- Billing date
- Dashboard CTA

Celebrate using a subtle success animation.

---

# CUSTOMER PORTAL

Allow members to:

- Change payment method
- Download invoices
- Upgrade plan
- Cancel subscription
- View billing history

Always open the official Stripe Customer Portal.

---

# WEBHOOKS

Handle events:

- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed
- charge.refunded

Verify webhook signatures.

Never trust client-side events.

---

# DATABASE SYNCHRONIZATION

Persist:

- Stripe Customer ID
- Subscription ID
- Product ID
- Price ID
- Current status
- Renewal date

Synchronize exclusively through webhooks.

---

# SUBSCRIPTION STATES

Supported:

- Trialing
- Active
- Past Due
- Unpaid
- Canceled
- Incomplete

Display user-friendly status badges.

---

# REFUNDS

Admin interface supports:

- Full refund
- Partial refund

Log every refund.

Notify the customer by email.

---

# TAXES

Support:

- VAT
- Regional tax rules
- Stripe Tax (optional)

Display tax breakdown before payment.

---

# SECURITY

Use:

- HTTPS
- Secure server actions
- Secret keys only on server
- Environment variables
- Idempotency keys

Never expose private keys.

---

# EMAIL AUTOMATION

Trigger emails after:

- Successful purchase
- Renewal
- Failed payment
- Refund
- Cancellation
- Plan change

Include invoice links.

---

# ADMIN FEATURES

Admin dashboard displays:

- Monthly recurring revenue
- Active subscribers
- Churn
- Failed payments
- Refund history

Charts update automatically.

---

# ERROR HANDLING

Gracefully handle:

- Network failures
- Declined cards
- Expired cards
- Duplicate requests

Provide clear recovery actions.

---

# MOTION

Animations:

- Checkout modal reveal
- Success check animation
- Billing card hover
- Loading skeletons

200–400 ms duration.

---

# RESPONSIVE

Desktop:
Billing dashboard.

Tablet:
Adaptive cards.

Mobile:
Single-column workflow.

---

# PERFORMANCE

Lazy-load billing history.

Cache subscription state.

Minimize API requests.

---

# FINAL REQUIREMENT

Stripe integration must be production-ready, secure, transparent and delightful.

Users should complete payments with confidence while administrators have complete visibility into subscription lifecycle and revenue.



---

# Source: 03 - Dashboard/08-Notifications.md


# DISCIPLINE
# Volume 3 — 08-Notifications.md

## OBJECTIVE

Build a centralized notification system that keeps members engaged without overwhelming them.

Notifications should feel timely, helpful and premium.

Every notification must encourage action or reinforce progress.

---

# NOTIFICATION TYPES

## Coaching

- New coach message
- Workout updated
- Nutrition updated
- Weekly feedback available
- New habit assigned

---

## Workout

- Workout reminder
- Missed workout
- Personal record achieved
- Recovery day reminder

---

## Nutrition

- Meal reminder
- Water reminder
- Macro target reached
- Grocery list updated

---

## Progress

- Weekly check-in available
- Progress photo reminder
- Measurement reminder
- Monthly report generated

---

## Billing

- Upcoming renewal
- Payment successful
- Payment failed
- Subscription paused
- Subscription cancelled
- Plan upgraded

---

# DELIVERY CHANNELS

Support:

- In-app notifications
- Email
- Push notifications (future)
- SMS (optional future)

Users choose preferred channels.

---

# NOTIFICATION CENTER

Accessible from the top navigation.

Display:

- Unread count
- Categories
- Date
- Priority
- Action button

Actions:

- Mark as read
- Mark all as read
- Archive
- Delete

---

# PRIORITY LEVELS

Low
Medium
High
Critical

Critical examples:

- Failed payment
- Account security alert

---

# PREFERENCES

User controls:

- Email frequency
- Push notifications
- Workout reminders
- Nutrition reminders
- Marketing emails
- Weekly reports

Changes save instantly.

---

# AUTOMATION RULES

Examples:

- Notify if no workout completed for 3 days.
- Send hydration reminder every afternoon.
- Send weekly summary every Sunday.
- Notify coach when a client submits a check-in.
- Congratulate users after milestones.

---

# WEEKLY REPORT

Automatically generate:

- Workout completion %
- Nutrition adherence
- Weight change
- Habit score
- Coach comments
- Next week's focus

---

# REAL-TIME EVENTS

Use real-time updates for:

- Coach messages
- Plan updates
- Subscription changes
- Check-in responses

---

# ADMIN PANEL

Admins can:

- Broadcast announcements
- Schedule campaigns
- Monitor delivery status
- View open rates

---

# MOTION

Animations:

- Slide-in toast
- Notification bell pulse
- Badge counter animation
- Dismiss swipe
- Fade transitions

Duration:

180–350ms

---

# RESPONSIVE

Desktop:

Right-side notification panel.

Tablet:

Overlay drawer.

Mobile:

Bottom sheet.

---

# ACCESSIBILITY

Screen reader announcements.

Keyboard shortcuts.

Visible focus.

Reduced motion support.

---

# PERFORMANCE

Virtualize long notification lists.

Lazy-load history.

Debounce polling.

Cache unread count.

---

# FINAL REQUIREMENT

Notifications must help users stay consistent while preserving a calm, premium experience.

Avoid spam.

Every notification should have a clear purpose and an obvious action.



---

# Source: 04 - Components/01-Architecture.md


# DISCIPLINE
# Volume 4 — 01-Architecture.md

---

# OBJECTIVE

Design a scalable, production-ready architecture for the DISCIPLINE platform.

The architecture must prioritize:

- Scalability
- Maintainability
- Performance
- Type Safety
- Developer Experience
- Security

The project must feel like software developed by a world-class engineering team.

---

# TECH STACK

## Framework
- Next.js 15
- React 18
- TypeScript

## Styling
- Tailwind CSS
- CSS Variables
- Shadcn UI

## Animation
- Framer Motion
- GSAP
- Lenis

## Authentication
- Better Auth or Auth.js
- Secure HTTP Cookies
- OAuth
- Email Authentication

## Database
- PostgreSQL

## ORM
- Prisma

## Payments
- Stripe

## Storage
- Cloudflare R2 (S3 Compatible)

## Emails
- React Email
- Resend

## Validation
- Zod

## Forms
- React Hook Form

## Charts
- Tremor
- Recharts

## Deployment
- Vercel

## Monitoring
- Sentry

## Analytics
- PostHog

---

# ARCHITECTURE PRINCIPLES

- Feature Driven Architecture
- Component Driven Development
- Server-First Rendering
- Type-safe APIs
- Reusable UI
- Strict separation of UI, business logic, services and persistence.

Business logic must never live inside UI components.

---

# PROJECT STRUCTURE

```text
discipline/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
├── components/
├── features/
├── services/
├── hooks/
├── lib/
├── providers/
├── animations/
├── emails/
├── prisma/
├── public/
├── styles/
├── tests/
└── types/
```

---

# APP ROUTER

Use App Router exclusively.

Separate layouts for:

- Marketing
- Authentication
- Dashboard
- API

---

# COMPONENT RULES

Use Atomic Design.

```
components/
  ui/
  layout/
  shared/
  charts/
  forms/
```

Feature-specific components belong inside:

```
features/training/components
features/nutrition/components
features/progress/components
```

---

# STATE MANAGEMENT

Prefer Server Components.

Use Context only for:

- Authentication
- Theme
- Notifications

Avoid unnecessary client state.

---

# SERVICES

```
services/
  stripe/
  auth/
  nutrition/
  workout/
  progress/
  email/
```

---

# DATABASE ENTITIES

- User
- Coach
- Subscription
- Workout
- Exercise
- NutritionPlan
- Meal
- ProgressEntry
- ProgressPhoto
- Invoice
- Notification
- Message

All entities use UUID.

---

# SECURITY

- HTTPS
- Secure Cookies
- CSP
- CSRF protection
- XSS protection
- Rate limiting
- Server-side validation with Zod

---

# PERFORMANCE

- Server Components by default
- Streaming
- Dynamic imports
- Lazy loading
- Optimized images
- Query caching

---

# TESTING

- Unit Tests
- Integration Tests
- End-to-End Tests
- Accessibility Tests
- Visual Regression

---

# DEPLOYMENT

- Vercel
- Preview deployments
- Automatic migrations
- Rollback strategy
- Environment isolation

---

# FINAL REQUIREMENTS

The architecture must support:

- 10,000+ users
- Multiple coaches
- Monthly subscriptions
- Future mobile applications
- AI integrations
- Multi-language support

Maintain a clean, modular and scalable codebase.



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

# Source: 04 - Components/03-API.md


# DISCIPLINE
# Volume 4 — 03-API.md

## OBJECTIVE

Design a secure, scalable and type-safe backend API architecture for the DISCIPLINE platform.

The API must support the marketing website, member dashboard, coach portal and future mobile applications.

---

# API PHILOSOPHY

- Server-first architecture
- Type-safe contracts
- Predictable responses
- Stateless requests
- Secure by default
- Business logic isolated in services

---

# TECHNOLOGY

- Next.js App Router
- Server Actions
- Route Handlers
- Prisma
- PostgreSQL
- Zod
- Stripe SDK
- Better Auth / Auth.js

---

# RESPONSE FORMAT

Every endpoint returns:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {}
}
```

Errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is invalid."
  }
}
```

---

# AUTHENTICATION

Protected endpoints require authenticated sessions.

Roles:

- Member
- Coach
- Admin

Authorization middleware validates every request.

---

# ROUTE GROUPS

## Authentication

POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password

---

## Users

GET /api/users/me
PATCH /api/users/me

---

## Workouts

GET /api/workouts
GET /api/workouts/:id
POST /api/workouts/log
PATCH /api/workouts/:id

---

## Nutrition

GET /api/nutrition
PATCH /api/nutrition

---

## Progress

GET /api/progress
POST /api/progress/photos
POST /api/progress/check-in

---

## Subscriptions

GET /api/subscriptions
POST /api/subscriptions/create
PATCH /api/subscriptions/change
DELETE /api/subscriptions/cancel

---

## Notifications

GET /api/notifications
PATCH /api/notifications/read

---

# SERVER ACTIONS

Use Server Actions for:

- Profile updates
- Check-ins
- Workout logs
- Nutrition updates
- Photo uploads
- Subscription changes

Avoid unnecessary REST endpoints.

---

# VALIDATION

Validate all input with Zod.

Never trust client-side validation.

Return structured validation errors.

---

# ERROR HANDLING

Standard HTTP status codes:

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

---

# FILE UPLOADS

Support:

- Progress photos
- Coach documents
- Profile pictures

Store files in Cloudflare R2.

Generate signed upload URLs.

---

# STRIPE WEBHOOKS

Handle:

- checkout.session.completed
- invoice.paid
- invoice.payment_failed
- customer.subscription.updated
- customer.subscription.deleted

Verify webhook signatures before processing.

---

# LOGGING

Log:

- Authentication
- Payments
- Upload failures
- API errors
- Critical events

Integrate Sentry.

---

# RATE LIMITING

Protect:

- Authentication
- Password reset
- Upload endpoints
- Public contact forms

---

# VERSIONING

Namespace future API versions:

/api/v1

Future-ready:

/api/v2

---

# DOCUMENTATION

Generate OpenAPI specification.

Expose Swagger only in development.

---

# TESTING

- Unit tests
- Integration tests
- API contract tests
- Load tests

---

# PERFORMANCE

- Cursor pagination
- Database indexes
- Request caching
- Optimized Prisma queries
- Compression
- Streaming where appropriate

---

# FINAL REQUIREMENTS

The API must remain secure, maintainable and scalable.

It should support future mobile clients, AI integrations and third-party services without major architectural changes.



---

# Source: 04 - Components/04-Database.md


# DISCIPLINE
# Volume 4 — 04-Database.md

## OBJECTIVE

Design a scalable PostgreSQL database supporting the entire DISCIPLINE ecosystem.

The database must support:

- Marketing website
- Member application
- Coach portal
- Administration
- Billing
- Analytics
- Future AI features

Use PostgreSQL with Prisma ORM.

---

# DESIGN PRINCIPLES

- UUID primary keys
- Foreign key constraints
- Normalized schema
- Soft delete when appropriate
- Automatic timestamps
- Optimized indexes
- ACID transactions

---

# CORE TABLES

## User

Fields

- id
- email
- passwordHash
- firstName
- lastName
- avatar
- language
- timezone
- role
- status
- createdAt
- updatedAt

Relations

- One Subscription
- Many CheckIns
- Many ProgressEntries
- Many WorkoutSessions
- Many Notifications

---

## Coach

Fields

- id
- bio
- specialties
- instagram
- calendarLink

Relations

- Many Users

---

## Subscription

Fields

- stripeCustomerId
- stripeSubscriptionId
- plan
- status
- renewalDate
- cancelAtPeriodEnd
- createdAt

Indexes

- stripeCustomerId
- status

---

## WorkoutProgram

Contains

- name
- description
- phase
- durationWeeks
- coachId

Relations

- Many WorkoutDays

---

## WorkoutDay

- weekday
- objective
- estimatedDuration

Relations

- Many Exercises

---

## Exercise

Fields

- name
- videoUrl
- thumbnail
- equipment
- difficulty
- instructions
- tempo
- restSeconds

---

## WorkoutSession

Stores completed workouts.

Fields

- userId
- date
- duration
- calories
- completed

---

## ExerciseLog

Stores:

- weight
- reps
- RIR
- notes

Composite index:

(userId, exerciseId, createdAt)

---

## NutritionPlan

Fields

- calories
- protein
- carbs
- fat
- fiber
- coachId

---

## Meal

Fields

- name
- mealType
- calories
- protein
- carbs
- fat

---

## Food

Reusable food database.

Fields

- barcode
- brand
- servingSize
- calories
- macros

---

## ProgressEntry

Fields

- weight
- bodyFat
- waist
- chest
- arms
- thighs
- notes

---

## ProgressPhoto

Fields

- userId
- angle
- imageUrl
- createdAt

---

## CheckIn

Weekly review.

Fields

- energy
- sleep
- stress
- hunger
- motivation
- comments

---

## Notification

Fields

- title
- body
- type
- priority
- read
- deliveredAt

---

## Message

Coach messaging.

Fields

- senderId
- receiverId
- content
- attachmentUrl

---

## Invoice

Fields

- stripeInvoiceId
- amount
- currency
- pdfUrl
- paidAt

---

# RELATIONSHIPS

User
 ├── Subscription
 ├── WorkoutSession
 ├── ProgressEntry
 ├── ProgressPhoto
 ├── CheckIn
 ├── Notification
 └── Message

Coach
 ├── WorkoutProgram
 ├── NutritionPlan
 └── Users

---

# INDEX STRATEGY

Create indexes for:

- email
- role
- stripeCustomerId
- stripeSubscriptionId
- createdAt
- userId
- coachId
- status

Composite indexes:

(userId, createdAt)

(subscriptionId, status)

---

# SOFT DELETE

Apply soft delete to:

- Users
- Programs
- Meals
- Messages

Use:

deletedAt

Never physically delete production data by default.

---

# MIGRATIONS

Use Prisma Migrate.

Rules:

- One migration per feature
- Never edit applied migrations
- Seed development database
- Review SQL before deployment

---

# BACKUPS

Daily automatic backup.

Weekly snapshot.

30-day retention.

Encrypted storage.

Quarterly restore test.

---

# SECURITY

Encrypt sensitive data.

Hash passwords using Argon2.

Store secrets outside the database.

Restrict direct production access.

Audit privileged actions.

---

# PERFORMANCE

Use connection pooling.

Optimize joins.

Avoid N+1 queries.

Paginate large datasets.

Cache frequently requested data.

---

# FUTURE TABLES

Reserve architecture for:

- AI recommendations
- Wearable integrations
- Challenges
- Leaderboards
- Courses
- Community
- Mobile push tokens

---

# FINAL REQUIREMENTS

The schema must remain modular, highly normalized and capable of supporting tens of thousands of members while keeping queries fast, maintainable and easy to evolve.



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

# Source: 04 - Components/06-SEO.md


# DISCIPLINE
# Volume 4 — 06-SEO.md

## OBJECTIVE

Design a complete SEO strategy that allows DISCIPLINE to rank for premium coaching, fitness, nutrition and body transformation searches while maintaining a world-class user experience.

SEO must be integrated into the architecture from day one.

---

# SEO PHILOSOPHY

Focus on:

- Helpful content
- Technical excellence
- Fast performance
- Semantic HTML
- Strong internal linking
- High-quality backlinks
- User intent

Avoid keyword stuffing.

---

# URL STRUCTURE

Examples:

/

 /about

 /coaching

 /pricing

 /blog

 /contact

 /login

 /dashboard

Blog:

/blog/how-to-build-muscle

/blog/fat-loss-guide

/blog/protein-complete-guide

Use lowercase URLs with hyphens.

---

# METADATA

Every page includes:

- Title
- Meta description
- Canonical URL
- Open Graph
- Twitter Card
- Robots directives

Generate metadata dynamically with Next.js Metadata API.

---

# TITLE RULES

Length:

50–60 characters.

Format:

Primary Keyword | DISCIPLINE

Example:

Online Fitness Coaching | DISCIPLINE

---

# META DESCRIPTION

Length:

140–160 characters.

Describe value clearly.

Include CTA naturally.

---

# OPEN GRAPH

Generate:

- Title
- Description
- Image
- URL
- Type
- Site Name

Dedicated OG image for every article and landing page.

---

# SCHEMA.ORG

Implement structured data for:

- Organization
- Person
- Article
- FAQ
- Breadcrumb
- Product
- Review
- WebSite

Generate JSON-LD server-side.

---

# XML SITEMAP

Automatically generate:

- Pages
- Blog posts
- Categories

Exclude:

- Dashboard
- Authentication
- Admin

Update on deployment.

---

# ROBOTS.TXT

Allow indexing of public pages.

Block:

- /dashboard
- /api
- /admin
- /login
- /register

Reference sitemap location.

---

# BLOG STRATEGY

Categories:

- Training
- Nutrition
- Recovery
- Mindset
- Science
- Habits

Every article contains:

- TOC
- Internal links
- FAQ
- References
- CTA

---

# INTERNAL LINKING

Every page links naturally to:

- Coaching
- Pricing
- Blog
- Contact

Every article links to related articles.

---

# INTERNATIONALIZATION

Prepare for:

- English
- French
- Spanish

Implement hreflang tags.

Localized metadata.

---

# IMAGE SEO

Every image:

- Descriptive filename
- Alt text
- Responsive sizes
- Optimized format
- Lazy loading

---

# PERFORMANCE & SEO

Maintain:

- Lighthouse SEO > 95
- Core Web Vitals in green
- Mobile-first indexing
- Accessible markup

---

# ANALYTICS

Integrate:

- Google Search Console
- Bing Webmaster Tools
- Google Analytics / PostHog
- Vercel Analytics

Track:

- Organic traffic
- CTR
- Rankings
- Conversions

---

# TECHNICAL CHECKLIST

- Canonical URLs
- No duplicate content
- Clean redirects
- 404 page
- 301 redirects
- HTTPS
- Structured headings
- Semantic HTML

---

# FINAL REQUIREMENTS

DISCIPLINE should be positioned as an authority in evidence-based coaching.

Every public page should be optimized for both users and search engines while preserving the premium visual identity and loading performance.



---

# Source: 04 - Components/07-Accessibility.md


# DISCIPLINE
# Volume 4 — 07-Accessibility.md

## OBJECTIVE

Build DISCIPLINE to meet WCAG 2.2 AA accessibility standards without compromising the premium visual experience.

Accessibility is a core product requirement, not an afterthought.

---

# PRINCIPLES

The platform must be:

- Perceivable
- Operable
- Understandable
- Robust

Every feature should be usable by keyboard, screen readers and assistive technologies.

---

# SEMANTIC HTML

Use semantic elements whenever possible:

- header
- nav
- main
- section
- article
- aside
- footer
- button
- form
- label

Avoid generic divs where semantic elements exist.

---

# KEYBOARD NAVIGATION

Support:

- Tab navigation
- Shift+Tab
- Enter
- Space
- Escape
- Arrow keys where appropriate

Every interactive component must be reachable without a mouse.

---

# FOCUS MANAGEMENT

Visible focus ring on all interactive elements.

Focus must:

- Never be removed
- Have sufficient contrast
- Remain visible on glass components

Restore focus after closing dialogs.

Trap focus inside open modals.

---

# SCREEN READERS

Provide:

- aria-label
- aria-labelledby
- aria-describedby

Mark decorative images as aria-hidden.

Use descriptive labels for icons.

Announce dynamic updates using aria-live.

---

# FORMS

Each input requires:

- Associated label
- Helper text
- Error message
- Required indicator

Validation errors should be announced to assistive technology.

---

# COLOR & CONTRAST

Meet WCAG AA contrast ratios.

Do not rely on color alone.

Support:

- Error
- Warning
- Success
- Information

with icon + text.

---

# MOTION

Respect prefers-reduced-motion.

Disable:

- Parallax
- Large transitions
- Continuous animations

Keep essential UI feedback.

---

# MEDIA

Every video includes:

- Captions
- Poster image
- Keyboard controls

Images require descriptive alt text.

---

# TOUCH TARGETS

Minimum size:

44px × 44px

Spacing prevents accidental taps.

---

# RESPONSIVE ACCESSIBILITY

Desktop, tablet and mobile must all preserve:

- Readability
- Touch usability
- Keyboard support (external keyboards)

---

# ERROR PREVENTION

Confirmation dialogs for destructive actions.

Autosave where appropriate.

Undo actions when possible.

---

# TESTING

Audit with:

- Lighthouse
- axe DevTools
- NVDA
- VoiceOver
- Keyboard-only testing

Review every release.

---

# DOCUMENTATION

Maintain an accessibility checklist.

Document all exceptions.

Review new components before release.

---

# FINAL REQUIREMENTS

DISCIPLINE should provide an inclusive experience for all users while preserving its premium Apple-inspired design language.

Accessibility requirements are mandatory for every component, page and future feature.



---

# Source: 04 - Components/08-Production-Checklist.md


# DISCIPLINE
# Volume 4 — 08-Production-Checklist.md

## OBJECTIVE

This checklist defines every requirement that must be validated before deploying DISCIPLINE to production.

No production deployment should occur unless every critical item has been reviewed and approved.

---

# PRE-DEPLOYMENT

## Source Control

- All changes merged into the production branch
- Pull request approved
- No unresolved merge conflicts
- Version tagged

---

## Code Quality

- TypeScript passes with zero errors
- ESLint passes
- Prettier formatting applied
- No TODO or FIXME left in production code
- No unused imports
- No console.log statements

---

# SECURITY

- HTTPS enforced
- Environment variables validated
- Secrets stored securely
- CSP configured
- CSRF protection enabled
- Rate limiting active
- Authentication tested
- Authorization tested
- Password hashing verified
- Stripe webhook signature verification enabled

---

# DATABASE

- Prisma migrations applied
- Backup completed
- Restore test verified
- Indexes reviewed
- Foreign keys validated
- Seed data removed from production

---

# PERFORMANCE

- Lighthouse Performance ≥ 95
- Core Web Vitals in green
- Images optimized
- Videos compressed
- Bundle analyzed
- Dynamic imports verified
- Lazy loading validated

---

# ACCESSIBILITY

- WCAG 2.2 AA review
- Keyboard navigation complete
- Focus indicators visible
- Screen reader verification
- Color contrast compliant
- Reduced motion supported

---

# SEO

- Metadata complete
- Canonical URLs
- XML sitemap generated
- robots.txt verified
- JSON-LD schemas valid
- Open Graph images generated
- 404 page configured
- Redirects tested

---

# PAYMENTS

- Stripe Checkout tested
- Customer Portal tested
- Webhooks verified
- Invoice generation tested
- Refund workflow tested
- Subscription upgrade/downgrade tested

---

# EMAILS

Verify:

- Welcome email
- Verification email
- Password reset
- Payment confirmation
- Renewal reminder
- Failed payment
- Weekly report

---

# DASHBOARD QA

Validate:

- Authentication
- Workout tracking
- Nutrition logging
- Progress uploads
- Notifications
- Billing
- Settings

Desktop, tablet and mobile.

---

# RESPONSIVE

Test widths:

- 360px
- 390px
- 768px
- 1024px
- 1440px
- 1920px

Verify spacing, typography and interactions.

---

# BROWSER SUPPORT

Latest versions of:

- Chrome
- Edge
- Firefox
- Safari

Mobile:

- iOS Safari
- Chrome Android

---

# ANALYTICS

Verify:

- PostHog events
- Vercel Analytics
- Sentry errors
- Search Console
- Cookie consent

---

# MONITORING

Production monitoring enabled:

- API latency
- Database performance
- Failed logins
- Failed payments
- Error rate
- Uptime alerts

---

# BACKUP & RECOVERY

- Daily backups scheduled
- Weekly snapshots
- Recovery documentation updated
- Disaster recovery tested

---

# RELEASE PROCESS

1. Freeze release
2. Final QA
3. Deploy
4. Run smoke tests
5. Verify monitoring
6. Announce release
7. Monitor for 24 hours

---

# POST-LAUNCH

Review:

- Core Web Vitals
- Conversion rate
- Checkout completion
- User feedback
- Error logs
- Performance regressions

Prioritize fixes before adding new features.

---

# FINAL APPROVAL

Deployment is approved only if:

- Engineering approves
- Design approves
- QA approves
- Security checks pass
- Payments work
- Backups verified
- Monitoring active

DISCIPLINE should launch only when every checklist item has been successfully completed.



---

# Source: 05 - Motion Design System/Volume5-01-Motion-Design-System.md


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

# Source: 05 - Motion Design System/Volume5-03-Scroll-System.md


# DISCIPLINE
# Volume 5 — 03-Scroll-System.md

## OBJECTIVE

Create a cinematic scrolling experience that feels fluid, intentional and premium.

Scrolling should become part of the storytelling rather than simply moving between sections.

The experience should rival high-end interactive websites while remaining performant.

---

# CORE STACK

Scrolling Engine

- Lenis

Scroll Animation

- GSAP ScrollTrigger

Intersection Detection

- Intersection Observer

Animation

- Framer Motion

---

# GLOBAL SCROLL SETTINGS

Smooth Scroll

Duration:
1.2

Wheel multiplier:
1

Touch multiplier:
1.2

Infinite scroll:
Disabled

Normalize wheel events.

Maintain native accessibility.

---

# SECTION SPACING

Every section occupies visual breathing room.

Minimum:

120px

Large storytelling sections:

200–320px

Alternate rhythm:

Dense → Spacious → Dense

Avoid repetitive spacing.

---

# SCROLL REVEAL SYSTEM

Every reveal uses one of six patterns:

1. Fade Up
2. Fade Left
3. Fade Right
4. Scale In
5. Blur Reveal
6. Clip Reveal

Never repeat the same reveal more than twice consecutively.

---

# PINNED SECTIONS

Use ScrollTrigger pinning for:

- Hero transition
- Coaching comparison
- Dashboard showcase
- Timeline sections
- Before / After comparison

Pinned duration:

100–250vh

Never overuse.

---

# PARALLAX SYSTEM

Background:
2–4%

Midground:
6–8%

Foreground:
10–15%

Glass layers:
Independent movement.

Disable on reduced motion.

---

# HORIZONTAL SCROLL

Used only when storytelling benefits.

Examples:

- Transformation gallery
- Testimonials
- Dashboard features

Convert vertical scroll into horizontal translation.

Provide clear progress indication.

---

# SCROLL PROGRESS

Persistent progress indicator.

Top edge of viewport.

Height:

3px

Accent:

Pastel Violet

Animate width smoothly.

---

# SECTION TRANSITIONS

As a new section enters:

Outgoing:

- Fade slightly
- Reduce scale to 0.99

Incoming:

- Fade in
- TranslateY(40px → 0)
- Blur reduction

Maintain continuity.

---

# HERO HANDOFF

At 15–20% scroll:

- Headline fades
- CTA slides downward
- Background video scales to 1.05
- Next section rises naturally

No snapping.

---

# DASHBOARD STORY

As user scrolls:

Widgets appear sequentially.

Charts draw themselves.

Counters animate once.

Cards float subtly.

---

# IMAGE REVEALS

Technique:

Overflow hidden container.

Image:

Scale 1.08 → 1

Opacity:
0 → 1

Optional clip-path reveal.

---

# TYPOGRAPHY MOTION

Large headings:

Mask reveal.

Paragraphs:

Fade + 24px upward translation.

Statistics:

Animated counters.

---

# MOBILE BEHAVIOR

Reduce:

- Parallax intensity
- Blur animations
- Long pinned sequences

Preserve readability.

Target:

60 FPS.

---

# PERFORMANCE

Animate only:

- transform
- opacity

Avoid:

- width
- height
- top
- left

Use requestAnimationFrame via GSAP.

Destroy ScrollTriggers on route change.

---

# ACCESSIBILITY

Respect:

prefers-reduced-motion

Provide native scrolling fallback.

Never trap keyboard users inside pinned sections.

---

# QA CHECKLIST

- Smooth scroll on desktop
- Native feel on mobile
- No scroll jitter
- No layout shifts
- Scroll restoration between routes
- All triggers cleaned up correctly

---

# FINAL REQUIREMENTS

Scrolling should guide the user's attention through DISCIPLINE like a carefully directed film.

Every transition should feel inevitable, elegant and effortless.



---

# Source: 05 - Motion Design System/Volume5-04-Micro-Interactions.md


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



---

# Source: 05 - Motion Design System/Volume5-05-Loading-Transitions.md


# DISCIPLINE
# Volume 5 — 05-Loading-Transitions.md

## OBJECTIVE

Create a loading and transition system that hides latency while reinforcing the premium identity of DISCIPLINE.

Every state between user action and completed content should feel intentional, smooth and informative.

---

# PHILOSOPHY

Loading is part of the experience.

Never leave users staring at blank screens.

Provide immediate visual feedback.

Maintain perceived performance.

---

# LOADING HIERARCHY

Use four loading levels:

1. Instant (<150 ms)
2. Skeleton (150–800 ms)
3. Progress indicator (800 ms–3 s)
4. Full loading experience (>3 s)

Choose the lightest solution possible.

---

# APPLICATION BOOT

First visit:

- Fade from white
- Display animated DISCIPLINE logo
- Soft background gradient
- Progress indicator
- Hero assets preload
- Transition into landing page

Maximum duration:
2 seconds when possible.

---

# ROUTE TRANSITIONS

Navigation flow:

1. User clicks link
2. Button enters pressed state
3. Thin top progress bar appears
4. Current page fades
5. Next route streams
6. New content reveals
7. Progress bar disappears

Duration:
350–500 ms

---

# SKELETON SYSTEM

Skeletons replace:

- Cards
- Charts
- Profile blocks
- Tables
- Feed items
- Workout cards
- Nutrition cards

Use animated shimmer.

Avoid flashing placeholders.

---

# IMAGE LOADING

Display:

- Blur placeholder
- Dominant color background
- Progressive reveal

Image animation:

Scale:
1.04 → 1

Opacity:
0 → 1

---

# VIDEO LOADING

Before playback:

- Poster image
- Play state indicator
- Buffer animation

Autoplay begins only when ready.

---

# FORM SUBMISSIONS

Immediately after submit:

- Disable button
- Preserve layout
- Replace text with loader
- Display progress state

Success:

- Animated checkmark
- Confirmation message

Failure:

- Friendly recovery guidance

---

# DASHBOARD STREAMING

Load progressively:

1. Layout shell
2. Sidebar
3. Top bar
4. Statistics
5. Charts
6. Activity feed
7. Secondary widgets

Never block the entire dashboard.

---

# EMPTY STATES

Display:

- Minimal illustration
- Helpful explanation
- Primary CTA
- Optional secondary action

Use subtle fade-in animation.

---

# ERROR STATES

Provide:

- Clear title
- Human explanation
- Retry button
- Support link

Avoid technical jargon.

---

# OFFLINE EXPERIENCE

Detect connectivity changes.

Display:

- Offline banner
- Cached content
- Retry when online

Synchronize pending actions automatically.

---

# MODAL TRANSITIONS

Open:

- Background blur
- Fade overlay
- Scale dialog

Close:

- Reverse sequence

Duration:
250 ms

---

# PROGRESS INDICATORS

Support:

- Linear
- Circular
- Stepper
- File upload
- Background sync

Animate continuously.

---

# SUCCESS STATES

Use:

- Soft glow
- Checkmark draw
- Counter update
- Toast notification

Celebrate without exaggeration.

---

# REDUCED MOTION

Respect prefers-reduced-motion.

Replace large transitions with:

- Simple fade
- Instant state changes
- Static placeholders

---

# PERFORMANCE

Preload:

- Critical fonts
- Hero video
- Navigation icons

Lazy-load:

- Charts
- Galleries
- Heavy media
- Secondary widgets

Prevent layout shifts during loading.

---

# QA CHECKLIST

- No blank screens
- Skeletons match final layout
- Route transitions feel continuous
- Loading indicators never freeze
- Offline mode tested
- Success and error flows validated

---

# FINAL REQUIREMENTS

Users should always understand what the application is doing.

Loading and transitions must reduce perceived waiting time while strengthening the DISCIPLINE premium experience.



---

# Source: 05 - Motion Design System/Volume5-06-Advanced-GSAP.md


# DISCIPLINE
# Volume 5 — 06-Advanced-GSAP.md

## OBJECTIVE

Create a reusable GSAP animation architecture for DISCIPLINE.

Animations must deliver cinematic storytelling while remaining modular, performant and easy to maintain.

GSAP is responsible for immersive sequences. Framer Motion handles UI interactions.

---

# GSAP ARCHITECTURE

Organize animations by feature:

animations/
├── hero.ts
├── navbar.ts
├── scroll.ts
├── dashboard.ts
├── cards.ts
├── gallery.ts
├── loader.ts
├── timeline.ts
├── utilities.ts

Each module exports initialization and cleanup methods.

---

# CORE PLUGINS

Required plugins:

- ScrollTrigger
- ScrollToPlugin
- SplitText (or equivalent)
- CustomEase

Register plugins once during application boot.

---

# TIMELINE PRINCIPLES

Every timeline must:

- Be named
- Support reverse()
- Support kill()
- Support refresh()

Avoid anonymous timelines.

---

# HERO TIMELINE

Sequence:

1. Background fade
2. Video reveal
3. Navigation drop
4. Eyebrow text
5. SplitText headline
6. Description
7. CTA buttons
8. Statistics
9. Floating cards
10. Ambient loop

Master timeline duration:
3–5 seconds.

---

# SPLIT TEXT

Animate:

- Lines
- Words
- Characters

Default:

- translateY
- opacity
- clip-path reveal

Never animate all characters simultaneously.

---

# SCROLLTRIGGER

Use for:

- Section reveals
- Pinning
- Progress bars
- Horizontal galleries
- Dashboard storytelling

Always destroy triggers on page unmount.

---

# PARALLAX

Layers:

Background:
2%

Midground:
6%

Foreground:
10%

Mouse interaction:

Desktop only.

---

# CLIP-PATH ANIMATIONS

Supported reveals:

- Vertical wipe
- Horizontal wipe
- Polygon reveal
- Diagonal reveal

Use sparingly for premium storytelling.

---

# LIGHT EFFECTS

Animate:

- Radial gradients
- Glass reflections
- Bloom intensity
- Ambient glow

Cycle:

10–20 seconds.

Loop seamlessly.

---

# GALLERY TIMELINE

Images enter using:

- Scale
- Opacity
- Clip reveal

Hover:

- Subtle zoom
- Glass overlay
- Caption reveal

---

# DASHBOARD

Charts:

- Draw paths
- Count values
- Fade widgets
- Sequential loading

Realtime updates animate only changed values.

---

# PAGE TRANSITIONS

GSAP controls:

- Exit animation
- Shared layout fade
- Blur transition
- Overlay timing

Integrate with Next.js routing.

---

# PERFORMANCE

Use:

- gsap.context()
- requestAnimationFrame
- transform
- opacity

Avoid:

- layout thrashing
- expensive filters
- nested ScrollTriggers

Batch animations where possible.

---

# ACCESSIBILITY

Respect prefers-reduced-motion.

Provide instant fallback.

Animations must never block interaction.

---

# DEBUGGING

Enable markers only in development.

Log timeline lifecycle.

Verify cleanup on route changes.

---

# QA CHECKLIST

- No memory leaks
- Timelines cleaned correctly
- ScrollTrigger refreshed after layout changes
- 60 FPS maintained
- GPU accelerated transforms only
- Animation order consistent

---

# FINAL REQUIREMENTS

GSAP should become the cinematic engine of DISCIPLINE.

Every sequence must reinforce elegance, clarity and premium craftsmanship while remaining maintainable and performant.



---

# Source: 05 - Motion Design System/Volume5-07-Visual-Effects.md


# DISCIPLINE
# Volume 5 — 07-Visual-Effects.md

## OBJECTIVE

Define the visual effects language that gives DISCIPLINE its premium identity.

Effects should create depth, realism and sophistication without becoming distracting.

Every visual effect must support readability and performance.

---

# DESIGN PHILOSOPHY

Visual effects should evoke:

- Precision
- Calm
- Premium craftsmanship
- Modern technology
- Editorial elegance

Avoid excessive neon, excessive glow or gaming aesthetics.

---

# LIQUID GLASS SYSTEM

Glass Cards

Background:

rgba(255,255,255,0.58)

Backdrop Blur:

32px

Border:

rgba(255,255,255,0.60)

Radius:

28px

Shadow:

0 20px 60px rgba(0,0,0,.08)

Hover:

- Increased reflection
- Slight border brightness
- Subtle elevation

---

# REFLECTIONS

Glass reflections move according to:

- Mouse movement
- Card rotation
- Scroll direction

Reflection opacity:

5–12%

Never overpower content.

---

# BLOOM

Use bloom sparingly.

Apply only to:

- CTA buttons
- Accent icons
- Highlighted cards

Glow color:

Pastel Violet (#8B7CFF)

---

# GRAIN

Add subtle procedural grain.

Opacity:

1–3%

Blend mode:

Overlay

Keep static or animate very slowly.

---

# GRADIENTS

Use soft gradients only.

Primary:

Snow White → Off White

Accent:

Pastel Violet → Transparent

Avoid saturated gradients.

---

# DEPTH SYSTEM

Layer hierarchy:

1. Background
2. Video
3. Overlay
4. Glass surfaces
5. Typography
6. Floating elements
7. Cursor

Maintain clear separation.

---

# SHADOW SYSTEM

Use three shadow levels:

Small

Medium

Large

All shadows:

Soft edges.

Low opacity.

No harsh black shadows.

---

# BORDER TREATMENT

Borders:

Semi-transparent.

1px.

Glass surfaces brighten slightly on hover.

---

# ICONOGRAPHY

Use Lucide React icons.

Stroke:

2px

Rounded joins.

Consistent sizing.

---

# NOISE OVERLAY

Optional global texture.

Opacity:

2%

Blend:

Soft Light

Reduce digital flatness.

---

# BACKGROUND EFFECTS

Support:

- Animated radial gradients
- Soft vignette
- Ambient light sweep
- Subtle parallax

Avoid visual clutter.

---

# TYPOGRAPHY EFFECTS

Headlines:

Optional gradient highlight.

Body text:

Solid colors only.

Never blur text.

---

# IMAGE TREATMENT

Images:

- High contrast
- Natural colors
- Soft vignette
- Slight sharpening
- Responsive cropping

Hover:

Scale 1.03

---

# VIDEO TREATMENT

Background videos:

- Slight desaturation
- Gentle contrast boost
- Overlay for readability

Pause when offscreen.

---

# PARTICLES

Use only if necessary.

Small floating particles.

Opacity:

Very low.

Never interfere with interaction.

---

# PERFORMANCE

Limit expensive CSS filters.

Prefer GPU accelerated transforms.

Reduce blur on mobile.

Disable heavy effects on low-end devices.

---

# ACCESSIBILITY

Effects must never reduce:

- Contrast
- Readability
- Focus visibility

Respect prefers-reduced-transparency when applicable.

---

# QA CHECKLIST

- Glass readable in all lighting
- Shadows consistent
- Bloom subtle
- Grain barely perceptible
- No distracting reflections
- Mobile performance verified

---

# FINAL REQUIREMENTS

Visual effects should make DISCIPLINE feel tactile, luxurious and modern.

The interface should resemble a premium operating system rather than a traditional fitness website.



---

# Source: 05 - Motion Design System/Volume5-08-Motion-QA-Guidelines.md


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



---

# Source: 06 - UI Bible/Volume6-01-UI-Bible-Foundations.md


# DISCIPLINE
# Volume 6 — 01-UI-Bible-Foundations.md

## OBJECTIVE

Define the visual language that every interface component must follow.

The UI should immediately evoke the feeling of a premium Apple product blended with the editorial precision of Linear, Raycast and modern luxury brands.

---

# DESIGN PHILOSOPHY

Every interface must communicate:

- Simplicity
- Precision
- Confidence
- Calm
- Premium craftsmanship

The UI must never feel crowded or generic.

---

# DESIGN TOKENS

## Primary Background

Snow White

#FAFAF8

## Secondary Background

#F3F3F1

## Glass Surface

rgba(255,255,255,.58)

## Primary Text

#111111

## Secondary Text

#5B5B5B

## Accent

Pastel Violet

#8B7CFF

## Success

#37C871

## Warning

#F4B740

## Error

#E85D75

---

# SPACING SYSTEM

Base unit:

8px

Scale:

4
8
12
16
24
32
40
48
64
80
96
120

Never use arbitrary spacing.

---

# BORDER RADIUS

Small:
12px

Medium:
20px

Large:
28px

Hero Glass:
36px

---

# SHADOW SYSTEM

Small

0 8px 20px rgba(0,0,0,.06)

Medium

0 20px 60px rgba(0,0,0,.08)

Large

0 40px 120px rgba(0,0,0,.12)

Soft edges only.

---

# BLUR SYSTEM

Light:
12px

Standard:
24px

Premium:
32px

Hero:
40px

Reduce blur on mobile.

---

# TYPOGRAPHY

Display

80–120px

Hero

56–96px

Section

36–56px

Card

20–28px

Body

16–18px

Caption

12–14px

---

# GRID

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Maximum content width:

1440px

---

# ICONOGRAPHY

Lucide React

Stroke:

2px

Rounded caps

24px default size.

---

# GLASS PRINCIPLES

Every glass element includes:

- Blur
- Semi-transparent background
- Soft border
- Soft shadow
- Reflection
- Hover response

Never exceed 60% opacity.

---

# COLOR USAGE

White dominates.

Grey structures content.

Pastel Violet highlights action.

Never overuse accent color.

---

# COMPONENT RULES

Every component must define:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Success
- Error

---

# RESPONSIVE

Layouts adapt without changing visual identity.

Touch targets:

Minimum 44px.

---

# ACCESSIBILITY

Maintain WCAG AA contrast.

Visible focus.

Reduced motion support.

Readable typography.

---

# QUALITY STANDARDS

Every screen should feel:

- Spacious
- Balanced
- Elegant
- Functional

Avoid:

- Heavy borders
- Loud gradients
- Neon colors
- Excessive shadows

---

# FINAL REQUIREMENTS

These foundations define every future component in DISCIPLINE.

No component may violate these design rules without explicit justification.



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

# Source: 06 - UI Bible/Volume6-08-Tables-&-Data-Views.md


# DISCIPLINE
# Volume 6 — 08-Tables-&-Data-Views.md

## OBJECTIVE

Define every data presentation pattern used across the DISCIPLINE platform.

Data should be easy to scan, filter and understand while maintaining the premium Apple-inspired visual language.

---

# DESIGN PHILOSOPHY

Data should feel:

- Organized
- Minimal
- Fast
- Readable
- Interactive

Never overwhelm users with dense spreadsheets.

---

# DATA VIEW TYPES

Support:

- Table
- List
- Grid
- Timeline
- Cards
- Calendar
- Gallery
- Kanban (future)

Users may switch between compatible views.

---

# TABLE STRUCTURE

Header

- Sticky
- Sortable
- Filterable

Rows

- Hover highlight
- Keyboard focus
- Selection checkbox (optional)

Footer

- Pagination
- Results count
- Bulk actions

---

# TABLE COLUMNS

Support:

- Text
- Numbers
- Dates
- Badges
- Status
- Progress bars
- Tags
- Avatars
- Actions

Columns may be hidden or reordered.

---

# SORTING

Allow:

- Ascending
- Descending
- Multi-column (future)

Animated sort indicator.

Persist user preference.

---

# FILTERING

Support:

- Search
- Date range
- Status
- Coach
- Subscription
- Workout
- Nutrition

Display active filter chips above results.

---

# SEARCH

Instant search.

Debounce requests.

Highlight matching terms.

Keyboard shortcut:

⌘K / Ctrl+K (global search)

---

# PAGINATION

Support:

- Page numbers
- Previous / Next
- Infinite scroll (optional)
- Cursor pagination for large datasets

Show total results.

---

# BULK ACTIONS

Examples:

- Export
- Delete
- Archive
- Assign
- Mark as read

Require confirmation for destructive actions.

---

# EMPTY STATES

Display:

- Illustration
- Helpful explanation
- Primary CTA
- Optional documentation link

---

# LOADING STATES

Use skeleton rows.

Maintain final layout dimensions.

Never flash empty content.

---

# STATUS BADGES

Variants:

- Active
- Pending
- Completed
- Failed
- Archived

Consistent colors and icons.

---

# RESPONSIVE

Desktop:

Full table.

Tablet:

Reduced columns.

Mobile:

Convert rows into stacked cards.

Critical actions remain accessible.

---

# ACCESSIBILITY

Keyboard navigation.

Sortable headers announced.

ARIA table semantics.

Visible focus.

Screen-reader friendly pagination.

---

# PERFORMANCE

Virtualize large datasets.

Lazy-load secondary columns.

Cache filter results.

Avoid unnecessary re-renders.

---

# QA CHECKLIST

- Sorting accurate
- Filters persistent
- Search responsive
- Pagination correct
- Mobile cards readable
- Keyboard navigation verified
- No layout shifts

---

# IMPLEMENTATION NOTES

Reusable components:

- DataTable
- DataGrid
- DataList
- FilterBar
- SearchInput
- Pagination
- StatusBadge
- EmptyState
- SkeletonTable

All views consume typed data models and share a unified design system.

---

# FINAL REQUIREMENTS

Every data view should transform complex information into a calm, premium experience.

Users should locate information quickly while enjoying the same visual quality found throughout the DISCIPLINE platform.



---

# Source: 07 - UX Bible/Volume7-01-UX-Foundations.md


# DISCIPLINE
# Volume 7 — 01-UX-Foundations.md

## OBJECTIVE

Define the user experience principles governing every journey across DISCIPLINE.

The platform must reduce cognitive load while maximizing clarity, motivation and long-term retention.

---

# UX PHILOSOPHY

Every screen should answer:

- Where am I?
- What should I do?
- Why does it matter?
- What happens next?

Never leave users uncertain.

---

# CORE PRINCIPLES

- Simplicity first
- One primary action per screen
- Progressive disclosure
- Recognition over recall
- Immediate feedback
- Consistent interaction patterns

---

# USER PERSONAS

Primary:

- Beginner
- Intermediate
- Advanced
- Busy professional
- Remote coaching client

Every journey should accommodate all personas.

---

# INFORMATION HIERARCHY

Priority:

1. Current objective
2. Recommended action
3. Progress
4. Secondary information
5. Historical data

---

# FIRST IMPRESSION

Within 10 seconds users should understand:

- What DISCIPLINE offers
- Why it is different
- What action to take

---

# COGNITIVE LOAD

Reduce choices.

Avoid walls of text.

Break complex tasks into steps.

Provide contextual help.

---

# NAVIGATION

Maximum three clicks to any major destination.

Persistent orientation.

Consistent terminology.

---

# FEEDBACK

Every action receives feedback:

- Visual
- Motion
- Text
- Status

Never leave actions ambiguous.

---

# EMPTY STATES

Explain:

- Why nothing is shown
- What to do next
- Expected outcome

---

# ERROR RECOVERY

Errors must:

- Explain the problem
- Suggest recovery
- Preserve user input
- Avoid blame

---

# TRUST

Display:

- Secure payment indicators
- Privacy messaging
- Coaching credibility
- Real testimonials

Remove uncertainty before checkout.

---

# CONVERSION

Each page has:

- One primary CTA
- Supporting proof
- Objection handling
- Clear next step

---

# RETENTION

Encourage:

- Daily dashboard visits
- Weekly check-ins
- Progress celebrations
- Coach interaction
- Streaks without manipulation

---

# ACCESSIBILITY

UX decisions must support:

- Keyboard users
- Screen readers
- Reduced motion
- Clear language

---

# QA CHECKLIST

- Primary action obvious
- No dead ends
- Navigation intuitive
- Errors recoverable
- Mobile flow verified
- Conversion friction minimized

---

# FINAL REQUIREMENTS

Every interaction should make DISCIPLINE feel calm, premium and effortless.

Users should always know what to do next and feel supported throughout their transformation.



---

# Source: 07 - UX Bible/Volume7-02-Onboarding.md


# DISCIPLINE
# Volume 7 — 02-Onboarding.md

## OBJECTIVE

Design an onboarding experience that transforms a visitor into an engaged DISCIPLINE member.

The onboarding should feel premium, personal and motivating while collecting all information required to deliver individualized coaching.

---

# UX GOALS

The onboarding must:

- Build trust immediately
- Explain what happens next
- Minimize friction
- Personalize the experience
- Increase completion rate

Target completion rate:

> 90%

---

# JOURNEY OVERVIEW

1. Account creation
2. Email verification
3. Welcome screen
4. Goal selection
5. Personal profile
6. Training experience
7. Nutrition profile
8. Lifestyle assessment
9. Progress photos
10. Plan recommendation
11. Payment (if required)
12. Dashboard introduction

---

# STEP 1 — ACCOUNT

Collect:

- First name
- Last name
- Email
- Password

Display password strength.

Allow:

- Google
- Apple

---

# STEP 2 — WELCOME

Display:

"Welcome to DISCIPLINE"

Explain:

- Evidence-based coaching
- Personalized plans
- Weekly follow-up

Primary CTA:

Continue

---

# STEP 3 — GOALS

Choose one primary goal:

- Fat Loss
- Muscle Gain
- Recomposition
- Performance
- Healthy Lifestyle

Optional secondary goals.

---

# STEP 4 — PROFILE

Collect:

- Age
- Height
- Weight
- Sex
- Timezone
- Language

Auto-save after each step.

---

# STEP 5 — TRAINING

Questions:

- Experience level
- Days per week
- Equipment
- Gym or Home
- Injuries
- Preferred training style

---

# STEP 6 — NUTRITION

Collect:

- Dietary preferences
- Allergies
- Meal frequency
- Cooking experience
- Water intake

Optional food dislikes.

---

# STEP 7 — LIFESTYLE

Evaluate:

- Sleep
- Stress
- Occupation
- Activity level
- Daily schedule

Sliders:

1–10 where appropriate.

---

# STEP 8 — PROGRESS PHOTOS

Upload:

- Front
- Side
- Back

Provide positioning guide.

Explain privacy policy.

---

# STEP 9 — RECOMMENDATION

Display:

Recommended coaching plan.

Explain why.

Comparison table available.

Primary CTA:

Start this plan.

---

# STEP 10 — FIRST DASHBOARD

Guided tour highlights:

- Workout
- Nutrition
- Progress
- Messages
- Weekly Check-in

Users may skip.

---

# PROGRESS INDICATOR

Persistent stepper.

Display:

Current step

Remaining steps

Estimated time.

---

# VALIDATION

Validate immediately.

Preserve entered data.

Never erase completed fields.

---

# MOTIVATION

Celebrate milestones:

- Profile completed
- Photos uploaded
- First login
- First workout

Use subtle success animations.

---

# ACCESSIBILITY

Keyboard support.

Visible labels.

Screen reader announcements.

Reduced motion respected.

---

# PERFORMANCE

Autosave every completed step.

Lazy-load non-critical media.

Avoid unnecessary page reloads.

---

# QA CHECKLIST

- Completion flow tested
- Autosave verified
- Mobile onboarding smooth
- Validation accurate
- Guided tour optional
- Progress indicator correct

---

# IMPLEMENTATION NOTES

Reusable components:

- OnboardingLayout
- Stepper
- GoalSelector
- ProgressUploader
- RecommendationCard
- GuidedTour

Store onboarding state server-side for resume capability.

---

# FINAL REQUIREMENTS

Onboarding should feel like the beginning of a transformation rather than an administrative process.

Every step should increase confidence and excitement about joining DISCIPLINE.



---

# Source: 07 - UX Bible/Volume7-03-Checkout-&-Conversion.md


# DISCIPLINE
# Volume 7 — 03-Checkout-&-Conversion.md

## OBJECTIVE

Design a premium conversion journey that maximizes trust and minimizes purchase friction.

The checkout experience should feel effortless, transparent and reassuring while communicating the value of DISCIPLINE.

---

# UX PRINCIPLES

Every purchase flow must:

- Build confidence
- Reduce uncertainty
- Explain value
- Eliminate unnecessary steps
- Reinforce security

One primary objective:

Complete the subscription.

---

# CONVERSION JOURNEY

1. Landing Page
2. Coaching Comparison
3. Plan Details
4. FAQ
5. Testimonials
6. Checkout
7. Payment
8. Confirmation
9. Welcome
10. Dashboard

---

# PRICING PAGE

Display:

- Monthly plans
- Included services
- Coach support
- Feature comparison
- Commitment details

Highlight the recommended plan.

---

# PLAN COMPARISON

Compare:

- ORDER
- RIGOR
- DISCIPLINE

Show:

- Weekly reviews
- Coach messaging
- Video calls
- Personalized nutrition
- Workout updates
- Priority support

Avoid overwhelming tables.

---

# SOCIAL PROOF

Include:

- Before/after transformations
- Client testimonials
- Ratings
- Success statistics
- Number of active members

Use authentic content only.

---

# TRUST ELEMENTS

Display:

- Secure Stripe payment
- SSL encryption
- Privacy policy
- Transparent billing
- Cancellation policy
- Coach credentials

Visible before payment.

---

# CHECKOUT

Single-page experience.

Sections:

- Selected plan
- Billing summary
- Coupon (optional)
- Payment
- Terms acceptance

Sticky order summary on desktop.

---

# PAYMENT

Support:

- Cards
- Apple Pay
- Google Pay

Future:

- PayPal

Show accepted payment methods before checkout.

---

# ORDER SUMMARY

Display:

- Plan
- Monthly price
- Taxes
- Renewal date
- Total due today

Always visible.

---

# VALIDATION

Validate:

- Email
- Billing data
- Payment

Never lose entered information after an error.

---

# ERROR RECOVERY

If payment fails:

Explain:

- What happened
- Next steps

Allow retry without restarting checkout.

---

# UPSELLS

After purchase:

Offer:

- Nutrition upgrade
- Extra coaching session
- Premium resources

Never interrupt payment completion.

---

# CONFIRMATION PAGE

Display:

- Success message
- Receipt
- Next steps
- Dashboard CTA
- Support contact

Celebrate subtly.

---

# EMAIL FLOW

Immediately send:

- Receipt
- Welcome email
- Dashboard access
- Coach introduction

---

# MOBILE

Single-column checkout.

Large payment controls.

Sticky purchase button.

Minimal distractions.

---

# ACCESSIBILITY

Keyboard accessible.

Screen-reader compatible.

Visible errors.

Clear labels.

---

# PERFORMANCE

Load Stripe asynchronously.

Prefetch confirmation page.

Lazy-load testimonials.

Prevent layout shifts.

---

# ANALYTICS

Track:

- Pricing page views
- Plan selection
- Checkout started
- Checkout abandoned
- Purchase completed
- Upsell accepted

---

# QA CHECKLIST

- Payment succeeds
- Payment failure handled
- Mobile checkout verified
- Analytics events fire
- Emails delivered
- Confirmation page correct

---

# IMPLEMENTATION NOTES

Reusable components:

- PricingCard
- PlanComparison
- CheckoutLayout
- OrderSummary
- PaymentSection
- SuccessScreen

Integrate with:

- Stripe Checkout
- Stripe Customer Portal
- Server Actions
- PostHog analytics

---

# FINAL REQUIREMENTS

Purchasing DISCIPLINE should feel effortless and trustworthy.

Every step should reinforce the premium nature of the coaching while removing friction and increasing confidence until the subscription is successfully activated.



---

# Source: 07 - UX Bible/Volume7-04-Retention-&-Habit-System.md


# DISCIPLINE
# Volume 7 — 04-Retention-&-Habit-System.md

## OBJECTIVE

Design a long-term engagement system that helps members remain consistent without manipulative gamification.

Retention should result from meaningful progress, clarity and accountability.

---

# UX PHILOSOPHY

Motivation fades.

Systems create consistency.

DISCIPLINE reinforces habits through coaching, feedback and visible progress.

---

# RETENTION PILLARS

- Daily clarity
- Weekly accountability
- Visible progress
- Coach relationship
- Personal milestones
- Sustainable routines

---

# DAILY EXPERIENCE

Each login answers:

- What should I do today?
- How am I progressing?
- What deserves attention?

Never overwhelm users.

---

# HABIT TRACKER

Track habits such as:

- Workout completed
- Protein target
- Water intake
- Sleep goal
- Daily steps
- Mobility session

Display completion rings and weekly summaries.

---

# STREAKS

Show:

- Workout streak
- Check-in streak
- Habit streak

Rules:

- Encourage recovery.
- Missing one day should not erase long-term progress.

---

# WEEKLY CHECK-IN

Every week prompt users to review:

- Weight
- Photos
- Energy
- Hunger
- Sleep
- Stress
- Motivation

Coach receives results automatically.

---

# GOALS

Support:

- Short-term
- Monthly
- Long-term

Every goal displays:

- Progress
- Remaining effort
- Estimated completion

---

# CELEBRATIONS

Celebrate:

- First workout
- First month
- New personal best
- Goal completed
- Habit consistency

Use subtle motion and positive language.

---

# REMINDERS

Channels:

- Email
- Push (future)
- In-app

Reminders should be actionable and respectful.

Never spam users.

---

# COACH ACCOUNTABILITY

Coach dashboard highlights:

- Missed workouts
- Missed check-ins
- Plateau detection
- Rapid progress

Suggest timely interventions.

---

# INSIGHTS

Weekly recap includes:

- Wins
- Challenges
- Trends
- Coach recommendation
- Focus for next week

---

# RE-ENGAGEMENT

If inactive:

3 days:
Gentle reminder.

7 days:
Personalized encouragement.

14 days:
Coach follow-up.

30 days:
Recovery plan suggestion.

---

# GAMIFICATION

Allowed:

- Progress bars
- Milestones
- Personal records
- Completion rings

Avoid:

- Artificial scarcity
- Loot boxes
- Endless notifications
- Competitive pressure

---

# ANALYTICS

Measure:

- DAU
- WAU
- Retention
- Habit completion
- Workout adherence
- Check-in completion

---

# ACCESSIBILITY

Habits and progress must remain understandable without color alone.

Provide text summaries.

---

# QA CHECKLIST

- Habits update correctly
- Streak logic verified
- Weekly recap generated
- Reminders scheduled
- Coach alerts accurate
- Mobile experience validated

---

# IMPLEMENTATION NOTES

Reusable modules:

- HabitTracker
- StreakCard
- WeeklyRecap
- GoalCard
- ReminderCenter
- CoachAlerts

Retention logic should be configurable and data-driven.

---

# FINAL REQUIREMENTS

Retention should emerge from meaningful coaching, visible progress and sustainable routines.

Members should feel supported, never manipulated, throughout their DISCIPLINE journey.



---

# Source: 07 - UX Bible/Volume7-05-Coach-&-Communication.md


# DISCIPLINE
# Volume 7 — 05-Coach-&-Communication.md

## OBJECTIVE

Design a premium communication experience between coach and member.

Every interaction should strengthen trust, accountability and long-term engagement while remaining simple and respectful.

Communication must feel personal, never automated.

---

# UX PRINCIPLES

The communication system must:

- Encourage meaningful conversations
- Reduce response friction
- Provide clear context
- Keep discussions organized
- Reinforce coaching quality

---

# COMMUNICATION CHANNELS

Support:

- In-app messaging
- Email notifications
- Video feedback
- Voice notes (future)
- Scheduled calls
- System notifications

Each channel has a clear purpose.

---

# MESSAGE CENTER

Layout:

Left

- Conversation list

Center

- Active conversation

Right (optional)

- Client summary
- Latest check-in
- Current plan

---

# CONVERSATIONS

Display:

- Coach avatar
- Member avatar
- Last message
- Timestamp
- Unread badge

Sort by latest activity.

---

# MESSAGE TYPES

Support:

- Plain text
- Images
- Progress photos
- PDF attachments
- Workout links
- Nutrition plan links
- System messages

Future:

- Voice
- Video

---

# COACH FEEDBACK

Coach can comment on:

- Weekly check-ins
- Progress photos
- Workout logs
- Nutrition adherence

Feedback should always include:

- Observation
- Recommendation
- Next action

---

# VIDEO FEEDBACK

Coach may record:

- Exercise review
- Weekly recap
- Motivation
- Plan explanation

Display:

- Thumbnail
- Duration
- Transcript (future)

---

# CALL SCHEDULING

Members can:

- View availability
- Reserve time slot
- Reschedule
- Cancel

Automatic reminders before calls.

---

# NOTIFICATIONS

Trigger for:

- New coach message
- Check-in reviewed
- Plan updated
- Upcoming call
- Subscription issue

Notifications deep-link directly to the relevant screen.

---

# RESPONSE EXPECTATIONS

Show expected response time.

Example:

"Coach usually replies within 24 hours."

Reduce uncertainty.

---

# MESSAGE COMPOSER

Support:

- Rich text
- Emoji (minimal)
- Attachments
- Image upload

Autosave drafts.

---

# SEARCH

Search conversations by:

- Keyword
- Date
- Attachment
- Workout
- Nutrition

Highlight matching results.

---

# COACH DASHBOARD

Coach sees:

- New messages
- Pending check-ins
- Clients needing attention
- Upcoming calls
- Priority alerts

---

# PRIVACY

Display clear privacy messaging.

Attachments stored securely.

Messages encrypted in transit.

Only participants may access conversations.

---

# ACCESSIBILITY

Keyboard navigation.

Visible focus.

Screen-reader support.

Readable timestamps.

---

# PERFORMANCE

Lazy-load conversation history.

Paginate long threads.

Optimize media previews.

Realtime updates only for active conversations.

---

# QA CHECKLIST

- Messages delivered correctly
- Attachments upload successfully
- Notifications accurate
- Call scheduling works
- Mobile messaging verified
- Accessibility tested

---

# IMPLEMENTATION NOTES

Reusable components:

- ConversationList
- MessageThread
- MessageComposer
- CoachFeedbackCard
- CallScheduler
- NotificationCenter

Integrate with realtime messaging infrastructure and server-side persistence.

---

# FINAL REQUIREMENTS

Communication should make every member feel personally supported.

The relationship between coach and client should become one of the strongest differentiators of the DISCIPLINE experience.



---

# Source: 07 - UX Bible/Volume7-06-Error-States-&-Recovery.md


# DISCIPLINE
# Volume 7 — 06-Error-States-&-Recovery.md

## OBJECTIVE

Design a resilient error handling experience that preserves user trust and helps members recover quickly from any failure.

Errors should feel informative, calm and actionable rather than alarming.

---

# UX PRINCIPLES

Every error must:

- Explain what happened
- Explain why (when possible)
- Offer a clear next step
- Preserve user progress
- Avoid technical jargon

Never blame the user.

---

# ERROR CATEGORIES

Support:

- Validation
- Authentication
- Authorization
- Network
- Server
- Payment
- Upload
- Synchronization
- Unknown

Each category has a dedicated UI treatment.

---

# VALIDATION ERRORS

Examples:

- Invalid email
- Weak password
- Required field missing

Display:

- Inline message
- Highlight field
- Recovery suggestion

Do not clear entered values.

---

# AUTHENTICATION

Scenarios:

- Wrong password
- Expired session
- Email not verified
- 2FA failure

Offer:

- Retry
- Password reset
- Verification resend

---

# NETWORK FAILURES

Detect offline mode.

Display:

- Offline banner
- Retry button
- Cached content when available

Automatically retry safe requests when connection returns.

---

# SERVER ERRORS

Unexpected failures:

- Friendly explanation
- Retry action
- Support contact
- Error reference ID

Never expose stack traces.

---

# PAYMENT ERRORS

Examples:

- Card declined
- Authentication required
- Insufficient funds

Keep billing information.

Allow immediate retry.

Provide Stripe guidance when applicable.

---

# FILE UPLOADS

Possible issues:

- File too large
- Unsupported format
- Interrupted upload

Display upload progress.

Resume upload when possible.

---

# SESSION EXPIRATION

Warn before expiration.

Offer:

- Extend session
- Save progress
- Re-authenticate

Never lose unsaved work.

---

# AUTO RECOVERY

Automatically recover:

- Draft forms
- Unsent messages
- Interrupted uploads
- Pending check-ins

Store temporary state securely.

---

# EMPTY STATES

Distinguish between:

- No data
- Failed request
- Loading
- Filter produced no results

Each requires a unique interface.

---

# LOGGING

Capture:

- Error type
- Timestamp
- User action
- Browser
- Device
- Request ID

Send critical errors to Sentry.

---

# ACCESSIBILITY

Announce errors with:

aria-live

Maintain keyboard focus.

Readable language.

High contrast.

---

# PERFORMANCE

Retry only idempotent requests.

Avoid retry loops.

Throttle repeated failures.

---

# QA CHECKLIST

- Validation messages correct
- Session recovery works
- Offline mode verified
- Payment retry tested
- Upload recovery tested
- Errors accessible
- Logging confirmed

---

# IMPLEMENTATION NOTES

Reusable components:

- ErrorBanner
- InlineValidation
- RetryButton
- OfflineNotice
- SessionDialog
- UploadRecovery

Centralize error mapping and user-facing messages.

---

# FINAL REQUIREMENTS

Failures should never break user confidence.

Every error experience must preserve progress, explain the situation clearly and guide members toward successful recovery.



---

# Source: 07 - UX Bible/Volume7-07-Notifications-&-Feedback.md


# DISCIPLINE
# Volume 7 — 07-Notifications-&-Feedback.md

## OBJECTIVE

Create a unified notification and feedback system that keeps members informed without becoming intrusive.

Every notification should have a clear purpose, an appropriate level of urgency and an actionable next step.

---

# UX PHILOSOPHY

Good notifications:

- Inform
- Guide
- Reassure
- Motivate

Never interrupt users unnecessarily.

Avoid notification fatigue.

---

# NOTIFICATION TYPES

Support:

- Success
- Information
- Reminder
- Warning
- Error
- Coach Message
- Billing
- System Update

Each type has a distinct icon and visual treatment.

---

# DELIVERY CHANNELS

In-app

Email

Future:

- Push notifications
- SMS (critical only)

Users control notification preferences.

---

# IN-APP TOASTS

Display for:

- Saved changes
- Workout logged
- Meal added
- Photo uploaded
- Subscription updated

Auto-dismiss after 4–6 seconds.

Pause timer on hover.

---

# NOTIFICATION CENTER

Accessible from the top navigation.

Display:

- Unread count
- Category
- Timestamp
- Action button

Support:

- Mark as read
- Archive
- Filter

---

# REMINDERS

Examples:

- Workout due
- Weekly check-in
- Water goal
- Coach response
- Upcoming call
- Subscription renewal

Deliver at appropriate times.

---

# SUCCESS FEEDBACK

Examples:

- Goal achieved
- Weekly streak
- New personal record

Use:

- Soft animation
- Positive language
- Optional celebration

Avoid excessive gamification.

---

# WARNING STATES

Examples:

- Missed check-in
- Incomplete workout
- Upcoming payment failure

Provide:

- Context
- Suggested action
- Direct shortcut

---

# ERROR FEEDBACK

Errors should include:

- Clear explanation
- Recovery option
- Contact support (when necessary)

Never expose technical details.

---

# EMAIL STRATEGY

Transactional:

- Welcome
- Password reset
- Payment receipt
- Subscription renewal
- Coach message

Engagement:

- Weekly recap
- Monthly progress
- Educational content

---

# USER PREFERENCES

Members may configure:

- Email frequency
- Reminder timing
- Marketing emails
- Coach notifications

Changes apply immediately.

---

# ACCESSIBILITY

Announcements:

aria-live regions.

High contrast.

Readable wording.

Notifications never steal keyboard focus.

---

# PERFORMANCE

Batch low-priority notifications.

Realtime only for:

- Coach messages
- Billing issues
- Critical account events

Lazy-load notification history.

---

# QA CHECKLIST

- Toast timing verified
- Notification center accurate
- Emails delivered
- Preferences respected
- Accessibility tested
- Mobile behavior validated

---

# IMPLEMENTATION NOTES

Reusable components:

- Toast
- NotificationBell
- NotificationCenter
- ReminderCard
- EmailTemplate
- FeedbackBanner

Centralize notification logic to ensure consistent behavior.

---

# FINAL REQUIREMENTS

Every notification should strengthen trust and clarity.

Members should always understand what happened, why it matters and what action—if any—they should take next.



---

# Source: 07 - UX Bible/Volume7-08-End-to-End-User-Journeys.md


# DISCIPLINE
# Volume 7 — 08-End-to-End-User-Journeys.md

## OBJECTIVE

Document every major end-to-end user journey across the DISCIPLINE ecosystem.

Every journey should be intentional, frictionless and emotionally coherent from the first visit to long-term retention.

---

# UX PHILOSOPHY

Every user journey should answer:

- Why am I here?
- What should I do next?
- What value am I receiving?
- Why should I continue?

Every transition should reinforce trust.

---

# JOURNEY 1 — VISITOR

Arrival:

- Landing page
- Hero
- Social proof
- Coaching plans
- FAQ
- Contact

Goal:

Understand the value proposition.

Primary KPI:

CTA click.

---

# JOURNEY 2 — PROSPECT

User compares plans.

Reads testimonials.

Reviews FAQ.

Visits pricing.

Begins checkout.

Goal:

Reduce uncertainty.

Primary KPI:

Checkout started.

---

# JOURNEY 3 — NEW MEMBER

Creates account.

Completes onboarding.

Uploads progress photos.

Receives recommended plan.

Discovers dashboard.

Goal:

Reach first successful workout.

---

# JOURNEY 4 — ACTIVE MEMBER

Daily flow:

Login

↓

Dashboard

↓

Workout

↓

Nutrition

↓

Habit completion

↓

Coach interaction

↓

Logout

Goal:

Consistency.

---

# JOURNEY 5 — WEEKLY REVIEW

Receive reminder.

Complete check-in.

Upload photos.

Coach reviews.

Plan updated.

Weekly recap delivered.

Goal:

Continuous improvement.

---

# JOURNEY 6 — COACH

Coach logs in.

Reviews alerts.

Checks pending clients.

Responds to messages.

Updates plans.

Schedules calls.

Goal:

Efficient client management.

---

# JOURNEY 7 — BILLING

Renewal reminder.

Payment processed.

Invoice generated.

Confirmation email.

Dashboard updated.

Failure path:

Retry payment.

---

# JOURNEY 8 — RE-ENGAGEMENT

Inactive:

3 days

↓

Reminder

↓

7 days

↓

Coach message

↓

14 days

↓

Recovery plan

↓

30 days

↓

Personalized reactivation campaign

Goal:

Return to active usage.

---

# JOURNEY 9 — SUPPORT

User encounters issue.

Reads help.

Contacts coach/support.

Receives solution.

Confirms resolution.

Goal:

Restore confidence quickly.

---

# EMOTIONAL STATES

Throughout every journey:

Arrival:

Curiosity.

Purchase:

Confidence.

First workout:

Excitement.

Plateau:

Support.

Success:

Pride.

Long-term:

Belonging.

---

# FRICTION POINTS

Monitor:

- Long forms
- Payment failures
- Slow loading
- Navigation confusion
- Missed reminders
- Coach delays

Reduce friction continuously.

---

# SUCCESS METRICS

Track:

- Conversion
- Onboarding completion
- Weekly check-ins
- Retention
- Session duration
- Subscription renewal
- NPS
- Support resolution time

---

# ACCESSIBILITY

Every journey supports:

- Keyboard users
- Screen readers
- Reduced motion
- Mobile-first interactions

No journey should require a mouse.

---

# QA CHECKLIST

Verify:

- Every journey completes successfully
- Recovery paths tested
- Mobile flows validated
- Analytics events captured
- Notifications triggered
- Accessibility maintained

---

# IMPLEMENTATION NOTES

Map every journey in analytics.

Document:

- Entry points
- Exit points
- Drop-off locations
- Recovery opportunities

Review journeys after every major release.

---

# FINAL REQUIREMENTS

DISCIPLINE should feel like a carefully guided transformation rather than a collection of screens.

Every user journey should naturally lead to the next stage while building trust, consistency and long-term engagement.



---

# Source: 08 - AI design language/Volume8-01-AI-Design-Language.md


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



---

# Source: 08 - AI design language/Volume8-02-Composition-Rules.md


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



---

# Source: 08 - AI design language/Volume8-03-Visual-Hierarchy.md


# DISCIPLINE
# Volume 8 — 03-Visual-Hierarchy.md

## OBJECTIVE

Define the visual hierarchy rules that every DISCIPLINE interface must follow.

Visual hierarchy determines what users notice first, what they understand next and how they navigate each screen.

The hierarchy should feel effortless, intentional and premium.

---

# DESIGN PHILOSOPHY

Hierarchy is created through:

- Scale
- Contrast
- Position
- Whitespace
- Motion
- Color
- Depth

Never rely on color alone.

---

# ATTENTION PYRAMID

Priority order:

1. Hero Headline
2. Primary CTA
3. Supporting Visual
4. Key Statistics
5. Body Content
6. Secondary Actions
7. Footer

Every screen should respect this order.

---

# TYPOGRAPHIC HIERARCHY

Display XL

96–120px

Display L

72–96px

Heading

48–64px

Section Title

32–48px

Card Title

20–28px

Body

16–18px

Caption

12–14px

Never skip levels without reason.

---

# COLOR HIERARCHY

Primary:

#111111

Secondary:

#5B5B5B

Muted:

#8C8C8C

Accent:

Pastel Violet

Accent color is reserved for:

- Primary CTA
- Interactive states
- Progress
- Active navigation

Never use the accent for large text blocks.

---

# CONTRAST

Important content:

High contrast.

Supporting content:

Medium contrast.

Decorative elements:

Low contrast.

Ensure WCAG AA compliance.

---

# WHITESPACE HIERARCHY

Increase whitespace around:

- Headlines
- CTAs
- Hero content
- Pricing

Reduce spacing inside:

- Tables
- Lists
- Dashboards

Whitespace communicates importance.

---

# DEPTH HIERARCHY

Layer order:

1. Background
2. Imagery
3. Glass surfaces
4. Cards
5. Typography
6. Buttons
7. Floating accents

Depth should support comprehension.

---

# MOTION HIERARCHY

Only one dominant animation per viewport.

Secondary animations should never compete with the primary sequence.

Micro-interactions remain subtle.

---

# ICON HIERARCHY

Use icons to reinforce meaning.

Never replace labels with icons alone.

Maintain consistent size and stroke width.

---

# CONTENT PRIORITIZATION

Every page should answer:

1. What is this?
2. Why does it matter?
3. What should I do?
4. What happens next?

Avoid introducing secondary information before primary information.

---

# SCANNABILITY

Support rapid scanning through:

- Clear headings
- Short paragraphs
- Bullet lists
- Cards
- Metrics
- Visual separators

Limit paragraph width to 70 characters.

---

# SECTION HIERARCHY

Recommended order:

Headline

↓

Description

↓

Primary CTA

↓

Supporting proof

↓

Details

↓

Secondary CTA

---

# RESPONSIVE

Maintain hierarchy across devices.

Do not simply scale typography.

Recompose layouts when necessary.

The most important content must remain above the fold.

---

# AI GENERATION RULES

Reject generated layouts when:

- Multiple CTAs compete equally
- Decorative elements overpower content
- Headings are too small
- Visual rhythm is inconsistent
- Contrast is insufficient

---

# QA CHECKLIST

- Primary action obvious
- Headline dominates
- Contrast verified
- Accent color used sparingly
- Whitespace intentional
- Reading order intuitive
- Mobile hierarchy preserved

---

# IMPLEMENTATION NOTES

Create reusable design tokens for:

- Typography scale
- Color roles
- Elevation
- Spacing
- Motion priority

Apply hierarchy rules consistently across marketing pages, dashboard and mobile views.

---

# FINAL REQUIREMENTS

A user should understand the purpose of every screen within three seconds.

Hierarchy must guide attention naturally and make DISCIPLINE feel curated, premium and exceptionally easy to use.



---

# Source: 08 - AI design language/Volume8-04-Section-Patterns.md


# DISCIPLINE
# Volume 8 — 04-Section-Patterns.md

## OBJECTIVE

Define a reusable library of premium section patterns for AI-generated pages.

Every page should feel unique while remaining unmistakably part of the DISCIPLINE ecosystem.

Patterns are composable, not fixed templates.

---

# DESIGN PRINCIPLES

Every section must:

- Solve one problem
- Have one dominant objective
- Include one visual focal point
- End with a logical transition

Never combine multiple unrelated objectives.

---

# SECTION LIBRARY

Core sections:

- Hero
- Brand Story
- Philosophy
- Method
- Coaching Plans
- Transformation Gallery
- Testimonials
- Statistics
- Timeline
- FAQ
- Contact
- Final CTA
- Footer

Optional:

- Video Showcase
- Coach Profile
- Comparison Table
- Dashboard Preview
- Pricing Calculator

---

# HERO PATTERN

Structure:

Eyebrow

↓

Headline

↓

Description

↓

Primary CTA

↓

Secondary CTA

↓

Trust Indicators

↓

Floating Glass Cards

Never place forms inside the Hero.

---

# BRAND STORY

Two-column layout.

Large editorial image.

Narrative copy.

Minimal CTA.

Purpose:

Build emotional connection.

---

# METHOD

Three to six steps.

Numbered sequence.

Glass cards.

Illustrations optional.

Purpose:

Explain the coaching process clearly.

---

# COACHING PLANS

Three pricing cards.

Center plan emphasized.

Monthly billing.

Feature comparison.

Sticky CTA on mobile.

---

# TRANSFORMATION GALLERY

Large photography.

Before / After comparison.

Client quote.

Metrics.

Do not overcrowd.

---

# TESTIMONIALS

Glass cards.

Portrait.

Quote.

Name.

Result achieved.

Maximum three visible initially.

Carousel optional.

---

# STATISTICS

Animated counters.

Examples:

+500 Members

96% Retention

4.9 Rating

Minimal supporting text.

---

# TIMELINE

Journey visualization.

Horizontal on desktop.

Vertical on mobile.

Use milestones.

---

# FAQ

Accordion.

One open item.

Search optional.

End with support CTA.

---

# CONTACT

Glass contact panel.

Instagram.

Professional email.

Contact form.

Response time expectation.

Map optional.

---

# FINAL CTA

Large headline.

Short description.

Primary button.

Secondary reassurance.

Minimal distractions.

---

# FOOTER

Brand.

Navigation.

Legal.

Newsletter.

Social links.

Never visually compete with content above.

---

# SECTION TRANSITIONS

Alternate:

Light background

↓

Glass emphasis

↓

Media section

↓

Minimal section

Maintain rhythm.

---

# AI GENERATION RULES

When generating pages:

- Vary section order when appropriate.
- Never repeat identical layouts.
- Reuse design tokens.
- Preserve hierarchy.
- Maintain consistent spacing.

Reject pages that resemble generic SaaS templates.

---

# QA CHECKLIST

- One objective per section
- CTA hierarchy preserved
- No repetitive layouts
- Smooth transitions
- Responsive redesign complete
- Premium visual rhythm maintained

---

# IMPLEMENTATION NOTES

Represent every section as an independent React component.

Expose structured props for:

- title
- subtitle
- media
- actions
- statistics
- testimonials
- theme

Compose pages through configuration instead of duplicated markup.

---

# FINAL REQUIREMENTS

A DISCIPLINE page should feel like a curated editorial experience.

Every section must naturally lead into the next while reinforcing clarity, trust and premium craftsmanship.



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

# Source: 08 - AI design language/Volume8-06-Photography-&-Media-Rules.md


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



---

# Source: 08 - AI design language/Volume8-07-AI-Code-Generation-Rules.md


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



---

# Source: 08 - AI design language/Volume8-08-AI-Prompting-Protocol.md


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

# Source: 09 - Creative Direction/Volume9-03-Reflections-&-Refractions.md


# DISCIPLINE
# Volume 9 — 03-Reflections-&-Refractions.md

## OBJECTIVE

Define the optical behavior of every Liquid Glass surface across DISCIPLINE.

Reflections and refractions must create the illusion of a real engineered material while remaining subtle enough to never distract from the content.

---

# PHILOSOPHY

Reflections communicate quality.

Refractions communicate depth.

Neither should exist purely for decoration.

The user should feel the material rather than notice the effect.

---

# REFLECTION MODEL

Each glass layer contains:

- Primary highlight
- Secondary ambient highlight
- Edge glow
- Soft environmental reflection

Opacity:

3–8%

Never exceed 10%.

---

# PRIMARY HIGHLIGHT

Origin:

Top-left.

Shape:

Long, soft ellipse.

Blurred edges.

Very low opacity.

Moves slightly with pointer position.

---

# SECONDARY HIGHLIGHT

Origin:

Upper center.

Purpose:

Suggest overhead lighting.

Static on mobile.

Dynamic on desktop.

---

# EDGE LIGHT

Every glass surface contains:

- Bright top edge
- Slightly darker bottom edge

Creates thickness without heavy borders.

---

# REFRACTION

Background should distort slightly behind glass.

Strength:

1–3px equivalent.

Visible only during motion or parallax.

Never distort typography.

---

# PARALLAX

Desktop only.

Cursor movement:

2–6px.

Background moves slower than foreground.

Glass reacts independently.

---

# DEPTH SYSTEM

Depth order:

1. Background
2. Blur
3. Refraction
4. Reflection
5. Content
6. Floating highlights

Each layer remains visually distinct.

---

# INTERACTION STATES

Hover

- Reflection follows cursor
- Highlight intensifies slightly
- Border brightens
- Shadow deepens subtly

Active

- Reflection stabilizes
- Shadow softens
- Glass compresses visually

Idle

Very slow ambient light drift.

Cycle:

12–18 seconds.

---

# ENVIRONMENT LIGHT

Assume one global light source.

Never generate conflicting reflections.

All glass shares the same lighting direction.

---

# COLOR RESPONSE

Glass reflects nearby colors softly.

Accent violet appears only in interaction highlights.

Never tint the entire surface.

---

# MOBILE RULES

Disable pointer tracking.

Retain:

- Static highlights
- Soft edge lighting
- Minimal ambient shimmer

Optimize for battery life.

---

# PERFORMANCE

Animate only:

- transform
- opacity
- CSS variables controlling highlight position

Avoid expensive filter chains.

Reuse gradients.

Maintain 60 FPS.

---

# AI GENERATION RULES

Every generated interface must:

- Use consistent light direction
- Preserve subtle reflections
- Avoid exaggerated gloss
- Avoid mirror-like surfaces
- Prioritize readability

Reject glass that resembles chrome, acrylic or plastic.

---

# QA CHECKLIST

- Reflection direction consistent
- Refraction subtle
- Edge lighting visible
- Hover believable
- Mobile optimized
- Text unaffected
- Motion smooth

---

# IMPLEMENTATION NOTES

Create reusable utilities:

- GlassReflection
- GlassHighlight
- RefractionLayer
- AmbientLightController

Control optical properties through design tokens rather than per-component values.

---

# FINAL REQUIREMENTS

A screenshot of any DISCIPLINE interface should immediately communicate handcrafted Liquid Glass through its reflections, depth and optical realism alone.



---

# Source: 09 - Creative Direction/Volume9-04-Blur-System.md


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



---

# Source: 09 - Creative Direction/Volume9-05-Lighting-Bible.md


# DISCIPLINE
# Volume 9 — 05-Lighting-Bible.md

## OBJECTIVE

Define the complete lighting language of the DISCIPLINE interface.

Light is the invisible element that gives Liquid Glass its realism.

Every highlight, shadow and reflection must feel physically coherent.

---

# LIGHTING PHILOSOPHY

Lighting should communicate:

- Calm
- Precision
- Luxury
- Softness
- Depth

Never theatrical.

Never dramatic.

Never high contrast.

---

# GLOBAL LIGHT SOURCE

Primary light:

Top-center.

Secondary fill:

Upper-left.

Ambient fill:

Entire scene.

Every component shares the same lighting direction.

---

# LIGHT TEMPERATURE

Color temperature:

5200K–6000K

Neutral daylight.

Avoid:

- Warm orange
- Cold blue

The interface should always feel clean.

---

# AMBIENT LIGHT

Soft diffuse illumination.

No visible source.

Creates subtle separation between layers.

Opacity influence:

3–6%.

---

# DIRECT LIGHT

Used only to define:

- Glass edges
- Floating cards
- Premium buttons

Never create hard specular hotspots.

---

# SHADOW PHILOSOPHY

Shadows describe elevation.

Not decoration.

Characteristics:

- Wide
- Soft
- Low opacity
- Multi-layered

No harsh black shadows.

---

# SHADOW SCALE

Elevation 1

0 8px 20px rgba(0,0,0,.04)

Elevation 2

0 16px 36px rgba(0,0,0,.06)

Elevation 3

0 24px 60px rgba(0,0,0,.08)

Elevation 4

0 40px 80px rgba(0,0,0,.10)

Use only official elevations.

---

# EDGE HIGHLIGHTS

Top edge:

Bright.

Bottom edge:

Neutral.

Side edges:

Minimal.

Creates the illusion of polished glass thickness.

---

# HERO LIGHTING

Hero receives:

- Highest ambient quality
- Deepest perceived depth
- Strongest but softest highlight

Hero should always feel brighter than the rest of the page.

---

# INTERACTION LIGHT

Hover:

Highlight shifts slightly.

Focus:

Border brightness increases.

Pressed:

Highlight compresses.

Motion duration:

180–220ms.

---

# BACKGROUND LIGHT

Background should subtly illuminate nearby glass.

No visible light beams.

No lens flares.

No bloom abuse.

---

# MOBILE

Reduce animated lighting.

Preserve:

- Edge highlights
- Ambient softness

Disable expensive cursor-driven effects.

---

# PERFORMANCE

Animate only:

- opacity
- transform
- CSS variables

Reuse gradients.

Maintain 60 FPS.

---

# AI GENERATION RULES

Every generated interface must:

- Use one global light direction
- Keep highlights subtle
- Preserve readable contrast
- Match official elevation scale

Reject scenes with inconsistent lighting.

---

# QA CHECKLIST

- Light direction consistent
- Shadows soft
- Hero brightest
- Glass edges readable
- Mobile optimized
- No harsh contrast
- Premium atmosphere maintained

---

# IMPLEMENTATION NOTES

Create reusable tokens:

light-primary
light-ambient
highlight-edge
shadow-1
shadow-2
shadow-3
shadow-4

Lighting values must never be hardcoded.

---

# FINAL REQUIREMENTS

Lighting is the signature that transforms transparent panels into believable Liquid Glass.

Every DISCIPLINE screen should feel illuminated by one coherent physical environment.



---

# Source: 09 - Creative Direction/Volume9-06-Shadow-System.md


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



---

# Source: 09 - Creative Direction/Volume9-07-Layering-&-Depth-System.md


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



---

# Source: 09 - Creative Direction/Volume9-08-Floating-Composition-System.md


# DISCIPLINE
# Volume 9 — 08-Floating-Composition-System.md

## OBJECTIVE

Define the composition system that gives DISCIPLINE its distinctive floating, editorial appearance.

Interfaces should feel designed like premium magazine covers built from Liquid Glass rather than conventional web layouts.

---

# CREATIVE PRINCIPLE

Nothing should feel trapped inside rigid rectangles.

Every composition breathes.

Every section has depth.

Every element has a reason to exist.

---

# PAGE STRUCTURE

Compose pages using:

- Editorial whitespace
- Floating glass panels
- Large photography
- Oversized typography
- Intentional asymmetry
- Layered information

Never rely on repetitive section templates.

---

# FLOATING RULES

Components never touch each other directly.

Preferred spacing:

32–64px.

Leave visible air around every floating panel.

Floating objects should appear suspended above the background.

---

# HERO COMPOSITION

Combine:

- Full-width cinematic media
- Oversized headline
- Floating KPI cards
- Glass navigation
- Floating CTA
- Editorial negative space

The Hero must occupy nearly the full viewport.

---

# ASYMMETRY

Avoid centered layouts.

Shift content naturally.

Examples:

- Left headline / right subject
- Right floating statistics
- Offset CTA
- Partial overlaps

Balance through whitespace.

---

# NEGATIVE SPACE

Empty space is intentional.

It creates:

- Calm
- Luxury
- Readability
- Focus

Never fill empty areas unnecessarily.

---

# OVERLAPPING

Allowed:

- Hero image behind typography
- KPI cards over imagery
- Floating ebook previews
- Coaching cards crossing section boundaries

Forbidden:

- Random overlaps
- Hidden CTAs
- Clutter

---

# VISUAL RHYTHM

Alternate:

Editorial

↓

Minimal

↓

Immersive

↓

Compact

↓

Editorial

Avoid repeating identical section compositions.

---

# SECTION FLOW

Every section ends by visually pointing toward the next.

Methods:

- Directional photography
- Floating arrows
- Glass continuation panels
- Typography alignment
- Scroll cues

---

# CONTENT DENSITY

Hero:
Minimal.

Feature sections:
Moderate.

Pricing:
Dense but organized.

Testimonials:
Airy.

Footer:
Minimal.

---

# MOBILE

Do not simply stack desktop layouts.

Recompose.

Keep floating feeling through:

- Offset cards
- Layered spacing
- Soft overlaps
- Large margins

---

# PERFORMANCE

Use GPU transforms.

Limit simultaneous floating animations.

Maintain smooth scrolling.

---

# AI GENERATION RULES

Generated pages must:

- Feel editorial
- Avoid SaaS templates
- Preserve floating depth
- Respect negative space
- Maintain asymmetrical balance

Reject pages that resemble landing page builders.

---

# QA CHECKLIST

- Floating illusion maintained
- Editorial rhythm preserved
- Whitespace intentional
- Hero premium
- Asymmetry balanced
- Mobile redesigned
- Smooth motion

---

# IMPLEMENTATION NOTES

Create reusable layout primitives:

- FloatingSection
- GlassCluster
- EditorialGrid
- OffsetStack
- HeroCanvas
- FloatingMetrics

Compose every landing page from these primitives instead of fixed templates.

---

# FINAL REQUIREMENTS

A screenshot of DISCIPLINE should immediately evoke a premium editorial experience with floating Liquid Glass architecture, generous whitespace and cinematic composition worthy of a modern design showcase.



---

# Source: 09 - Creative Direction/Volume9-09-Editorial-Grid-System.md


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

# Source: 09 - Creative Direction/Volume9-14-Premium-Motion-Language.md


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



---

# Source: 09 - Creative Direction/Volume9-15-Interaction-Physics.md


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



---

# Source: 09 - Creative Direction/Volume9-16-Micro-Details.md


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



---

# Source: 09 - Creative Direction/Volume9-17-Premium-Typography-System.md


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



---

# Source: 09 - Creative Direction/Volume9-18-AI-Creative-Director.md


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



---

# Source: 09 - Creative Direction/Volume9-20-Creative-Manifesto.md


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
