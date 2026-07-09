'use client'

import { Button } from '@/components/ui/button'
import { Code } from '@/components/ui/code'
import { Drawer } from '@/components/ui/drawer'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'

/**
 * Text is a Typography primitive: the body of the content, from the one
 * canonical `text-body`/`text-text` token pair. `as` changes only the
 * semantic tag (p/span/div/strong/em/small) — never the visual style. It
 * carries no margin or padding of its own. The scene sits on the shared
 * capture wallpaper.
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

export function TextScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Text
          </Heading>
          <Text className="text-text-secondary">
            A Typography primitive that answers only &ldquo;this is textual
            content.&rdquo; One canonical body style, from tokens only —{' '}
            <code>as</code> changes the semantic tag, never the style.
          </Text>
        </div>

        <Section
          title="Paragraph"
          description="The default — a real <p>."
          data-testid="tx-paragraph"
        >
          <Text>
            Consistency compounds. A single missed session rarely changes your
            trajectory, but the pattern you keep does.
          </Text>
        </Section>

        <Section
          title="Inline span"
          description={'as="span" — flows inline inside surrounding prose.'}
          data-testid="tx-span"
        >
          <p>
            Your next session is <Text as="span">upper body, push</Text>,
            scheduled for tomorrow morning.
          </p>
        </Section>

        <Section
          title="Strong"
          description={'as="strong" — native importance, not a weight prop.'}
          data-testid="tx-strong"
        >
          <Text>
            <Text as="strong">Do not skip the warm-up.</Text> It is part of the
            session, not optional preparation.
          </Text>
        </Section>

        <Section
          title="Emphasis"
          description={'as="em" — native stress, not italic via a style prop.'}
          data-testid="tx-em"
        >
          <Text>
            This is <Text as="em">your</Text> program, adjusted to your
            equipment and schedule.
          </Text>
        </Section>

        <Section
          title="Small"
          description={'as="small" — native side-comment semantics.'}
          data-testid="tx-small"
        >
          <Text>
            Program starts Monday.{' '}
            <Text as="small">Rest days are already scheduled in.</Text>
          </Text>
        </Section>

        <Section
          title="Long paragraph"
          description="Wraps naturally across lines — no truncation, no fixed height."
          data-testid="tx-long"
        >
          <Text>
            A twelve-week strength and hypertrophy program built for
            intermediate lifters returning after a long break, structured around
            four sessions a week with a deliberate deload every fourth week so
            fatigue never outpaces recovery.
          </Text>
        </Section>

        <Section
          title="Inside Card"
          description="Rendered inside a real Structural Surface — no spacing conflict."
          data-testid="tx-card"
        >
          <GlassCard className="max-w-sm p-6">
            <Heading as="h3" level={4}>
              Program summary
            </Heading>
            <Text className="mt-2">4 days a week, 45 minutes per session.</Text>
          </GlassCard>
        </Section>

        <Section
          title="Inside Drawer"
          description="Rendered inside a real Drawer body — no spacing conflict."
          data-testid="tx-drawer"
        >
          <Drawer
            title="Session details"
            trigger={<Button variant="secondary">Open drawer</Button>}
            size="sm"
            data-testid="tx-drawer-content"
          >
            <Heading as="h3" level={4}>
              Session details
            </Heading>
            <Text className="mt-2">Squat, bench press, barbell row.</Text>
          </Drawer>
        </Section>

        <Section
          title="Inside Modal"
          description="Rendered inside a real Modal/Dialog body — no spacing conflict."
          data-testid="tx-modal"
        >
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </Modal.Trigger>
            <Modal.Content
              aria-describedby={undefined}
              data-testid="tx-modal-content"
            >
              <Modal.Title className="sr-only">
                Delete this program?
              </Modal.Title>
              <Heading as="div" level={4}>
                Delete this program?
              </Heading>
              <Text className="mt-2">This cannot be undone.</Text>
            </Modal.Content>
          </Modal>
        </Section>

        <Section
          title="Inline with Code"
          description="Text and Code sit at the same size — Code inherits it."
          data-testid="tx-inline-code"
        >
          <Text>
            Run <Code>pnpm build</Code> before every deploy.
          </Text>
        </Section>

        <Section
          title="Responsive"
          description="Only the line wrapping changes — never the style."
          data-testid="tx-responsive"
        >
          <Text>
            Your training, adapted to your schedule and available equipment.
          </Text>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the text flows naturally, same size and weight.'
          data-testid="tx-rtl"
        >
          <div dir="rtl">
            <Text>برنامج تدريبك لهذا الأسبوع يبدأ يوم الاثنين.</Text>
          </div>
        </Section>
      </div>
    </div>
  )
}
