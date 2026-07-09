'use client'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'

/**
 * Heading is a Typography primitive: a real h1–h6 (via `as`), sized from the
 * canonical type scale only (via `level`). It carries no margin of its own —
 * every gap seen here is the surrounding layout's `gap`, never Heading's. The
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
          <Text size="body-sm" tone="secondary">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

export function HeadingScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Heading
          </Heading>
          <Text tone="secondary">
            A Typography primitive that answers only &ldquo;this information is
            a title.&rdquo; No margin, no colour choice, no layout — the visual
            size (<code>level</code>) is fully decoupled from the semantic tag (
            <code>as</code>).
          </Text>
        </div>

        <Section
          title="H1"
          description="level={1} — page title."
          data-testid="hd-h1"
        >
          <Heading as="h1" level={1}>
            Build your best program yet
          </Heading>
        </Section>

        <Section
          title="H2"
          description="level={2} — section title."
          data-testid="hd-h2"
        >
          <Heading as="h2" level={2}>
            This week&apos;s training
          </Heading>
        </Section>

        <Section
          title="H3"
          description="level={3} — subsection."
          data-testid="hd-h3"
        >
          <Heading as="h3" level={3}>
            Upper body — push
          </Heading>
        </Section>

        <Section
          title="H4"
          description="level={4} — block title."
          data-testid="hd-h4"
        >
          <Heading as="h4" level={4}>
            Bench press
          </Heading>
        </Section>

        <Section
          title="H5"
          description="level={5} — card / small title."
          data-testid="hd-h5"
        >
          <Heading as="h5" level={5}>
            Set 3 of 4
          </Heading>
        </Section>

        <Section
          title="H6"
          description="level={6} — deepest nesting; reuses the h5 visual size (DISCIPLINE's type scale defines five sizes, not six)."
          data-testid="hd-h6"
        >
          <Heading as="h6" level={6}>
            Notes
          </Heading>
        </Section>

        <Section
          title="Different semantic element"
          description={
            'level={2} rendered as="div" — the visual size stays h2 while opting out of heading semantics entirely (no entry in the screen-reader headings list).'
          }
          data-testid="hd-as-div"
        >
          <Heading as="div" level={2}>
            Visually H2, semantically a div
          </Heading>
        </Section>

        <Section
          title="Long heading"
          description="Wraps naturally across lines — no truncation, no fixed height."
          data-testid="hd-long"
        >
          <Heading as="h2" level={2}>
            A comprehensive twelve-week strength and hypertrophy program for
            intermediate lifters returning after a long break
          </Heading>
        </Section>

        <Section
          title="Inside Card"
          description="Rendered inside a real Structural Surface — no spacing conflict."
          data-testid="hd-card"
        >
          <GlassCard className="max-w-sm p-6">
            <Heading as="h3" level={4}>
              Program summary
            </Heading>
            <Text tone="secondary" className="mt-2">
              4 days a week, 45 minutes per session.
            </Text>
          </GlassCard>
        </Section>

        <Section
          title="Inside Drawer"
          description="Rendered inside a real Drawer body — no spacing conflict."
          data-testid="hd-drawer"
        >
          <Drawer
            title="Session details"
            trigger={<Button variant="secondary">Open drawer</Button>}
            size="sm"
            data-testid="hd-drawer-content"
          >
            <Heading as="h3" level={4}>
              Session details
            </Heading>
            <Text tone="secondary" className="mt-2">
              Squat, bench press, barbell row.
            </Text>
          </Drawer>
        </Section>

        <Section
          title="Inside Modal"
          description="Rendered inside a real Modal/Dialog body — no spacing conflict."
          data-testid="hd-modal"
        >
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </Modal.Trigger>
            <Modal.Content
              aria-describedby={undefined}
              data-testid="hd-modal-content"
            >
              <Modal.Title className="sr-only">
                Delete this program?
              </Modal.Title>
              <Heading as="div" level={4}>
                Delete this program?
              </Heading>
              <Text tone="secondary" className="mt-2">
                This cannot be undone.
              </Text>
            </Modal.Content>
          </Modal>
        </Section>

        <Section
          title="Responsive"
          description="Only the line wrapping changes — never the visual size."
          data-testid="hd-responsive"
        >
          <Heading as="h2" level={2}>
            Your training, adapted to your schedule and equipment
          </Heading>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the title flows naturally, same size and weight.'
          data-testid="hd-rtl"
        >
          <div dir="rtl">
            <Heading as="h2" level={2}>
              برنامج تدريبك لهذا الأسبوع
            </Heading>
          </div>
        </Section>
      </div>
    </div>
  )
}
