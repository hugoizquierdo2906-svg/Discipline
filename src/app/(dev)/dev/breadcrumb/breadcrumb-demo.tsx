'use client'

import { ChevronRight, Dumbbell, Home, ImageIcon, User } from 'lucide-react'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

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
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      <div className="rounded-lg border border-border bg-surface px-5 py-4">
        {children}
      </div>
    </section>
  )
}

const longHierarchy = [
  { label: 'Programs', href: '/programs' },
  { label: 'Hypertrophy', href: '/programs/hypertrophy' },
  { label: 'Block 2', href: '/programs/hypertrophy/block-2' },
  { label: 'Week 4', href: '/programs/hypertrophy/block-2/week-4' },
  { label: 'Day 3', href: '/programs/hypertrophy/block-2/week-4/day-3' },
  { label: 'Exercise', current: true },
]

const clientHierarchy = [
  { label: 'Clients', href: '/clients' },
  { label: 'Léa Moreau', href: '/clients/lea-moreau' },
  { label: 'Programs', href: '/clients/lea-moreau/programs' },
  { label: 'Hypertrophy', href: '/clients/lea-moreau/programs/hypertrophy' },
  {
    label: 'Progression',
    href: '/clients/lea-moreau/programs/hypertrophy/progression',
  },
  { label: 'Séance 12', current: true },
]

/** Breadcrumb proof — every required demo case, on the standard page surface. */
export function BreadcrumbScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          Breadcrumb
        </Heading>
        <Text tone="secondary">
          DISCIPLINE&rsquo;s hierarchical position indicator — where am I, never
          where can I go.
        </Text>
      </div>

      <Section title="Minimal" data-testid="breadcrumb-minimal">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section
        title="Long hierarchy — escape hatch (collapse disabled)"
        description="maxItems defaults to 4, so a hierarchy this long collapses on its own — this explicitly opts out (collapse={false}) to show the wrapping fallback still available for the rare case every level must stay visible."
        data-testid="breadcrumb-long"
      >
        <Breadcrumb showHome items={longHierarchy} collapse={false} />
      </Section>

      <Separator />

      <Section
        title="Collapsed (the default)"
        description="Same trail — maxItems=4 is now the default, so this needs no extra props. First crumb + a trailing run of 3; the ellipsis reveals the rest."
        data-testid="breadcrumb-collapsed"
      >
        <Breadcrumb showHome items={clientHierarchy} maxItems={4} />
      </Section>

      <Separator />

      <Section title="Icons" data-testid="breadcrumb-icons">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <Icon icon={Home} size="sm" /> },
            {
              label: 'Clients',
              href: '/clients',
              icon: <Icon icon={User} size="sm" />,
            },
            {
              label: 'Programs',
              href: '/clients/programs',
              icon: <Icon icon={Dumbbell} size="sm" />,
            },
            {
              label: 'Gallery',
              current: true,
              icon: <Icon icon={ImageIcon} size="sm" />,
            },
          ]}
        />
      </Section>

      <Separator />

      <Section
        title="Disabled items"
        description="Programs is archived — inert text, not a link, but still visible for context."
        data-testid="breadcrumb-disabled"
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Programs', href: '/programs', disabled: true },
            { label: 'Hypertrophy', href: '/programs/hypertrophy' },
            { label: 'Block 2', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Loading" data-testid="breadcrumb-loading">
        <Breadcrumb loading loadingItems={4} />
      </Section>

      <Separator />

      <Section
        title="Responsive mobile"
        description="collapse={false} isolates the CSS-only layer from the JS maxItems default: below the md breakpoint, middle crumbs collapse to a static ellipsis (no measuring). Resize the viewport to see it."
        data-testid="breadcrumb-responsive"
      >
        <Breadcrumb showHome items={clientHierarchy} collapse={false} />
      </Section>

      <Separator />

      <Section title="Very long labels" data-testid="breadcrumb-long-labels">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            {
              label: 'Personalized Twelve-Week Hypertrophy & Strength Block',
              href: '/programs/long',
            },
            {
              label: 'Week Four — Upper/Lower Split, Deload Adjusted',
              current: true,
            },
          ]}
        />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — flexbox reverses natively; the chevron separator flips via rtl:rotate-180.'
        data-testid="breadcrumb-rtl"
      >
        <div dir="rtl">
          <Breadcrumb
            separator={
              <Icon icon={ChevronRight} size="sm" className="rtl:rotate-180" />
            }
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'العملاء', href: '/clients' },
              { label: 'ليا', current: true },
            ]}
          />
        </div>
      </Section>

      <Separator />

      <Section title="Custom separator" data-testid="breadcrumb-custom-sep">
        <Breadcrumb
          separator="→"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section
        title="Slash separator (default)"
        data-testid="breadcrumb-slash-sep"
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Chevron separator" data-testid="breadcrumb-chevron-sep">
        <Breadcrumb
          separator={<Icon icon={ChevronRight} size="sm" />}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Dot separator" data-testid="breadcrumb-dot-sep">
        <Breadcrumb
          separator="·"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Home icon" data-testid="breadcrumb-home-icon">
        <Breadcrumb
          showHome
          home={{ icon: <Icon icon={Home} size="sm" /> }}
          items={[
            { label: 'Clients', href: '/clients' },
            { label: 'Léa', current: true },
          ]}
        />
      </Section>
    </div>
  )
}
