'use client'

import { BadgeCheck, Circle, Crown, Dumbbell, Flame, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * Badge is a Data Display primitive — a compact, static property attached to a
 * datum. It always accompanies existing content, so the demos show it inside
 * real data surfaces (a GlassCard, a table, a list) on the shared capture
 * wallpaper, never floating alone.
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
        <Heading as="h3" level="h5">
          {title}
        </Heading>
        {description && (
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  )
}

export function BadgeScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level="h3">
            Badge
          </Heading>
          <Text tone="secondary">
            A small, static property attached to a datum — Active, Premium,
            Draft, a role, a priority, a count. Purely informative, never
            interactive, never alone. Built only from the design system&apos;s
            color and typography tokens.
          </Text>
        </div>

        <Section title="Basic" data-testid="bd-basic">
          <Badge>Active</Badge>
        </Section>

        <Section
          title="Variants (semantic color)"
          description="neutral · success · warning · error · info"
          data-testid="bd-variants"
        >
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </Section>

        <Section
          title="Soft (default)"
          description="Tinted background — the calm default."
          data-testid="bd-soft"
        >
          <Badge appearance="soft" variant="success">
            Paid
          </Badge>
          <Badge appearance="soft" variant="warning">
            Pending
          </Badge>
          <Badge appearance="soft" variant="error">
            Overdue
          </Badge>
        </Section>

        <Section
          title="Solid"
          description="Filled — for the strongest emphasis."
          data-testid="bd-solid"
        >
          <Badge appearance="solid" variant="neutral">
            Archived
          </Badge>
          <Badge appearance="solid" variant="success">
            Paid
          </Badge>
          <Badge appearance="solid" variant="error">
            Overdue
          </Badge>
        </Section>

        <Section
          title="Outline"
          description="Border only — the lightest weight."
          data-testid="bd-outline"
        >
          <Badge appearance="outline" variant="neutral">
            Draft
          </Badge>
          <Badge appearance="outline" variant="info">
            Beta
          </Badge>
          <Badge appearance="outline" variant="success">
            Active
          </Badge>
        </Section>

        <Section title="With icon" data-testid="bd-icon">
          <Badge variant="success" icon={<Icon icon={BadgeCheck} />}>
            Verified
          </Badge>
          <Badge variant="warning" icon={<Icon icon={Flame} />}>
            Streak
          </Badge>
          <Badge appearance="solid" variant="info" icon={<Icon icon={Crown} />}>
            Premium
          </Badge>
        </Section>

        <Section title="Without icon" data-testid="bd-no-icon">
          <Badge variant="success">Verified</Badge>
          <Badge variant="warning">Streak</Badge>
        </Section>

        <Section
          title="Sizes"
          description="xs · sm · md · lg — the Badge keeps its size, it never resizes."
          data-testid="bd-sizes"
        >
          <Badge size="xs" variant="info">
            xs
          </Badge>
          <Badge size="sm" variant="info">
            sm
          </Badge>
          <Badge size="md" variant="info">
            md
          </Badge>
          <Badge size="lg" variant="info">
            lg
          </Badge>
        </Section>

        <Section
          title="Shapes"
          description="rounded · pill · square"
          data-testid="bd-shapes"
        >
          <Badge shape="rounded" variant="neutral">
            Rounded
          </Badge>
          <Badge shape="pill" variant="neutral">
            Pill
          </Badge>
          <Badge shape="square" variant="neutral">
            Square
          </Badge>
        </Section>

        <Section
          title="Status"
          description="A status property of a datum."
          data-testid="bd-status"
        >
          <Badge variant="success" icon={<Icon icon={Circle} />}>
            Active
          </Badge>
          <Badge variant="neutral" icon={<Icon icon={Circle} />}>
            Archived
          </Badge>
          <Badge variant="warning" icon={<Icon icon={Circle} />}>
            Draft
          </Badge>
        </Section>

        <Section title="Role" data-testid="bd-role">
          <Badge appearance="solid" variant="info" icon={<Icon icon={Crown} />}>
            Coach
          </Badge>
          <Badge variant="neutral">Client</Badge>
          <Badge variant="info">Admin</Badge>
        </Section>

        <Section
          title="Priority"
          description="soft → solid encodes rising urgency."
          data-testid="bd-priority"
        >
          <Badge appearance="soft" variant="neutral">
            Low
          </Badge>
          <Badge appearance="soft" variant="warning">
            Medium
          </Badge>
          <Badge appearance="solid" variant="error">
            High
          </Badge>
        </Section>

        <Section title="Category" data-testid="bd-category">
          <Badge variant="info" icon={<Icon icon={Dumbbell} />}>
            Hypertrophy
          </Badge>
          <Badge variant="info">Strength</Badge>
          <Badge variant="info">Mobility</Badge>
        </Section>

        <Section
          title="Count"
          description="A numeric property — inline, not a floating overlay."
          data-testid="bd-count"
        >
          <Badge variant="neutral">12 clients</Badge>
          <Badge variant="success">3 new</Badge>
          <Badge size="xs" variant="error">
            9+
          </Badge>
        </Section>

        <Section
          title="Inside a Card"
          description="A Badge qualifying a datum on a real Liquid Glass surface."
          data-testid="bd-in-card"
        >
          <GlassCard className="w-full max-w-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <Text weight="semibold">Hypertrophy Block 1</Text>
                <Text size="body-sm" tone="secondary">
                  12 clients · updated today
                </Text>
              </div>
              <Badge variant="success" icon={<Icon icon={Star} />}>
                Published
              </Badge>
            </div>
          </GlassCard>
        </Section>

        <Section
          title="Inside a Table"
          description="A status column of Badges."
          data-testid="bd-in-table"
        >
          <GlassCard className="w-full p-4">
            <table className="w-full text-start text-body-sm">
              <thead>
                <tr className="text-text-secondary">
                  <th className="pb-2 text-start font-medium">Client</th>
                  <th className="pb-2 text-start font-medium">Plan</th>
                  <th className="pb-2 text-start font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5">Sarah K.</td>
                  <td className="py-1.5 text-text-secondary">Premium</td>
                  <td className="py-1.5">
                    <Badge size="sm" variant="success">
                      Paid
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5">Marc D.</td>
                  <td className="py-1.5 text-text-secondary">Basic</td>
                  <td className="py-1.5">
                    <Badge size="sm" variant="warning">
                      Pending
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        </Section>

        <Section
          title="Inside a List"
          description="A Badge tagging each list item."
          data-testid="bd-in-list"
        >
          <GlassCard className="w-full p-2">
            <ul className="flex flex-col">
              <li className="flex items-center justify-between gap-3 px-2 py-2">
                <Text size="body-sm">Back Squat</Text>
                <Badge size="sm" variant="neutral">
                  Compound
                </Badge>
              </li>
              <li className="flex items-center justify-between gap-3 px-2 py-2">
                <Text size="body-sm">Face Pull</Text>
                <Badge size="sm" appearance="outline" variant="neutral">
                  Accessory
                </Badge>
              </li>
            </ul>
          </GlassCard>
        </Section>

        <Section
          title="Responsive (keeps its size)"
          description="The Badge does not resize; the row wraps around it."
          data-testid="bd-responsive"
        >
          <Badge variant="success">Active</Badge>
          <Badge variant="info">Premium</Badge>
          <Badge variant="warning">Draft</Badge>
          <Badge variant="error">Overdue</Badge>
          <Badge variant="neutral">Archived</Badge>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the icon flips to the start edge naturally via flex.'
          data-testid="bd-rtl"
        >
          <div dir="rtl" className="flex flex-wrap gap-2">
            <Badge variant="success" icon={<Icon icon={BadgeCheck} />}>
              موثّق
            </Badge>
            <Badge variant="info" icon={<Icon icon={Crown} />}>
              مميّز
            </Badge>
          </div>
        </Section>
      </div>
    </div>
  )
}
