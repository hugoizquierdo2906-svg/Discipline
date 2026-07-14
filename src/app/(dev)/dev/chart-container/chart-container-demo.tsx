'use client'

import { RefreshCw, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChartContainer } from '@/components/ui/chart-container'
import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

/**
 * ChartContainer is a Data Display primitive: the CONTAINER for a data
 * visualization, never the visualization. Every "chart" below is a pure
 * inline-SVG PLACEHOLDER drawn with tokens — there is no chart library
 * anywhere. The container only lays out the caption, render zone (with an
 * optional ratio), legend, footer and the load/empty/error states.
 */

// ── Token-only placeholder visualizations (DEMO content, not the primitive) ──

function LinePlaceholder() {
  return (
    <svg
      viewBox="0 0 240 120"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points="0,90 40,70 80,80 120,40 160,52 200,20 240,34"
        fill="none"
        className="text-accent-accessible"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points="0,104 40,96 80,100 120,84 160,92 200,74 240,82"
        fill="none"
        className="text-border-strong"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function BarPlaceholder() {
  const bars = [40, 68, 52, 88, 60, 96, 74]
  return (
    <svg
      viewBox="0 0 240 120"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 34 + 6}
          y={120 - h}
          width="20"
          height={h}
          rx="3"
          className={i === 5 ? 'text-accent-accessible' : 'text-border-strong'}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

function PiePlaceholder() {
  // Three arcs via stroke-dasharray on a ring — still just an SVG placeholder.
  const c = 2 * Math.PI * 40
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        strokeWidth="18"
        className="text-divider"
        stroke="currentColor"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        strokeWidth="18"
        className="text-accent-accessible"
        stroke="currentColor"
        strokeDasharray={`${c * 0.55} ${c}`}
        transform="rotate(-90 60 60)"
        strokeLinecap="butt"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        strokeWidth="18"
        className="text-border-strong"
        stroke="currentColor"
        strokeDasharray={`${c * 0.25} ${c}`}
        strokeDashoffset={`${-c * 0.55}`}
        transform="rotate(-90 60 60)"
        strokeLinecap="butt"
      />
    </svg>
  )
}

function SparkPlaceholder() {
  return (
    <svg
      viewBox="0 0 200 48"
      className="h-12 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points="0,40 30,34 60,36 90,22 120,28 150,12 200,18"
        fill="none"
        className="text-accent-accessible"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function LegendItem({ label, tone }: { label: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block h-2.5 w-2.5 rounded-[3px] ${tone}`}
        aria-hidden="true"
      />
      {label}
    </span>
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

export function ChartContainerScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-16">
        <div className="flex flex-col gap-3">
          <Heading as="h1" level={2}>
            ChartContainer
          </Heading>
          <Text className="max-w-prose text-text-secondary">
            La surface qui accueille une visualisation — jamais la visualisation
            elle-même. Titre, description, zone de rendu, légende, pied et états
            (chargement, vide, erreur). Chaque graphique ci-dessous n’est qu’un
            placeholder SVG.
          </Text>
        </div>

        {/* Basic — render zone only */}
        <Section
          title="Basic"
          description="La forme minimale : une surface et sa zone de rendu, rien d’autre."
          data-testid="cc-basic"
        >
          <ChartContainer>
            <ChartContainer.Content ratio={16 / 6}>
              <LinePlaceholder />
            </ChartContainer.Content>
          </ChartContainer>
        </Section>

        {/* With header + description */}
        <Section
          title="With Header & Description"
          description="Le titre nomme la figure (aria-labelledby) et la description la décrit (aria-describedby)."
          data-testid="cc-header"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>Activité hebdomadaire</ChartContainer.Title>
              <ChartContainer.Description>
                Minutes d’effort par jour sur les sept derniers jours.
              </ChartContainer.Description>
            </ChartContainer.Header>
            <ChartContainer.Content ratio={16 / 6}>
              <BarPlaceholder />
            </ChartContainer.Content>
          </ChartContainer>
        </Section>

        {/* With legend */}
        <Section
          title="With Legend"
          description="La légende est une rangée d’éléments fournis par le consommateur — jamais des séries que le conteneur inventerait."
          data-testid="cc-legend"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>
                Charge vs. récupération
              </ChartContainer.Title>
            </ChartContainer.Header>
            <ChartContainer.Content ratio={16 / 6}>
              <LinePlaceholder />
            </ChartContainer.Content>
            <ChartContainer.Legend>
              <LegendItem label="Charge" tone="bg-accent-accessible" />
              <LegendItem label="Récupération" tone="bg-border-strong" />
            </ChartContainer.Legend>
          </ChartContainer>
        </Section>

        {/* With footer */}
        <Section
          title="With Footer"
          description="Le pied accueille une note discrète : source, horodatage, unité."
          data-testid="cc-footer"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>
                Répartition de l’effort
              </ChartContainer.Title>
            </ChartContainer.Header>
            <ChartContainer.Content ratio={16 / 7}>
              <BarPlaceholder />
            </ChartContainer.Content>
            <ChartContainer.Footer>
              Mis à jour il y a 2 h · minutes par jour
            </ChartContainer.Footer>
          </ChartContainer>
        </Section>

        {/* Loading */}
        <Section
          title="Loading"
          description="La zone de rendu accueille le Spinner gelé (role=status), centré."
          data-testid="cc-loading"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>
                Chargement des données
              </ChartContainer.Title>
            </ChartContainer.Header>
            <ChartContainer.Loading label="Chargement du graphique" />
          </ChartContainer>
        </Section>

        {/* Empty */}
        <Section
          title="Empty"
          description="Composition du EmptyState gelé : une absence de données assumée, pas une erreur."
          data-testid="cc-empty"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>Progression</ChartContainer.Title>
            </ChartContainer.Header>
            <ChartContainer.Empty
              icon={<Icon icon={TrendingUp} />}
              title="Aucune donnée pour l’instant"
              description="Enregistre une première séance pour voir ta courbe apparaître ici."
              action={<Button size="sm">Commencer</Button>}
            />
          </ChartContainer>
        </Section>

        {/* Error */}
        <Section
          title="Error"
          description="Composition du ErrorState gelé : un échec, souvent réessayable."
          data-testid="cc-error"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>Tendance mensuelle</ChartContainer.Title>
            </ChartContainer.Header>
            <ChartContainer.Error
              title="Impossible de charger le graphique"
              description="Vérifie ta connexion, puis réessaie."
              action={
                <Button size="sm" variant="secondary">
                  <Icon icon={RefreshCw} />
                  Réessayer
                </Button>
              }
            />
          </ChartContainer>
        </Section>

        {/* Dashboard metric */}
        <Section
          title="Dashboard metric"
          description="Le conteneur accueille aussi bien un chiffre-clé et sa sparkline qu’un graphique complet."
          data-testid="cc-metric"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>Volume total</ChartContainer.Title>
              <ChartContainer.Description>
                Cette semaine
              </ChartContainer.Description>
            </ChartContainer.Header>
            <ChartContainer.Content>
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-h2 font-semibold tabular-nums">
                    12 480
                  </span>
                  <Badge variant="success">+8,2%</Badge>
                </div>
                <div className="max-w-[60%] flex-1">
                  <SparkPlaceholder />
                </div>
              </div>
            </ChartContainer.Content>
          </ChartContainer>
        </Section>

        {/* Placeholders row: line / bar / pie */}
        <Section
          title="Line · Bar · Pie placeholders"
          description="Trois technologies de rendu hypothétiques, un seul et même conteneur."
          data-testid="cc-placeholders"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <ChartContainer data-testid="cc-line">
              <ChartContainer.Header>
                <ChartContainer.Title>Ligne</ChartContainer.Title>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={4 / 3}>
                <LinePlaceholder />
              </ChartContainer.Content>
            </ChartContainer>
            <ChartContainer data-testid="cc-bar">
              <ChartContainer.Header>
                <ChartContainer.Title>Barres</ChartContainer.Title>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={4 / 3}>
                <BarPlaceholder />
              </ChartContainer.Content>
            </ChartContainer>
            <ChartContainer data-testid="cc-pie">
              <ChartContainer.Header>
                <ChartContainer.Title>Secteurs</ChartContainer.Title>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={1}>
                <div className="flex h-full items-center justify-center">
                  <PiePlaceholder />
                </div>
              </ChartContainer.Content>
              <ChartContainer.Legend className="justify-center">
                <LegendItem label="Force" tone="bg-accent-accessible" />
                <LegendItem label="Cardio" tone="bg-border-strong" />
                <LegendItem label="Mobilité" tone="bg-divider" />
              </ChartContainer.Legend>
            </ChartContainer>
          </div>
        </Section>

        {/* Mixed dashboard */}
        <Section
          title="Mixed dashboard"
          description="Plusieurs conteneurs alignés — c’est un écran consommateur qui les arrange, jamais le primitif."
          data-testid="cc-dashboard"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <ChartContainer intent="primary">
              <ChartContainer.Header>
                <ChartContainer.Title>
                  Progression 12 semaines
                </ChartContainer.Title>
                <ChartContainer.Description>
                  Charge cumulée
                </ChartContainer.Description>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={16 / 8}>
                <LinePlaceholder />
              </ChartContainer.Content>
              <ChartContainer.Footer>
                Source : journal d’entraînement
              </ChartContainer.Footer>
            </ChartContainer>
            <ChartContainer>
              <ChartContainer.Header>
                <ChartContainer.Title>Séances par semaine</ChartContainer.Title>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={16 / 8}>
                <BarPlaceholder />
              </ChartContainer.Content>
              <ChartContainer.Legend>
                <LegendItem label="Réalisées" tone="bg-accent-accessible" />
                <LegendItem label="Prévues" tone="bg-border-strong" />
              </ChartContainer.Legend>
            </ChartContainer>
          </div>
        </Section>

        {/* Responsive */}
        <Section
          title="Responsive"
          description="La zone de rendu conserve son ratio ; la surface s’adapte à la largeur."
          data-testid="cc-responsive"
        >
          <ChartContainer>
            <ChartContainer.Header>
              <ChartContainer.Title>Effort quotidien</ChartContainer.Title>
              <ChartContainer.Description>
                Le ratio 21:9 se maintient de mobile à desktop.
              </ChartContainer.Description>
            </ChartContainer.Header>
            <ChartContainer.Content ratio={21 / 9}>
              <LinePlaceholder />
            </ChartContainer.Content>
          </ChartContainer>
        </Section>

        {/* RTL */}
        <Section
          title="RTL"
          description="En arabe, l’en-tête, la légende et le pied se reflètent via les propriétés logiques."
          data-testid="cc-rtl"
        >
          <div dir="rtl">
            <ChartContainer>
              <ChartContainer.Header>
                <ChartContainer.Title>النشاط الأسبوعي</ChartContainer.Title>
                <ChartContainer.Description>
                  دقائق المجهود لكل يوم
                </ChartContainer.Description>
              </ChartContainer.Header>
              <ChartContainer.Content ratio={16 / 6}>
                <BarPlaceholder />
              </ChartContainer.Content>
              <ChartContainer.Legend>
                <LegendItem label="الحمل" tone="bg-accent-accessible" />
                <LegendItem label="التعافي" tone="bg-border-strong" />
              </ChartContainer.Legend>
            </ChartContainer>
          </div>
        </Section>
      </div>
    </div>
  )
}
