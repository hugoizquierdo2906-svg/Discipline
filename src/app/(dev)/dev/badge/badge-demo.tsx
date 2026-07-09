'use client'

import { BadgeCheck, Circle, Crown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * Badge is a Data Display primitive — a compact, static property attached to a
 * datum. It always accompanies existing content, so the demos show it inside
 * real data surfaces (a GlassCard, a table) on the shared capture wallpaper,
 * never floating alone. The page is deliberately lean: each section
 * demonstrates a genuinely distinct behaviour, not a swatch of every colour.
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
          <Heading as="h2" level={3}>
            Badge
          </Heading>
          <Text className="text-text-secondary">
            The smallest representation of a property — a compact, static label
            attached to a datum. Cut from DISCIPLINE&apos;s Liquid Glass, it
            almost disappears until you need it: the colour is carried by the
            text, never an aggressive fill. Purely informative, never
            interactive, never alone.
          </Text>
        </div>

        <Section title="Basic" data-testid="bd-basic">
          <Badge>Active</Badge>
        </Section>

        <Section
          title="Variants"
          description="The four true semantic colours — everything else is neutral."
          data-testid="bd-variants"
        >
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </Section>

        <Section
          title="Soft (default)"
          description="Near-neutral glass; the colour lives in the text and a faint hairline."
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
          description="The single strong voice — a deep, desaturated fill for the rare case that must dominate."
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
          description="The lightest weight — bare glass and a coloured hairline."
          data-testid="bd-outline"
        >
          <Badge appearance="outline" variant="neutral">
            Draft
          </Badge>
          <Badge appearance="outline" variant="success">
            Active
          </Badge>
        </Section>

        <Section
          title="With / without icon"
          description="An icon may carry the colour; the text always stays dominant."
          data-testid="bd-icon"
        >
          <Badge variant="success" icon={<Icon icon={BadgeCheck} />}>
            Verified
          </Badge>
          <Badge variant="neutral" icon={<Icon icon={Circle} />}>
            Active
          </Badge>
          <Badge variant="neutral" icon={<Icon icon={Crown} />}>
            Coach
          </Badge>
        </Section>

        <Section title="Without icon" data-testid="bd-no-icon">
          <Badge variant="success">Verified</Badge>
          <Badge variant="neutral">Coach</Badge>
        </Section>

        <Section
          title="Sizes"
          description="Small and medium cover 99% of usages; the Badge keeps its size, it never resizes."
          data-testid="bd-sizes"
        >
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </Section>

        <Section
          title="Business properties"
          description="Roles, plans, categories — all wear the neutral glass. The meaning is in the word, not a bespoke colour."
          data-testid="bd-business"
        >
          <Badge>Coach</Badge>
          <Badge>Premium</Badge>
          <Badge>Client</Badge>
          <Badge>Admin</Badge>
          <Badge>Hypertrophy</Badge>
          <Badge>Strength</Badge>
        </Section>

        <Section
          title="Count"
          description="A numeric property in the same restrained material as the rest — inline, not a floating overlay."
          data-testid="bd-count"
        >
          <Badge>12 clients</Badge>
          <Badge variant="success">3 new</Badge>
          <Badge size="sm">99+</Badge>
        </Section>

        <Section
          title="Inside a Card"
          description="A Badge qualifying a datum on a real Liquid Glass surface."
          data-testid="bd-in-card"
        >
          <GlassCard className="w-full max-w-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <Text className="font-semibold">Hypertrophy Block 1</Text>
                <Text className="text-body-sm text-text-secondary">
                  12 clients · updated today
                </Text>
              </div>
              <Badge variant="success">Published</Badge>
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
          title="RTL"
          description='dir="rtl" — the icon flips to the start edge naturally via flex.'
          data-testid="bd-rtl"
        >
          <div dir="rtl" className="flex flex-wrap gap-2">
            <Badge variant="success" icon={<Icon icon={BadgeCheck} />}>
              موثّق
            </Badge>
            <Badge icon={<Icon icon={Crown} />}>مدرّب</Badge>
          </div>
        </Section>
      </div>
    </div>
  )
}
