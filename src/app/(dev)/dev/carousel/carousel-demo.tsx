'use client'

import {
  Activity,
  Dumbbell,
  HeartPulse,
  Image as ImageIcon,
  Moon,
  Utensils,
} from 'lucide-react'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * Carousel is a Data Display primitive: a scroll-snapping track the user
 * steps through one region at a time — "how do I browse sequentially?" No
 * lightbox, zoom, fullscreen, autoplay, infinite scroll, virtualization or
 * drag logic; those belong to higher components. It composes only frozen
 * primitives (IconButton/Icon and whatever a consumer places in each Item —
 * Card, Avatar, Badge, Heading, Text, Button) with zero adaptation. The
 * scene sits on the shared capture wallpaper.
 */
function Section({
  title,
  description,
  children,
  'data-testid': dataTestId,
}: {
  title: string
  description?: string
  children: React.ReactNode
  'data-testid'?: string
}) {
  return (
    <section className="flex flex-col gap-3" data-testid={dataTestId}>
      <div className="flex flex-col gap-1">
        <Heading as="h3" level={5}>
          {title}
        </Heading>
        {description && (
          <Text className="text-body-sm text-text-secondary">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

const programmes = [
  { name: 'Hypertrophy', focus: 'Muscle gain', weeks: '12 weeks' },
  { name: 'Strength', focus: 'Max force', weeks: '8 weeks' },
  { name: 'Mobility', focus: 'Range of motion', weeks: '6 weeks' },
  { name: 'Nutrition', focus: 'Body recomposition', weeks: 'Ongoing' },
  { name: 'Recovery', focus: 'Sleep & deload', weeks: '2 weeks' },
]

const clients = [
  { name: 'Léa Martin', progress: '68%', status: 'Active' as const },
  { name: 'Hugo Izquierdo', progress: '42%', status: 'Draft' as const },
  { name: 'Marc Dubois', progress: '91%', status: 'Archived' as const },
  { name: 'Nina Rossi', progress: '15%', status: 'Active' as const },
]

const statusVariant = {
  Active: 'success',
  Draft: 'neutral',
  Archived: 'neutral',
} as const

const library = [
  { name: 'Nutrition', icon: Utensils },
  { name: 'Training', icon: Dumbbell },
  { name: 'Sleep', icon: Moon },
  { name: 'Recovery', icon: HeartPulse },
  { name: 'Cardio', icon: Activity },
]

const exercises = ['Bench Press', 'Row', 'Squat', 'Deadlift', 'Overhead Press']

export function CarouselScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Carousel
          </Heading>
          <Text className="text-text-secondary">
            A Data Display primitive that answers only &ldquo;how do I browse
            sequentially through a series of items?&rdquo; — never a lightbox,
            never autoplay, never a gallery grid. Native scroll-snap, calm
            smooth motion.
          </Text>
        </div>

        <Section
          title="Basic"
          description="One item per view, horizontal (default). Prev/Next step; native smooth scroll."
          data-testid="cr-basic"
        >
          <Carousel aria-label="Basic slides">
            <div className="flex items-center justify-between gap-4">
              <Text className="text-body-sm text-text-secondary">
                Step through the slides
              </Text>
              <div className="flex gap-2">
                <Carousel.Previous size="sm" />
                <Carousel.Next size="sm" />
              </div>
            </div>
            <Carousel.Content>
              {[1, 2, 3, 4].map((n) => (
                <Carousel.Item key={n} className="basis-full px-1">
                  <div className="flex h-40 items-center justify-center rounded-lg border border-divider bg-surface">
                    <Heading as="span" level={3}>
                      Slide {n}
                    </Heading>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators />
          </Carousel>
        </Section>

        <Section
          title="Programmes — Cards"
          description="Each slide is a real GlassCard, several visible at once (basis narrows the item)."
          data-testid="cr-programmes"
        >
          <Carousel aria-label="Programmes">
            <div className="flex items-center justify-end gap-2">
              <Carousel.Previous size="sm" />
              <Carousel.Next size="sm" />
            </div>
            <Carousel.Content className="gap-4">
              {programmes.map((p) => (
                <Carousel.Item
                  key={p.name}
                  className="basis-[70%] sm:basis-1/2 lg:basis-1/3"
                >
                  <GlassCard className="h-full">
                    <div className="flex flex-col gap-1 p-5">
                      <Heading as="h4" level={5}>
                        {p.name}
                      </Heading>
                      <Text className="text-body-sm text-text-secondary">
                        {p.focus}
                      </Text>
                      <Text className="text-caption text-text-tertiary">
                        {p.weeks}
                      </Text>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        <Section
          title="Clients — mixed content"
          description="Avatar, Heading, Text, Badge and Button composed inside a slide with zero adaptation."
          data-testid="cr-clients"
        >
          <Carousel aria-label="Clients">
            <div className="flex items-center justify-end gap-2">
              <Carousel.Previous size="sm" />
              <Carousel.Next size="sm" />
            </div>
            <Carousel.Content className="gap-4">
              {clients.map((c) => (
                <Carousel.Item
                  key={c.name}
                  className="basis-[75%] sm:basis-1/2"
                >
                  <GlassCard className="h-full">
                    <div className="flex flex-col gap-3 p-5">
                      <div className="flex items-center gap-3">
                        <Avatar size="md">
                          <Avatar.Fallback>
                            {getInitials(c.name)}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Heading as="h4" level={5}>
                            {c.name}
                          </Heading>
                          <Text className="text-caption text-text-tertiary">
                            {c.progress} complete
                          </Text>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant={statusVariant[c.status]}>
                          {c.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Open
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        <Section
          title="Images"
          description="Aspect-ratio slides — a Carousel never owns image loading, it only lays the track."
          data-testid="cr-images"
        >
          <Carousel aria-label="Images" align="center">
            <Carousel.Content className="gap-4">
              {['Front', 'Side', 'Back', 'Progress'].map((label) => (
                <Carousel.Item key={label} className="basis-[80%] sm:basis-2/3">
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-surface-raised">
                    <div className="flex flex-col items-center gap-2 text-text-tertiary">
                      <Icon icon={ImageIcon} size="lg" />
                      <Text className="text-body-sm text-text-tertiary">
                        {label}
                      </Text>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators />
          </Carousel>
        </Section>

        <Section
          title="Library — without controls"
          description="No Prev/Next rendered — the track still scrolls and snaps; indicators alone can drive it."
          data-testid="cr-no-controls"
        >
          <Carousel aria-label="Library">
            <Carousel.Content className="gap-3">
              {library.map((l) => (
                <Carousel.Item
                  key={l.name}
                  className="basis-[45%] sm:basis-1/3"
                >
                  <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg border border-divider bg-surface">
                    <Icon icon={l.icon} size="lg" />
                    <Text className="text-body-sm">{l.name}</Text>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators />
          </Carousel>
        </Section>

        <Section
          title="Exercises — with indicators"
          description="Position dots; the active one gently elongates. Click a dot to jump."
          data-testid="cr-indicators"
        >
          <Carousel aria-label="Exercises">
            <Carousel.Content className="gap-3">
              {exercises.map((e) => (
                <Carousel.Item key={e} className="basis-[60%] sm:basis-1/2">
                  <div className="flex h-24 items-center justify-center rounded-lg border border-divider bg-surface">
                    <Text className="font-medium">{e}</Text>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators />
          </Carousel>
        </Section>

        <Section
          title="Vertical"
          description='orientation="vertical" — the track scrolls top to bottom; Arrow Up/Down step.'
          data-testid="cr-vertical"
        >
          <Carousel aria-label="Vertical slides" orientation="vertical">
            <div className="flex items-start gap-4">
              <Carousel.Content className="h-48 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <Carousel.Item key={n} className="basis-full">
                    <div className="flex h-48 items-center justify-center rounded-lg border border-divider bg-surface">
                      <Heading as="span" level={4}>
                        Row {n}
                      </Heading>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <div className="flex flex-col gap-2">
                <Carousel.Previous size="sm" />
                <Carousel.Next size="sm" />
              </div>
            </div>
          </Carousel>
        </Section>

        <Section
          title="Loop"
          description="loop — Next past the last wraps to the first; controls stay enabled at the ends."
          data-testid="cr-loop"
        >
          <Carousel aria-label="Looping slides" loop>
            <div className="flex items-center justify-end gap-2">
              <Carousel.Previous size="sm" />
              <Carousel.Next size="sm" />
            </div>
            <Carousel.Content>
              {[1, 2, 3].map((n) => (
                <Carousel.Item key={n} className="basis-full px-1">
                  <div className="flex h-32 items-center justify-center rounded-lg border border-divider bg-surface">
                    <Text>Looping slide {n}</Text>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        <Section
          title="Non loop — disabled controls at the edge"
          description="Without loop, Previous is disabled at the start and Next at the end (real disabled IconButtons)."
          data-testid="cr-non-loop"
        >
          <Carousel aria-label="Non-looping slides">
            <div className="flex items-center justify-end gap-2">
              <Carousel.Previous size="sm" />
              <Carousel.Next size="sm" />
            </div>
            <Carousel.Content>
              {[1, 2, 3].map((n) => (
                <Carousel.Item key={n} className="basis-full px-1">
                  <div className="flex h-32 items-center justify-center rounded-lg border border-divider bg-surface">
                    <Text>Slide {n}</Text>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        <Section
          title="Responsive"
          description="basis breakpoints show more items on wider viewports — the track logic is unchanged."
          data-testid="cr-responsive"
        >
          <Carousel aria-label="Responsive slides">
            <Carousel.Content className="gap-3">
              {programmes.map((p) => (
                <Carousel.Item
                  key={p.name}
                  className="basis-[80%] sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="flex h-24 items-center justify-center rounded-lg border border-divider bg-surface">
                    <Text className="font-medium">{p.name}</Text>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators />
          </Carousel>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the track, snapping, indicators and Arrow keys all mirror correctly.'
          data-testid="cr-rtl"
        >
          <div dir="rtl">
            <Carousel aria-label="شرائح">
              <div className="flex items-center justify-end gap-2">
                <Carousel.Previous size="sm" />
                <Carousel.Next size="sm" />
              </div>
              <Carousel.Content className="gap-3">
                {['البرنامج', 'التغذية', 'النوم', 'التعافي'].map((label) => (
                  <Carousel.Item
                    key={label}
                    className="basis-[70%] sm:basis-1/2"
                  >
                    <div className="flex h-28 items-center justify-center rounded-lg border border-divider bg-surface">
                      <Text className="font-medium">{label}</Text>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Indicators />
            </Carousel>
          </div>
        </Section>

        <Section
          title="Empty"
          description="No items is content, not a Carousel concern — the consumer decides what to render."
          data-testid="cr-empty"
        >
          <Carousel aria-label="Empty carousel">
            <Carousel.Content />
            <Text className="text-body-sm text-text-tertiary">
              No items yet.
            </Text>
          </Carousel>
        </Section>
      </div>
    </div>
  )
}
