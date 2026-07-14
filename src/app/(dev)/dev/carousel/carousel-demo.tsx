'use client'

import { Avatar, getInitials } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

/**
 * Carousel is a Data Display primitive: a scroll-snapping track the user
 * steps through one region at a time. This scene composes the PREMIUM
 * "focus reading" pattern ON TOP of the unchanged primitive — a bright
 * current chapter, its neighbours quietly scaled/dimmed/blurred, and a
 * gentle staggered settle — entirely from the consumer's own CSS driven by
 * the `data-active` hook the primitive exposes. The primitive itself still
 * draws nothing and makes no per-item layout decision. The scene sits on
 * the shared capture wallpaper.
 */

// The focus/peek treatment: a non-active slide rests on a clear back plane —
// scaled down enough to read as depth (not the active card's plane), dimmed
// to a background weight and whisper-blurred; the active one settles to full
// presence on a calm token-driven transition. The recession is what turns a
// neighbour from "a card cut off at the edge" into "the next chapter, waiting."
// Driven purely by the primitive's `data-active` hook — no primitive change,
// no per-item layout decision.
const peekItem =
  'group transition-[transform,opacity,filter] duration-standard ease-out ' +
  'scale-[0.9] opacity-30 blur-[1.5px] ' +
  'data-[active]:scale-100 data-[active]:opacity-100 data-[active]:blur-0 ' +
  'motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0'

// Content choreography: on becoming active, each element settles up in a
// subtle staggered cascade (title → body → meta → cta). Reduced motion
// removes the movement entirely.
const rise =
  'translate-y-1 transition-transform duration-standard ease-out ' +
  'group-data-[active]:translate-y-0 motion-reduce:transition-none motion-reduce:translate-y-0'

// Prev/Next are tools, not visual elements: the frozen IconButton's `ghost`
// glass carries nothing at rest and lifts its material only on hover, so the
// control floats and all but disappears until the eye needs it. The quiet
// `text-text-secondary` chevron overrides ghost's accent tint so the control
// never competes with the single red accent the content owns.
const control = 'text-text-secondary'

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
        <Heading as="h3" level={5}>
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

