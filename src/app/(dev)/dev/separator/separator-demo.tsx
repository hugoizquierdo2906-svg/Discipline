'use client'

import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading } from '@/components/ui/heading'
import { Modal } from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

/**
 * Separator is a Layout primitive: a quiet hairline that marks two groups of
 * content as visually distinct. It has no content, no spacing, no surface —
 * it should nearly disappear. The scene sits on the shared capture
 * wallpaper.
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

export function SeparatorScene() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Separator
          </Heading>
          <Text className="text-text-secondary">
            A Layout primitive that answers only &ldquo;these two groups of
            content are visually distinct.&rdquo; No spacing, no section, no
            surface — it should nearly disappear.
          </Text>
        </div>

        <Section
          title="Horizontal (default)"
          description="A full-width hairline between two blocks."
          data-testid="sp-horizontal"
        >
          <div className="flex flex-col gap-3">
            <Text>Program overview</Text>
            <Separator />
            <Text>Session history</Text>
          </div>
        </Section>

        <Section
          title="Vertical"
          description={
            'orientation="vertical" — the consumer sizes the cross axis (e.g. h-5).'
          }
          data-testid="sp-vertical"
        >
          <div className="flex h-5 items-center gap-3">
            <Text as="span">Edit</Text>
            <Separator orientation="vertical" />
            <Text as="span">Duplicate</Text>
            <Separator orientation="vertical" />
            <Text as="span">Delete</Text>
          </div>
        </Section>

        <Section
          title="Between Cards"
          description="Marks two independent Cards as distinct, without merging them."
          data-testid="sp-between-cards"
        >
          <div className="flex flex-col gap-4">
            <GlassCard className="p-4">
              <Text>Upper body — push</Text>
            </GlassCard>
            <Separator />
            <GlassCard className="p-4">
              <Text>Lower body — squat</Text>
            </GlassCard>
          </div>
        </Section>

        <Section
          title="Inside Card"
          description="Separates a Card's own internal groups — no padding of its own."
          data-testid="sp-inside-card"
        >
          <GlassCard className="flex max-w-sm flex-col gap-3 p-6">
            <Text>Program summary</Text>
            <Separator />
            <Text className="text-body-sm text-text-secondary">
              4 days a week, 45 minutes per session.
            </Text>
          </GlassCard>
        </Section>

        <Section
          title="Inside Drawer"
          description="Rendered inside a real Drawer body — no spacing conflict."
          data-testid="sp-drawer"
        >
          <Drawer
            title="Session details"
            trigger={<Button variant="secondary">Open drawer</Button>}
            size="sm"
            data-testid="sp-drawer-content"
          >
            <div className="flex flex-col gap-3">
              <Text>Warm-up</Text>
              <Separator />
              <Text>Working sets</Text>
            </div>
          </Drawer>
        </Section>

        <Section
          title="Inside Modal"
          description="Rendered inside a real Modal/Dialog body — no spacing conflict."
          data-testid="sp-modal"
        >
          <Modal>
            <Modal.Trigger asChild>
              <Button variant="secondary">Open dialog</Button>
            </Modal.Trigger>
            <Modal.Content
              aria-describedby={undefined}
              data-testid="sp-modal-content"
            >
              <Modal.Title asChild>
                <Heading as="h2" level={4}>
                  Delete this program?
                </Heading>
              </Modal.Title>
              <Separator className="my-3" />
              <Text>This cannot be undone.</Text>
            </Modal.Content>
          </Modal>
        </Section>

        <Section
          title="Navigation split"
          description="A vertical hairline between two nav items — decorative (no semantic role)."
          data-testid="sp-nav-split"
        >
          <div className="flex h-5 items-center gap-3">
            <Text as="span">Dashboard</Text>
            <Separator orientation="vertical" decorative />
            <Text as="span">Programs</Text>
            <Separator orientation="vertical" decorative />
            <Text as="span">Clients</Text>
          </div>
        </Section>

        <Section
          title="Form sections"
          description="Marks a genuine content boundary — non-decorative, exposed to assistive tech."
          data-testid="sp-form-sections"
        >
          <div className="flex flex-col gap-3">
            <Text>Account details</Text>
            <Separator decorative={false} />
            <Text>Billing details</Text>
          </div>
        </Section>

        <Section
          title="Responsive"
          description="Only the container width changes — the hairline always follows it."
          data-testid="sp-responsive"
        >
          <div className="flex flex-col gap-3">
            <Text>Section A</Text>
            <Separator />
            <Text>Section B</Text>
          </div>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — the hairline still spans the full width naturally.'
          data-testid="sp-rtl"
        >
          <div dir="rtl" className="flex flex-col gap-3">
            <Text>القسم الأول</Text>
            <Separator />
            <Text>القسم الثاني</Text>
          </div>
        </Section>

        <Section
          title="Decorative vs. semantic"
          description="Decorative (default) carries no ARIA role; non-decorative exposes role=separator."
          data-testid="sp-decorative"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Text className="text-body-sm text-text-secondary">
                decorative (default) — no role, hidden from the accessibility
                tree
              </Text>
              <Separator data-testid="sp-decorative-true" />
            </div>
            <div className="flex flex-col gap-2">
              <Text className="text-body-sm text-text-secondary">
                decorative=&#123;false&#125; — role=&quot;separator&quot;
              </Text>
              <Separator decorative={false} data-testid="sp-decorative-false" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
