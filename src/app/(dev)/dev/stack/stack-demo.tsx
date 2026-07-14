'use client'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChartContainer } from '@/components/ui/chart-container'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Stack } from '@/components/ui/stack'
import { Table } from '@/components/ui/table'
import { Text } from '@/components/ui/text'

/**
 * Stack is a Layout primitive: it distributes elements along one axis with a
 * consistent gap and nothing else — no surface, no colour, no material. The
 * tinted tiles below only exist to make the distribution visible; Stack draws
 * none of them. The composition section shows Stack laying out the real,
 * unmodified Design System.
 */

// A neutral tile, only so the axis/gap/alignment is visible in a demo.
function Tile({
  children,
  tall,
}: {
  children: React.ReactNode
  tall?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border border-border bg-surface-2 px-4 text-body-sm text-text-secondary ${tall ? 'h-16' : 'h-10'}`}
    >
      {children}
    </div>
  )
}

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
    <section className="flex flex-col gap-4" data-testid={dataTestId}>
      <div className="flex flex-col gap-1.5">
        <Heading as="h2" level={5}>
          {title}
        </Heading>
        {description && (
          <Text className="max-w-prose text-body-sm text-text-secondary">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

const gaps = [
  { gap: 'xs', label: 'XS · 4' },
  { gap: 'sm', label: 'SM · 8' },
  { gap: 'md', label: 'MD · 16' },
  { gap: 'lg', label: 'LG · 24' },
  { gap: 'xl', label: 'XL · 32' },
] as const

export function StackScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-16">
        <Stack gap="sm">
          <Heading as="h1" level={2}>
            Stack
          </Heading>
          <Text className="max-w-prose text-text-secondary">
            Un primitif de mise en page : distribuer des éléments sur un axe
            avec un espacement cohérent. Il remplace les centaines de
            <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 text-body-sm">
              &lt;div class=&quot;flex flex-col gap-4&quot;&gt;
            </code>
            de l’application. Il ne dessine rien lui-même.
          </Text>
        </Stack>

        {/* Basic vertical */}
        <Section
          title="Basic · vertical"
          description="Direction verticale par défaut, gap md (16px)."
          data-testid="st-basic"
        >
          <Stack data-testid="st-basic-stack">
            <Tile>Premier</Tile>
            <Tile>Deuxième</Tile>
            <Tile>Troisième</Tile>
          </Stack>
        </Section>

        {/* Horizontal */}
        <Section
          title="Horizontal"
          description="Le même primitif, sur l’axe horizontal."
          data-testid="st-horizontal"
        >
          <Stack direction="horizontal" data-testid="st-horizontal-stack">
            <Tile>Un</Tile>
            <Tile>Deux</Tile>
            <Tile>Trois</Tile>
          </Stack>
        </Section>

        {/* Gaps */}
        <Section
          title="Gap · XS → XL"
          description="Une seule échelle d’espacement (--ds-space) : 4 · 8 · 16 · 24 · 32."
          data-testid="st-gaps"
        >
          <Stack gap="lg">
            {gaps.map((g) => (
              <Stack key={g.gap} gap="xs">
                <Text className="text-caption uppercase tracking-[0.14em] text-text-tertiary">
                  {g.label}
                </Text>
                <Stack
                  direction="horizontal"
                  gap={g.gap}
                  data-testid={`st-gap-${g.gap}`}
                >
                  <Tile>A</Tile>
                  <Tile>B</Tile>
                  <Tile>C</Tile>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Section>

        {/* Align */}
        <Section
          title="Align · start / center / end"
          description="Alignement transversal (align-items) sur un axe horizontal."
          data-testid="st-align"
        >
          <Stack gap="md">
            {(['start', 'center', 'end'] as const).map((a) => (
              <Stack
                key={a}
                direction="horizontal"
                align={a}
                gap="md"
                data-testid={`st-align-${a}`}
                className="h-24 rounded-md border border-dashed border-border px-3"
              >
                <Tile>Bas</Tile>
                <Tile tall>Haut</Tile>
                <Tile>Bas</Tile>
              </Stack>
            ))}
          </Stack>
        </Section>

        {/* Justify */}
        <Section
          title="Justify · start / center / between"
          description="Distribution sur l’axe principal (justify-content)."
          data-testid="st-justify"
        >
          <Stack gap="md">
            {(['start', 'center', 'between'] as const).map((j) => (
              <Stack
                key={j}
                direction="horizontal"
                justify={j}
                gap="md"
                data-testid={`st-justify-${j}`}
                className="rounded-md border border-dashed border-border p-3"
              >
                <Tile>A</Tile>
                <Tile>B</Tile>
                <Tile>C</Tile>
              </Stack>
            ))}
          </Stack>
        </Section>

        {/* Wrap */}
        <Section
          title="Wrapped"
          description="Les éléments passent à la ligne quand la largeur manque."
          data-testid="st-wrap"
        >
          <Stack
            direction="horizontal"
            wrap
            gap="sm"
            data-testid="st-wrap-stack"
            className="max-w-md"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <Tile key={i}>#{i + 1}</Tile>
            ))}
          </Stack>
        </Section>

        {/* Reverse */}
        <Section
          title="Reverse"
          description="L’ordre VISUEL est inversé ; l’ordre du DOM (et du clavier) reste intact."
          data-testid="st-reverse"
        >
          <Stack
            direction="horizontal"
            reverse
            gap="md"
            data-testid="st-reverse-stack"
          >
            <Tile>1er dans le DOM</Tile>
            <Tile>2e</Tile>
            <Tile>3e dans le DOM</Tile>
          </Stack>
        </Section>

        {/* Responsive (consumer className, never a Stack breakpoint prop) */}
        <Section
          title="Responsive"
          description="Vertical sur mobile, horizontal dès sm — via le className du consommateur (sm:flex-row), jamais une prop de breakpoint de Stack."
          data-testid="st-responsive"
        >
          <Stack
            gap="md"
            data-testid="st-responsive-stack"
            className="sm:flex-row"
          >
            <Tile>Bloc A</Tile>
            <Tile>Bloc B</Tile>
            <Tile>Bloc C</Tile>
          </Stack>
        </Section>

        {/* as — semantic element */}
        <Section
          title="Semantic · as"
          description="Rendu en <ul> : Stack garde la sémantique du consommateur, il ne l’invente jamais."
          data-testid="st-as"
        >
          <Stack as="ul" gap="sm" data-testid="st-as-stack">
            <li>
              <Tile>Élément de liste 1</Tile>
            </li>
            <li>
              <Tile>Élément de liste 2</Tile>
            </li>
          </Stack>
        </Section>

        {/* RTL */}
        <Section
          title="RTL"
          description="L’axe horizontal suit dir=rtl nativement — aucun code directionnel."
          data-testid="st-rtl"
        >
          <div dir="rtl">
            <Stack direction="horizontal" gap="md" data-testid="st-rtl-stack">
              <Tile>الأول</Tile>
              <Tile>الثاني</Tile>
              <Tile>الثالث</Tile>
            </Stack>
          </div>
        </Section>

        {/* Composition with the real Design System */}
        <Section
          title="Composition"
          description="Le même primitif compose naturellement tout le Design System, sans adaptation."
          data-testid="st-composition"
        >
          <Stack gap="lg">
            {/* A form field row */}
            <GlassCard>
              <Stack gap="md">
                <Stack gap="xs">
                  <Heading as="h3" level={5}>
                    Profil
                  </Heading>
                  <Text className="text-body-sm text-text-secondary">
                    Stack aligne un titre, un champ et des actions.
                  </Text>
                </Stack>
                <Input
                  placeholder="Nom du programme"
                  aria-label="Nom du programme"
                />
                <Separator />
                <Stack direction="horizontal" justify="between" align="center">
                  <Stack direction="horizontal" align="center" gap="sm">
                    <Avatar size="sm">
                      <Avatar.Fallback>
                        {getInitials('Léa Martin')}
                      </Avatar.Fallback>
                    </Avatar>
                    <Text className="text-body-sm">Léa Martin</Text>
                    <Badge variant="success">Active</Badge>
                  </Stack>
                  <Stack direction="horizontal" gap="sm">
                    <Button variant="ghost" size="sm">
                      Annuler
                    </Button>
                    <Button size="sm">Enregistrer</Button>
                  </Stack>
                </Stack>
              </Stack>
            </GlassCard>

            {/* Two cards side by side, then a table + chart */}
            <Stack direction="horizontal" gap="md" wrap>
              <ChartContainer className="min-w-64 flex-1">
                <ChartContainer.Header>
                  <ChartContainer.Title>Charge</ChartContainer.Title>
                </ChartContainer.Header>
                <ChartContainer.Content ratio={16 / 7}>
                  <svg
                    viewBox="0 0 240 105"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <polyline
                      points="0,80 40,60 80,68 120,34 160,44 200,18 240,30"
                      fill="none"
                      className="text-accent-accessible"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />
                  </svg>
                </ChartContainer.Content>
              </ChartContainer>
              <GlassCard className="min-w-64 flex-1">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Jour</Table.Head>
                      <Table.Head align="end">Minutes</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Lundi</Table.Cell>
                      <Table.Cell align="end">42</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Mardi</Table.Cell>
                      <Table.Cell align="end">58</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </GlassCard>
            </Stack>
          </Stack>
        </Section>
      </div>
    </div>
  )
}
