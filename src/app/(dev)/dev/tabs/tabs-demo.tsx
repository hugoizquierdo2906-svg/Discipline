'use client'

import { useState } from 'react'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Tabs } from '@/components/ui/tabs'
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
          <Text className="text-body-sm text-text-secondary">
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

function ControlledDemo() {
  const [value, setValue] = useState('overview')
  return (
    <div className="flex flex-col gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List aria-label="Client record">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="progress">Progress</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Overview panel content.</Tabs.Content>
        <Tabs.Content value="progress">Progress panel content.</Tabs.Content>
        <Tabs.Content value="settings">Settings panel content.</Tabs.Content>
      </Tabs>
      <div className="flex gap-2">
        {(['overview', 'progress', 'settings'] as const).map((v) => (
          <button
            key={v}
            type="button"
            data-testid={`controlled-external-${v}`}
            onClick={() => setValue(v)}
            className="rounded-md border border-border px-2 py-1 text-caption text-text-secondary hover:text-text"
          >
            Set: {v}
          </button>
        ))}
      </div>
      <Text className="text-caption text-text-tertiary">
        Current value (external state): {value}
      </Text>
    </div>
  )
}

/** Tabs proof — every required demo case, on the standard page surface. */
export function TabsScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Heading as="h2" level={3}>
          Tabs
        </Heading>
        <Text className="text-text-secondary">
          Switch between a small, named, always-visible set of alternate content
          views for the same record — never a hierarchy position, never a page
          of a sequence.
        </Text>
      </div>

      <Section title="Basic" data-testid="tabs-basic">
        <Tabs defaultValue="overview">
          <Tabs.List aria-label="Client record">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="progress">Progress</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Overview panel content.</Tabs.Content>
          <Tabs.Content value="progress">Progress panel content.</Tabs.Content>
          <Tabs.Content value="settings">Settings panel content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="Controlled"
        description="value + onValueChange — external buttons drive the same state."
        data-testid="tabs-controlled"
      >
        <ControlledDemo />
      </Section>

      <Separator />

      <Section
        title="Uncontrolled"
        description="defaultValue only — Tabs owns its own state internally."
        data-testid="tabs-uncontrolled"
      >
        <Tabs defaultValue="progress">
          <Tabs.List aria-label="Uncontrolled example">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="progress">Progress</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Overview panel content.</Tabs.Content>
          <Tabs.Content value="progress">Progress panel content.</Tabs.Content>
          <Tabs.Content value="settings">Settings panel content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Horizontal" data-testid="tabs-horizontal">
        <Tabs defaultValue="a" orientation="horizontal">
          <Tabs.List aria-label="Horizontal example">
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Beta</Tabs.Trigger>
            <Tabs.Trigger value="c">Gamma</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Alpha content.</Tabs.Content>
          <Tabs.Content value="b">Beta content.</Tabs.Content>
          <Tabs.Content value="c">Gamma content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Vertical" data-testid="tabs-vertical">
        <Tabs defaultValue="a" orientation="vertical">
          <Tabs.List aria-label="Vertical example">
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Beta</Tabs.Trigger>
            <Tabs.Trigger value="c">Gamma</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Alpha content.</Tabs.Content>
          <Tabs.Content value="b">Beta content.</Tabs.Content>
          <Tabs.Content value="c">Gamma content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="Automatic activation"
        description='activationMode="automatic" — arrow-key focus immediately activates the panel.'
        data-testid="tabs-automatic"
      >
        <Tabs defaultValue="a" activationMode="automatic">
          <Tabs.List aria-label="Automatic activation example">
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Beta</Tabs.Trigger>
            <Tabs.Trigger value="c">Gamma</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Alpha content.</Tabs.Content>
          <Tabs.Content value="b">Beta content.</Tabs.Content>
          <Tabs.Content value="c">Gamma content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="Manual activation (the default)"
        description="Focus moves with arrow keys; Space/Enter activates. WAI-ARIA's own recommended default for content that isn't guaranteed latency-free."
        data-testid="tabs-manual"
      >
        <Tabs defaultValue="a" activationMode="manual">
          <Tabs.List aria-label="Manual activation example">
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Beta</Tabs.Trigger>
            <Tabs.Trigger value="c">Gamma</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Alpha content.</Tabs.Content>
          <Tabs.Content value="b">Beta content.</Tabs.Content>
          <Tabs.Content value="c">Gamma content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Disabled trigger" data-testid="tabs-disabled">
        <Tabs defaultValue="overview">
          <Tabs.List aria-label="Disabled trigger example">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="progress" disabled>
              Progress (archived)
            </Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Overview panel content.</Tabs.Content>
          <Tabs.Content value="progress">Progress panel content.</Tabs.Content>
          <Tabs.Content value="settings">Settings panel content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="Force mount"
        description="The Settings panel stays in the DOM (forceMount) even while inactive — e.g. to keep a form's state alive underneath."
        data-testid="tabs-force-mount"
      >
        <Tabs defaultValue="overview">
          <Tabs.List aria-label="Force mount example">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">Overview panel content.</Tabs.Content>
          <Tabs.Content
            value="settings"
            forceMount
            data-testid="force-mounted-panel"
            className="data-[state=inactive]:hidden"
          >
            Settings panel content (force-mounted).
          </Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Long labels" data-testid="tabs-long-labels">
        <Tabs defaultValue="a">
          <Tabs.List aria-label="Long labels example">
            <Tabs.Trigger value="a">
              Personalized Twelve-Week Hypertrophy Block
            </Tabs.Trigger>
            <Tabs.Trigger value="b">
              Upper/Lower Split — Deload Adjusted
            </Tabs.Trigger>
            <Tabs.Trigger value="c">Nutrition &amp; Recovery</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Block content.</Tabs.Content>
          <Tabs.Content value="b">Split content.</Tabs.Content>
          <Tabs.Content value="c">Nutrition content.</Tabs.Content>
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="Responsive"
        description="Many tabs — the list scrolls horizontally on narrow viewports instead of wrapping."
        data-testid="tabs-responsive"
      >
        <Tabs defaultValue="1">
          <Tabs.List aria-label="Responsive example">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <Tabs.Trigger key={n} value={String(n)}>
                Section {n}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <Tabs.Content key={n} value={String(n)}>
              Section {n} content.
            </Tabs.Content>
          ))}
        </Tabs>
      </Section>

      <Separator />

      <Section
        title="RTL"
        description='dir="rtl" on Tabs — Radix reverses Arrow-key semantics to match reading direction; flexbox reverses the row natively.'
        data-testid="tabs-rtl"
      >
        <div dir="rtl">
          <Tabs defaultValue="a" dir="rtl">
            <Tabs.List aria-label="مثال RTL">
              <Tabs.Trigger value="a">نظرة عامة</Tabs.Trigger>
              <Tabs.Trigger value="b">التقدم</Tabs.Trigger>
              <Tabs.Trigger value="c">الإعدادات</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">محتوى نظرة عامة.</Tabs.Content>
            <Tabs.Content value="b">محتوى التقدم.</Tabs.Content>
            <Tabs.Content value="c">محتوى الإعدادات.</Tabs.Content>
          </Tabs>
        </div>
      </Section>

      <Separator />

      <Section
        title="Keyboard navigation"
        description="Tab reaches the active trigger; Arrow Left/Right (or Up/Down when vertical) move focus with loop; Home/End jump to the first/last trigger; Space/Enter activates (manual mode)."
        data-testid="tabs-keyboard"
      >
        <Tabs defaultValue="a">
          <Tabs.List aria-label="Keyboard example">
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Beta</Tabs.Trigger>
            <Tabs.Trigger value="c">Gamma</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Alpha content.</Tabs.Content>
          <Tabs.Content value="b">Beta content.</Tabs.Content>
          <Tabs.Content value="c">Gamma content.</Tabs.Content>
        </Tabs>
      </Section>
    </div>
  )
}
