'use client'

import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

/**
 * Collapsible is a Disclosure primitive: one region, one open/closed state,
 * no group logic. It shares the exact Trigger material already established
 * by the frozen Accordion (Accordion is literally built FROM Collapsible),
 * so the atom and the group it forms read as one material. The scene sits
 * on the shared capture wallpaper.
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

export function CollapsibleScene() {
  const [controlledOpen, setControlledOpen] = useState(false)

  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Collapsible
          </Heading>
          <Text className="text-text-secondary">
            A Disclosure primitive that answers only &ldquo;do I want to hide or
            reveal THIS region of content?&rdquo; — one region, no group, no
            exclusivity.
          </Text>
        </div>

        <Section
          title="Basic"
          description="A single region, toggled open and closed."
          data-testid="cl-basic"
        >
          <Collapsible>
            <Collapsible.Trigger>Show details</Collapsible.Trigger>
            <Collapsible.Content>
              12-week program, 4 sessions a week, video guidance included.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Controlled"
          description="open + onOpenChange — the state is owned externally."
          data-testid="cl-controlled"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setControlledOpen(true)}
              >
                Open
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setControlledOpen(false)}
              >
                Close
              </Button>
            </div>
            <Collapsible open={controlledOpen} onOpenChange={setControlledOpen}>
              <Collapsible.Trigger>Session notes</Collapsible.Trigger>
              <Collapsible.Content>
                Increase load by 2.5kg once every set hits 8 reps.
              </Collapsible.Content>
            </Collapsible>
          </div>
        </Section>

        <Section
          title="Uncontrolled"
          description="No open prop — Collapsible owns its own state."
          data-testid="cl-uncontrolled"
        >
          <Collapsible>
            <Collapsible.Trigger>Equipment needed</Collapsible.Trigger>
            <Collapsible.Content>
              Barbell, adjustable bench, squat rack.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Default open"
          description="defaultOpen — starts revealed."
          data-testid="cl-default-open"
        >
          <Collapsible defaultOpen>
            <Collapsible.Trigger>Coach notes</Collapsible.Trigger>
            <Collapsible.Content>
              Keep the bar path vertical; brace before every rep.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Disabled"
          description="The trigger cannot be toggled at all."
          data-testid="cl-disabled"
        >
          <Collapsible disabled>
            <Collapsible.Trigger>Locked section</Collapsible.Trigger>
            <Collapsible.Content>Never shown.</Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="forceMount"
          description="The content stays mounted in the DOM even while closed."
          data-testid="cl-force-mount"
        >
          <Collapsible>
            <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
            <Collapsible.Content
              forceMount
              data-testid="cl-force-mount-content"
            >
              Rest timer, unit system, plate calculator.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Long content"
          description="The region grows naturally — never a fixed height or internal scroll."
          data-testid="cl-long-content"
        >
          <Collapsible defaultOpen>
            <Collapsible.Trigger>Terms of service</Collapsible.Trigger>
            <Collapsible.Content>
              A twelve-week strength and hypertrophy program built for
              intermediate lifters returning after a long break, structured
              around four sessions a week with a deliberate deload every fourth
              week so fatigue never outpaces recovery. Coaching notes, video
              demonstrations and progress tracking are included for the full
              duration of the subscription.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Nested"
          description="A Collapsible inside another Collapsible's content."
          data-testid="cl-nested"
        >
          <Collapsible defaultOpen>
            <Collapsible.Trigger>Program details</Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible>
                <Collapsible.Trigger>Week 1 — Foundations</Collapsible.Trigger>
                <Collapsible.Content>
                  Squat, bench press, barbell row — 3 sets of 8.
                </Collapsible.Content>
              </Collapsible>
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Icon"
          description="A small chevron rotates a flat 180° on open — no bounce, no spring."
          data-testid="cl-icon"
        >
          <Collapsible>
            <Collapsible.Trigger>
              Toggle to see the chevron rotate
            </Collapsible.Trigger>
            <Collapsible.Content>
              Rotation is instant and calm.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Custom trigger"
          description="asChild — the consumer's own element becomes the trigger verbatim."
          data-testid="cl-custom-trigger"
        >
          <Collapsible>
            <Collapsible.Trigger asChild className="cl-custom-marker">
              <Button
                variant="secondary"
                trailingIcon={<ChevronRight size={16} />}
              >
                Custom button trigger
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              This content is revealed by a completely custom trigger element.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — full keyboard and visual behaviour mirrors correctly.'
          data-testid="cl-rtl"
        >
          <div dir="rtl">
            <Collapsible>
              <Collapsible.Trigger>الشحن</Collapsible.Trigger>
              <Collapsible.Content>يشحن خلال يومي عمل.</Collapsible.Content>
            </Collapsible>
          </div>
        </Section>

        <Section
          title="Responsive"
          description="Only the layout width changes — the behaviour stays identical."
          data-testid="cl-responsive"
        >
          <Collapsible>
            <Collapsible.Trigger>Shipping</Collapsible.Trigger>
            <Collapsible.Content>
              Ships within 2 business days.
            </Collapsible.Content>
          </Collapsible>
        </Section>

        <Section
          title="Keyboard"
          description="Tab focuses the trigger; Enter / Space toggle — all inherited from Radix."
          data-testid="cl-keyboard"
        >
          <Collapsible>
            <Collapsible.Trigger>Returns</Collapsible.Trigger>
            <Collapsible.Content>
              Free returns within 30 days.
            </Collapsible.Content>
          </Collapsible>
        </Section>
      </div>
    </div>
  )
}
