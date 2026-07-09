'use client'

import { CreditCard, FileCheck, Home, User } from 'lucide-react'
import { useState } from 'react'

import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Stepper, type StepperStep } from '@/components/ui/stepper'
import { Text } from '@/components/ui/text'

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
      <div className="rounded-lg border border-border bg-surface px-5 py-4">
        {children}
      </div>
    </section>
  )
}

const basicSteps: StepperStep[] = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

function ClickableDemo() {
  const [step, setStep] = useState(1)
  return (
    <div className="flex flex-col gap-3">
      <Stepper
        currentStep={step}
        steps={basicSteps}
        clickable
        onStepClick={(index) => setStep(index)}
        responsive={false}
      />
      <Text
        size="caption"
        tone="tertiary"
        data-testid="clickable-external-state"
      >
        Current step (external state): {basicSteps[step]?.label}
      </Text>
    </div>
  )
}

/** Stepper proof — every required demo case, on the standard page surface. */
export function StepperScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          Stepper
        </Heading>
        <Text tone="secondary">
          Progress through a sequence of ordered, semantically different steps
          of one task — never which facet of the same record (Tabs), never a
          navigation hierarchy (Breadcrumb).
        </Text>
      </div>

      <Section title="Basic" data-testid="stepper-basic">
        <Stepper currentStep={1} steps={basicSteps} responsive={false} />
      </Section>

      <Separator />

      <Section
        title="Current step"
        description="currentStep=0 — Account is current, everything after is pending."
        data-testid="stepper-current"
      >
        <Stepper currentStep={0} steps={basicSteps} responsive={false} />
      </Section>

      <Separator />

      <Section
        title="Completed steps"
        description="currentStep=3 — Account/Profile/Payment auto-complete (before currentStep)."
        data-testid="stepper-completed"
      >
        <Stepper currentStep={3} steps={basicSteps} responsive={false} />
      </Section>

      <Separator />

      <Section
        title="Clickable"
        description="clickable + onStepClick — click any step to jump directly to it."
        data-testid="stepper-clickable"
      >
        <ClickableDemo />
      </Section>

      <Separator />

      <Section
        title="Disabled step"
        description="Payment is disabled — inert, dimmed, but still visible for context."
        data-testid="stepper-disabled-step"
      >
        <Stepper
          currentStep={1}
          steps={[
            { id: 'account', label: 'Account' },
            { id: 'profile', label: 'Profile' },
            { id: 'payment', label: 'Payment', disabled: true },
            { id: 'review', label: 'Review' },
          ]}
          clickable
          responsive={false}
        />
      </Section>

      <Separator />

      <Section title="Vertical" data-testid="stepper-vertical">
        <Stepper currentStep={1} steps={basicSteps} orientation="vertical" />
      </Section>

      <Separator />

      <Section title="Horizontal" data-testid="stepper-horizontal">
        <Stepper
          currentStep={1}
          steps={basicSteps}
          orientation="horizontal"
          responsive={false}
        />
      </Section>

      <Separator />

      <Section title="Long labels" data-testid="stepper-long-labels">
        <Stepper
          currentStep={1}
          responsive={false}
          steps={[
            { id: 'a', label: 'Personalized Hypertrophy Block Setup' },
            { id: 'b', label: 'Upper/Lower Split Configuration' },
            { id: 'c', label: 'Nutrition & Recovery Preferences' },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Descriptions" data-testid="stepper-descriptions">
        <Stepper
          currentStep={1}
          orientation="vertical"
          steps={[
            {
              id: 'account',
              label: 'Account',
              description: 'Email and password',
            },
            {
              id: 'profile',
              label: 'Profile',
              description: 'Name, goals and experience level',
            },
            {
              id: 'payment',
              label: 'Payment',
              description: 'Plan and billing details',
            },
            { id: 'review', label: 'Review', description: 'Confirm and start' },
          ]}
        />
      </Section>

      <Separator />

      <Section title="Icons" data-testid="stepper-icons">
        <Stepper
          currentStep={1}
          responsive={false}
          steps={[
            {
              id: 'account',
              label: 'Account',
              icon: <Icon icon={Home} size="sm" />,
            },
            {
              id: 'profile',
              label: 'Profile',
              icon: <Icon icon={User} size="sm" />,
            },
            {
              id: 'payment',
              label: 'Payment',
              icon: <Icon icon={CreditCard} size="sm" />,
            },
            {
              id: 'review',
              label: 'Review',
              icon: <Icon icon={FileCheck} size="sm" />,
            },
          ]}
        />
      </Section>

      <Separator />

      <Section
        title="Loading"
        description="Payment (current) shows a Spinner while a transition is in flight; all steps disabled."
        data-testid="stepper-loading"
      >
        <Stepper
          currentStep={2}
          steps={basicSteps}
          loading
          responsive={false}
        />
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="Below the md breakpoint, the horizontal layout switches to vertical (CSS-only, no measuring) — Material Design's own recommendation over horizontal scroll."
        data-testid="stepper-responsive"
      >
        <Stepper currentStep={1} steps={basicSteps} />
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on the wrapper — flexbox reverses natively; the connector logic is direction-agnostic (no directional glyphs).'
        data-testid="stepper-rtl"
      >
        <div dir="rtl">
          <Stepper
            currentStep={1}
            responsive={false}
            steps={[
              { id: 'a', label: 'الحساب' },
              { id: 'b', label: 'الملف الشخصي' },
              { id: 'c', label: 'الدفع' },
              { id: 'd', label: 'المراجعة' },
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