const chapters = [
  {
    eyebrow: 'Aujourd’hui',
    title: 'Ta séance du jour',
    body: 'Un bloc de force sur le haut du corps. Commence par comprendre l’intention avant de soulever : progresser, pas seulement s’entraîner.',
    cta: 'Commencer',
  },
  {
    eyebrow: 'Nutrition',
    title: 'Ce que ton corps attend',
    body: 'Ta fenêtre protéique est ouverte. Rien de compliqué — un repas simple, aligné sur l’effort d’aujourd’hui.',
    cta: 'Voir le repas',
  },
  {
    eyebrow: 'Récupération',
    title: 'Le sommeil compte autant',
    body: 'La progression se construit au repos. Ta nuit dernière était courte : allège la charge mentale ce soir.',
    cta: 'Planifier',
  },
  {
    eyebrow: 'Progression',
    title: 'Où tu en es',
    body: 'Douze semaines, une direction. Regarde le chemin parcouru avant de penser à la prochaine étape.',
    cta: 'Voir la courbe',
  },
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

export function CarouselScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 py-16">
        <div className="flex flex-col gap-3">
          <Heading as="h2" level={2}>
            Carousel
          </Heading>
          <Text className="max-w-prose text-text-secondary">
            Le membre ne fait pas défiler un carousel. Il avance dans une idée.
            Le chapitre courant est lumineux ; les suivants attendent, calmes,
            en retrait.
          </Text>
        </div>

        {/* HERO — focus reading carousel */}
        <Section
          title="Que dois-je comprendre aujourd’hui ?"
          description="Le chapitre courant occupe l’espace ; le suivant se devine à droite, plus discret. Aucun bouton ne domine, aucun mouvement ne surprend."
          data-testid="cr-basic"
        >
          <Carousel aria-label="Chapitres du jour" className="gap-8">
            <div className="flex items-center justify-between gap-6">
              <Text className="text-caption uppercase tracking-[0.14em] text-text-tertiary">
                4 chapitres
              </Text>
              <div className="flex gap-2">
                <Carousel.Previous
                  size="sm"
                  variant="ghost"
                  className={control}
                />
                <Carousel.Next size="sm" variant="ghost" className={control} />
              </div>
            </div>

            <Carousel.Content className="items-start gap-6 px-0.5 py-1 md:items-stretch">
              {chapters.map((c) => (
                <Carousel.Item
                  key={c.title}
                  className={`basis-[86%] sm:basis-[82%] ${peekItem}`}
                >
                  <GlassCard className="h-full">
                    <div className="flex min-h-64 flex-col gap-5 p-6 md:gap-6 md:p-10">
                      <Text
                        className={`text-caption uppercase tracking-[0.16em] text-accent-accessible delay-100 ${rise}`}
                      >
                        {c.eyebrow}
                      </Text>
                      <div className="flex flex-col gap-4 md:flex-1">
                        <Heading
                          as="h4"
                          level={3}
                          className={`delay-150 ${rise}`}
                        >
                          {c.title}
                        </Heading>
                        <Text
                          className={`max-w-prose text-body-lg leading-relaxed text-text-secondary delay-200 ${rise}`}
                        >
                          {c.body}
                        </Text>
                      </div>
                      <div className={`delay-300 ${rise}`}>
                        <Button size="lg">{c.cta}</Button>
                      </div>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>

            <Carousel.Indicators className="pt-1" />
          </Carousel>
        </Section>

        {/* Clients — the same focus treatment on compact cards */}
        <Section
          title="Tes membres"
          description="Le même langage appliqué à des cartes plus compactes : un membre au centre de l’attention, les autres en attente."
          data-testid="cr-clients"
        >
          <Carousel aria-label="Membres" className="gap-8">
            <div className="flex justify-end gap-2">
              <Carousel.Previous
                size="sm"
                variant="ghost"
                className={control}
              />
              <Carousel.Next size="sm" variant="ghost" className={control} />
            </div>
            <Carousel.Content className="gap-5 px-0.5 py-1">
              {clients.map((c) => (
                <Carousel.Item
                  key={c.name}
                  className={`basis-[78%] sm:basis-1/2 ${peekItem}`}
                >
                  <GlassCard className="h-full">
                    <div className="flex flex-col gap-5 p-6">
                      <div className="flex items-center gap-4">
                        <Avatar size="lg">
                          <Avatar.Fallback>
                            {getInitials(c.name)}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <Heading as="h4" level={5}>
                            {c.name}
                          </Heading>
                          <Text className="text-caption tabular-nums text-text-tertiary">
                            {c.progress} du programme
                          </Text>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant={statusVariant[c.status]}>
                          {c.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Ouvrir
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators className="pt-1" />
          </Carousel>
        </Section>

        {/* Loop */}
        <Section
          title="Loop"
          description="Le pas s’enroule : après le dernier chapitre, le premier revient. Les contrôles restent actifs aux extrémités."
          data-testid="cr-loop"
        >
          <Carousel aria-label="Chapitres en boucle" loop className="gap-6">
            <div className="flex justify-end gap-2">
              <Carousel.Previous
                size="sm"
                variant="ghost"
                className={control}
              />
              <Carousel.Next size="sm" variant="ghost" className={control} />
            </div>
            <Carousel.Content className="gap-6 px-0.5 py-1">
              {chapters.slice(0, 3).map((c, i) => (
                <Carousel.Item
                  key={c.title}
                  className={`basis-[88%] ${peekItem}`}
                >
                  <GlassCard className="h-full">
                    <div className="flex h-40 flex-col justify-center gap-2 p-8">
                      <Text className="text-caption uppercase tracking-[0.16em] text-text-tertiary">
                        Chapitre {i + 1}
                      </Text>
                      <Heading as="h4" level={4}>
                        {c.title}
                      </Heading>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        {/* Non-loop — disabled controls at the edge */}
        <Section
          title="Sans boucle"
          description="Aux extrémités, le contrôle correspondant s’efface simplement : rien ne clignote, rien n’alerte."
          data-testid="cr-non-loop"
        >
          <Carousel aria-label="Chapitres sans boucle" className="gap-6">
            <div className="flex justify-end gap-2">
              <Carousel.Previous
                size="sm"
                variant="ghost"
                className={control}
              />
              <Carousel.Next size="sm" variant="ghost" className={control} />
            </div>
            <Carousel.Content className="gap-6 px-0.5 py-1">
              {chapters.slice(0, 3).map((c, i) => (
                <Carousel.Item
                  key={c.title}
                  className={`basis-[88%] ${peekItem}`}
                >
                  <GlassCard className="h-full">
                    <div className="flex h-40 flex-col justify-center gap-2 p-8">
                      <Text className="text-caption uppercase tracking-[0.16em] text-text-tertiary">
                        Chapitre {i + 1}
                      </Text>
                      <Heading as="h4" level={4}>
                        {c.title}
                      </Heading>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel>
        </Section>

        {/* Vertical */}
        <Section
          title="Vertical"
          description="La même lecture, sur l’axe vertical : on descend dans l’idée. Flèche Haut / Bas."
          data-testid="cr-vertical"
        >
          <Carousel
            aria-label="Chapitres verticaux"
            orientation="vertical"
            className="gap-6"
          >
            <div className="flex items-start gap-5">
              <Carousel.Content className="h-64 gap-5 px-1 py-0.5">
                {chapters.map((c) => (
                  <Carousel.Item
                    key={c.title}
                    className={`basis-full ${peekItem}`}
                  >
                    <GlassCard className="h-full">
                      <div className="flex h-64 flex-col justify-center gap-2 p-8">
                        <Text className="text-caption uppercase tracking-[0.16em] text-text-tertiary">
                          {c.eyebrow}
                        </Text>
                        <Heading as="h4" level={4}>
                          {c.title}
                        </Heading>
                      </div>
                    </GlassCard>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <div className="flex flex-col gap-2">
                <Carousel.Previous
                  size="sm"
                  variant="ghost"
                  className={control}
                />
                <Carousel.Next size="sm" variant="ghost" className={control} />
              </div>
            </div>
          </Carousel>
        </Section>

        {/* Responsive */}
        <Section
          title="Responsive"
          description="Sur écran large, la suite se devine davantage ; la logique de lecture ne change pas."
          data-testid="cr-responsive"
        >
          <Carousel aria-label="Chapitres responsive" className="gap-6">
            <Carousel.Content className="gap-5 px-0.5 py-1">
              {chapters.map((c) => (
                <Carousel.Item
                  key={c.title}
                  className={`basis-[80%] sm:basis-1/2 lg:basis-1/3 ${peekItem}`}
                >
                  <GlassCard className="h-full">
                    <div className="flex h-32 flex-col justify-center gap-2 p-6">
                      <Text className="text-caption uppercase tracking-[0.16em] text-text-tertiary">
                        {c.eyebrow}
                      </Text>
                      <Heading as="h4" level={5}>
                        {c.title}
                      </Heading>
                    </div>
                  </GlassCard>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicators className="pt-1" />
          </Carousel>
        </Section>

        {/* RTL */}
        <Section
          title="RTL"
          description="Piste, snapping, indicateurs et flèches se reflètent naturellement."
          data-testid="cr-rtl"
        >
          <div dir="rtl">
            <Carousel aria-label="فصول" className="gap-6">
              <div className="flex justify-end gap-2">
                <Carousel.Previous
                  size="sm"
                  variant="ghost"
                  className={control}
                />
                <Carousel.Next size="sm" variant="ghost" className={control} />
              </div>
              <Carousel.Content className="gap-5 px-0.5 py-1">
                {['البرنامج', 'التغذية', 'النوم', 'التعافي'].map((label) => (
                  <Carousel.Item
                    key={label}
                    className={`basis-[80%] sm:basis-1/2 ${peekItem}`}
                  >
                    <GlassCard className="h-full">
                      <div className="flex h-28 items-center p-6">
                        <Heading as="h4" level={5}>
                          {label}
                        </Heading>
                      </div>
                    </GlassCard>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Indicators className="pt-1" />
            </Carousel>
          </div>
        </Section>

        {/* Empty */}
        <Section
          title="Vide"
          description="Aucun élément relève du contenu, pas du Carousel — le consommateur décide de ce qu’il affiche."
          data-testid="cr-empty"
        >
          <Carousel aria-label="Carousel vide">
            <Carousel.Content />
            <Text className="text-body-sm text-text-tertiary">
              Rien à lire pour l’instant.
            </Text>
          </Carousel>
        </Section>
      </div>
    </div>
  )
}
