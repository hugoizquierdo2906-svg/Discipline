'use client'

import { useState } from 'react'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

/**
 * Accordion is a Disclosure primitive: it answers only "what additional
 * content can I reveal?" It composes Radix Accordion directly — Item draws
 * no border/surface of its own (a divided look is composed with the frozen
 * Separator at the point of use), Content draws no card, and the chevron
 * rotates a flat 180° with the same calm transition already used by the
 * frozen Select/DropdownMenu. The scene sits on the shared capture
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

/** A divided list of Items, composed with the frozen Separator between each
 * — Item itself decides no border (Invariant A1). */
function DividedItems({
  items,
}: {
  items: {
    value: string
    title: string
    body: React.ReactNode
    disabled?: boolean
  }[]
}) {
  return (
    <>
      {items.map((item, i) => (
        <div key={item.value}>
          <Accordion.Item value={item.value} disabled={item.disabled}>
            <Accordion.Trigger>{item.title}</Accordion.Trigger>
            <Accordion.Content>{item.body}</Accordion.Content>
          </Accordion.Item>
          {i < items.length - 1 && <Separator />}
        </div>
      ))}
    </>
  )
}

const basicItems = [
  {
    value: 'shipping',
    title: 'Shipping',
    body: 'Ships within 2 business days.',
  },
  { value: 'returns', title: 'Returns', body: 'Free returns within 30 days.' },
  { value: 'warranty', title: 'Warranty', body: 'Covered for 12 months.' },
]

export function AccordionScene() {
  const [controlledValue, setControlledValue] = useState('item-2')

  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/backgrounds/capture-bg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Heading as="h2" level={2}>
            Accordion
          </Heading>
          <Text className="text-text-secondary">
            A Disclosure primitive that answers only &ldquo;what additional
            content can I reveal?&rdquo; — never a navigation, a state or an
            action.
          </Text>
        </div>

        <Section
          title="Basic"
          description="A single panel."
          data-testid="ac-basic"
        >
          <Accordion type="single" collapsible>
            <DividedItems
              items={[
                {
                  value: 'panel',
                  title: 'What is included?',
                  body: 'A full 12-week program with video guidance for every exercise.',
                },
              ]}
            />
          </Accordion>
        </Section>

        <Section
          title="Multiple"
          description={
            'type="multiple" — several panels can stay open at once.'
          }
          data-testid="ac-multiple"
        >
          <Accordion type="multiple" defaultValue={['shipping', 'warranty']}>
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Single"
          description={'type="single" — opening one panel closes the others.'}
          data-testid="ac-single"
        >
          <Accordion type="single" collapsible defaultValue="shipping">
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Collapsible"
          description={
            'collapsible — the open panel can be closed back to none.'
          }
          data-testid="ac-collapsible"
        >
          <Accordion type="single" collapsible defaultValue="shipping">
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Non collapsible"
          description="Always exactly one panel open — it cannot be closed to none."
          data-testid="ac-non-collapsible"
        >
          <Accordion type="single" defaultValue="shipping">
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Controlled"
          description="value + onValueChange — the open panel is owned by external state."
          data-testid="ac-controlled"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setControlledValue('item-1')}
              >
                Open first
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setControlledValue('')}
              >
                Close all
              </Button>
            </div>
            <Accordion
              type="single"
              collapsible
              value={controlledValue}
              onValueChange={setControlledValue}
            >
              <DividedItems
                items={[
                  {
                    value: 'item-1',
                    title: 'Account',
                    body: 'Manage your profile.',
                  },
                  {
                    value: 'item-2',
                    title: 'Billing',
                    body: 'Manage your subscription.',
                  },
                ]}
              />
            </Accordion>
          </div>
        </Section>

        <Section
          title="Uncontrolled"
          description="defaultValue — the Accordion owns its own open state."
          data-testid="ac-uncontrolled"
        >
          <Accordion type="single" collapsible defaultValue="returns">
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Disabled item"
          description="One panel cannot be opened; the others work normally."
          data-testid="ac-disabled-item"
        >
          <Accordion type="single" collapsible>
            <DividedItems
              items={[
                {
                  value: 'a',
                  title: 'Available',
                  body: 'This panel opens normally.',
                },
                {
                  value: 'b',
                  title: 'Unavailable',
                  body: 'Never shown.',
                  disabled: true,
                },
              ]}
            />
          </Accordion>
        </Section>

        <Section
          title="Disabled accordion"
          description="The whole group is inert — no panel can be opened."
          data-testid="ac-disabled-accordion"
        >
          <Accordion type="single" collapsible disabled>
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Long content"
          description="The panel grows naturally — never a fixed height or internal scroll."
          data-testid="ac-long-content"
        >
          <Accordion type="single" collapsible defaultValue="terms">
            <DividedItems
              items={[
                {
                  value: 'terms',
                  title: 'Terms of service',
                  body: 'A twelve-week strength and hypertrophy program built for intermediate lifters returning after a long break, structured around four sessions a week with a deliberate deload every fourth week so fatigue never outpaces recovery. Coaching notes, video demonstrations and progress tracking are included for the full duration of the subscription, and access continues for as long as the subscription remains active.',
                },
              ]}
            />
          </Accordion>
        </Section>

        <Section
          title="Nested"
          description="An Accordion inside an Accordion item's content."
          data-testid="ac-nested"
        >
          <Accordion type="single" collapsible defaultValue="outer">
            <Accordion.Item value="outer">
              <Accordion.Trigger>Program details</Accordion.Trigger>
              <Accordion.Content>
                <Accordion type="single" collapsible>
                  <Accordion.Item value="inner">
                    <Accordion.Trigger>Week 1 — Foundations</Accordion.Trigger>
                    <Accordion.Content>
                      Squat, bench press, barbell row — 3 sets of 8.
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Section>

        <Section
          title="Icons"
          description="A small chevron rotates a flat 180° on open — no bounce, no spring."
          data-testid="ac-icons"
        >
          <Accordion type="single" collapsible>
            <DividedItems
              items={[
                {
                  value: 'icon-demo',
                  title: 'Toggle to see the chevron rotate',
                  body: 'Rotation is instant and calm.',
                },
              ]}
            />
          </Accordion>
        </Section>

        <Section
          title="RTL"
          description='dir="rtl" — full keyboard and visual behaviour mirrors correctly.'
          data-testid="ac-rtl"
        >
          <div dir="rtl">
            <Accordion type="single" collapsible dir="rtl">
              <DividedItems
                items={[
                  {
                    value: 'shipping-rtl',
                    title: 'الشحن',
                    body: 'يشحن خلال يومي عمل.',
                  },
                  {
                    value: 'returns-rtl',
                    title: 'الإرجاع',
                    body: 'إرجاع مجاني خلال 30 يومًا.',
                  },
                ]}
              />
            </Accordion>
          </div>
        </Section>

        <Section
          title="Responsive"
          description="Only the layout width changes — the behaviour stays identical."
          data-testid="ac-responsive"
        >
          <Accordion type="single" collapsible>
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>

        <Section
          title="Keyboard navigation"
          description="ArrowUp / ArrowDown / Home / End move focus between triggers; Enter / Space toggle — all inherited from Radix."
          data-testid="ac-keyboard"
        >
          <Accordion type="single" collapsible>
            <DividedItems items={basicItems} />
          </Accordion>
        </Section>
      </div>
    </div>
  )
}
