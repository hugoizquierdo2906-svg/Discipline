'use client'

import { LayoutGrid } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChartContainer } from '@/components/ui/chart-container'
import { EmptyState } from '@/components/ui/empty-state'
import { GlassCard } from '@/components/ui/glass-card'
import { Grid } from '@/components/ui/grid'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Stack } from '@/components/ui/stack'
import { Table } from '@/components/ui/table'
import { Text } from '@/components/ui/text'

/**
 * Grid is a Layout primitive: it builds a two-dimensional track structure and
 * nothing else — no surface, no colour, no material. The tinted tiles below
 * only exist to make the tracks visible; Grid draws none of them. The
 * composition sections show Grid laying out the real, unmodified Design System.
 */

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-16 items-center justify-center rounded-md border border-border bg-surface-2 text-body-sm text-text-secondary">
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

function MiniChart() {
  return (
    <ChartContainer>
      <ChartContainer.Header>
        <ChartContainer.Title>Charge</ChartContainer.Title>
      </ChartContainer.Header>
      <ChartContainer.Content ratio={16 / 9}>
        <svg
          viewBox="0 0 240 135"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            points="0,104 40,80 80,90 120,50 160,64 200,26 240,42"
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
  )
}

export function GridScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
        <Stack gap="sm">
          <Heading as="h1" level={2}>
            Grid
          </Heading>
          <Text className="max-w-prose text-text-secondary">
            Un primitif de mise en page 2D : des colonnes et des lignes
            alignées, avec un espacement cohérent. Le pendant de Stack pour les
            dispositions où les colonnes doivent s’aligner. Il ne dessine rien
            lui-même.
          </Text>
        </Stack>

        {/* Column counts */}
        <Section
          title="Colonnes · 2 / 3 / 4"
          description="Des colonnes égales — repeat(N, minmax(0, 1fr))."
          data-testid="gr-columns"
        >
          <Stack gap="lg">
            <Grid columns={2} data-testid="gr-2">
              <Tile>1</Tile>
              <Tile>2</Tile>
            </Grid>
            <Grid columns={3} data-testid="gr-3">
              <Tile>1</Tile>
              <Tile>2</Tile>
              <Tile>3</Tile>
            </Grid>
            <Grid columns={4} data-testid="gr-4">
              <Tile>1</Tile>
              <Tile>2</Tile>
              <Tile>3</Tile>
              <Tile>4</Tile>
            </Grid>
          </Stack>
        </Section>

        {/* Auto-fit */}
        <Section
          title="Auto-fit"
          description="Colonnes responsives SANS media query : autant de pistes de ≥ 12rem que la largeur le permet ; les pistes vides se replient."
          data-testid="gr-autofit"
        >
          <Grid minColumnWidth="12rem" fill="fit" data-testid="gr-autofit-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Tile key={i}>#{i + 1}</Tile>
            ))}
          </Grid>
        </Section>

        {/* Auto-fill */}
        <Section
          title="Auto-fill"
          description="Comme auto-fit, mais les pistes vides restent réservées à droite."
          data-testid="gr-autofill"
        >
          <Grid
            minColumnWidth="12rem"
            fill="fill"
            data-testid="gr-autofill-grid"
          >
            <Tile>A</Tile>
            <Tile>B</Tile>
            <Tile>C</Tile>
          </Grid>
        </Section>

        {/* Gap */}
        <Section
          title="Gap"
          description="La même échelle d’espacement que Stack (--ds-space)."
          data-testid="gr-gap"
        >
          <Grid columns={3} gap="xl" data-testid="gr-gap-grid">
            <Tile>1</Tile>
            <Tile>2</Tile>
            <Tile>3</Tile>
          </Grid>
        </Section>

        {/* Align / Justify */}
        <Section
          title="Align · Justify"
          description="Placement du contenu dans chaque cellule (align-items / justify-items)."
          data-testid="gr-alignjustify"
        >
          <Grid
            columns={3}
            align="center"
            justify="center"
            data-testid="gr-align-grid"
          >
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border">
              <Tile>centré</Tile>
            </div>
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border">
              <Tile>centré</Tile>
            </div>
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border">
              <Tile>centré</Tile>
            </div>
          </Grid>
        </Section>

        {/* Dashboard composition */}
        <Section
          title="Dashboard"
          description="Une grille de conteneurs de graphiques, toutes les cartes alignées et de hauteur égale."
          data-testid="gr-dashboard"
        >
          <Grid columns={3} gap="md" data-testid="gr-dashboard-grid">
            <MiniChart />
            <MiniChart />
            <MiniChart />
          </Grid>
        </Section>

        {/* Application layout: sidebar + content via auto columns is consumer's;
            here a 2-pane content grid with a chart and a table */}
        <Section
          title="Layout application"
          description="Deux panneaux alignés : un graphique et un tableau, même hauteur de rangée."
          data-testid="gr-app"
        >
          <Grid columns={2} gap="md" align="stretch" data-testid="gr-app-grid">
            <MiniChart />
            <GlassCard>
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
                  <Table.Row>
                    <Table.Cell>Mercredi</Table.Cell>
                    <Table.Cell align="end">31</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </GlassCard>
          </Grid>
        </Section>

        {/* Form: label/field pairs in a two-column grid */}
        <Section
          title="Formulaire"
          description="Des paires libellé / champ alignées sur deux colonnes."
          data-testid="gr-form"
        >
          <GlassCard>
            <Grid minColumnWidth="16rem" gap="md" data-testid="gr-form-grid">
              <Stack gap="xs">
                <Label htmlFor="g-name">Nom</Label>
                <Input id="g-name" placeholder="Programme" />
              </Stack>
              <Stack gap="xs">
                <Label htmlFor="g-goal">Objectif</Label>
                <Input id="g-goal" placeholder="Force" />
              </Stack>
              <Stack gap="xs">
                <Label htmlFor="g-dur">Durée</Label>
                <Input id="g-dur" placeholder="12 semaines" />
              </Stack>
              <Stack gap="xs">
                <Label htmlFor="g-freq">Fréquence</Label>
                <Input id="g-freq" placeholder="4 / semaine" />
              </Stack>
            </Grid>
          </GlassCard>
        </Section>

        {/* Analytics: metric tiles */}
        <Section
          title="Analytics"
          description="Des tuiles de métriques responsives (auto-fit)."
          data-testid="gr-analytics"
        >
          <Grid minColumnWidth="13rem" gap="md" data-testid="gr-analytics-grid">
            {[
              { k: 'Volume', v: '12 480', d: '+8,2%' },
              { k: 'Séances', v: '18', d: '+2' },
              { k: 'Assiduité', v: '92%', d: '+4pts' },
            ].map((m) => (
              <GlassCard key={m.k}>
                <Stack gap="xs">
                  <Text className="text-caption uppercase tracking-[0.14em] text-text-tertiary">
                    {m.k}
                  </Text>
                  <span className="text-h3 font-semibold tabular-nums">
                    {m.v}
                  </span>
                  <Badge variant="success">{m.d}</Badge>
                </Stack>
              </GlassCard>
            ))}
          </Grid>
        </Section>

        {/* Marketing layout: an asymmetric feel via nested grid */}
        <Section
          title="Layout marketing"
          description="Une grille imbriquée : une colonne de titre, une grille de bénéfices."
          data-testid="gr-marketing"
        >
          <GlassCard>
            <Grid
              columns={2}
              gap="lg"
              align="center"
              data-testid="gr-marketing-grid"
            >
              <Stack gap="sm">
                <Heading as="h3" level={3}>
                  Comprendre, puis progresser
                </Heading>
                <Text className="text-text-secondary">
                  La grille aligne le discours et les preuves sans effort.
                </Text>
                <div>
                  <Button>Commencer</Button>
                </div>
              </Stack>
              <Grid columns={2} gap="sm" data-testid="gr-nested-grid">
                <Tile>Force</Tile>
                <Tile>Cardio</Tile>
                <Tile>Mobilité</Tile>
                <Tile>Repos</Tile>
              </Grid>
            </Grid>
          </GlassCard>
        </Section>

        {/* Responsive via consumer className (never a Grid breakpoint prop) */}
        <Section
          title="Responsive"
          description="Une colonne sur mobile, trois dès sm — via le className du consommateur (sm:grid-cols-3), jamais une prop de breakpoint de Grid."
          data-testid="gr-responsive"
        >
          <Grid
            columns={1}
            gap="md"
            data-testid="gr-responsive-grid"
            className="sm:grid-cols-3"
          >
            <Tile>A</Tile>
            <Tile>B</Tile>
            <Tile>C</Tile>
          </Grid>
        </Section>

        {/* Empty */}
        <Section
          title="Empty"
          description="Une grille sans éléments est simplement vide — le consommateur décide de son état."
          data-testid="gr-empty"
        >
          <GlassCard>
            <EmptyState
              icon={<Icon icon={LayoutGrid} />}
              title="Rien à disposer"
              description="Ajoute des éléments pour remplir la grille."
            />
          </GlassCard>
        </Section>

        {/* RTL */}
        <Section
          title="RTL"
          description="Les colonnes suivent dir=rtl nativement — la première cellule commence à droite."
          data-testid="gr-rtl"
        >
          <div dir="rtl">
            <Grid columns={3} gap="md" data-testid="gr-rtl-grid">
              <Tile>الأول</Tile>
              <Tile>الثاني</Tile>
              <Tile>الثالث</Tile>
            </Grid>
          </div>
        </Section>
      </div>
    </div>
  )
}
